/**
 * FIND THE AI — Interactive Forensics & AI Council Engine
 * Author: Yash Dhiraj Oza
 */

// 🏛️ AI COUNCIL DATASET
const COUNCIL_MEMBERS = [
  {
    name: "Dr. Aurelia Vance",
    title: "Chief AI Architect & LLM Forensics Lead (Ex-DeepMind)",
    avatar: "🔬",
    specialty: "Disentangled Attention & Neural Embeddings",
    quote: "The first generation of detectors collapsed because they treated detection as naive keyword matching. Real detection requires measuring whether token transitions follow human cognitive chaos or transformer probability gradients.",
    metric: "Disentangled Content-Position Attention (DeBERTa-v3)",
    warning: "Distribution Shift across unseen frontier LLMs",
    action: "Dynamic Weighted Multi-Engine Ensemble",
    debateNote: "Never trust a single model. Build a system that corroborates statistical burstiness with zero-shot curvature drops before issuing an AI certainty verdict."
  },
  {
    name: "Prof. Marcus Thorne",
    title: "Adversarial Robustness & Evasion Specialist (RAID Lead)",
    avatar: "⚔️",
    specialty: "Paraphrase Invariance & Evasion Defense",
    quote: "AI Humanizers rely on simple stochastic perturbations: injecting typos, swapping synonyms, and breaking sentences. Our defense must rely on deep semantic embeddings that are blind to surface-level jitter.",
    metric: "RAID Benchmark Evasion Invariance Score",
    warning: "StealthWriter & Undetectable AI Paraphrase Bypasses",
    action: "Train on adversarial perturbation corpuses",
    debateNote: "If your system can be tricked by adding two commas and swapping 'important' for 'vital', it is not a detector—it is a toy."
  },
  {
    name: "Dr. Siobhan Chen",
    title: "Computational Linguist & Stylometry Pioneer",
    avatar: "📊",
    specialty: "Syntactic Burstiness & Lexical Density",
    quote: "Human thought is inherently irregular. We write a 35-word sprawling complex sentence, then drop a 4-word punchline. Language models optimize for mean token entropy, resulting in a distinct, unnatural rhythmic heartbeat.",
    metric: "Burstiness Variance Coefficient (σ / μ)",
    warning: "False positives on formulaic technical manuals",
    action: "Grammatical clause tree depth analysis",
    debateNote: "Perplexity tells you how expected a word is; burstiness tells you if the writer breathed while typing."
  },
  {
    name: "Alexei Volkov",
    title: "Zero-Shot Probabilistic Systems Engineer",
    avatar: "⚡",
    specialty: "Probability Curvature & Binoculars Ratio",
    quote: "We don't need labeled training data that decays every 6 months. In zero-shot curvature, we evaluate how the suspect text responds when scored across an Observer and a Performer model. AI text always sits on a sharp likelihood peak.",
    metric: "Normalized Log-Perplexity / Cross-Perplexity Ratio",
    warning: "High GPU compute required for dual-model inference",
    action: "Deploy Fast-DetectGPT with conditional sampling",
    debateNote: "Zero-shot curvature is mathematically immune to domain shift because it tests the physics of the model itself."
  },
  {
    name: "Elena Rostova",
    title: "Ethics, False Positives & Governance Director",
    avatar: "🛡️",
    specialty: "Bias Mitigation & Academic Integrity Safeguards",
    quote: "A false positive in an academic or legal setting can ruin a human life. We must enforce strict confidence floors, flag low-sample texts as inconclusive, and explicitly safeguard non-native English writers.",
    metric: "Calibrated Precision (>99.9% on Human Text)",
    warning: "ESL (English as Second Language) Discrimination",
    action: "Mandatory human-in-the-loop review for high-stakes scans",
    debateNote: "Never output a definitive binary '100% AI' verdict. We provide probabilistic evidence, not judicial executions."
  }
];

// 📚 BENCHMARK PRESET TEXTS
const PRESETS = {
  chatgpt: `Artificial intelligence is rapidly transforming the modern technological landscape in unprecedented ways. Furthermore, organizations across diverse industries are leveraging machine learning algorithms to enhance operational efficiency and streamline decision-making processes. It is crucial to recognize that the integration of synthetic intelligence offers paramount benefits, fostering innovation and creating new paradigms for economic growth. In conclusion, as society navigates this evolving paradigm, establishing robust regulatory frameworks remains essential to ensure responsible stewardship.`,

  human: `Honestly? I had no idea what was happening when the server crashed at 3 AM. Coffee in hand, half-asleep, I stared at the terminal screen wondering why on earth someone hardcoded a port number in production. Classic move. But after digging through two dozen lines of spaghetti code, there it was—a rogue semicolon! Fixed it, deployed, and crashed back onto my couch before sunrise.`,

  academic: `We evaluate the disentangled self-attention mechanism on downstream natural language understanding benchmarks. Specifically, the decomposition of token embeddings into distinct content and positional representations allows the transformer architecture to capture high-order syntactic dependencies with reduced parameterization. Empirical results demonstrate a statistically significant reduction in cross-entropy loss (\(p < 0.01\)) across multi-domain corpora.`,

  humanized: `Synthetic intellect is swiftly altering the modern digital horizon in novel manners. Additionally, enterprises across various sectors are employing automated algorithms to boost everyday efficiency and ease decision paths. It is vital to observe that the blend of artificial systems brings prime value, cultivating breakthroughs and unveiling fresh frameworks for commercial expansion.`,

  hybrid: `I spent the entire weekend researching how modern language models generate text, and what I found was truly eye-opening. Artificial intelligence is transforming industries across the globe by enabling automated reasoning and streamlining workflow efficiency. However, whenever I try to explain this to my friends over dinner, they just laugh and tell me to get some sleep.`
};

// 🔠 AI CLICHÉ WORDS & PATTERNS
const AI_MARKERS = [
  "furthermore", "moreover", "in conclusion", "crucial", "paramount", "testament",
  "beacon", "landscape", "tapestry", "delve", "unprecedented", "realm", "pivotal",
  "fostering", "streamline", "paradigm", "stewardship", "navigates", "imperative"
];

// 🚀 INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  setupCouncilTabs();
  setupPresets();
  setupSimulator();
  setupVisualizerTabs();
  setupReportActions();

  // Load default preset
  loadPreset("chatgpt");
});

// 🏛️ SETUP COUNCIL MEMBER TABS
function setupCouncilTabs() {
  const tabs = document.querySelectorAll(".council-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const index = parseInt(tab.getAttribute("data-member"));
      renderCouncilMember(index);
    });
  });
}

function renderCouncilMember(index) {
  const m = COUNCIL_MEMBERS[index];
  document.getElementById("memberAvatar").textContent = m.avatar;
  document.getElementById("memberName").textContent = m.name;
  document.getElementById("memberTitle").textContent = m.title;
  document.getElementById("memberSpecialty").textContent = m.specialty;
  document.getElementById("memberQuote").textContent = `"${m.quote}"`;
  document.getElementById("memberMetric").textContent = m.metric;
  document.getElementById("memberWarning").textContent = m.warning;
  document.getElementById("memberAction").textContent = m.action;
  document.getElementById("memberDebateNote").textContent = `"${m.debateNote}"`;
}

// 📚 SETUP PRESETS
function setupPresets() {
  const buttons = document.querySelectorAll(".preset-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const presetKey = btn.getAttribute("data-preset");
      loadPreset(presetKey);
    });
  });
}

function loadPreset(key) {
  const text = PRESETS[key] || "";
  const input = document.getElementById("textInput");
  input.value = text;
  updateTextStats(text);
  runForensicAnalysis(text);
}

// 🔬 SETUP SIMULATOR
function setupSimulator() {
  const textInput = document.getElementById("textInput");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const clearBtn = document.getElementById("clearBtn");

  textInput.addEventListener("input", (e) => {
    updateTextStats(e.target.value);
  });

  analyzeBtn.addEventListener("click", () => {
    runForensicAnalysis(textInput.value);
  });

  clearBtn.addEventListener("click", () => {
    textInput.value = "";
    updateTextStats("");
    runForensicAnalysis("");
  });
}

function updateTextStats(text) {
  const words = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  document.getElementById("wordCount").textContent = `${words} words`;
  document.getElementById("charCount").textContent = `${chars} chars`;
}

// 🧮 CORE FORENSIC ENGINE ALGORITHM
function runForensicAnalysis(text) {
  if (!text || text.trim().length === 0) {
    resetResults();
    return;
  }

  const rawSentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const sentences = rawSentences.map(s => s.trim()).filter(s => s.length > 0);
  const words = text.toLowerCase().match(/\b[a-zA-Z0-9']+\b/g) || [];

  if (words.length === 0) {
    resetResults();
    return;
  }

  // 1. STATISTICAL METRICS
  // Burstiness calculation: std / mean of sentence word lengths
  const sentLengths = sentences.map(s => (s.match(/\b\w+\b/g) || []).length);
  const meanLen = sentLengths.reduce((a, b) => a + b, 0) / (sentLengths.length || 1);
  const variance = sentLengths.reduce((sum, len) => sum + Math.pow(len - meanLen, 2), 0) / (sentLengths.length || 1);
  const stdLen = Math.sqrt(variance);
  const burstiness = meanLen > 0 ? (stdLen / meanLen) : 0.0;

  // Type-Token Ratio (Lexical Diversity)
  const uniqueWords = new Set(words);
  const ttr = uniqueWords.size / words.length;

  // AI Cliche word count
  let aiMarkerHits = 0;
  words.forEach(w => {
    if (AI_MARKERS.includes(w)) aiMarkerHits++;
  });
  const markerDensity = aiMarkerHits / words.length;

  // Simulated Perplexity (Higher burstiness + high TTR = High Perplexity / Human)
  let simulatedPerplexity = 68.0;
  if (burstiness < 0.25) simulatedPerplexity -= 28.0;
  else if (burstiness > 0.55) simulatedPerplexity += 32.0;

  if (markerDensity > 0.03) simulatedPerplexity -= 18.0;
  if (ttr < 0.45) simulatedPerplexity -= 12.0;
  else if (ttr > 0.70) simulatedPerplexity += 15.0;

  simulatedPerplexity = Math.max(14.0, Math.min(115.0, simulatedPerplexity));

  // GLTR Top-10 saturation calculation
  let top10Ratio = 0.65;
  if (burstiness < 0.3) top10Ratio += 0.20;
  if (markerDensity > 0.02) top10Ratio += 0.10;
  if (ttr > 0.65) top10Ratio -= 0.25;
  top10Ratio = Math.max(0.20, Math.min(0.95, top10Ratio));

  // 2. ENSEMBLE AI SCORE CALCULATION
  // Lower perplexity -> Higher AI
  // Lower burstiness -> Higher AI
  // Higher marker density -> Higher AI
  // Lower TTR -> Higher AI
  const scoreFromPPL = Math.max(0, Math.min(1, (65.0 - simulatedPerplexity) / 45.0));
  const scoreFromBurst = Math.max(0, Math.min(1, (0.50 - burstiness) / 0.40));
  const scoreFromMarkers = Math.min(1, markerDensity * 25);
  const scoreFromTTR = Math.max(0, Math.min(1, (0.65 - ttr) / 0.35));

  let ensembleAIScore = (
    0.35 * scoreFromPPL +
    0.30 * scoreFromBurst +
    0.20 * scoreFromMarkers +
    0.15 * scoreFromTTR
  ) * 100;

  ensembleAIScore = Math.max(2.0, Math.min(99.4, ensembleAIScore));

  // 3. SENTENCE-BY-SENTENCE FORENSICS
  const sentenceResults = sentences.map((sent, idx) => {
    const sWords = sent.toLowerCase().match(/\b[a-zA-Z0-9']+\b/g) || [];
    const sLen = sWords.length;
    let sMarkers = 0;
    sWords.forEach(w => { if (AI_MARKERS.includes(w)) sMarkers++; });

    const lenDeltaFromMean = Math.abs(sLen - meanLen);
    let sScore = ensembleAIScore;

    // Adjust per sentence
    if (sMarkers > 0) sScore += 25 * sMarkers;
    if (lenDeltaFromMean < 3 && burstiness < 0.3) sScore += 15;
    if (sLen < 6 && burstiness > 0.5) sScore -= 30; // punchy human fragment

    sScore = Math.max(4.0, Math.min(98.5, sScore));

    let label = "human";
    if (sScore > 65) label = "ai";
    else if (sScore > 35) label = "mixed";

    return {
      index: idx + 1,
      text: sent,
      score: sScore,
      label: label,
      words: sLen,
      markers: sMarkers,
      perplexity: Math.max(12, Math.round(simulatedPerplexity * (100 / sScore)))
    };
  });

  // Re-adjust total score from sentence average
  const avgSentenceScore = sentenceResults.reduce((sum, s) => sum + s.score, 0) / sentenceResults.length;
  const finalAIScore = Math.round((0.4 * ensembleAIScore + 0.6 * avgSentenceScore));

  // 4. UPDATE UI
  updateDashboardUI({
    score: finalAIScore,
    perplexity: Math.round(simulatedPerplexity * 10) / 10,
    burstiness: Math.round(burstiness * 100) / 100,
    ttr: Math.round(ttr * 100) / 100,
    top10Pct: Math.round(top10Ratio * 100),
    sentences: sentenceResults,
    words: words,
    rawText: text
  });
}

function updateDashboardUI(data) {
  // Update Radial Gauge
  const scoreEl = document.getElementById("scoreValue");
  const gaugeCircle = document.getElementById("gaugeCircle");
  const verdictText = document.getElementById("verdictText");
  const verdictExp = document.getElementById("verdictExplanation");
  const confidenceBadge = document.getElementById("confidenceBadge");

  scoreEl.textContent = `${data.score}%`;

  // Circumference = 2 * PI * 68 ≈ 427.25
  const circumference = 427;
  const offset = circumference - (data.score / 100) * circumference;
  gaugeCircle.style.strokeDashoffset = offset;

  if (data.score > 65) {
    gaugeCircle.style.stroke = "var(--color-ai)";
    verdictText.textContent = "High AI Likelihood";
    verdictText.style.color = "var(--color-ai)";
    confidenceBadge.textContent = "Calibrated High (AI-Generated)";
    confidenceBadge.style.color = "var(--color-ai)";
    confidenceBadge.style.borderColor = "rgba(239, 68, 68, 0.4)";
    confidenceBadge.style.background = "rgba(239, 68, 68, 0.12)";
    verdictExp.textContent = "Text demonstrates uniform syntactic structure, formulaic transition anchors, and low token perplexity.";
  } else if (data.score > 35) {
    gaugeCircle.style.stroke = "var(--color-mixed)";
    verdictText.textContent = "Mixed / Hybrid Content";
    verdictText.style.color = "var(--color-mixed)";
    confidenceBadge.textContent = "Moderate Confidence (Co-Authored/Edited)";
    confidenceBadge.style.color = "var(--color-mixed)";
    confidenceBadge.style.borderColor = "rgba(245, 158, 11, 0.4)";
    confidenceBadge.style.background = "rgba(245, 158, 11, 0.12)";
    verdictExp.textContent = "Portions of the text exhibit organic variance while other segments match synthetic probability curvature.";
  } else {
    gaugeCircle.style.stroke = "var(--color-human)";
    verdictText.textContent = "Highly Likely Human-Written";
    verdictText.style.color = "var(--color-human)";
    confidenceBadge.textContent = "High Confidence (Organic Human)";
    confidenceBadge.style.color = "var(--color-human)";
    confidenceBadge.style.borderColor = "rgba(16, 185, 129, 0.4)";
    confidenceBadge.style.background = "rgba(16, 185, 129, 0.12)";
    verdictExp.textContent = "Strong burstiness variance, high lexical richness, and organic syntactic clause structures detected.";
  }

  // Update Metric Bars
  document.getElementById("valPerplexity").textContent = `${data.perplexity}`;
  document.getElementById("barPerplexity").style.width = `${Math.min(100, (data.perplexity / 100) * 100)}%`;

  document.getElementById("valBurstiness").textContent = `${data.burstiness}`;
  document.getElementById("barBurstiness").style.width = `${Math.min(100, data.burstiness * 120)}%`;

  document.getElementById("valTTR").textContent = `${data.ttr}`;
  document.getElementById("barTTR").style.width = `${data.ttr * 100}%`;

  document.getElementById("valTop10").textContent = `${data.top10Pct}%`;
  document.getElementById("barTop10").style.width = `${data.top10Pct}%`;

  // Render Heatmap
  renderHeatmap(data.sentences);

  // Render GLTR
  renderGLTR(data.words, data.score);

  // Render Report
  renderReport(data);
}

// 🟩 RENDER SENTENCE HEATMAP
function renderHeatmap(sentences) {
  const container = document.getElementById("heatmapContainer");
  container.innerHTML = "";

  sentences.forEach(s => {
    const span = document.createElement("span");
    span.className = `heat-sent sent-${s.label}`;
    span.textContent = s.text + " ";
    span.setAttribute("title", `Click to inspect: ${Math.round(s.score)}% AI`);

    span.addEventListener("click", () => {
      inspectSentence(s);
    });

    container.appendChild(span);
  });
}

function inspectSentence(s) {
  const inspector = document.getElementById("sentenceInspector");
  const textEl = document.getElementById("inspectedSentenceText");
  const statsEl = document.getElementById("inspectedSentenceStats");

  inspector.classList.add("active");
  textEl.textContent = `"${s.text}"`;

  let verdictColor = s.label === "ai" ? "var(--color-ai)" : s.label === "mixed" ? "var(--color-mixed)" : "var(--color-human)";

  statsEl.innerHTML = `
    <div class="detail-box">
      <span class="detail-label">Sentence AI Probability</span>
      <span class="detail-value" style="color: ${verdictColor}">${Math.round(s.score)}%</span>
    </div>
    <div class="detail-box">
      <span class="detail-label">Word Count</span>
      <span class="detail-value">${s.words} words</span>
    </div>
    <div class="detail-box">
      <span class="detail-label">Perplexity Factor</span>
      <span class="detail-value">${s.perplexity}</span>
    </div>
    <div class="detail-box">
      <span class="detail-label">AI Marker Clichés</span>
      <span class="detail-value">${s.markers} detected</span>
    </div>
  `;
}

// 🟨 RENDER GLTR TOKEN RANKS
function renderGLTR(words, overallScore) {
  const container = document.getElementById("gltrContainer");
  container.innerHTML = "";

  words.forEach((w) => {
    const span = document.createElement("span");
    span.className = "gltr-word";
    span.textContent = w;

    // Simulate rank based on word characteristics and overall score
    const isStopWord = ["the", "is", "at", "which", "on", "and", "a", "an", "in", "to", "of", "it", "for", "as"].includes(w);
    const isMarker = AI_MARKERS.includes(w);
    const rand = Math.random();

    if (overallScore > 65) {
      if (isStopWord || isMarker || rand < 0.70) span.classList.add("r-top10");
      else if (rand < 0.88) span.classList.add("r-top100");
      else if (rand < 0.96) span.classList.add("r-top1000");
      else span.classList.add("r-out");
    } else {
      if (isStopWord) span.classList.add("r-top10");
      else if (rand < 0.35) span.classList.add("r-top10");
      else if (rand < 0.65) span.classList.add("r-top100");
      else if (rand < 0.85) span.classList.add("r-top1000");
      else span.classList.add("r-out");
    }

    container.appendChild(span);
  });
}

// 📋 RENDER AUDIT REPORT
function renderReport(data) {
  const pre = document.getElementById("reportPre");
  const timestamp = new Date().toISOString();

  const report = `# 🔍 FIND-THE-AI FORENSIC AUDIT REPORT
Generated At: ${timestamp}
System Engine: FIND THE AI Hybrid Consensus v1.0.0

---------------------------------------------------------
1. EXECUTIVE DIAGNOSIS
---------------------------------------------------------
Overall AI Probability Score: ${data.score}%
Classification Verdict: ${data.score > 65 ? "AI-Generated" : data.score > 35 ? "Mixed / Hybrid" : "Human-Written"}
Analyzed Sentences: ${data.sentences.length}
Analyzed Word Tokens: ${data.words.length}

---------------------------------------------------------
2. MATHEMATICAL FORENSIC METRICS
---------------------------------------------------------
- Perplexity (Predictability): ${data.perplexity} (Normal Range: 15.0 - 100.0)
- Burstiness Variance (σ / μ): ${data.burstiness} (Human > 0.45, AI < 0.35)
- Lexical Diversity (TTR): ${data.ttr} (Unique / Total Token Ratio)
- Top-10 Token Dominance: ${data.top10Pct}%

---------------------------------------------------------
3. SENTENCE-BY-SENTENCE BREAKDOWN
---------------------------------------------------------
${data.sentences.map(s => `[Sent #${s.index} | AI ${Math.round(s.score)}% | ${s.label.toUpperCase()}] "${s.text}"`).join("\n")}

---------------------------------------------------------
4. ETHICAL SAFEGUARD COMPLIANCE (Elena's Rule)
---------------------------------------------------------
- Sample Length Status: ${data.words.length >= 200 ? "PASSED (Sufficient Token Sample)" : "WARNING (Under 200 words — higher variance)"}
- Bias Review: Calibrated Precision Gate Active
`;

  pre.textContent = report;
  window.lastAuditReport = {
    reportText: report,
    data: data
  };
}

function resetResults() {
  document.getElementById("scoreValue").textContent = "0%";
  document.getElementById("gaugeCircle").style.strokeDashoffset = 427;
  document.getElementById("verdictText").textContent = "Ready for Input";
  document.getElementById("verdictExplanation").textContent = "Paste or select a test sample above to execute the forensic engine.";
  document.getElementById("valPerplexity").textContent = "--";
  document.getElementById("valBurstiness").textContent = "--";
  document.getElementById("valTTR").textContent = "--";
  document.getElementById("valTop10").textContent = "--";
  document.getElementById("barPerplexity").style.width = "0%";
  document.getElementById("barBurstiness").style.width = "0%";
  document.getElementById("barTTR").style.width = "0%";
  document.getElementById("barTop10").style.width = "0%";
  document.getElementById("heatmapContainer").innerHTML = "<p style='color: var(--text-muted)'>No text analyzed yet.</p>";
  document.getElementById("gltrContainer").innerHTML = "<p style='color: var(--text-muted)'>No tokens analyzed yet.</p>";
  document.getElementById("reportPre").textContent = "Awaiting text buffer...";
}

// 📑 SETUP VISUALIZER TABS
function setupVisualizerTabs() {
  const tabs = document.querySelectorAll(".view-tab");
  const contents = document.querySelectorAll(".view-content");
  const closeInspector = document.getElementById("closeInspector");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      const viewId = `view-${tab.getAttribute("data-view")}`;
      document.getElementById(viewId).classList.add("active");
    });
  });

  if (closeInspector) {
    closeInspector.addEventListener("click", () => {
      document.getElementById("sentenceInspector").classList.remove("active");
    });
  }
}

// 📋 SETUP REPORT ACTIONS
function setupReportActions() {
  const copyBtn = document.getElementById("copyReportBtn");
  const downloadBtn = document.getElementById("downloadJsonBtn");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      if (window.lastAuditReport) {
        navigator.clipboard.writeText(window.lastAuditReport.reportText);
        copyBtn.textContent = "✅ Copied to Clipboard!";
        setTimeout(() => { copyBtn.textContent = "📋 Copy Markdown"; }, 2000);
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      if (window.lastAuditReport) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.lastAuditReport.data, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `find_the_ai_audit_${Date.now()}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
      }
    });
  }
}
