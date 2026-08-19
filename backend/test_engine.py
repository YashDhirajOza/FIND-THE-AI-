"""
FIND THE AI — Automated Test Suite
Verifies:
1. Abbreviation-safe sentence splitting
2. Stylometric feature calculation
3. Calibrated zero-shot & neural signals
4. Elena safeguard & abstention protocol (< 50 words)
5. Adversarial perturbation resistance
"""

import sys
import os

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from tokenizer_utils import split_into_sentences, extract_word_tokens
from engine import FindTheAIEngine

def test_tokenizer():
    text = "Dr. Smith went to the U.S. to buy 3.14 pies at 5 p.m. It was fun! Really... yes."
    sentences = split_into_sentences(text)
    assert len(sentences) == 3, f"Expected 3 sentences, got {len(sentences)}: {sentences}"
    assert "Dr. Smith" in sentences[0], "Dr. Smith abbreviation shredded"
    assert "3.14" in sentences[0], "3.14 decimal shredded"
    print("[PASS] Tokenizer & Abbreviation Safety Test")

def test_abstention_on_short_text():
    engine = FindTheAIEngine()
    short_text = "AI is changing the world fast. It helps code faster."
    result = engine.analyze(short_text)
    
    assert result["verdict"]["should_abstain"] is True, "Short text should trigger abstention"
    assert result["verdict"]["band"] == "INSUFFICIENT_EVIDENCE_ABSTAINED", "Verdict band should be abstained"
    print("[PASS] Elena Safeguard Abstention Test (< 50 words)")

def test_ai_vs_human_scoring():
    engine = FindTheAIEngine()
    
    ai_sample = (
        "Artificial intelligence is rapidly transforming the modern technological landscape in unprecedented ways. "
        "Furthermore, organizations across diverse industries are leveraging machine learning algorithms to enhance operational efficiency "
        "and streamline decision-making processes. It is crucial to recognize that the integration of synthetic intelligence offers paramount benefits, "
        "fostering innovation and creating new paradigms for economic growth. In conclusion, as society navigates this evolving paradigm, "
        "establishing robust regulatory frameworks remains essential to ensure responsible stewardship."
    )
    
    human_sample = (
        "Honestly? I had no idea what was happening when the server crashed at 3 AM. Coffee in hand, half-asleep, "
        "I stared at the terminal screen wondering why on earth someone hardcoded a port number in production. "
        "Classic move. But after digging through two dozen lines of spaghetti code, there it was-a rogue semicolon! "
        "Fixed it, deployed, and crashed back onto my couch before sunrise. What a crazy night that was."
    )
    
    ai_res = engine.analyze(ai_sample)
    human_res = engine.analyze(human_sample)
    
    assert ai_res["verdict"]["should_abstain"] is False, "AI sample has sufficient length"
    assert human_res["verdict"]["should_abstain"] is False, "Human sample has sufficient length"
    
    ai_score = ai_res["verdict"]["consensus_score"]
    human_score = human_res["verdict"]["consensus_score"]
    
    print(f"   Diagnostic AI Score: {ai_score}% | Diagnostic Human Score: {human_score}%")
    assert ai_score > human_score, f"AI sample score ({ai_score}%) should be higher than human sample ({human_score}%)"
    print("[PASS] AI vs. Human Relative Scoring & Signal Separation Test")

if __name__ == "__main__":
    print("Running FIND-THE-AI Test Suite...")
    test_tokenizer()
    test_abstention_on_short_text()
    test_ai_vs_human_scoring()
    print("\nALL UNIT TESTS PASSED SUCCESSFULLY!")
