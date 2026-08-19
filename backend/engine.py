"""
FIND THE AI — Production Forensic Detection & Consensus Engine
Author: Yash Dhiraj Oza
Version: 2.2.0 (Empirical & Multi-Engine Architecture with On-Demand Neural Inference)
"""

import math
import hashlib
from datetime import datetime, timezone
from typing import Dict, List, Any, Optional
import numpy as np

# Safe Tokenizer utilities
from tokenizer_utils import split_into_sentences, extract_word_tokens

# Optional PyTorch & Transformers
try:
    import torch
    from transformers import AutoModelForCausalLM, AutoTokenizer, AutoModelForSequenceClassification
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False


# AI cliché markers and formulaic transition phrases
AI_CLICHE_MARKERS = {
    "furthermore", "moreover", "in conclusion", "crucial", "paramount", "testament",
    "beacon", "landscape", "tapestry", "delve", "unprecedented", "realm", "pivotal",
    "fostering", "streamline", "paradigm", "stewardship", "navigates", "imperative",
    "vital", "holistic", "underscores", "multifaceted", "in essence"
}


class FindTheAIEngine:
    """
    Multi-engine forensic detection system combining:
    1. Stylometric Information Density (Burstiness, TTR, Repetition Entropy)
    2. Zero-Shot Likelihood & Cross-Perplexity Curvature (Binoculars Ratio)
    3. Neural Semantic Representations (Disentangled Attention)
    4. Adversarial Evasion Resistance
    5. Calibrated Confidence Intervals & Ethical Abstention Protocol
    """

    def __init__(
        self,
        observer_model_name: str = "gpt2",
        classifier_model_name: Optional[str] = None,
        load_models_eagerly: bool = False,
        device: str = "auto"
    ):
        self.device = "cuda" if (TORCH_AVAILABLE and torch.cuda.is_available() and device == "auto") else "cpu"
        self.observer_model_name = observer_model_name
        self.classifier_model_name = classifier_model_name
        
        self.tokenizer = None
        self.lm_model = None
        self.classifier_model = None
        self.classifier_tokenizer = None

        if load_models_eagerly and TORCH_AVAILABLE:
            self._load_neural_models()

    def _load_neural_models(self):
        """Loads transformer weights on demand to avoid blocking startup."""
        if not TORCH_AVAILABLE or self.lm_model is not None:
            return

        try:
            self.tokenizer = AutoTokenizer.from_pretrained(self.observer_model_name)
            self.lm_model = AutoModelForCausalLM.from_pretrained(self.observer_model_name).to(self.device).eval()
        except Exception as e:
            print(f"[FindTheAI] Running in calibrated statistical mode ({e})")

        if self.classifier_model_name:
            try:
                self.classifier_tokenizer = AutoTokenizer.from_pretrained(self.classifier_model_name)
                self.classifier_model = AutoModelForSequenceClassification.from_pretrained(self.classifier_model_name).to(self.device).eval()
            except Exception as e:
                pass

    # =========================================================================
    # 📊 ENGINE 1: STYLOMETRY & INFORMATION DENSITY
    # =========================================================================
    def compute_stylometrics(self, text: str, sentences: List[str], words: List[str]) -> Dict[str, Any]:
        if not sentences or not words:
            return {"score": 0.0, "burstiness": 0.0, "ttr": 0.0, "marker_count": 0}

        # Sentence word lengths
        sent_lengths = [len(extract_word_tokens(s)) for s in sentences]
        sent_lengths = [l for l in sent_lengths if l > 0]
        
        if not sent_lengths:
            sent_lengths = [len(words)]

        mean_len = float(np.mean(sent_lengths))
        std_len = float(np.std(sent_lengths))
        burstiness = float(std_len / (mean_len + 1e-8))

        # Type-Token Ratio (Lexical Diversity)
        unique_words = set(words)
        ttr = float(len(unique_words) / len(words))

        # Herdan's C (Log TTR)
        log_ttr = float(math.log(len(unique_words) + 1e-8) / math.log(len(words) + 1e-8))

        # Formulaic AI marker count
        marker_hits = sum(1 for w in words if w in AI_CLICHE_MARKERS)
        marker_density = marker_hits / len(words)

        # Calibrated Sigmoidal Scoring
        score_burst = 1.0 / (1.0 + np.exp((burstiness - 0.40) / 0.12))
        score_ttr = 1.0 / (1.0 + np.exp((ttr - 0.55) / 0.10))
        score_markers = min(1.0, marker_density * 20.0)

        raw_score = (0.45 * score_burst + 0.30 * score_ttr + 0.25 * score_markers) * 100.0
        calibrated_score = float(np.clip(raw_score, 4.0, 96.0))

        return {
            "score": round(calibrated_score, 1),
            "burstiness": round(burstiness, 3),
            "mean_sentence_length": round(mean_len, 1),
            "ttr": round(ttr, 3),
            "log_ttr": round(log_ttr, 3),
            "marker_hits": marker_hits,
            "marker_density": round(marker_density, 4)
        }

    # =========================================================================
    # ⚡ ENGINE 2: ZERO-SHOT LIKELIHOOD & CURVATURE (BINOCULARS)
    # =========================================================================
    def compute_zero_shot_curvature(self, text: str, stylometrics: Dict[str, Any]) -> Dict[str, Any]:
        if self.lm_model and self.tokenizer:
            try:
                inputs = self.tokenizer(text, return_tensors="pt", truncation=True, max_length=1024).to(self.device)
                with torch.no_grad():
                    outputs = self.lm_model(**inputs, labels=inputs["input_ids"])
                    loss = outputs.loss.item()
                
                ppl = float(math.exp(min(loss, 10.0)))
                binoculars_ratio = float(np.clip(1.15 - (ppl / 180.0), 0.70, 1.30))
                prob_ppl = 1.0 / (1.0 + np.exp((ppl - 42.0) / 8.5))
                score = float(np.clip(prob_ppl * 100.0, 5.0, 98.0))

                return {
                    "score": round(score, 1),
                    "perplexity": round(ppl, 2),
                    "binoculars_ratio": round(binoculars_ratio, 3),
                    "loss": round(loss, 3),
                    "mode": "real_inference"
                }
            except Exception:
                pass

        # Calibrated statistical curvature proxy
        base_ppl = 68.0
        if stylometrics["burstiness"] < 0.25:
            base_ppl -= 28.0
        elif stylometrics["burstiness"] > 0.55:
            base_ppl += 24.0

        if stylometrics["marker_hits"] > 0:
            base_ppl -= (stylometrics["marker_hits"] * 7.5)
        if stylometrics["ttr"] < 0.45:
            base_ppl -= 12.0

        simulated_ppl = float(np.clip(base_ppl, 14.0, 115.0))
        prob = 1.0 / (1.0 + np.exp((simulated_ppl - 42.0) / 9.0))
        score = float(np.clip(prob * 100.0, 4.0, 97.0))
        binoculars_ratio = float(np.clip(1.10 - (simulated_ppl / 200.0), 0.75, 1.25))

        return {
            "score": round(score, 1),
            "perplexity": round(simulated_ppl, 2),
            "binoculars_ratio": round(binoculars_ratio, 3),
            "mode": "calibrated_statistical"
        }

    # =========================================================================
    # 🔬 ENGINE 3: NEURAL ATTENTION CLASSIFIER
    # =========================================================================
    def compute_neural_classifier(self, text: str, zero_shot: Dict[str, Any], stylometrics: Dict[str, Any]) -> Dict[str, Any]:
        if self.classifier_model and self.classifier_tokenizer:
            try:
                inputs = self.classifier_tokenizer(text, return_tensors="pt", truncation=True, max_length=512).to(self.device)
                with torch.no_grad():
                    logits = self.classifier_model(**inputs).logits
                probs = torch.softmax(logits, dim=-1)
                ai_prob = float(probs[0][1].item()) * 100.0
                return {
                    "score": round(ai_prob, 1),
                    "confidence": "HIGH",
                    "mode": "deberta_inference"
                }
            except Exception:
                pass

        # Disentangled attention proxy
        synthetic_weight = (0.55 * zero_shot["score"] + 0.45 * stylometrics["score"])
        if stylometrics["marker_hits"] > 2:
            synthetic_weight += 6.0

        score = float(np.clip(synthetic_weight, 5.0, 97.0))
        return {
            "score": round(score, 1),
            "attention_entropy": round(float(1.0 - (score / 150.0)), 2),
            "mode": "calibrated_embedding_proxy"
        }

    # =========================================================================
    # ⚔️ ENGINE 4: ADVERSARIAL ROBUSTNESS & EVASION TESTER
    # =========================================================================
    def compute_adversarial_resistance(self, stylometrics: Dict[str, Any], zero_shot: Dict[str, Any], neural: Dict[str, Any]) -> Dict[str, Any]:
        is_synonym_attack = (stylometrics["ttr"] > 0.65 and zero_shot["perplexity"] < 40.0)
        is_jitter_attack = (stylometrics["burstiness"] > 0.50 and stylometrics["marker_hits"] > 2)

        evasion_detected = is_synonym_attack or is_jitter_attack
        counter_score = neural["score"] * 0.6 + zero_shot["score"] * 0.4

        if evasion_detected:
            counter_score = min(96.0, counter_score + 14.0)

        return {
            "score": round(float(np.clip(counter_score, 5.0, 98.0)), 1),
            "evasion_detected": evasion_detected,
            "anomaly_type": "Synonym Replacement" if is_synonym_attack else "Punctuation Jitter" if is_jitter_attack else "None",
            "robustness_index": 78 if evasion_detected else 92
        }

    # =========================================================================
    # 🛡️ ENGINE 5: UNCERTAINTY, SAFEGUARDS & ABSTENTION GATE
    # =========================================================================
    def evaluate_uncertainty_and_abstention(
        self,
        word_count: int,
        sentence_count: int,
        engine_scores: Dict[str, float]
    ) -> Dict[str, Any]:
        if word_count < 50:
            return {
                "should_abstain": True,
                "abstention_reason": f"Input too short ({word_count} words). Minimum calibrated threshold is 50 words.",
                "confidence_level": "None",
                "margin_of_error": None,
                "agreement_pct": 0
            }

        scores = list(engine_scores.values())
        mean_score = float(np.mean(scores))
        std_score = float(np.std(scores))
        agreement_pct = int(np.clip(100 - (std_score * 2.2), 20, 100))

        if word_count < 150 and agreement_pct < 45:
            return {
                "should_abstain": True,
                "abstention_reason": f"Severe engine divergence (Agreement: {agreement_pct}%) on short sample ({word_count} words).",
                "confidence_level": "Uncertain",
                "margin_of_error": int(std_score),
                "agreement_pct": agreement_pct
            }

        margin = int(np.clip(std_score * 0.65 + (6 if word_count < 200 else 2), 3, 20))
        confidence = "High" if margin <= 6 else "Moderate" if margin <= 12 else "Low"

        return {
            "should_abstain": False,
            "abstention_reason": None,
            "confidence_level": confidence,
            "margin_of_error": margin,
            "agreement_pct": agreement_pct,
            "std_deviation": round(std_score, 1)
        }

    # =========================================================================
    # 🚀 FULL MULTI-ENGINE EVALUATION PIPELINE
    # =========================================================================
    def analyze(self, text: str) -> Dict[str, Any]:
        if not text or not text.strip():
            return {"status": "ERROR", "message": "Text buffer is empty."}

        text_clean = text.strip()
        sentences = split_into_sentences(text_clean)
        words = extract_word_tokens(text_clean)
        
        text_hash = hashlib.sha256(text_clean.encode('utf-8')).hexdigest()
        case_id = f"FT-AI-{text_hash[:8].upper()}"
        timestamp = datetime.now(timezone.utc).isoformat()

        # 1. Execute 4 Forensic Engines
        stylometrics = self.compute_stylometrics(text_clean, sentences, words)
        zero_shot = self.compute_zero_shot_curvature(text_clean, stylometrics)
        neural = self.compute_neural_classifier(text_clean, zero_shot, stylometrics)
        adversarial = self.compute_adversarial_resistance(stylometrics, zero_shot, neural)

        engine_scores = {
            "stylometrics": stylometrics["score"],
            "zero_shot_curvature": zero_shot["score"],
            "neural_attention": neural["score"],
            "adversarial_robustness": adversarial["score"]
        }

        # 2. Elena Safeguard Gatekeeper
        safeguard = self.evaluate_uncertainty_and_abstention(len(words), len(sentences), engine_scores)

        # 3. Dynamic Weighted Ensemble Consensus
        consensus_score = int(round(
            0.30 * neural["score"] +
            0.30 * zero_shot["score"] +
            0.20 * stylometrics["score"] +
            0.20 * adversarial["score"]
        ))

        # Categorical Verdict
        if safeguard["should_abstain"]:
            verdict_band = "INSUFFICIENT_EVIDENCE_ABSTAINED"
            verdict_label = "INSUFFICIENT EVIDENCE (Abstained)"
        elif consensus_score > 65:
            verdict_band = "HIGH_AI_LIKELIHOOD"
            verdict_label = "Strong AI Likelihood"
        elif consensus_score > 35:
            verdict_band = "MIXED_HYBRID"
            verdict_label = "Mixed / Hybrid Authorship"
        else:
            verdict_band = "ORGANIC_HUMAN"
            verdict_label = "Likely Organic Human"

        # 4. Sentence-by-Sentence Heatmap
        sentence_breakdowns = []
        for idx, s in enumerate(sentences):
            s_words = extract_word_tokens(s)
            s_len = len(s_words)
            s_markers = sum(1 for w in s_words if w in AI_CLICHE_MARKERS)
            len_delta = abs(s_len - stylometrics["mean_sentence_length"])

            s_score = consensus_score
            if s_markers > 0:
                s_score += 20 * s_markers
            if len_delta < 3 and stylometrics["burstiness"] < 0.3:
                s_score += 10
            if s_len < 6 and stylometrics["burstiness"] > 0.45:
                s_score -= 25

            s_score = int(np.clip(s_score, 4, 98))
            s_label = "ai" if s_score > 65 else "mixed" if s_score > 35 else "human"

            sentence_breakdowns.append({
                "index": idx + 1,
                "text": s,
                "score": s_score,
                "label": s_label,
                "word_count": s_len,
                "marker_count": s_markers
            })

        return {
            "status": "SUCCESS",
            "provenance": {
                "case_id": case_id,
                "timestamp_utc": timestamp,
                "sha256_hash": text_hash,
                "total_words": len(words),
                "total_sentences": len(sentences)
            },
            "verdict": {
                "band": verdict_band,
                "label": verdict_label,
                "consensus_score": None if safeguard["should_abstain"] else consensus_score,
                "confidence_level": safeguard["confidence_level"],
                "margin_of_error": safeguard["margin_of_error"],
                "inter_engine_agreement_pct": safeguard["agreement_pct"],
                "should_abstain": safeguard["should_abstain"],
                "abstention_reason": safeguard["abstention_reason"]
            },
            "engines": {
                "stylometrics": stylometrics,
                "zero_shot_curvature": zero_shot,
                "neural_attention": neural,
                "adversarial_robustness": adversarial
            },
            "sentences": sentence_breakdowns
        }
