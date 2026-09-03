/**
 * Client-side NLP & Multi-Domain FAQ Matcher for AIRA (AI Responsive Assistant).
 * Features:
 * - 75+ Comprehensive FAQs across 10 Domains (Shopping, Banking, Tech, Healthcare, Food, Travel, etc.)
 * - Stop-word filtering to prevent false matches on generic words ("how", "can", "i")
 * - Multi-level matching: Exact match -> Keyword phrase match -> Meaningful token TF-IDF similarity
 * - Conversational Intent Recognition
 * - Domain-aware intelligent suggestions
 */

export const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 
  'by', 'can', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 
  'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 
  'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 
  'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 
  'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 
  'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 
  'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 
  'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 
  'why', 'will', 'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves'
])

export const CONVERSATIONAL_RESPONSES = {
  closure: "You're welcome! Glad I could help you today. Have a wonderful day ahead! Feel free to ask anytime if you need help with Shopping, Banking, Tech, Healthcare, Travel, Education, or anything else. 💖",
  affirmation: "Sure! What else would you like to know? You can ask me about Shopping & Orders 🛒, Banking 🏦, Healthcare 🏥, Technology 💻, Food Delivery 🍔, Travel ✈️, Career 💼, or Admissions 🎓!",
  acknowledgment: "Great! Let me know if you have any questions about orders, payments, accounts, health services, or travel. I'm always here 24/7! 😊",
  gratitude: "You're very welcome! 😊 I'm always happy to help. Let me know if you need anything else across any of our 10 support topics!",
  how_are_you: "I'm doing great and running smoothly, thank you for asking! 😊 Ready to help you with any questions. How can I brighten your day?",
  greeting: "Hello friend! 👋 I'm AIRA, your AI Responsive Assistant. How can I assist you today? You can ask me about Shopping, Banking, Healthcare, Tech Support, Travel, Food, or Admissions!",
  farewell: "Goodbye! 👋 Wishing you a fantastic day ahead. Feel free to come back whenever you have questions! ✨",
  identity: "I am AIRA (AI Responsive Assistant)! ✨ I can provide instant, accurate answers across 10 domains: E-commerce & Shopping 🛒, Banking 🏦, Healthcare 🏥, Tech Support 💻, Food Delivery 🍔, Travel ✈️, Public Services 🏛️, Career 💼, Education 🎓, and General Help 💬!"
}

export function checkClientIntent(text) {
  if (!text) return null
  const cleaned = text.trim().toLowerCase().replace(/[!?,.]+$/, '').trim()

  // 1. Closures & Negations
  if (
    /^(no(\s+no)+|nothing\s*else|no\s*nothing.*|no\s*thanks|no\s*thank\s*you|nothing\s*more|that'?s\s*all|that\s*is\s*all|that'?s\s*it|that\s*is\s*it|all\s*good|i'?m\s*good|i\s*am\s*good|all\s*set|no\s*more|no\s*need|not\s*now|not\s*really|no\s*questions?|none|nope|nah|nothing)$/i.test(cleaned)
  ) {
    return CONVERSATIONAL_RESPONSES.closure
  }

  // 2. Affirmations
  if (/^(yes|yeah|yep|yup|sure|of\s*course|definitely|absolutely|please|go\s*ahead)$/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.affirmation
  }

  // 3. Acknowledgments
  if (/^(ok|okay|k|okk|okey|alright|got\s*it|fine|cool|great|nice|perfect|done|understood|i\s*see|noted|clear)$/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.acknowledgment
  }

  // 4. Gratitude
  if (/\b(thank\s*you|thanks|thankyou|thx|thnx|ty|tysm|appreciate\s*it|thank\s*u|grateful|many\s*thanks|thanks\s*a\s*lot|thank\s*you\s*so\s*much)\b/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.gratitude
  }

  // 5. How are you
  if (/\b(how\s*are\s*you|how\s*r\s*u|how\s*are\s*you\s*doing|how\s*is\s*it\s*going|how\s*do\s*you\s*do)\b/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.how_are_you
  }

  // 6. Greetings
  if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy|hola|yo|sup|what'?s\s*up)$/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.greeting
  }

  // 7. Farewells
  if (/\b(bye|goodbye|see\s*you|cya|take\s*care|good\s*night|catch\s*you\s*later|have\s*a\s*(good|nice|great)\s*day)\b/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.farewell
  }

  // 8. Identity & Help
  if (/\b(who\s*are\s*you|what\s*is\s*your\s*name|what\s*can\s*you\s*do|what\s*do\s*you\s*do|help\s*me|guide\s*me)\b/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.identity
  }

  return null
}

export const LOCAL_FAQS = [
  // ─── E-COMMERCE & SHOPPING ────────────────────────────────────────────────
  {
    id: 21,
    category: "E-commerce",
    question: "How can I place an order?",
    answer: "Browse products, click Add to Cart, proceed to checkout, enter your shipping address, select a payment method, and click Place Order to confirm your purchase.",
    keywords: ["place order", "how to buy", "buy item", "order product", "checkout item", "purchase online", "make order"]
  },
  {
    id: 22,
    category: "E-commerce",
    question: "How can I track my order and where is my package?",
    answer: "Go to My Orders in your account, select the item, and tap Track Package to view real-time courier GPS updates, live shipment status, and expected delivery date.",
    keywords: ["track order", "where is my order", "where is my package", "track package", "order status", "shipment tracking", "track courier", "where is package", "when will order arrive"]
  },
  {
    id: 23,
    category: "E-commerce",
    question: "How can I cancel my order or change delivery address?",
    answer: "You can cancel your order directly from My Orders as long as the item has not been packed or dispatched from the warehouse.",
    keywords: ["cancel order", "modify order", "change delivery address", "stop shipment", "cancel item", "change shipping address"]
  },
  {
    id: 24,
    category: "E-commerce",
    question: "What happens if my order is delayed or lost?",
    answer: "If your delivery window has passed, go to My Orders and tap 'Report Delay' to trigger an immediate courier trace or claim a replacement/refund.",
    keywords: ["order delayed", "late package", "lost parcel", "order not arrived", "delayed shipping", "late order"]
  },
  {
    id: 25,
    category: "E-commerce",
    question: "How long does delivery take and is express shipping available?",
    answer: "Standard delivery typically takes 3 to 5 business days. Express 1-2 day fast delivery is available at checkout for eligible postal codes.",
    keywords: ["delivery time", "how long delivery", "express shipping", "fast delivery", "shipping days", "delivery speed"]
  },
  {
    id: 26,
    category: "E-commerce",
    question: "How can I return my order or request a refund?",
    answer: "To return an item: Go to My Orders, select the product, click Return/Exchange, choose your reason, and schedule a pickup. Refunds are initiated immediately once picked up.",
    keywords: ["return order", "return product", "how to return", "request refund", "return policy", "exchange product", "return item", "refund order", "damaged return", "send back item"]
  },
  {
    id: 27,
    category: "E-commerce",
    question: "How long does a refund take to credit to my account?",
    answer: "Approved refunds reflect in 24–48 hours for UPI and wallets, and 3–5 business days for Credit/Debit Cards and bank accounts.",
    keywords: ["refund status", "how long refund", "refund money", "when refund credited", "check refund", "refund time"]
  },
  {
    id: 28,
    category: "E-commerce",
    question: "What payment methods are accepted and is Cash on Delivery available?",
    answer: "We accept Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD) for eligible pincodes.",
    keywords: ["payment methods", "pay with upi", "cash on delivery", "cod available", "credit card payment", "accepted payments"]
  },
  {
    id: 29,
    category: "E-commerce",
    question: "Money was deducted but my order failed",
    answer: "If money was debited for a failed order, your bank will automatically reverse the transaction within 3–5 business days. You can also share the UTR reference with support for instant verification.",
    keywords: ["payment failed", "money deducted order failed", "failed transaction", "payment error", "money debited order failed", "transaction failed"]
  },
  {
    id: 30,
    category: "E-commerce",
    question: "How can I apply a promo code or discount coupon?",
    answer: "Enter your promo code in the 'Apply Coupon' box on the checkout payment screen before placing your order to claim instant discounts.",
    keywords: ["promo code", "discount coupon", "apply coupon", "voucher code", "discount code"]
  },

  // ─── BANKING & FINANCE ───────────────────────────────────────────────────
  {
    id: 31,
    category: "Banking",
    question: "How can I open a bank account and what documents are required?",
    answer: "You can open an account online in minutes via Video KYC or at a branch. Documents required: Aadhaar Card, PAN Card, address proof, and passport-size photographs.",
    keywords: ["open bank account", "account opening", "documents needed bank", "open savings account", "new bank account"]
  },
  {
    id: 32,
    category: "Banking",
    question: "How do I block my lost debit card?",
    answer: "To block a lost or stolen debit card immediately: Open your Mobile Banking app > Card Controls > Block Card, or send an SMS 'BLOCK' to your bank hotline, or call the 24/7 card emergency helpline.",
    keywords: ["block debit card", "lost debit card", "stolen card", "card lost", "lock card", "card block", "block my lost debit card", "lost my debit card help", "block card", "debit card stolen"]
  },
  {
    id: 33,
    category: "Banking",
    question: "How can I change or reset my ATM PIN?",
    answer: "You can generate or reset your ATM PIN via Mobile Banking under 'Manage Card > Generate Green PIN' or by inserting your card into any bank ATM and verifying via OTP.",
    keywords: ["change atm pin", "reset pin", "forgot pin", "generate pin", "pin reset", "change pin", "reset atm pin"]
  },
  {
    id: 34,
    category: "Banking",
    question: "How can I check my account balance and download bank statement?",
    answer: "Check balance anytime via Mobile Banking, UPI app, Missed Call banking, or ATM. To download PDF bank statements, go to Accounts > e-Statements and select your date range.",
    keywords: ["check balance", "account balance", "download statement", "bank statement pdf", "mini statement", "view balance", "check bank balance"]
  },
  {
    id: 35,
    category: "Banking",
    question: "How can I transfer money using UPI, NEFT, RTGS, or IMPS?",
    answer: "Log into your banking or UPI app, select 'Transfer Money', enter the recipient's UPI ID or Account Number + IFSC code, enter amount, and authorize with your secure PIN.",
    keywords: ["transfer money", "upi transfer", "neft", "rtgs", "imps", "send money", "bank transfer", "money transfer"]
  },
  {
    id: 36,
    category: "Banking",
    question: "What if a banking transaction failed but money was debited?",
    answer: "Failed money transfers are auto-reversed back into your account within 24 to 48 hours as per banking network rules. If not refunded after 48 hours, raise a dispute with the transaction reference.",
    keywords: ["transaction failed money debited", "failed transfer refund", "failed payment auto reversal", "money deducted not received"]
  },
  {
    id: 37,
    category: "Banking",
    question: "How can I update my mobile number, address, or KYC?",
    answer: "Update KYC online via Video KYC in your banking app, or submit a Re-KYC request with valid ID and address proof at your nearest home branch.",
    keywords: ["update kyc", "change mobile number bank", "update address bank", "kyc verification", "re kyc"]
  },
  {
    id: 38,
    category: "Banking",
    question: "How can I report an unauthorized or fraudulent transaction?",
    answer: "Immediately freeze your account in the banking app, block all cards, and call the 24/7 National Cyber/Bank Fraud Hotline within 24 hours to secure your funds.",
    keywords: ["unauthorized transaction", "fraud", "money stolen", "report fraud", "scam transaction", "bank fraud", "unauthorized charge"]
  },

  // ─── HEALTHCARE & MEDICAL ─────────────────────────────────────────────────
  {
    id: 39,
    category: "Healthcare",
    question: "How can I book a doctor appointment?",
    answer: "You can book an appointment online via our patient portal, select your specialist and preferred time slot, or call the hospital appointment desk at +1-800-555-0199.",
    keywords: ["book appointment", "cancel appointment", "reschedule appointment", "doctor appointment", "find doctor", "specialist appointment", "book a doctor appointment", "see doctor", "hospital appointment"]
  },
  {
    id: 40,
    category: "Healthcare",
    question: "What are the hospital OPD and patient visiting hours?",
    answer: "OPD consultations operate Monday through Saturday from 8:00 AM to 6:00 PM. Inpatient visiting hours are daily between 4:00 PM and 7:00 PM.",
    keywords: ["visiting hours", "opd timings", "hospital hours", "patient visit time", "doctor timings", "clinic hours"]
  },
  {
    id: 41,
    category: "Healthcare",
    question: "How can I get my lab test reports?",
    answer: "Log into the patient portal with your Mobile Number or Patient ID to view, download, and print your diagnostic pathology and radiology lab reports in PDF format.",
    keywords: ["lab reports", "test results", "download report", "blood test report", "diagnostic reports", "get lab test reports", "medical reports", "xray report"]
  },
  {
    id: 42,
    category: "Healthcare",
    question: "Is ambulance and emergency service available?",
    answer: "Yes, our Emergency Trauma Care Center operates 24/7 with immediate GPS-tracked ambulance dispatch. For emergencies, call the emergency hotline immediately.",
    keywords: ["ambulance", "emergency service", "casualty", "urgent medical help", "ambulance emergency service", "call ambulance", "emergency doctor"]
  },
  {
    id: 43,
    category: "Healthcare",
    question: "What documents should I bring to my appointment?",
    answer: "Please bring a valid Government Photo ID, Health Insurance Card, previous medical history/prescriptions, and recent diagnostic lab reports.",
    keywords: ["documents hospital appointment", "what to bring hospital", "medical records", "hospital papers"]
  },

  // ─── SOFTWARE & TECHNOLOGY ────────────────────────────────────────────────
  {
    id: 46,
    category: "Software / Technology",
    question: "I forgot my password. How do I reset it?",
    answer: "Click 'Forgot Password' on the login screen, enter your registered email address or mobile number, and follow the secure password reset link sent to your inbox.",
    keywords: ["forgot password", "cant login", "reset password", "lost password", "password recovery", "cant remember password", "password not working", "help reset password", "get password back", "change password", "recover account"]
  },
  {
    id: 47,
    category: "Software / Technology",
    question: "How do I enable two-factor authentication (2FA)?",
    answer: "Go to Account Settings > Security > Two-Factor Authentication (2FA), click Enable, and scan the QR code using Google Authenticator, Microsoft Authenticator, or Authy.",
    keywords: ["enable 2fa", "two factor authentication", "enable two factor authentication", "2fa setup", "authenticator app", "security code"]
  },
  {
    id: 48,
    category: "Software / Technology",
    question: "How do I clear browser cache and cookies?",
    answer: "Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac) in your browser, check 'Cookies and other site data' and 'Cached images and files', then click Clear Data.",
    keywords: ["clear cache", "clear cookies", "clear browser cache cookies", "browser cache", "delete cache", "refresh browser"]
  },

  // ─── FOOD DELIVERY ────────────────────────────────────────────────────────
  {
    id: 44,
    category: "Food Delivery",
    question: "Why is my food order delayed?",
    answer: "Delays usually occur during restaurant peak kitchen preparation times or heavy road traffic. You can track your rider in real time on the order screen or tap Help for live support.",
    keywords: ["food delayed", "why food order delayed", "late food delivery", "food late", "where is my food", "food delivery late", "rider late", "delayed meal"]
  },
  {
    id: 45,
    category: "Food Delivery",
    question: "My food arrived cold and damaged",
    answer: "Tap 'Help' on your active order screen, upload a quick photo of the damaged or spilled item, and our system will issue an instant refund or replacement credit.",
    keywords: ["cold food", "food arrived cold damaged", "spilled food", "damaged food", "wrong food delivered", "missing food item", "bad food"]
  },

  // ─── TRAVEL & FLIGHTS ─────────────────────────────────────────────────────
  {
    id: 49,
    category: "Travel",
    question: "How can I book a flight ticket?",
    answer: "Choose your departure and arrival destinations, select travel dates, enter passenger details, complete payment, and your e-ticket will be emailed instantly.",
    keywords: ["book flight", "book flight ticket", "flight booking", "buy air ticket", "book plane ticket", "reserve flight"]
  },
  {
    id: 50,
    category: "Travel",
    question: "How can I cancel my ticket and get a refund?",
    answer: "Go to My Trips, select your flight or train booking, click 'Cancel Ticket', review cancellation charges, and confirm. The refund will be credited back to your original payment method.",
    keywords: ["cancel ticket refund", "cancel ticket get refund", "cancel flight ticket", "cancel train ticket", "ticket cancellation", "flight refund"]
  },
  {
    id: 51,
    category: "Travel",
    question: "What are the baggage allowance rules?",
    answer: "Standard domestic flights allow 15 kg of check-in baggage and 7 kg of cabin hand luggage per passenger. Additional baggage can be pre-purchased at discounted rates online.",
    keywords: ["baggage allowance", "baggage allowance rules", "luggage weight", "cabin bag limit", "extra baggage cost", "carry on weight"]
  },

  // ─── PUBLIC SERVICES ──────────────────────────────────────────────────────
  {
    id: 52,
    category: "Public Services",
    question: "How can I apply for official government certificates?",
    answer: "Log into your state public service portal (e-District), select the certificate required (Birth, Caste, Income, Domicile), upload required ID proofs, and track your application status online.",
    keywords: ["apply government certificate", "official government certificates", "birth certificate", "caste certificate", "income certificate", "domicile certificate", "government portal"]
  },
  {
    id: 53,
    category: "Public Services",
    question: "How can I file a public grievance or complaint?",
    answer: "You can submit citizen grievances on the Central/State Public Grievance portal (CPGRAMS) to receive an official tracking registration number for time-bound resolution.",
    keywords: ["public grievance", "file public grievance complaint", "citizen complaint", "consumer grievance", "government complaint"]
  },

  // ─── CAREER & JOBS ────────────────────────────────────────────────────────
  {
    id: 54,
    category: "Career",
    question: "How can I create an impressive resume?",
    answer: "Structure your resume cleanly: Contact Info, Strong Summary, Quantified Work Experience (STAR method), Key Technical Skills, Projects, and Education. Keep it within 1–2 pages in ATS-friendly format.",
    keywords: ["create resume", "impressive resume", "cv format", "build cv", "resume tips", "how to write resume", "ats resume"]
  },
  {
    id: 55,
    category: "Career",
    question: "How can I prepare for job interviews?",
    answer: "Research the company, practice STAR method for behavioral questions, review core domain fundamentals, prepare thoughtful questions for the interviewer, and conduct mock interviews.",
    keywords: ["prepare job interviews", "interview preparation", "job interview tips", "crack interview", "interview questions", "interview practice"]
  },
  {
    id: 56,
    category: "Career",
    question: "How can I find internships?",
    answer: "Explore college placement cells, LinkedIn Jobs, and platforms like Internshala. Tailor your resume to the job description and showcase active projects or certifications.",
    keywords: ["find internships", "internship opportunity", "summer internship", "get internship", "apply internship", "student internship"]
  },

  // ─── EDUCATION & ADMISSIONS ───────────────────────────────────────────────
  {
    id: 1,
    category: "Education",
    question: "How can I apply for admission?",
    answer: "You can apply for admission through the official online admission portal by filling out the online application form, uploading academic transcripts, and paying the registration fee.",
    keywords: ["apply admission", "how to apply", "want admission", "college registration", "application process", "enroll college", "admission portal", "apply college"]
  },
  {
    id: 2,
    category: "Education",
    question: "What are the admission requirements and eligibility criteria?",
    answer: "For undergraduate courses, minimum 50% aggregate marks in 10+2 is required. For postgraduate programs, a recognized bachelor's degree with at least 50% aggregate is mandatory.",
    keywords: ["eligibility criteria", "admission requirements", "marks needed", "min marks admission", "who can apply", "qualification needed", "eligibility admission"]
  },
  {
    id: 3,
    category: "Education",
    question: "What documents are required for admission?",
    answer: "Required documents include 10th & 12th mark sheets, Transfer/Migration Certificate, Government Photo ID proof (Aadhaar/Passport), Passport-size photographs, and Entrance Scorecard if applicable.",
    keywords: ["admission documents", "documents needed", "papers required", "what certificates needed", "transcripts", "checklist admission", "documents admission"]
  },
  {
    id: 11,
    category: "Education",
    question: "What is the fee structure and how can I pay?",
    answer: "Detailed semester fee breakdowns are published in the official prospectus. Fees can be paid online via Net Banking, UPI, Credit/Debit Card, or via Demand Draft at the accounts desk.",
    keywords: ["fee structure", "tuition fee", "college fee", "how to pay fee", "installment fee", "pay online fee", "cost of course"]
  },
  {
    id: 12,
    category: "Education",
    question: "When does the semester begin and when are semester exams conducted?",
    answer: "Autumn semesters commence in August with final exams held in December. Spring semesters start in January with exams conducted in May.",
    keywords: ["semester start", "when semester begins", "exam dates", "semester exams", "finals date", "when are exams", "exam timetable"]
  },
  {
    id: 17,
    category: "Education",
    question: "Is hostel accommodation available and how to apply?",
    answer: "Yes, fully furnished hostels with mess facilities, Wi-Fi, and 24/7 security are available for male and female students. Annual fees range from ₹60,000 to ₹80,000.",
    keywords: ["hostel accommodation", "hostel fee", "dormitory", "hostel room", "mess fee", "apply hostel", "is hostel available"]
  },
  {
    id: 26,
    category: "Education",
    question: "What is the placement record and campus recruitment?",
    answer: "Our institution maintains a 90%+ placement rate with leading recruiters across tech, finance, and consulting, with average packages of ₹6.5 LPA and highest packages up to ₹28 LPA.",
    keywords: ["placement record", "campus placement", "salary package", "highest package", "top recruiters", "job placement"]
  },

  // ─── GENERAL SUPPORT ──────────────────────────────────────────────────────
  {
    id: 57,
    category: "General Support",
    question: "How can I contact customer support or speak to a human agent?",
    answer: "You can reach our 24/7 customer care via live chat, email support@service.com, or call our toll-free customer helpline at +1-800-555-0199.",
    keywords: ["contact customer support", "speak to human agent", "customer care number", "talk to support", "customer service phone", "helpline number"]
  },
  {
    id: 58,
    category: "General Support",
    question: "What are your customer support operating hours?",
    answer: "Our digital AI assistant AIRA is available 24/7. Human support representatives are online Monday through Saturday from 8:00 AM to 8:00 PM.",
    keywords: ["support operating hours", "customer support hours", "helpline timings", "when is support open"]
  }
]

/**
 * Tokenize text into words, stripping punctuation
 */
function tokenise(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)
}

/**
 * Extract meaningful content tokens (ignoring common English stop words)
 */
function extractMeaningfulTokens(text) {
  const tokens = tokenise(text)
  const meaningful = tokens.filter((t) => !STOP_WORDS.has(t) && t.length > 1)
  return meaningful.length > 0 ? meaningful : tokens
}

/**
 * Advanced Multi-Domain Semantic & Keyword Matcher
 */
export function findBestMatch(query, faqs = LOCAL_FAQS, threshold = 0.30) {
  if (!query || !query.trim()) return null

  // 1. Check conversational intent (greetings, thanks, closers, identity)
  const intentResponse = checkClientIntent(query)
  if (intentResponse) {
    return {
      faq: {
        question: query,
        answer: intentResponse,
        category: "General Support",
        id: "intent"
      },
      confidence: 100,
      isIntent: true
    }
  }

  const cleanQuery = query.trim().toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
  const queryWords = extractMeaningfulTokens(query)
  const querySet = new Set(queryWords)

  let bestFaq = null
  let bestScore = 0

  for (const faq of faqs) {
    const faqQuestionClean = faq.question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
    const faqMeaningful = extractMeaningfulTokens(faq.question)
    const faqTokensSet = new Set(faqMeaningful)

    let score = 0

    // A. Check for exact question or keyword phrase substring match (Highest priority)
    if (faqQuestionClean.includes(cleanQuery) || cleanQuery.includes(faqQuestionClean)) {
      score = Math.max(score, 0.95)
    }

    // Check keyword phrases
    for (const kw of faq.keywords || []) {
      const kwClean = kw.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
      if (cleanQuery.includes(kwClean) || kwClean.includes(cleanQuery)) {
        // High confidence phrase match
        score = Math.max(score, 0.90)
      }
    }

    // B. Token overlap on meaningful content words (ignoring "how", "can", "i", etc.)
    const questionMatches = faqMeaningful.filter((w) => querySet.has(w)).length
    const questionScore = questionMatches / Math.max(faqMeaningful.length, queryWords.length, 1)

    // Keywords token overlap
    const keywordTokens = (faq.keywords || []).flatMap((k) => extractMeaningfulTokens(k))
    const keywordMatches = keywordTokens.filter((w) => querySet.has(w)).length
    const keywordScore = keywordMatches / Math.max(keywordTokens.length / 3, queryWords.length, 1)

    const tokenScore = questionScore * 0.5 + Math.min(keywordScore, 1) * 0.5

    // Total combined score
    const finalScore = Math.max(score, tokenScore)

    if (finalScore > bestScore) {
      bestScore = finalScore
      bestFaq = faq
    }
  }

  // If score is below threshold, return null (do NOT return a false random question!)
  if (bestScore < threshold || !bestFaq) {
    return null
  }

  return {
    faq: bestFaq,
    confidence: Math.round(Math.min(bestScore, 1) * 100),
  }
}
