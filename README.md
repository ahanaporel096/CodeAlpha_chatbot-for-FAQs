# ✨ AIRA — AI Responsive Assistant

> **Tagline**: *Your friendly guide to everyday questions.*

AIRA is a production-grade, multi-domain FAQ chatbot powered by traditional **Natural Language Processing (NLP)**, **TF-IDF Vectorization**, and **Cosine Similarity matching**. It provides instant, accurate answers across **10 service domains** with 165+ comprehensive FAQs.

---

## 🌟 Supported Service Domains

| Domain | Scope & Example Topics |
| :--- | :--- |
| 🎓 **Education / College** | Admissions, tuition fees, semester exams, attendance rules, hostel, scholarships, library |
| 🛒 **E-commerce / Shopping** | Order placement, live tracking, return requests, refund timelines, payment failures |
| 🏦 **Banking & Finance** | Account opening, blocking lost debit cards, KYC updates, statements, UPI setup |
| 🏥 **Healthcare & Hospitals** | Doctor appointment booking, test reports, visiting hours, emergency trauma lines |
| 🍔 **Food Delivery** | Order tracking, delayed meals, cold/damaged item refunds, restaurant menus |
| 💻 **Software & Technology** | Password reset, Two-Factor Authentication (2FA), browser cache, app crashes |
| ✈️ **Travel & Transport** | Flight/train tickets, cancellations, baggage allowances, live PNR tracking |
| 🏛️ **Government & Public** | Citizen certificates, application tracking, public grievance redressal |
| 💼 **Jobs & Career** | Resume structuring, interview preparation, coding DSA practice, internships |
| 💬 **General Customer Support** | 24/7 helplines, operating hours, formal complaints, user feedback |

---

## 🧠 NLP & Similarity Architecture

```
User Query
    ↓
Text Cleaning (Lowercasing, Punctuation Removal)
    ↓
NLTK Word Tokenization
    ↓
Stopword Removal
    ↓
WordNet Lemmatization
    ↓
TF-IDF Vectorization (Unigrams + Bigrams, Sublinear TF)
    ↓
Cosine Similarity Computation
    ↓
Threshold Verification (SIMILARITY_THRESHOLD = 0.25)
    ↓
Match Extraction & Category Classification
    ↓
Return Answer + Domain Category + Match Percentage
    ↓
Display in React Chat UI
```

---

## 📁 Project Structure

```
SMART FAQ CHATBOT/
├── backend/
│   ├── app.py                 # Flask REST API server (Port 5000)
│   ├── chatbot.py             # AIRA TF-IDF & Cosine Similarity NLP engine
│   ├── nlp_processor.py       # NLTK tokenization, stopwords, WordNet lemmatizer
│   ├── faq_data.json          # 165 Multi-domain FAQs across 10 categories
│   ├── generate_faqs.py       # FAQ generator & dataset updater script
│   ├── test_chatbot.py        # Automated test suite (31 multi-domain tests)
│   ├── requirements.txt       # Python dependencies (Flask, NLTK, scikit-learn)
│   └── README.md              # Backend technical documentation
├── src/
│   ├── components/
│   │   ├── ChatContainer.jsx          # Message stream & ambient canvas
│   │   ├── MessageBubble.jsx          # Response cards with category & match badges
│   │   ├── Sidebar.jsx                # 10 Multi-domain categories directory
│   │   ├── Header.jsx                 # AIRA branding, status, and theme selector
│   │   ├── WelcomeScreen.jsx          # AIRA hero core & 6 starter query cards
│   │   ├── FallbackCard.jsx           # Multi-domain suggestions on unknown queries
│   │   ├── InputBar.jsx               # Speech-to-text mic & message input
│   │   ├── ThemeSelector.jsx          # 1-Click live theme switcher
│   │   ├── DocumentsChecklistModal.jsx# Interactive admission documents checklist
│   │   ├── StudentProfileModal.jsx    # Helpdesk contacts & transcript export
│   │   └── Toast.jsx                  # Floating feedback alerts
│   ├── context/
│   │   ├── ChatContext.jsx            # React message state management
│   │   └── ThemeContext.jsx           # Dynamic multi-theme state
│   ├── hooks/
│   │   └── useChat.js                 # API bridge between React and Flask
│   ├── utils/
│   │   └── faqMatcher.js              # Client fallback matcher & NLU intents
│   ├── index.css                      # Multi-theme CSS variable architecture
│   └── App.jsx                        # Main React application
├── package.json                       # Frontend dependencies (React, Tailwind v4)
└── README.md                          # Main project guide
```

---

## 🚀 Installation & Running

### 1. Backend Setup (Flask API)
```bash
# In terminal 1:
python backend/app.py
```
*Flask server will start on `http://localhost:5000` with 165 indexed multi-domain FAQs.*

### 2. Frontend Setup (React + Vite)
```bash
# In terminal 2:
npm run dev
```
*Open [http://localhost:5173/](http://localhost:5173/) in your web browser.*

### 3. Run Automated Multi-Domain Tests
```bash
python backend/test_chatbot.py
```
*Executes 31 automated test cases across all 10 categories, paraphrased queries, typos, and conversational intents.*

---

## 🔌 API Endpoints

### 1. `POST /api/chat`
**Request**:
```json
{
  "message": "How can I return my order?"
}
```
**Response**:
```json
{
  "answer": "Go to My Orders, select the item, click Return/Exchange, choose your reason, and pick a convenient pickup date.",
  "category": "E-commerce",
  "confidence": 0.87,
  "is_matched": true,
  "matched_question": "How can I return an order or request a refund?"
}
```

### 2. `GET /api/health`
**Response**:
```json
{
  "indexed_faqs": 165,
  "service": "AIRA — AI Responsive Assistant",
  "status": "ok",
  "threshold": 0.25,
  "version": "2.5.0"
}
```

### 3. `GET /api/categories`
Returns all 10 supported domains with icons and descriptions.
