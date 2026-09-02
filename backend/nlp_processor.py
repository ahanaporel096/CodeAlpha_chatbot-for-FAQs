"""
NLP Preprocessing Pipeline for FAQ Chatbot
Handles text cleaning, tokenization, stopword removal, and lemmatization using NLTK.
Includes automatic resource downloading with graceful fallback if offline.
"""

import re
import string
import nltk

# ─── Ensure required NLTK resources are available ──────────────────────────────
def _ensure_nltk_resources():
    resources = [
        ('tokenizers/punkt', 'punkt'),
        ('tokenizers/punkt_tab', 'punkt_tab'),
        ('corpora/stopwords', 'stopwords'),
        ('corpora/wordnet', 'wordnet'),
        ('corpora/omw-1.4', 'omw-1.4'),
    ]
    for path, name in resources:
        try:
            nltk.data.find(path)
        except (LookupError, AttributeError):
            try:
                nltk.download(name, quiet=True)
            except Exception as e:
                print(f"[NLP Warning] Could not download NLTK resource '{name}': {e}")

_ensure_nltk_resources()

# ─── Load NLTK tools with safe fallbacks ───────────────────────────────────────
try:
    from nltk.corpus import stopwords
    STOPWORDS = set(stopwords.words('english'))
except Exception:
    # Standard fallback English stopwords
    STOPWORDS = {
        'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're",
        "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he',
        'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's",
        'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
        'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are',
        'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
        'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
        'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into',
        'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up',
        'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then',
        'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both',
        'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
        'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will',
        'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're',
        've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't",
        'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't",
        'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't",
        'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't",
        'won', "won't", 'wouldn', "wouldn't"
    }

try:
    from nltk.stem import WordNetLemmatizer
    LEMMATIZER = WordNetLemmatizer()
except Exception:
    class DummyLemmatizer:
        def lemmatize(self, word, pos='n'):
            return word
    LEMMATIZER = DummyLemmatizer()

try:
    from nltk.tokenize import word_tokenize
    def tokenize(text):
        try:
            return word_tokenize(text)
        except Exception:
            return re.findall(r'\b\w+\b', text)
except Exception:
    def tokenize(text):
        return re.findall(r'\b\w+\b', text)


# ─── Main Preprocessing Pipeline ──────────────────────────────────────────────
def preprocess_text(text: str) -> str:
    """
    Executes the full NLP preprocessing pipeline:
    1. Lowercase conversion
    2. Punctuation removal
    3. Tokenization
    4. Stopword filtering
    5. Whitespace normalization
    6. Lemmatization (noun + verb)
    7. Returns cleaned string
    """
    if not text or not isinstance(text, str):
        return ""

    # 1. Lowercase
    text = text.lower()

    # 2. Remove punctuation and special characters (keep alphanumeric and whitespace)
    # Replace punctuation with a single space
    for punct in string.punctuation:
        text = text.replace(punct, ' ')
    text = re.sub(r'[^a-z0-9\s]', ' ', text)

    # 3. Tokenize
    tokens = tokenize(text)

    # 4. Remove stopwords, short junk, and whitespace
    cleaned_tokens = []
    for token in tokens:
        token = token.strip()
        if token and token not in STOPWORDS and len(token) > 1:
            # 6. Apply lemmatization (both noun and verb passes)
            try:
                lemma = LEMMATIZER.lemmatize(token, pos='v')
                lemma = LEMMATIZER.lemmatize(lemma, pos='n')
            except Exception:
                lemma = token
            cleaned_tokens.append(lemma)

    # 7. Return joined cleaned text
    return " ".join(cleaned_tokens)
