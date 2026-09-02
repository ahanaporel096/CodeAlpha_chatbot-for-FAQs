"""
AIRA — AI Responsive Assistant
Flask REST API Server
Provides endpoints for multi-domain FAQ querying, health checks, and category listings.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import FAQChatbot, SIMILARITY_THRESHOLD
import os

app = Flask(__name__)
# Enable CORS for all routes
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize Chatbot Engine
base_dir = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(base_dir, "faq_data.json")
chatbot = FAQChatbot(data_path=data_path, threshold=SIMILARITY_THRESHOLD)

CATEGORY_METADATA = [
    {"id": "Education", "name": "Education", "icon": "school", "description": "Admissions, fees, exams, hostel, scholarships, library"},
    {"id": "E-commerce", "name": "E-commerce", "icon": "shopping_bag", "description": "Orders, tracking, payments, returns, refunds, delivery"},
    {"id": "Banking", "name": "Banking", "icon": "account_balance", "description": "Accounts, debit cards, UPI, balance, statements"},
    {"id": "Healthcare", "name": "Healthcare", "icon": "local_hospital", "description": "Doctor appointments, reports, visiting hours, emergency"},
    {"id": "Food Delivery", "name": "Food Delivery", "icon": "fastfood", "description": "Live food tracking, delayed meals, refunds, menus"},
    {"id": "Software / Technology", "name": "Technology", "icon": "computer", "description": "Password resets, 2FA, app errors, account settings"},
    {"id": "Travel", "name": "Travel", "icon": "flight_takeoff", "description": "Flight/train bookings, baggage rules, ticket cancellations"},
    {"id": "Public Services", "name": "Public Services", "icon": "account_balance_wallet", "description": "Government certificates, applications, grievance redressal"},
    {"id": "Career", "name": "Career", "icon": "work", "description": "Resumes, interview prep, campus placements, internships"},
    {"id": "General Support", "name": "General Support", "icon": "support_agent", "description": "Customer service, helplines, feedback, policies"},
]

@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "ok",
        "service": "AIRA — AI Responsive Assistant",
        "version": "2.5.0",
        "indexed_faqs": len(chatbot.get_all_faqs()),
        "threshold": SIMILARITY_THRESHOLD
    }), 200

@app.route("/api/categories", methods=["GET"])
def get_categories():
    """Returns list of supported multi-domain categories."""
    return jsonify({
        "categories": CATEGORY_METADATA
    }), 200

@app.route("/api/faqs", methods=["GET"])
def get_faqs():
    """Returns all FAQ questions in the knowledge base."""
    return jsonify({
        "total": len(chatbot.get_all_faqs()),
        "faqs": chatbot.get_all_faqs()
    }), 200

@app.route("/api/chat", methods=["POST"])
def chat():
    """
    Main chat endpoint for natural language queries.
    Request body: { "message": "user question string" }
    Response: { "answer": "...", "confidence": 0.87, "category": "...", "matched_question": "..." }
    """
    try:
        data = request.get_json(silent=True)
        if not data:
            return jsonify({
                "answer": "Please enter a question so I can help you.",
                "confidence": 0.0,
                "matched_question": None,
                "category": None,
                "is_matched": False
            }), 200

        user_message = data.get("message", "")

        # Graceful handling for non-string / overly long messages
        if not isinstance(user_message, str) or not user_message.strip():
            return jsonify({
                "answer": "Please enter a question so I can help you.",
                "confidence": 0.0,
                "matched_question": None,
                "category": None,
                "is_matched": False
            }), 200

        # Safety length limit
        if len(user_message) > 1000:
            user_message = user_message[:1000]

        response = chatbot.get_response(user_message)
        return jsonify(response), 200

    except Exception as e:
        return jsonify({
            "answer": "An unexpected error occurred while processing your request. Please try again.",
            "confidence": 0.0,
            "matched_question": None,
            "category": None,
            "is_matched": False,
            "error": str(e)
        }), 500

@app.route("/api/reload", methods=["POST"])
def reload_knowledge_base():
    """Reloads the FAQ knowledge base and refits TF-IDF index."""
    try:
        chatbot.load_and_index_faqs()
        return jsonify({
            "status": "success",
            "message": f"Successfully reloaded and indexed {len(chatbot.get_all_faqs())} FAQs."
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    print(f"\n========================================================")
    print(f"  AIRA — AI Responsive Assistant (Flask API)")
    print(f"  Health Check: http://localhost:5000/api/health")
    print(f"  Categories:   http://localhost:5000/api/categories")
    print(f"  Chat Route:   POST http://localhost:5000/api/chat")
    print(f"========================================================\n")
    app.run(host="0.0.0.0", port=5000, debug=False)
