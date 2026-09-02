/**
 * Client-side FAQ matcher with comprehensive Conversational Intent recognition.
 * Handles "no nothing else", "ok", "thank you", "hello", "goodbye", "how are you", etc.
 */

export const CONVERSATIONAL_RESPONSES = {
  closure: "Alright! Glad I could help you today. Have a wonderful day ahead and all the best with your studies! Feel free to ask anytime if anything else comes up. 🎓",
  affirmation: "Sure! What else would you like to know about our college? You can ask about admissions, courses, fees, or hostel facilities.",
  acknowledgment: "Great! Feel free to ask if you have any other questions about admissions, fees, hostel, or exams! 😊",
  gratitude: "You're very welcome! 😊 Feel free to ask if you have any more questions about campus life, admissions, or courses.",
  how_are_you: "I'm doing great, thank you for asking! 😊 Ready to help you with any college-related questions. How can I assist you today?",
  greeting: "Hello! 👋 I'm your Campus Assistant. How can I help you with admissions, fees, timings, or college facilities today?",
  farewell: "Goodbye! 👋 Wishing you great success with your academic journey. Come back anytime you have questions! 🎓",
  identity: "I am your official Campus FAQ Assistant! 🎓 I can provide quick answers on admissions, courses, fee structures, scholarships, college timings, hostel facilities, and placements."
}

export function checkClientIntent(text) {
  if (!text) return null
  const cleaned = text.trim().toLowerCase().replace(/[!?,.]+$/, '').trim()

  // 1. Closures & Negations ("no", "no no", "nothing else", "no thanks", "that's all", "all good", "i'm good")
  if (
    /^(no(\s+no)+|nothing\s*else|no\s*nothing.*|no\s*thanks|no\s*thank\s*you|nothing\s*more|that'?s\s*all|that\s*is\s*all|that'?s\s*it|that\s*is\s*it|all\s*good|i'?m\s*good|i\s*am\s*good|all\s*set|no\s*more|no\s*need|not\s*now|not\s*really|no\s*questions?|no\s*further\s*questions?|none|nope|nah|no|nothing)$/i.test(cleaned)
  ) {
    return CONVERSATIONAL_RESPONSES.closure
  }

  // 2. Affirmations ("yes", "sure", "of course", "definitely")
  if (/^(yes|yeah|yep|yup|sure|of\s*course|definitely|absolutely|please|go\s*ahead)$/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.affirmation
  }

  // 3. Acknowledgments ("ok", "okay", "alright", "got it", "fine", "cool", "great")
  if (/^(ok|okay|k|okk|okey|alright|got\s*it|fine|cool|great|nice|perfect|done|understood|i\s*see|noted|clear)$/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.acknowledgment
  }

  // 4. Gratitude ("thank you", "thanks", "thankyou", "thx", "appreciate it")
  if (/\b(thank\s*you|thanks|thankyou|thx|thnx|ty|tysm|appreciate\s*it|thank\s*u|grateful|many\s*thanks|thanks\s*a\s*lot|thank\s*you\s*so\s*much)\b/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.gratitude
  }

  // 5. How are you
  if (/\b(how\s*are\s*you|how\s*r\s*u|how\s*are\s*you\s*doing|how\s*is\s*it\s*going|how\s*do\s*you\s*do)\b/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.how_are_you
  }

  // 6. Greetings ("hello", "hi", "hey", "good morning")
  if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy|hola|yo|sup|what'?s\s*up)$/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.greeting
  }

  // 7. Farewells ("bye", "goodbye", "see you", "take care")
  if (/\b(bye|goodbye|see\s*you|cya|take\s*care|good\s*night|catch\s*you\s*later|have\s*a\s*(good|nice|great)\s*day)\b/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.farewell
  }

  // 8. Identity & Help
  if (/\b(who\s*are\s*you|what\s*is\s*your\s*name|what\s*can\s*you\s*do|help|guide\s*me)\b/i.test(cleaned)) {
    return CONVERSATIONAL_RESPONSES.identity
  }

  return null
}

export const LOCAL_FAQS = [
  {
    id: 1,
    category: "admission",
    question: "How can I apply for admission?",
    answer: "You can apply for admission through the official admission portal by completing the application form, uploading the required documents, and paying the application fee.",
    keywords: ["apply", "admission", "enroll", "registration", "portal"]
  },
  {
    id: 2,
    category: "admission",
    question: "What are the college admission requirements?",
    answer: "For undergraduate programs, candidates must have completed 10+2 with a minimum of 50% aggregate marks. For postgraduate courses, a recognized bachelor's degree with at least 50% aggregate is required.",
    keywords: ["requirements", "eligibility", "criteria", "qualification", "marks"]
  },
  {
    id: 3,
    category: "admission",
    question: "What documents are required for admission?",
    answer: "Required documents include: (1) 10th and 12th mark sheets and certificates, (2) Transfer or Migration Certificate, (3) Government-issued photo ID proof, (4) Passport-size photographs, and (5) Category certificate if applicable.",
    keywords: ["documents", "required", "certificates", "papers", "transcripts"]
  },
  {
    id: 6,
    category: "fees",
    question: "What is the fee structure?",
    answer: "The annual tuition fee ranges from ₹45,000 to ₹1,20,000 depending on the program. Detailed semester-wise fee breakdowns are available in the prospectus.",
    keywords: ["fee", "tuition", "cost", "charge", "structure", "amount"]
  },
  {
    id: 10,
    category: "timings",
    question: "What are the college timings?",
    answer: "The college generally operates from 9:00 AM to 5:00 PM on working days (Monday to Saturday).",
    keywords: ["timings", "hours", "time", "working hours", "schedule"]
  },
  {
    id: 17,
    category: "library",
    question: "What are the library timings?",
    answer: "The Central Library is open from 8:00 AM to 8:00 PM on weekdays, and from 9:00 AM to 1:00 PM on Sundays.",
    keywords: ["library", "books", "library timings", "library hours"]
  },
  {
    id: 18,
    category: "hostel",
    question: "Is hostel accommodation available?",
    answer: "Yes, separate residential hostel accommodations with furnished rooms, mess facilities, Wi-Fi, and 24/7 security are available for male and female students.",
    keywords: ["hostel", "accommodation", "room", "dormitory", "stay"]
  },
  {
    id: 21,
    category: "scholarships",
    question: "How can I apply for a scholarship?",
    answer: "Eligible candidates can apply for merit-based and need-based scholarships via the Student Welfare portal before September 30th.",
    keywords: ["scholarship", "financial aid", "merit", "apply scholarship"]
  },
  {
    id: 26,
    category: "placement",
    question: "What is the placement record?",
    answer: "The college boasts a 90%+ placement rate with an average salary package of ₹6.5 LPA and a highest domestic package of ₹28 LPA.",
    keywords: ["placement", "job", "package", "salary", "recruiters"]
  }
]

function tokenise(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean)
}

function overlapScore(a, b) {
  const setA = new Set(a)
  return b.filter((w) => setA.has(w)).length
}

export function findBestMatch(query, faqs = LOCAL_FAQS, threshold = 0.15) {
  if (!query || !query.trim()) return null

  // 1. Check intent
  const intentResponse = checkClientIntent(query)
  if (intentResponse) {
    return {
      faq: {
        question: query,
        answer: intentResponse,
        category: "general",
        id: "intent"
      },
      confidence: 100,
      isIntent: true
    }
  }

  const queryTokens = tokenise(query)
  let best = null
  let bestScore = 0

  for (const faq of faqs) {
    const questionTokens = tokenise(faq.question)
    const keywordTokens = (faq.keywords || []).flatMap((k) => tokenise(k))
    const total = queryTokens.length || 1

    const qHits = overlapScore(queryTokens, questionTokens)
    const kHits = overlapScore(queryTokens, keywordTokens)
    const score = (kHits * 3 + qHits * 2) / (total * 5)

    if (score > bestScore) {
      bestScore = score
      best = faq
    }
  }

  if (bestScore < threshold) return null

  return {
    faq: best,
    confidence: Math.round(Math.min(bestScore, 1) * 100),
  }
}
