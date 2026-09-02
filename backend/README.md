# Intelligent FAQ Chatbot — Flask NLP Backend

This is the Python + Flask backend for the **Intelligent FAQ Chatbot** using NLP Preprocessing (NLTK), TF-IDF Vectorization (`scikit-learn`), and Cosine Similarity matching.

---

## 🏗️ Architecture

```
User Query
   ↓
NLP Preprocessing (lowercase, remove punctuation, tokenize, stopword filtering, lemmatization)
   ↓
TF-IDF Vectorizer (scikit-learn with unigrams + bigrams)
   ↓
Cosine Similarity Matrix Comparison
   ↓
Similarity Threshold Evaluation (>= 0.30)
   ↓
Return JSON Response { answer, confidence, matched_question, category, is_matched }
```

---

## 🚀 Setup & Installation

### 1. Create and Activate Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux / macOS
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Automated Tests
```bash
python test_chatbot.py
```

### 4. Start the Flask REST API Server
```bash
python app.py
```
The server will run on `http://localhost:5000`.

---

## 📡 API Endpoints

### `POST /api/chat`
Process a user question and receive the best matching FAQ answer.

**Request:**
```json
{
  "message": "How can I apply for admission?"
}
```

**Response (Match found):**
```json
{
  "answer": "You can apply for admission through our official online admission portal...",
  "confidence": 0.85,
  "matched_question": "How can I apply for admission?",
  "category": "admission",
  "is_matched": true,
  "faq_id": 1
}
```

**Response (Unmatched / Low confidence):**
```json
{
  "answer": "I'm sorry, I couldn't find a relevant answer to your question in our FAQ knowledge base...",
  "confidence": 0.08,
  "matched_question": "Where is the college located?",
  "category": null,
  "is_matched": false
}
```

### `GET /api/faqs`
Retrieve all FAQ questions and categories for suggestion pills.

### `GET /api/health`
Status and metadata check.
