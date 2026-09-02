-- ============================================================
-- Intelligent FAQ Chatbot — Supabase Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/mvoroxvjimezqjvummvh/sql
-- ============================================================

-- Enable required extensions
create extension if not exists pg_trgm;
create extension if not exists unaccent;

-- ============================================================
-- 1. FAQS TABLE
-- ============================================================
create table if not exists public.faqs (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text not null,
  category    text not null,
  keywords    text[] default '{}',
  search_vec  tsvector generated always as (
                to_tsvector('english', coalesce(question,'') || ' ' || coalesce(answer,'') || ' ' || array_to_string(keywords,' '))
              ) stored,
  created_at  timestamptz default now()
);

create index if not exists faqs_search_vec_idx on public.faqs using gin(search_vec);
create index if not exists faqs_category_idx   on public.faqs(category);

-- ============================================================
-- 2. CHAT SESSIONS TABLE
-- ============================================================
create table if not exists public.chat_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_agent  text,
  created_at  timestamptz default now()
);

-- ============================================================
-- 3. CHAT MESSAGES TABLE
-- ============================================================
create table if not exists public.chat_messages (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid references public.chat_sessions(id) on delete cascade,
  role            text not null check (role in ('user','bot')),
  content         text not null,
  matched_faq_id  uuid references public.faqs(id) on delete set null,
  confidence      float default 0,
  created_at      timestamptz default now()
);

create index if not exists chat_messages_session_idx on public.chat_messages(session_id);

-- ============================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
alter table public.faqs           enable row level security;
alter table public.chat_sessions  enable row level security;
alter table public.chat_messages  enable row level security;

-- Public can read FAQs
drop policy if exists "Allow public read of faqs" on public.faqs;
create policy "Allow public read of faqs"
  on public.faqs for select using (true);

-- Public can insert and read chat sessions
drop policy if exists "Allow public insert chat_sessions" on public.chat_sessions;
create policy "Allow public insert chat_sessions"
  on public.chat_sessions for insert with check (true);

drop policy if exists "Allow public select chat_sessions" on public.chat_sessions;
create policy "Allow public select chat_sessions"
  on public.chat_sessions for select using (true);

-- Public can insert and read chat messages
drop policy if exists "Allow public insert chat_messages" on public.chat_messages;
create policy "Allow public insert chat_messages"
  on public.chat_messages for insert with check (true);

drop policy if exists "Allow public select chat_messages" on public.chat_messages;
create policy "Allow public select chat_messages"
  on public.chat_messages for select using (true);

-- ============================================================
-- 5. SEED DATA — 31 College FAQs
-- ============================================================
delete from public.faqs;

insert into public.faqs (question, answer, category, keywords) values
('How can I apply for admission?',
 'You can apply for admission through the official admission portal by completing the application form, uploading the required documents, and paying the application fee. (Demo Info)',
 'admission', array['apply', 'admission', 'enroll', 'registration', 'portal']),

('What are the college admission requirements?',
 'For undergraduate programs, candidates must have completed 10+2 with a minimum of 50% aggregate marks. For postgraduate courses, a recognized bachelor''s degree with at least 50% aggregate is required. (Demo Info)',
 'admission', array['requirements', 'eligibility', 'criteria', 'qualification', 'marks']),

('What documents are required for admission?',
 'Required documents include: (1) 10th and 12th mark sheets and certificates, (2) Transfer or Migration Certificate, (3) Government-issued photo ID proof, (4) Passport-size photographs, and (5) Category certificate if applicable. (Demo Info)',
 'admission', array['documents', 'required', 'certificates', 'papers', 'transcripts']),

('What is the admission deadline and cutoff date?',
 'The standard application deadline is June 30th for the upcoming academic year. Please refer to the official admission portal for specific program deadlines. (Demo Info)',
 'admission', array['deadline', 'cutoff', 'last date', 'apply date']),

('What courses are available?',
 'The college offers undergraduate degrees (B.Tech, BCA, B.Sc, BBA, B.Com), postgraduate degrees (M.Tech, MCA, MBA, M.Sc), and doctoral research programs across science, technology, and management. (Demo Info)',
 'academics', array['courses', 'programs', 'degrees', 'btech', 'mba', 'bca']),

('What is the fee structure?',
 'The annual tuition fee ranges from ₹45,000 to ₹1,20,000 depending on the program. Detailed semester-wise fee breakdowns are available in the prospectus. (Demo Info)',
 'fees', array['fee', 'tuition', 'cost', 'charge', 'structure', 'amount']),

('How can I pay my fees?',
 'You can pay fees online through the Student ERP portal via Net Banking, UPI (GPay/PhonePe), Credit/Debit cards, or via Demand Draft at the accounts office. (Demo Info)',
 'fees', array['pay', 'payment', 'method', 'online', 'upi', 'netbanking']),

('What is the fee refund policy?',
 '100% tuition refund is provided if cancellation is requested before the start of classes. An 80% refund is issued within 15 days of class commencement. (Demo Info)',
 'fees', array['refund', 'cancellation', 'money back', 'withdraw']),

('When does the semester start?',
 'The autumn semester generally commences in August, while the spring semester starts in January. (Demo Info)',
 'academics', array['semester', 'start', 'begin', 'academic calendar']),

('What are the college timings?',
 'The college generally operates from 9:00 AM to 5:00 PM on working days (Monday to Saturday). (Demo Info)',
 'timings', array['timings', 'hours', 'time', 'working hours', 'schedule']),

('When does the college open and close?',
 'The academic campus opens at 8:00 AM and closes at 6:00 PM. Classes are conducted between 9:00 AM and 5:00 PM. (Demo Info)',
 'timings', array['open', 'close', 'timing', 'hours', 'schedule']),

('Where is the college located?',
 'The college is situated in the University Knowledge Park, easily accessible by city buses and the metro transit line. (Demo Info)',
 'campus', array['location', 'address', 'where', 'place', 'situated']),

('How can I contact the administration?',
 'You can reach the administration office by emailing admin@college.edu or calling the helpdesk helpline at +1-800-555-0199 on working days. (Demo Info)',
 'campus', array['contact', 'phone', 'email', 'helpdesk', 'administration']),

('What is the attendance requirement?',
 'A minimum of 75% attendance in both lectures and practical sessions is strictly required to be eligible for end-semester examinations. (Demo Info)',
 'academics', array['attendance', 'percentage', 'mandatory', 'minimum']),

('How can I get my student ID card?',
 'Student ID cards are issued at the Registrar Office during the first week of orientation upon submission of your enrollment form and fee receipt. (Demo Info)',
 'campus', array['id card', 'student id', 'identity', 'badge']),

('Is there a library on campus?',
 'Yes, the Central Library houses over 50,000 books, national and international journals, digital databases, and quiet study zones. (Demo Info)',
 'library', array['library', 'books', 'reading', 'central library']),

('What are the library timings?',
 'The Central Library is open from 8:00 AM to 8:00 PM on weekdays, and from 9:00 AM to 1:00 PM on Sundays. (Demo Info)',
 'library', array['library timings', 'library hours', 'library open']),

('Is hostel accommodation available?',
 'Yes, separate residential hostel accommodations with furnished rooms, mess facilities, Wi-Fi, and 24/7 security are available for male and female students. (Demo Info)',
 'hostel', array['hostel', 'accommodation', 'room', 'dormitory', 'stay']),

('What is the hostel fee?',
 'Hostel room charges are ₹60,000/year for double occupancy and ₹80,000/year for single occupancy, including 3 meals daily. (Demo Info)',
 'hostel', array['hostel fee', 'mess fee', 'room cost', 'hostel charge']),

('Is Wi-Fi available on campus?',
 'Yes, high-speed Wi-Fi is accessible throughout academic blocks, libraries, and hostels. Register your device at the IT Helpdesk. (Demo Info)',
 'campus', array['wifi', 'internet', 'network', 'connection']),

('How can I apply for a scholarship?',
 'Eligible candidates can apply for merit-based and need-based scholarships via the Student Welfare portal before September 30th. (Demo Info)',
 'scholarships', array['scholarship', 'financial aid', 'merit', 'apply scholarship']),

('What scholarships are available?',
 'We offer Merit Scholarships (up to 50% fee concession for 90%+ scores), Financial Aid for economically weaker sections, and Sports Excellence awards. (Demo Info)',
 'scholarships', array['scholarships available', 'types of scholarships', 'merit scholarship']),

('What are the examination rules?',
 'Students must carry their valid Student ID and Admit Card to all exam sessions. Mobile phones and electronic gadgets are strictly prohibited in the exam hall. (Demo Info)',
 'examinations', array['examination rules', 'exam guidelines', 'exam hall']),

('When are examinations conducted?',
 'Mid-semester exams take place in October and March, and End-semester final exams are conducted in December and May. (Demo Info)',
 'examinations', array['exam dates', 'examination schedule', 'mid sem', 'end sem']),

('How can I contact the placement cell?',
 'You can contact the Training and Placement Cell at placement@college.edu or visit Room 102 in the Administration Block. (Demo Info)',
 'placement', array['placement cell', 'training and placement', 'placement contact']),

('What is the placement record?',
 'The college boasts a 90%+ placement rate with an average salary package of ₹6.5 LPA and a highest domestic package of ₹28 LPA. (Demo Info)',
 'placement', array['placement record', 'highest package', 'average salary', 'placement rate']),

('Which top companies visit for campus placement?',
 'Recruiters include TCS, Infosys, Amazon, Microsoft, Wipro, Accenture, Cognizant, Deloitte, and numerous tech startups. (Demo Info)',
 'placement', array['companies', 'recruiters', 'campus placement', 'jobs']),

('Is transport or bus facility available?',
 'Yes, college buses operate across all major city routes for day-scholar students and staff. (Demo Info)',
 'campus', array['transport', 'bus', 'bus facility', 'route']),

('What sports facilities are available?',
 'Facilities include basketball, volleyball, and tennis courts, football and cricket grounds, an indoor badminton arena, and a modern gymnasium. (Demo Info)',
 'campus', array['sports', 'gym', 'gymnasium', 'games', 'ground']),

('Is medical healthcare assistance available?',
 'A 24/7 on-campus health clinic with a resident medical doctor, nursing staff, and an ambulance is available for all students and staff. (Demo Info)',
 'campus', array['medical', 'health', 'doctor', 'clinic', 'hospital']),

('How do I report ragging or complaints?',
 'The college maintains a strict Zero Tolerance policy. File confidential complaints at the Anti-Ragging Cell or call the 24/7 Helpline at 1800-180-5522. (Demo Info)',
 'general', array['anti ragging', 'complaints', 'helpline', 'grievance']);
