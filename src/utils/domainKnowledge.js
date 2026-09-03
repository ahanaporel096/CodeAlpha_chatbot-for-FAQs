/**
 * Comprehensive Multi-Domain Knowledge & Contextual Suggestion Engine for AIRA.
 * Provides in-depth, structured advice when users ask for recommendations, tips, or follow-up insights.
 */

export const DOMAIN_SUGGESTIONS_GUIDES = {
  'Education': {
    title: 'Education, Admissions & Campus Placements',
    emoji: '🎓',
    tips: [
      {
        heading: '1. Academic Consistency (CGPA)',
        desc: 'Maintain a 7.5+ CGPA to clear initial screening cutoffs for tier-1 campus recruiters.'
      },
      {
        heading: '2. Real-World Project Portfolio',
        desc: 'Build 2–3 practical projects with live URLs, clear documentation, and clean GitHub repositories.'
      },
      {
        heading: '3. Core Fundamentals & Coding Prep',
        desc: 'Master Data Structures, Algorithms, OOP concepts, Database Management, and System Architecture.'
      },
      {
        heading: '4. Behavioral & STAR Interview Prep',
        desc: 'Structure past project stories using Situation, Task, Action, Result (STAR) to stand out during HR and technical rounds.'
      },
      {
        heading: '5. Early Internship Experience',
        desc: 'Apply for summer internships before final year to gain real-world industry experience and Pre-Placement Offers (PPOs).'
      }
    ],
    nextSteps: ['How can I create an impressive resume?', 'How can I prepare for job interviews?', 'What are the admission requirements?']
  },

  'E-commerce': {
    title: 'Smart Shopping, Tracking & Hassle-Free Returns',
    emoji: '🛒',
    tips: [
      {
        heading: '1. Always Check Seller Ratings',
        desc: 'Buy from verified sellers with at least 4+ star ratings and recent customer photo reviews.'
      },
      {
        heading: '2. Keep Original Packaging for Returns',
        desc: 'Retain price tags, product boxes, and invoices for at least 7–14 days in case you need a free return or exchange.'
      },
      {
        heading: '3. Maximize Coupon & Bank Discounts',
        desc: 'Apply promo coupon codes and use partner credit/debit cards during checkout for instant cashback.'
      },
      {
        heading: '4. Track Shipments Live',
        desc: 'Use the courier tracking link in My Orders to follow delivery milestones and OTP verification.'
      }
    ],
    nextSteps: ['How can I return my order?', 'How can I track my order?', 'What payment methods are accepted?']
  },

  'Banking': {
    title: 'Banking Security, UPI & Financial Best Practices',
    emoji: '🏦',
    tips: [
      {
        heading: '1. Instant Card Freeze Controls',
        desc: 'Enable or disable international/online transactions inside your mobile banking app under Card Controls.'
      },
      {
        heading: '2. Protect PIN & OTP at All Times',
        desc: 'Never share OTPs, CVVs, or UPI PINs with anyone. Banks will never ask for your PIN over calls or SMS.'
      },
      {
        heading: '3. Monitor Regular Statements',
        desc: 'Download monthly e-statements to spot unauthorized charges early and maintain a healthy credit score.'
      },
      {
        heading: '4. Set Daily Transaction Limits',
        desc: 'Set custom daily spending limits for UPI and contactless tap-and-pay transactions to prevent misuse.'
      }
    ],
    nextSteps: ['How do I block my lost debit card?', 'How can I change or reset my ATM PIN?', 'How can I check my account balance?']
  },

  'Healthcare': {
    title: 'Medical Appointments, Reports & Health Guidance',
    emoji: '🏥',
    tips: [
      {
        heading: '1. Prepare Past Medical Records',
        desc: 'Bring previous prescriptions, allergy history, and recent blood test reports to your consultation.'
      },
      {
        heading: '2. Write Down Your Symptoms',
        desc: 'Note when symptoms began and their frequency so your physician can make a precise diagnosis.'
      },
      {
        heading: '3. Access Digital Lab Reports',
        desc: 'Download diagnostic reports directly from the patient portal using your registered mobile number.'
      },
      {
        heading: '4. Keep Emergency Hotlines Handy',
        desc: 'Save local hospital ambulance and 24/7 trauma emergency contact numbers for quick dispatch.'
      }
    ],
    nextSteps: ['How can I book a doctor appointment?', 'How can I get my lab test reports?', 'What are the hospital visiting hours?']
  },

  'Software / Technology': {
    title: 'Account Security, Password Hygiene & Tech Troubleshooting',
    emoji: '💻',
    tips: [
      {
        heading: '1. Use a Secure Password Manager',
        desc: 'Generate unique 14+ character passwords containing letters, numbers, and symbols for each online account.'
      },
      {
        heading: '2. Turn On Two-Factor Authentication (2FA)',
        desc: 'Protect logins with authenticator apps (Google Authenticator, Authy) instead of SMS OTPs.'
      },
      {
        heading: '3. Clear Browser Cache Regularly',
        desc: 'Resolve website loading glitches and outdated session states by clearing browser cache (Ctrl+Shift+Del).'
      },
      {
        heading: '4. Beware of Phishing Links',
        desc: 'Verify the exact URL domain before typing passwords or entering payment credentials.'
      }
    ],
    nextSteps: ['I forgot my password. How do I reset it?', 'How do I enable two-factor authentication (2FA)?', 'How do I clear browser cache and cookies?']
  },

  'Food Delivery': {
    title: 'Food Orders, Timely Delivery & Quality Assurance',
    emoji: '🍔',
    tips: [
      {
        heading: '1. Provide Clear Delivery Instructions',
        desc: 'Add landmark details, gate codes, and floor numbers in the delivery app to avoid rider delays.'
      },
      {
        heading: '2. Order Ahead During Peak Rush',
        desc: 'Order 30 minutes earlier during lunch (1–2 PM) and dinner (8–10 PM) when kitchens and traffic are busiest.'
      },
      {
        heading: '3. Instant Photo Verification for Refunds',
        desc: 'If food is spilled, cold, or incorrect, take a quick photo and submit it via Help for instant automated credit.'
      }
    ],
    nextSteps: ['Why is my food order delayed?', 'My food arrived cold and damaged', 'How can I contact customer support?']
  },

  'Travel': {
    title: 'Flight Booking, Luggage Rules & Travel Savings',
    emoji: '✈️',
    tips: [
      {
        heading: '1. Complete Web Check-In Early',
        desc: 'Web check-in opens 24–48 hours before departure. Pick your preferred seats and download mobile boarding passes.'
      },
      {
        heading: '2. Weigh Luggage at Home',
        desc: 'Avoid hefty excess baggage airport fees by weighing check-in bags (standard limit: 15kg domestic).'
      },
      {
        heading: '3. Check Cancellation Policies',
        desc: 'Choose free cancellation or travel insurance add-ons if your itinerary might change.'
      }
    ],
    nextSteps: ['How can I book a flight ticket?', 'How can I cancel my ticket and get a refund?', 'What are the baggage allowance rules?']
  },

  'Career': {
    title: 'Career Advancement, Resume Tips & Job Interviews',
    emoji: '💼',
    tips: [
      {
        heading: '1. Tailor Your Resume for Each Application',
        desc: 'Match keywords from the job description and keep your resume concise (1–2 pages) with quantifiable metrics.'
      },
      {
        heading: '2. Optimize Your LinkedIn Profile',
        desc: 'Add an engaging headline, detailed project descriptions, recommendations, and list top technical competencies.'
      },
      {
        heading: '3. Master Behavioral Questions',
        desc: 'Use the STAR technique (Situation, Task, Action, Result) to clearly demonstrate your problem-solving abilities.'
      },
      {
        heading: '4. Continuous Upskilling',
        desc: 'Earn recognized industry certifications and contribute to open-source or team projects.'
      }
    ],
    nextSteps: ['How can I create an impressive resume?', 'How can I prepare for job interviews?', 'How can I find internships?']
  },

  'Public Services': {
    title: 'Government Portals, Certificates & Grievance Resolution',
    emoji: '🏛️',
    tips: [
      {
        heading: '1. Keep Digital Copies of ID Proofs',
        desc: 'Maintain PDF copies of Aadhaar, PAN card, voter ID, and utility bills for online portal uploads.'
      },
      {
        heading: '2. Track Application Acknowledgments',
        desc: 'Save your application reference number to track live verification status on state e-District portals.'
      },
      {
        heading: '3. Official Grievance Portals',
        desc: 'File unresolved public utility or consumer complaints on CPGRAMS for guaranteed government response.'
      }
    ],
    nextSteps: ['How can I apply for official government certificates?', 'How can I file a public grievance or complaint?']
  },

  'General Support': {
    title: 'AIRA Assistant Support & Everyday Help',
    emoji: '💬',
    tips: [
      {
        heading: '1. 24/7 Instant Answers',
        desc: 'Ask AIRA questions on Shopping, Banking, Health, Tech, Food, Travel, Admissions, or Careers anytime.'
      },
      {
        heading: '2. Voice Search Support',
        desc: 'Tap the microphone icon in the input bar to ask questions via speech-to-text.'
      },
      {
        heading: '3. Direct Live Helpline',
        desc: 'For human escalation, connect with support desk at support@service.com or call +1-800-555-0199.'
      }
    ],
    nextSteps: ['How can I contact customer support?', 'What are your customer support operating hours?']
  }
}

/**
 * Checks if the user is asking for topic suggestions, recommendations, tips, or follow-up advice.
 */
export function matchSuggestionIntent(query, lastCategory = 'Education') {
  if (!query) return null
  const cleaned = query.trim().toLowerCase()

  const isSuggestionQuery =
    /\b(suggest|suggestion|suggestions|recommend|recommendation|tips|advice|guidance|what\s*(else|next|should\s*i\s*do)|tell\s*me\s*more|explain\s*(more|further)|more\s*about|best\s*practices|how\s*to\s*(succeed|prepare|improve))\b/i.test(
      cleaned
    ) ||
    /^(anything\s*(you\s*need\s*to\s*)?suggest.*|suggest.*|what\s*about\s*this.*|give\s*me\s*tips.*|tell\s*me\s*more.*|explain.*)$/i.test(
      cleaned
    )

  if (!isSuggestionQuery) return null

  // Determine target category: either from query or from last active conversation category
  let category = lastCategory || 'Education'
  if (/e-?commerce|shopping|order|buy|product|return|refund/i.test(cleaned)) category = 'E-commerce'
  else if (/bank|card|atm|pin|account|money|balance/i.test(cleaned)) category = 'Banking'
  else if (/health|doctor|appointment|hospital|medicine|report/i.test(cleaned)) category = 'Healthcare'
  else if (/tech|password|login|2fa|cache|software/i.test(cleaned)) category = 'Software / Technology'
  else if (/food|delivery|meal|rider|restaurant/i.test(cleaned)) category = 'Food Delivery'
  else if (/travel|flight|ticket|baggage|hotel/i.test(cleaned)) category = 'Travel'
  else if (/career|job|interview|resume|cv|internship/i.test(cleaned)) category = 'Career'
  else if (/certificate|government|grievance|public/i.test(cleaned)) category = 'Public Services'
  else if (/education|placement|admission|exam|college|course|hostel/i.test(cleaned)) category = 'Education'

  const guide = DOMAIN_SUGGESTIONS_GUIDES[category] || DOMAIN_SUGGESTIONS_GUIDES['Education']

  let response = `✨ Here are key suggestions and practical recommendations for **${guide.title}** ${guide.emoji}:\n\n`
  guide.tips.forEach((t) => {
    response += `📌 **${t.heading}**\n${t.desc}\n\n`
  })
  response += `💡 *Feel free to ask any specific follow-up question below, and I'll guide you step-by-step!*`

  return {
    answer: response,
    category,
    matchedQuestion: `Suggestions for ${guide.title}`,
    isMatched: true,
    confidence: 95
  }
}
