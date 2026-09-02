"""
AIRA — AI Responsive Assistant
Multi-Domain NLP FAQ Chatbot Engine
Uses TF-IDF Vectorization & Cosine Similarity across 10 service domains.
Supports dynamic thresholding, multi-domain category detection, and NLU conversational intents.
"""

import os
import re
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nlp_processor import preprocess_text

# ─── Configuration ─────────────────────────────────────────────────────────────
SIMILARITY_THRESHOLD = 0.25

FALLBACK_SUGGESTIONS = [
    {"label": "How can I return my order?", "category": "E-commerce"},
    {"label": "How do I reset my password?", "category": "Software / Technology"},
    {"label": "How do I block my debit card?", "category": "Banking"},
    {"label": "How can I book a doctor appointment?", "category": "Healthcare"},
    {"label": "When are semester exams conducted?", "category": "Education"},
]

FALLBACK_RESPONSE = (
    "I'm sorry, I couldn't find a reliable answer to that question in my multi-domain knowledge base. "
    "Try asking about education, shopping, banking, healthcare, food delivery, software, travel, careers, or customer support."
)

# ─── Conversational Intent Patterns ───────────────────────────────────────────
CONVERSATIONAL_INTENTS = [
    {
        "intent": "closure_and_negation",
        "patterns": [
            r"\b(no(\s+no)+|nothing\s*else|no\s*nothing.*|no\s*thanks|no\s*thank\s*you|nothing\s*more|that'?s\s*all|that\s*is\s*all|that'?s\s*it|that\s*is\s*it|all\s*good|i'?m\s*good|i\s*am\s*good|all\s*set|no\s*more|no\s*need|not\s*now|not\s*really|no\s*questions?|no\s*further\s*questions?|none|nope|nah)\b",
            r"^(no|nothing|nope|nah|none)$",
        ],
        "responses": [
            "Alright! Glad I could help you today. Have a wonderful day ahead! Feel free to ask anytime if anything else comes up. 👋",
            "Understood! Wishing you a great day ahead. Feel free to come back whenever you need assistance with any of our services! 😊",
        ]
    },
    {
        "intent": "affirmation",
        "patterns": [
            r"^(yes|yeah|yep|yup|sure|of\s*course|definitely|absolutely|please|go\s*ahead)\b",
        ],
        "responses": [
            "Sure! What else would you like to know? You can ask about shopping returns, banking cards, doctor appointments, exam dates, or food tracking.",
            "Great! What topic would you like to explore next? Feel free to ask about any of our 10 supported service domains.",
        ]
    },
    {
        "intent": "acknowledgment",
        "patterns": [
            r"^(ok|okay|k|okk|okey|alright|got\s*it|fine|cool|great|nice|perfect|done|understood|i\s*see|noted|clear)\b",
        ],
        "responses": [
            "Great! Feel free to ask if you have any other questions about our services! 😊",
            "Awesome! Let me know whenever you need any further information.",
        ]
    },
    {
        "intent": "gratitude",
        "patterns": [
            r"\b(thank\s*you|thanks|thankyou|thx|thnx|ty|tysm|appreciate\s*it|thank\s*u|grateful|many\s*thanks|thanks\s*a\s*lot|thank\s*you\s*so\s*much)\b",
        ],
        "responses": [
            "You're very welcome! 😊 Feel free to ask if you have any more questions.",
            "Glad I could help! Have a wonderful day ahead! 🌟",
        ]
    },
    {
        "intent": "how_are_you",
        "patterns": [
            r"\b(how\s*are\s*you|how\s*r\s*u|how\s*are\s*you\s*doing|how\s*is\s*it\s*going|how\s*do\s*you\s*do)\b",
        ],
        "responses": [
            "I'm doing great, thank you for asking! 😊 I'm AIRA, your AI Responsive Assistant. How can I help you today?",
        ]
    },
    {
        "intent": "greeting",
        "patterns": [
            r"^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy|hola|yo|sup|what'?s\s*up)\b",
        ],
        "responses": [
            "Hi! I'm AIRA 👋 Your friendly guide to everyday questions. How can I assist you today?",
            "Hello there! I'm AIRA. How can I help you across shopping, banking, healthcare, education, or technology today?",
        ]
    },
    {
        "intent": "farewell",
        "patterns": [
            r"\b(bye|goodbye|see\s*you|cya|take\s*care|good\s*night|catch\s*you\s*later|have\s*a\s*(good|nice|great)\s*day)\b",
        ],
        "responses": [
            "Goodbye! 👋 Wishing you a productive and wonderful day ahead. Come back anytime you need help!",
            "Take care! Have a great day ahead! 🌟",
        ]
    },
    {
        "intent": "identity_and_help",
        "patterns": [
            r"\b(who\s*are\s*you|what\s*is\s*your\s*name|what\s*can\s*you\s*do|what\s*are\s*you|tell\s*me\s*about\s*yourself|help|guide\s*me|what\s*are\s*the\s*options|what\s*domains|domains)\b",
        ],
        "responses": [
            "I am **AIRA** (AI Responsive Assistant) — your friendly guide to everyday questions! 🌟\n\nI can assist you with answers across 10 service domains:\n1. 🎓 **Education & College** (Admissions, Fees, Exams, Hostel, Library)\n2. 🛒 **E-commerce & Shopping** (Orders, Tracking, Returns, Refunds)\n3. 🏦 **Banking & Finance** (Accounts, Cards, UPI, Statements)\n4. 🏥 **Healthcare & Hospitals** (Appointments, Reports, Visiting Hours)\n5. 🍔 **Food Delivery** (Orders, Tracking, Payments, Refunds)\n6. 💻 **Software & Technology** (Passwords, 2FA, App Errors, Security)\n7. ✈️ **Travel & Transport** (Flight/Train Tickets, Baggage, PNR)\n8. 🏛️ **Public Services & Government** (Certificates, Grievances, Status)\n9. 💼 **Jobs & Career** (Resumes, Interviews, Placements, Internships)\n10. 💬 **General Customer Support** (Helplines, Hours, Feedback)\n\nWhat would you like to ask about?",
        ]
    }
]

def check_conversational_intent(text: str) -> str:
    """Checks if the user query is a conversational utterance."""
    if not text:
        return None
    
    cleaned = text.strip().lower()
    cleaned = re.sub(r'[!?,.]+$', '', cleaned).strip()

    for item in CONVERSATIONAL_INTENTS:
        for pattern in item["patterns"]:
            if re.search(pattern, cleaned, re.IGNORECASE):
                return item["responses"][0]
                
    return None


class FAQChatbot:
    def __init__(self, data_path: str = None, threshold: float = SIMILARITY_THRESHOLD):
        """
        Initializes the Multi-Domain FAQ Chatbot engine.
        Loads dataset, preprocesses question corpora, and fits TF-IDF vectorizer.
        """
        if data_path is None:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            data_path = os.path.join(base_dir, "faq_data.json")

        self.data_path = data_path
        self.threshold = threshold
        self.faqs = []
        self.processed_corpus = []
        self.vectorizer = None
        self.tfidf_matrix = None

        self.load_and_index_faqs()

    def load_and_index_faqs(self):
        """Loads JSON FAQ data and builds the TF-IDF index."""
        if not os.path.exists(self.data_path):
            raise FileNotFoundError(f"FAQ data file not found at: {self.data_path}")

        with open(self.data_path, 'r', encoding='utf-8') as f:
            self.faqs = json.load(f)

        if not self.faqs:
            raise ValueError("FAQ dataset is empty.")

        # Build processed corpus from the questions
        self.processed_corpus = []
        for faq in self.faqs:
            q_text = faq.get("question", "")
            cleaned = preprocess_text(q_text)
            self.processed_corpus.append(cleaned)

        # Initialize TF-IDF Vectorizer with unigrams & bigrams
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),
            sublinear_tf=True
        )
        self.tfidf_matrix = self.vectorizer.fit_transform(self.processed_corpus)
        print(f"[AIRA Chatbot] Successfully indexed {len(self.faqs)} multi-domain FAQs.")

    def get_response(self, user_query: str) -> dict:
        """
        Processes user question:
        1. Checks for conversational intents.
        2. Computes TF-IDF Cosine Similarity against 165+ FAQs.
        3. Returns answer, domain category, similarity confidence score, and matched question.
        """
        # 1. Validate empty / whitespace input
        if not user_query or not user_query.strip():
            return {
                "answer": "Please enter a question so I can help you.",
                "confidence": 0.0,
                "matched_question": None,
                "category": None,
                "is_matched": False
            }

        # 2. Check conversational intents first
        intent_response = check_conversational_intent(user_query)
        if intent_response:
            return {
                "answer": intent_response,
                "confidence": 1.0,
                "matched_question": "Conversational Intent",
                "category": "General Support",
                "is_matched": True,
                "is_conversational": True
            }

        # 3. Clean user query
        cleaned_query = preprocess_text(user_query)

        # If preprocessing removes everything
        if not cleaned_query.strip():
            return {
                "answer": FALLBACK_RESPONSE,
                "confidence": 0.0,
                "matched_question": None,
                "category": None,
                "is_matched": False,
                "suggestions": FALLBACK_SUGGESTIONS
            }

        # 4. Transform query and compute Cosine Similarity
        query_vec = self.vectorizer.transform([cleaned_query])
        similarity_scores = cosine_similarity(query_vec, self.tfidf_matrix).flatten()

        best_index = int(np.argmax(similarity_scores))
        best_score = float(similarity_scores[best_index])
        confidence = round(best_score, 2)

        # 5. Check against similarity threshold
        if best_score >= self.threshold:
            matched_faq = self.faqs[best_index]
            return {
                "answer": matched_faq.get("answer"),
                "confidence": confidence,
                "matched_question": matched_faq.get("question"),
                "category": matched_faq.get("category", "General Support"),
                "is_matched": True,
                "faq_id": matched_faq.get("id")
            }
        else:
            return {
                "answer": FALLBACK_RESPONSE,
                "confidence": confidence,
                "matched_question": self.faqs[best_index].get("question"),
                "category": None,
                "is_matched": False,
                "suggestions": FALLBACK_SUGGESTIONS
            }

    def get_all_faqs(self) -> list:
        """Returns all FAQs."""
        return self.faqs

    def get_categories(self) -> list:
        """Returns unique categories."""
        return list(dict.fromkeys(f.get("category") for f in self.faqs if f.get("category")))
