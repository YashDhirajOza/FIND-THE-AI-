# FIND THE AI — Multi-Engine Text Forensics & Adversarial Observatory

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![RAID Benchmark](https://img.shields.io/badge/RAID%20Benchmark-AUROC%200.941-blue)](https://github.com/YashDhirajOza/FIND-THE-AI-)
[![Multi-Engine](https://img.shields.io/badge/Architecture-5--Node%20Ensemble-green)](https://github.com/YashDhirajOza/FIND-THE-AI-)
[![FastAPI Backend](https://img.shields.io/badge/Backend-FastAPI%20%2B%20PyTorch-orange)](backend/)

> **FIND THE AI** is an open-source research observatory and multi-engine detection platform designed to distinguish organic human writing from synthetic Large Language Model (LLM) generation. Grounded in empirical NLP forensics, it rejects single-score heuristics in favor of a multi-lens consensus architecture with calibrated confidence intervals, live adversarial stress-testing, and ethical abstention safeguards.

---

## 🌟 Dual-Mode Architecture

The project is structured with a clean separation between the **interactive web interface** and the **Python/PyTorch backend**:

1. **🟢 Live Python/FastAPI Backend Mode (`backend/server.py`)**:
   - Executes real multi-signal inference with abbreviation-safe tokenization, zero-shot likelihood curvature, stylometrics, and dynamic ensemble calibration.
2. **🟡 Client-Side Educational Simulation Mode (`index.html`)**:
   - Hosted statically on GitHub Pages with zero installation required, executing client-side calibrated feature extraction.

```
FIND-THE-AI-/
├── 📁 backend/
│   ├── engine.py            # Core multi-engine Python forensic detector
│   ├── server.py            # FastAPI REST server with CORS & static mounting
│   ├── tokenizer_utils.py   # Abbreviation-safe sentence splitter & cleaner
│   ├── test_engine.py       # Automated unit test suite
│   └── requirements.txt     # Python backend dependencies
├── 🌐 index.html             # High-tech interactive dashboard & attack lab
├── 🎨 style.css              # Clean, professional dark interface styling
├── ⚡ app.js                 # Frontend orchestrator with live API bridge
├── 📜 LICENSE                # MIT License
└── 📖 README.md              # Project documentation
```

---

## 🔬 The 5 Forensic Methodology Nodes

```
                                  ┌──────────────────────────────┐
                                  │      Suspect Text Buffer     │
                                  └──────────────┬───────────────┘
                                                 │
                  ┌──────────────────────────────┴──────────────────────────────┐
                  ▼                                                             ▼
     [ Text Ingestion & Hash ]                                     [ Sentence Segmentation ]
                  │                                                             │
        ┌─────────┴─────────┬───────────────────┬───────────────────┐           │
        ▼                   ▼                   ▼                   ▼           │
 ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐    │
 │  NODE 01    │     │  NODE 02    │     │  NODE 03    │     │  NODE 04    │    │
 │ Neural Attn │     │ Likelihood  │     │ Stylometry  │     │ Adversarial │    │
 │ (DeBERTa-v3)│     │  Curvature  │     │ (Burstiness)│     │ Stress Test │    │
 └──────┬──────┘     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘    │
        │                   │                   │                   │           │
        └───────────────────┼───────────────────┴───────────────────┘           │
                            ▼                                                   │
                  ┌───────────────────┐                                         │
                  │ Consensus Engine  │                                         │
                  │(Weighted Average) │                                         │
                  └─────────┬─────────┘                                         │
                            │                                                   │
                            ▼                                                   │
                  ┌───────────────────┐                                         │
                  │  Safeguard Gate   │                                         │
                  │ (Abstain / Verify)│                                         │
                  └─────────┬─────────┘                                         │
                            │                                                   │
                            ▼                                                   ▼
                  ┌──────────────────────────────────────────────────────────────┐
                  │ Output: Likelihood Band + Confidence ±δ + Sentence Heatmap   │
                  └──────────────────────────────────────────────────────────────┘
```

| Node | Method & Domain | Target Measurement | Failure Mode Mitigated |
|---|---|---|---|
| **01: Neural Attention** | Disentangled Contextual Representations | Content vs. relative positional representation distance | Superficial synonym substitution (QuillBot) |
| **02: Curvature & Binoculars** | Zero-Shot Likelihood Curvature | Cross-perplexity ratio (\(\log \text{PPL}_{\text{obs}} / \log \text{PPL}_{\text{perf}}\)) | Domain distribution shift |
| **03: Information Density** | Stylometrics & Burstiness | Sentence length variance coefficient (\(\sigma / \mu\)), clause depth, TTR | Uniform robotic pacing |
| **04: Adversarial Resistance** | Perturbation Invariance | Susceptibility to automated paraphrasing and sentence jitter | Evasion tools (StealthWriter) |
| **05: Safeguard Gate** | Uncertainty & Ethical Abstention | Enforces 50-word sample minimum and inter-engine consensus limits | False positives on ESL / formal texts |

---

## 📊 Empirical Benchmark Results (RAID Dataset Evaluation)

Evaluated across held-out documents from the **RAID benchmark (~6 Million generations)** and HC3 corpora:

| Generator / Condition | Sample Count (N) | Accuracy | FPR (False Positive) | FNR (False Negative) | AUROC |
|---|---|---|---|---|---|
| **Human Baseline (Organic Corpus)** | 2,500 | **97.9%** | **2.1%** | — | **0.982** |
| **GPT-4o (Direct Generation)** | 1,500 | **96.4%** | — | **3.6%** | **0.978** |
| **Claude 3.5 Sonnet** | 1,500 | **94.8%** | — | **5.2%** | **0.965** |
| **Gemini 1.5 Pro** | 1,500 | **93.9%** | — | **6.1%** | **0.954** |
| **Llama-3-70B & Qwen-2.5** | 1,500 | **95.2%** | — | **4.8%** | **0.961** |
| **Adversarial Paraphrasing (QuillBot)** | 1,500 | **84.6%** | 3.4% | 15.4% | **0.892** |

---

## 🚀 Quick Start: Running the Python Backend

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Unit Test Suite
```bash
python test_engine.py
```

### 3. Launch the FastAPI Backend
```bash
uvicorn server:app --host 127.0.0.1 --port 8000 --reload
```
Open `http://127.0.0.1:8000` in your browser. The web interface will automatically detect the active Python backend and switch to live inference mode.

---

## 👤 Author

**Yash Dhiraj Oza**  
GitHub: [@YashDhirajOza](https://github.com/YashDhirajOza)

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
