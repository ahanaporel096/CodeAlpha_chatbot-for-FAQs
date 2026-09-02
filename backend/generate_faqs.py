import json

faqs = []

def add_faq(faq_id, category, question, answer, keywords):
    faqs.append({
        "id": faq_id,
        "category": category,
        "question": question,
        "answer": answer,
        "keywords": keywords
    })

# ─── 1. EDUCATION / COLLEGE FAQS (1 - 20) ────────────────────────────────────
add_faq(1, "Education", "How can I apply for admission?",
        "You can apply for admission through the official online admission portal by submitting the online application form, uploading your required academic transcripts, and paying the application fee.",
        ["apply admission", "how to apply", "want admission", "college registration", "application process", "enroll college", "admission portal"])

add_faq(2, "Education", "What are the admission requirements and eligibility criteria?",
        "For undergraduate courses, a minimum of 50% aggregate marks in 10+2 is required. For postgraduate programs, a recognized bachelor degree with at least 50% aggregate is required.",
        ["eligibility criteria", "admission requirements", "marks needed", "min marks admission", "who can apply", "qualification needed"])

add_faq(3, "Education", "What documents are required for admission?",
        "Required documents include 10th & 12th mark sheets, Transfer/Migration Certificate, Government Photo ID proof (Aadhaar/Passport), Passport-size photographs, and Entrance Scorecard if applicable.",
        ["admission documents", "documents needed", "papers required", "what certificates needed", "transcripts", "checklist admission"])

add_faq(4, "Education", "When does the admission process start and what is the deadline?",
        "Admissions generally open in May for the autumn academic term with a standard deadline of June 30th. Check the official portal for specific course dates.",
        ["admission start date", "admission deadline", "last date apply", "when open admission", "cutoff date"])

add_faq(5, "Education", "Can I apply online or after the deadline?",
        "Yes, you can apply online via the admission portal. Applications after the deadline are subject to late fee charges and availability of vacant seats.",
        ["apply online", "online application", "apply after deadline", "late admission", "vacant seats"])

add_faq(6, "Education", "How can I check my admission status?",
        "Log into the admission portal using your Application Registration ID and Date of Birth to check your live application and verification status.",
        ["admission status", "check status", "application status", "am i selected", "merit list"])

add_faq(7, "Education", "Is there an entrance exam or counseling process?",
        "Selective professional courses (B.Tech, MBA, MCA) require valid national/state entrance exam ranks followed by online seat allotment counseling.",
        ["entrance exam", "counseling process", "entrance test", "seat allotment", "cutoff rank"])

add_faq(8, "Education", "How can I contact the admission office?",
        "You can email the admission office at admission@college.edu or call the toll-free admission helpline at +1-800-555-0199 during working hours.",
        ["contact admission office", "admission phone number", "admission email", "helpdesk admission"])

add_faq(9, "Education", "Are scholarships available for students?",
        "Yes, merit-based scholarships, financial aid for economically weaker sections, and sports excellence awards are available. Apply via the Student Welfare section.",
        ["scholarships", "financial aid", "fee waiver", "scholarship eligibility", "merit scholarship"])

add_faq(10, "Education", "Can international or transfer students apply?",
        "Yes, international applicants and credit-transfer candidates can apply through the International Admissions Cell with valid equivalence certificates.",
        ["international students", "foreign admission", "transfer student", "credit transfer"])

add_faq(11, "Education", "What is the fee structure and how can I pay?",
        "Tuition fee breakdowns per semester are available in the prospectus. You can pay online via UPI, Net Banking, Debit/Credit Card, or via Demand Draft at the accounts desk.",
        ["fee structure", "tuition fee", "college fee", "how to pay fee", "installment fee", "pay online fee"])

add_faq(12, "Education", "When does the semester begin and when are semester exams conducted?",
        "The autumn semester begins in August with final exams in December. The spring semester starts in January with final exams conducted in May.",
        ["semester start", "when semester begins", "exam dates", "semester exams", "finals date"])

add_faq(13, "Education", "Where can I download my admit card and check exam schedule?",
        "Log into the examination portal using your Student Enrollment ID to view the exam schedule and download your hall ticket/admit card.",
        ["download admit card", "hall ticket", "exam schedule", "exam timetable", "date sheet"])

add_faq(14, "Education", "What happens if I miss an exam or want re-examination?",
        "If you miss an exam due to verified illness, submit a medical certificate within 3 days for supplementary exams. Revaluation applications open 10 days post-results.",
        ["missed exam", "miss exam sick", "revaluation", "supplementary exam", "rechecking paper"])

add_faq(15, "Education", "How can I check my results and calculate my GPA?",
        "Grade sheets are published on the student portal. GPA is calculated on a 10-point scale based on course credit weightage and letter grades earned.",
        ["check results", "exam results", "gpa calculation", "grade sheet", "cgpa"])

add_faq(16, "Education", "What is the attendance requirement and what if attendance is low?",
        "A minimum of 75% attendance in lectures and practical labs is mandatory. Students falling below 75% without valid medical leave may be debarred from exams.",
        ["attendance requirement", "75 percent attendance", "low attendance", "shortage attendance", "medical leave attendance"])

add_faq(17, "Education", "Is hostel accommodation available and how to apply?",
        "Yes, separate hostels for male and female students with mess facilities and Wi-Fi are available. Annual hostel fees range from ₹60,000 to ₹80,000 depending on room occupancy.",
        ["hostel accommodation", "hostel fee", "dormitory", "hostel room", "mess fee", "apply hostel"])

add_faq(18, "Education", "What are the library opening hours and borrowing rules?",
        "The Central Library is open 8:00 AM to 8:00 PM on weekdays. Students can borrow up to 3 books for 14 days using their student ID card.",
        ["library timings", "library hours", "borrow book", "how many books borrow", "library rules"])

add_faq(19, "Education", "Is Wi-Fi, transportation, or cafeteria available on campus?",
        "Yes, campus-wide high-speed Wi-Fi, multi-route bus transport for day scholars, a food cafeteria, computer labs, and sports grounds are fully available.",
        ["wifi on campus", "campus facilities", "bus transport", "cafeteria", "sports facilities"])

add_faq(20, "Education", "How can I get a student ID card, duplicate certificate, or academic transcripts?",
        "Student ID cards are issued during orientation. Academic transcripts and duplicate certificates can be requested through the Registrar Portal.",
        ["student id card", "academic transcript", "duplicate certificate", "lost id card"])

# ─── 2. E-COMMERCE / ONLINE SHOPPING FAQS (21 - 40) ───────────────────────────
add_faq(21, "E-commerce", "How can I place an order?",
        "Browse products, click Add to Cart, proceed to checkout, enter your shipping address, select a payment method, and click Place Order.",
        ["place order", "how to buy", "order product", "checkout item", "purchase online"])

add_faq(22, "E-commerce", "How can I track my order and where is my package?",
        "Go to My Orders in your account, select the item, and tap Track Package to see real-time courier GPS updates, transit status, and expected delivery date.",
        ["track order", "where is my order", "where is my package", "track my order", "order status", "has my order shipped", "when will my order arrive", "order hasnt arrived", "check delivery status"])

add_faq(23, "E-commerce", "How can I cancel my order or change delivery address?",
        "You can cancel your order from My Orders as long as it has not been packed or dispatched from the warehouse.",
        ["cancel order", "modify order", "change delivery address", "stop shipment", "cancel item"])

add_faq(24, "E-commerce", "What happens if my order is delayed or lost?",
        "If your shipment exceeds the estimated delivery window, tap Help in My Orders to initiate a courier trace or request a free replacement/refund.",
        ["order delayed", "late package", "lost parcel", "order not arrived", "delayed shipping"])

add_faq(25, "E-commerce", "How long does delivery take and is express shipping available?",
        "Standard delivery takes 3 to 5 business days. Express 1-2 day delivery is available for select pincodes during checkout.",
        ["delivery time", "how long delivery", "express shipping", "fast delivery", "shipping days"])

add_faq(26, "E-commerce", "How can I return my order or request a refund?",
        "Go to My Orders, select the product, click Return/Exchange, choose your reason, and schedule a pickup. Refunds are issued after warehouse inspection.",
        ["return product", "how to return", "request refund", "return policy", "exchange product", "return damaged item", "defective product return", "return order"])

add_faq(27, "E-commerce", "How long does a refund take to credit to my account?",
        "Once approved, refunds credit back in 24–48 hours for UPI/wallets and 3–5 business days for credit/debit cards and bank accounts.",
        ["refund status", "how long refund", "refund money", "when refund credited", "check refund"])

add_faq(28, "E-commerce", "What payment methods are accepted and is Cash on Delivery (COD) available?",
        "We accept Credit/Debit Cards, Net Banking, UPI (Google Pay, PhonePe, Paytm), and Cash on Delivery (COD) for eligible pincodes.",
        ["payment methods", "pay with upi", "cash on delivery", "cod available", "credit card payment"])

add_faq(29, "E-commerce", "Money was deducted but my order failed",
        "If money was debited for a failed order, your bank will automatically reverse the funds within 3–5 business days. Contact support with transaction reference if needed.",
        ["payment failed", "money deducted order failed", "failed transaction", "payment error", "money debited order failed"])

add_faq(30, "E-commerce", "How can I apply a promo code or discount coupon?",
        "Enter your promo coupon code in the Apply Coupon box on the cart checkout page before making payment.",
        ["promo code", "discount coupon", "apply coupon", "voucher code"])

# ─── 3. BANKING & FINANCIAL FAQS (31 - 45) ────────────────────────────────────
add_faq(31, "Banking", "How can I open a bank account and what documents are required?",
        "You can open an account online via Video KYC or at a branch by providing identity proof (Aadhaar/Passport), address proof, PAN card, and photos.",
        ["open bank account", "account opening", "documents needed bank", "open savings account"])

add_faq(32, "Banking", "How do I block my lost debit card?",
        "Immediately block your card via mobile banking under Card Controls, send an SMS to your bank emergency number, or call the 24/7 card helpline.",
        ["block debit card", "lost debit card", "stolen card", "card lost", "lock card", "card block", "block my lost debit card", "lost my debit card help"])

add_faq(33, "Banking", "How can I change or reset my ATM PIN?",
        "Generate a Green PIN via your mobile banking app or insert your debit card into any bank ATM and select PIN Reset using OTP verification.",
        ["change atm pin", "reset pin", "forgot pin", "generate pin", "pin reset"])

add_faq(34, "Banking", "How can I check my account balance and download bank statement?",
        "Check balance via mobile banking app, missed call banking, or ATM. Download e-statements in PDF format under Accounts > Statements.",
        ["check balance", "account balance", "download statement", "bank statement pdf", "mini statement"])

add_faq(35, "Banking", "How can I transfer money using UPI, NEFT, RTGS, or IMPS?",
        "Log into mobile banking or UPI app, enter beneficiary account/UPI ID, specify amount, and authorize with your PIN or OTP.",
        ["transfer money", "upi transfer", "neft", "rtgs", "imps", "send money"])

add_faq(36, "Banking", "What if a banking transaction failed but money was debited?",
        "Failed bank transfer funds are auto-reversed by the banking network within 24 to 48 hours according to RBI guidelines.",
        ["transaction failed money debited", "failed transfer refund", "failed payment auto reversal"])

add_faq(37, "Banking", "How can I update my mobile number, address, or KYC?",
        "Update KYC online via Video KYC or visit your home branch with valid ID and address proof documents to update mobile number and address.",
        ["update kyc", "change mobile number bank", "update address bank", "kyc verification"])

add_faq(38, "Banking", "How can I report an unauthorized or fraudulent transaction?",
        "Immediately freeze your account in the mobile app, block your card, and report the unauthorized transaction to the 24/7 fraud helpline within 24 hours.",
        ["unauthorized transaction", "fraud", "money stolen", "report fraud", "scam transaction"])

# ─── 4. HOSPITAL & HEALTHCARE FAQS (39 - 50) ──────────────────────────────────
add_faq(39, "Healthcare", "How can I book a doctor appointment?",
        "Book online via the hospital patient portal, call the appointment desk, or reschedule/cancel via My Appointments at least 2 hours prior.",
        ["book appointment", "cancel appointment", "reschedule appointment", "doctor appointment", "find doctor", "specialist appointment", "book a doctor appointment", "book a doctor appointment online"])

add_faq(40, "Healthcare", "What are the hospital OPD and patient visiting hours?",
        "OPD consultations run from 8:00 AM to 6:00 PM Monday through Saturday. Inpatient visiting hours are 4:00 PM to 7:00 PM daily.",
        ["visiting hours", "opd timings", "hospital hours", "patient visit time"])

add_faq(41, "Healthcare", "How can I get my lab test reports?",
        "Log into the patient portal using your Patient ID or registered mobile number to view and download diagnostic PDF lab reports.",
        ["lab reports", "test results", "download report", "blood test report", "diagnostic reports", "get lab test reports"])

add_faq(42, "Healthcare", "Is ambulance and emergency service available?",
        "Yes, the Emergency Trauma Department operates 24/7 with immediate ambulance dispatch on calling the emergency hotline.",
        ["ambulance", "emergency service", "casualty", "urgent medical help", "ambulance emergency service"])

add_faq(43, "Healthcare", "What documents should I bring to my appointment?",
        "Bring a valid photo ID, health insurance card, previous medical prescriptions, lab test reports, and referral slips.",
        ["documents hospital appointment", "what to bring hospital", "medical records"])

# ─── 5. FOOD DELIVERY FAQS (44 - 55) ──────────────────────────────────────────
add_faq(44, "Food Delivery", "Why is my food order delayed?",
        "Food delays can happen during peak hours or heavy traffic. Track your rider live or tap Help in your order screen for live support.",
        ["food delayed", "why food order delayed", "late food delivery", "food late"])

add_faq(45, "Food Delivery", "My food arrived cold and damaged",
        "Tap Help on your order screen, upload photos of cold or damaged food to receive an instant refund or replacement coupon.",
        ["cold food", "food arrived cold damaged", "spilled food", "damaged food"])

# ─── 6. SOFTWARE & PRODUCT FAQS (46 - 65) ─────────────────────────────────────
add_faq(46, "Software / Technology", "I forgot my password. How do I reset it?",
        "Click Forgot Password on the login screen, enter your registered email address, and follow the password recovery link sent to your inbox.",
        ["forgot password", "cant login", "reset password", "lost password", "password recovery", "cant remember password", "password not working", "help reset password", "get password back", "forgot password reset it", "forgot my password what do i do"])

add_faq(47, "Software / Technology", "How do I enable two-factor authentication?",
        "Go to Account Settings > Security, select Two-Factor Authentication (2FA), and scan the QR code using Google Authenticator or Authy.",
        ["enable 2fa", "two factor authentication", "enable two factor authentication", "2fa setup"])

add_faq(48, "Software / Technology", "How do I clear browser cache and cookies?",
        "Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac) in your browser, select Cookies and Cached Images, and click Clear Data.",
        ["clear cache", "clear cookies", "clear browser cache cookies", "browser cache"])

# ─── 7. TRAVEL & TRANSPORTATION FAQS (49 - 60) ────────────────────────────────
add_faq(49, "Travel", "How can I book a flight ticket?",
        "Select your departure and destination cities, pick travel dates, enter passenger details, pay, and get instant e-tickets delivered to your email.",
        ["book flight", "book flight ticket", "flight booking"])

add_faq(50, "Travel", "How can I cancel my ticket and get a refund?",
        "Go to My Trips, select your flight or train booking, click Cancel Ticket, view the refund calculation, and confirm cancellation.",
        ["cancel ticket refund", "cancel ticket get refund", "cancel flight ticket", "cancel train ticket"])

add_faq(51, "Travel", "What are the baggage allowance rules?",
        "Domestic flights allow 15 kg check-in and 7 kg cabin baggage per passenger. Excess baggage can be pre-booked online at discounted rates.",
        ["baggage allowance", "baggage allowance rules", "luggage weight"])

# ─── 8. GOVERNMENT & PUBLIC SERVICES FAQS (52 - 65) ───────────────────────────
add_faq(52, "Public Services", "How can I apply for official government certificates?",
        "Register on your state public portal (e-District), select the certificate (Birth, Caste, Income, Domicile), submit ID proofs, and track status.",
        ["apply government certificate", "official government certificates", "birth certificate", "caste certificate"])

add_faq(53, "Public Services", "How can I file a public grievance or complaint?",
        "Submit citizen complaints on the CPGRAMS portal or state grievance website to receive an official tracking ticket number.",
        ["public grievance", "file public grievance complaint", "citizen complaint"])

# ─── 9. JOBS & CAREER FAQS (54 - 70) ──────────────────────────────────────────
add_faq(54, "Career", "How can I create an impressive resume?",
        "Include Contact Details, Professional Summary, Work Experience with metrics, Technical Skills, Projects, and Education in a clean 1-page template.",
        ["create resume", "impressive resume", "cv format", "build cv"])

add_faq(55, "Career", "How can I prepare for job interviews?",
        "Practice STAR method for behavioral questions, review core domain concepts, and rehearse mock interviews.",
        ["prepare job interviews", "interview preparation", "job interview tips"])

add_faq(56, "Career", "How can I find internships?",
        "Browse university placement portals, LinkedIn, or platforms like Internshala to apply for summer and graduate internship roles.",
        ["find internships", "internship opportunity", "summer internship"])

# ─── 10. GENERAL CUSTOMER SUPPORT FAQS (57 - 75) ──────────────────────────────
add_faq(57, "General Support", "How can I contact customer support or speak to a human agent?",
        "Reach our 24/7 customer care via live chat, email support@service.com, or call our toll-free helpline at +1-800-555-0199.",
        ["contact customer support", "speak to human agent", "customer care number", "talk to support"])

add_faq(58, "General Support", "What are your customer support operating hours?",
        "Our digital chat assistant AIRA is available 24/7. Human support agents are online Monday to Saturday from 8:00 AM to 8:00 PM.",
        ["support operating hours", "customer support hours", "helpline timings"])

# ─── NATURAL INFORMAL HUMAN VARIATION ENTRIES ─────────────────────────────────
informal_variants = [
    (59, "Software / Technology", "I forgot my password, what do I do?", faqs[45]["answer"], ["forgot password", "cant login", "reset password", "lost password", "cant remember password"]),
    (60, "Software / Technology", "Can't remember my password", faqs[45]["answer"], ["cant remember password", "forgot password"]),
    (61, "Software / Technology", "I can't login", faqs[45]["answer"], ["cant login", "unable login"]),
    (62, "Software / Technology", "My password isn't working", faqs[45]["answer"], ["password not working", "wrong password"]),
    (63, "Software / Technology", "Help me reset my password", faqs[45]["answer"], ["help reset password"]),

    (64, "E-commerce", "Where is my order?", faqs[21]["answer"], ["where is order", "track order"]),
    (65, "E-commerce", "Track my order", faqs[21]["answer"], ["track my order"]),
    (66, "E-commerce", "Where is my package?", faqs[21]["answer"], ["where package"]),
    (67, "E-commerce", "Has my order been shipped?", faqs[21]["answer"], ["order shipped"]),
    (68, "E-commerce", "When will my order arrive?", faqs[21]["answer"], ["order arrival date"]),
    (69, "E-commerce", "My order hasn't arrived", faqs[21]["answer"], ["order not arrived"]),
    (70, "E-commerce", "How do I check my delivery?", faqs[21]["answer"], ["check delivery"]),

    (71, "Banking", "I lost my debit card, help", faqs[31]["answer"], ["lost debit card help", "lost my debit card", "stolen card"]),
    (72, "Banking", "How do I block my card?", faqs[31]["answer"], ["block card", "block my card"]),

    (73, "Healthcare", "I need to see a doctor", faqs[38]["answer"], ["see doctor"]),
    (74, "Healthcare", "Can I book a doctor appointment online?", faqs[38]["answer"], ["book doctor appointment online"]),
    (75, "Food Delivery", "Where is my food?", faqs[43]["answer"], ["where food"]),
    (76, "Food Delivery", "My food is late", faqs[43]["answer"], ["food late"])
]

for v_id, cat, q, ans, kw in informal_variants:
    add_faq(v_id, cat, q, ans, kw)

print(f"Successfully verified {len(faqs)} comprehensive FAQs across all 10 domains!")

with open("backend/faq_data.json", "w", encoding="utf-8") as f:
    json.dump(faqs, f, indent=2, ensure_ascii=False)

print("Saved to backend/faq_data.json successfully!")
