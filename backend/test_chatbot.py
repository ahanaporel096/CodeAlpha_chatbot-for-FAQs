"""
AIRA — Multi-Domain Automated Test Suite
Tests 30+ diverse queries across all 10 supported domains, edge cases,
case insensitivity, conversational NLU, and threshold fallback handling.
"""

import unittest
from chatbot import FAQChatbot, SIMILARITY_THRESHOLD

class TestAIRAChatbot(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        print("\n" + "=" * 65)
        print("  Running AIRA Multi-Domain NLP & Similarity Test Suite")
        print("=" * 65)
        cls.bot = FAQChatbot(threshold=SIMILARITY_THRESHOLD)

    # ─── 1. DOMAIN 1: EDUCATION ───────────────────────────────────────────────
    def test_domain_education(self):
        res = self.bot.get_response("How can I apply for admission?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Education")
        self.assertGreaterEqual(res["confidence"], 0.50)

    def test_domain_education_paraphrased(self):
        res = self.bot.get_response("When are semester exams conducted?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Education")

    # ─── 2. DOMAIN 2: E-COMMERCE ──────────────────────────────────────────────
    def test_domain_ecommerce_return(self):
        res = self.bot.get_response("How can I return my order?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "E-commerce")
        self.assertGreaterEqual(res["confidence"], 0.50)

    def test_domain_ecommerce_tracking(self):
        res = self.bot.get_response("Where is my package?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "E-commerce")

    def test_domain_ecommerce_payment_failure(self):
        res = self.bot.get_response("Money was deducted but my order failed")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "E-commerce")

    # ─── 3. DOMAIN 3: BANKING ─────────────────────────────────────────────────
    def test_domain_banking_card_block(self):
        res = self.bot.get_response("How do I block my lost debit card?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Banking")

    def test_domain_banking_kyc(self):
        res = self.bot.get_response("What is KYC and how can I update it?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Banking")

    def test_domain_banking_statement(self):
        res = self.bot.get_response("How can I download my bank account statement?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Banking")

    # ─── 4. DOMAIN 4: HEALTHCARE ──────────────────────────────────────────────
    def test_domain_healthcare_appointment(self):
        res = self.bot.get_response("How can I book a doctor appointment?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Healthcare")

    def test_domain_healthcare_reports(self):
        res = self.bot.get_response("How can I get my lab test reports?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Healthcare")

    def test_domain_healthcare_emergency(self):
        res = self.bot.get_response("Is ambulance and emergency service available?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Healthcare")

    # ─── 5. DOMAIN 5: FOOD DELIVERY ───────────────────────────────────────────
    def test_domain_food_delivery_delayed(self):
        res = self.bot.get_response("Why is my food order delayed?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Food Delivery")

    def test_domain_food_delivery_cold_food(self):
        res = self.bot.get_response("My food arrived cold and damaged")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Food Delivery")

    # ─── 6. DOMAIN 6: SOFTWARE & TECHNOLOGY ───────────────────────────────────
    def test_domain_technology_password_reset(self):
        res = self.bot.get_response("I forgot my password. How do I reset it?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Software / Technology")

    def test_domain_technology_2fa(self):
        res = self.bot.get_response("How do I enable two-factor authentication?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Software / Technology")

    def test_domain_technology_clear_cache(self):
        res = self.bot.get_response("How do I clear browser cache and cookies?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Software / Technology")

    # ─── 7. DOMAIN 7: TRAVEL ──────────────────────────────────────────────────
    def test_domain_travel_booking(self):
        res = self.bot.get_response("How can I book a flight ticket?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Travel")

    def test_domain_travel_cancellation(self):
        res = self.bot.get_response("How can I cancel my ticket and get a refund?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Travel")

    def test_domain_travel_baggage(self):
        res = self.bot.get_response("What are the baggage allowance rules?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Travel")

    # ─── 8. DOMAIN 8: GOVERNMENT / PUBLIC SERVICES ────────────────────────────
    def test_domain_public_services_certificate(self):
        res = self.bot.get_response("How can I apply for official government certificates?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Public Services")

    def test_domain_public_services_grievance(self):
        res = self.bot.get_response("How can I file a public grievance or complaint?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Public Services")

    # ─── 9. DOMAIN 9: CAREER ──────────────────────────────────────────────────
    def test_domain_career_resume(self):
        res = self.bot.get_response("How can I create an impressive resume?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Career")

    def test_domain_career_interview(self):
        res = self.bot.get_response("How can I prepare for job interviews?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Career")

    def test_domain_career_internship(self):
        res = self.bot.get_response("How can I find internships?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "Career")

    # ─── 10. DOMAIN 10: GENERAL CUSTOMER SUPPORT ──────────────────────────────
    def test_domain_support_human_agent(self):
        res = self.bot.get_response("How can I contact customer support or speak to a human agent?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "General Support")

    def test_domain_support_operating_hours(self):
        res = self.bot.get_response("What are your customer support operating hours?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "General Support")

    # ─── 11. EDGE CASES & NLU INTENTS ─────────────────────────────────────────
    def test_unrelated_query(self):
        res = self.bot.get_response("xyz quantum teleportation recipe in 1845")
        self.assertFalse(res["is_matched"])
        self.assertIn("suggestions", res)

    def test_conversational_ok(self):
        res = self.bot.get_response("ok alright")
        self.assertTrue(res["is_matched"])
        self.assertTrue(res.get("is_conversational"))

    def test_conversational_closure(self):
        res = self.bot.get_response("no no nothing else")
        self.assertTrue(res["is_matched"])
        self.assertTrue(res.get("is_conversational"))

    def test_empty_input(self):
        res = self.bot.get_response("    ")
        self.assertFalse(res["is_matched"])
        self.assertIn("Please enter a question", res["answer"])

    def test_case_insensitivity(self):
        res = self.bot.get_response("HOW CAN I RETURN MY ORDER?")
        self.assertTrue(res["is_matched"])
        self.assertEqual(res["category"], "E-commerce")

if __name__ == "__main__":
    unittest.main()
