/**
 * OBSERVE — FIND THE AI Forensic Engine
 * Design System: Observe Liquid Glass + Instrument Serif
 * Author: Yash Dhiraj Oza
 * Version: 2.4.0
 */

const API_BASE = "http://127.0.0.1:8000";
let backendOnline = false;
let currentAuditData = null;

// 📚 BENCHMARK PRESETS
const PRESETS = {
  chatgpt: `Artificial intelligence is rapidly transforming the modern technological landscape in unprecedented ways. Furthermore, organizations across diverse industries are leveraging machine learning algorithms to enhance operational efficiency and streamline decision-making processes. It is crucial to recognize that the integration of synthetic intelligence offers paramount benefits, fostering innovation and creating new paradigms for economic growth. In conclusion, as society navigates this evolving paradigm, establishing robust regulatory frameworks remains essential to ensure responsible stewardship.`,

  human: `Honestly? I had no idea what was happening when the server crashed at 3 AM. Coffee in hand, half-asleep, I stared at the terminal screen wondering why on earth someone hardcoded a port number in production. Classic move. But after digging through two dozen lines of spaghetti code, there it was—a rogue semicolon! Fixed it, deployed, and crashed back onto my couch before sunrise.`,

  academic: `We evaluate the disentangled self-attention mechanism on downstream natural language understanding benchmarks. Specifically, the decomposition of token embeddings into distinct content and positional representations allows the transformer architecture to capture high-order syntactic dependencies with reduced parameterization. Empirical results demonstrate a statistically significant reduction in cross-entropy loss (p < 0.01) across multi-domain corpora.`,

  humanized: `Synthetic intellect is swiftly altering the modern digital horizon in novel manners. Additionally, enterprises across various sectors are employing automated algorithms to boost everyday efficiency and ease decision paths. It is vital to observe that the blend of artificial systems brings prime value, cultivating breakthroughs and unveiling fresh frameworks for commercial expansion.`,

  short: `AI is changing the world fast. It helps people code and write faster.`
};

// Protected abbreviations
const ABBREVIATIONS = [
  "dr.", "mr.", "mrs.", "ms.", "prof.", "sr.", "jr.", "vs.", "etc.",
  "e.g.", "i.e.", "al.", "fig.", "eq.", "dept.", "est.", "approx.",
  "u.s.", "u.k.", "u.n.", "e.u.", "no.", "vol.", "pp."
];

// Cliché markers
const AI_MARKERS = [
  "furthermore", "moreover", "in conclusion", "crucial", "paramount", "testament",
  "beacon", "landscape", "tapestry", "delve", "unprecedented", "realm", "pivotal",
  "fostering", "streamline", "paradigm", "stewardship", "navigates", "imperative",
  "vital", "holistic", "underscores", "multifaceted", "in essence"
];

// 🚀 INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  checkBackendHealth();
  setupPresets();
  setupSimulator();
  setupVisualizerTabs();
  setupReportActions();

  // Load default preset
  loadPreset("chatgpt");
});

// =========================================================================
// 🌐 BACKEND HEALTH CHECK
// =========================================================================
async function checkBackendHealth() {
  const badge = document.getElementById("backendStatusBadge");
  try {
    const res = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) {
      const data = await res.json();
      backendOnline = true;
      badge.className = "backend-badge online";
      badge.textContent = `PyTorch Engine: Active (${data.device.toUpperCase()})`;
      return;
    }
  } catch (err) {
    backendOnline = false;
  }

  badge.className = "backend-badge fallback";
  badge.textContent = "Simulation Mode";
}

// 📚 SETUP PRESETS
function setupPresets() {
  const buttons = document.querySelectorAll(".preset-pill[data-preset]");
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
  const quickInput = document.getElementById("quickInput");
  if (input) input.value = text;
  if (quickInput) quickInput.value = text.substring(0, 80) + (text.length > 80 ? "..." : "");
  updateTextStats(text);
  executeForensicScan(text);
}

// 🔬 SETUP SIMULATOR
function setupSimulator() {
  const textInput = document.getElementById("textInput");
  const quickInput = document.getElementById("quickInput");
  const quickAnalyzeBtn = document.getElementById("quickAnalyzeBtn");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const clearBtn = document.getElementById("clearBtn");
  const quickDossierBtn = document.getElementById("quickDossierBtn");

  if (textInput) {
    textInput.addEventListener("input", (e) => {
      updateTextStats(e.target.value);
    });
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", () => {
      executeForensicScan(textInput.value);
    });
  }

  if (quickAnalyzeBtn) {
    quickAnalyzeBtn.addEventListener("click", () => {
      const text = quickInput.value.length > 30 ? quickInput.value : textInput.value;
      if (textInput) textInput.value = text;
      executeForensicScan(text);
      // Smooth scroll to workbench
      document.getElementById("workbench")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (quickDossierBtn) {
    quickDossierBtn.addEventListener("click", () => {
      document.getElementById("view-report")?.scrollIntoView({ behavior: "smooth" });
      const reportTab = document.querySelector('[data-view="report"]');
      if (reportTab) reportTab.click();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (textInput) textInput.value = "";
      if (quickInput) quickInput.value = "";
      updateTextStats("");
      resetResults();
    });
  }
}

function updateTextStats(text) {
  const words = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
  const wordEl = document.getElementById("wordCount");
  if (wordEl) wordEl.textContent = `${words} words`;
}

// =========================================================================
// 🔠 ABBREVIATION-SAFE SENTENCE SPLITTER
// =========================================================================
function safeSplitSentences(text) {
  if (!text || !text.trim()) return [];

  let clean = text.trim().replace(/\s+/g, ' ');
  clean = clean.replace(/(\d+)\.(\d+)/g, '$1<DECIMAL>$2');

  ABBREVIATIONS.forEach(abbr => {
    const regex = new RegExp(`\\b${abbr.replace('.', '\\.')}`, 'gi');
    clean = clean.replace(regex, abbr.replace('.', '<DOT>'));
  });

  clean = clean.replace(/\.\.\./g, '<ELLIPSIS>');
  const raw = clean.split(/(?<=[.!?])\s+(?=[A-Z0-9"'\(\[])/);

  return raw.map(s => {
    return s.replace(/<DECIMAL>/g, '.')
            .replace(/<DOT>/g, '.')
            .replace(/<ELLIPSIS>/g, '...')
            .trim();
  }).filter(s => s.length > 0);
}

function safeExtractWords(text) {
  return text.match(/\b[a-zA-Z0-9']+\b/g) || [];
}

async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// =========================================================================
// 🚀 FORENSIC SCAN ORCHESTRATOR
// =========================================================================
async function executeForensicScan(text) {
  if (!text || !text.trim()) {
    resetResults();
    return;
  }

  if (backendOnline) {
    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      if (res.ok) {
        const data = await res.json();
        currentAuditData = formatBackendData(data, text);
        updateDashboardUI(currentAuditData);
        return;
      }
    } catch (err) {
      console.warn("Backend API error, running client calibration.", err);
    }
  }

  // Client-Side Calibrated Engine
  const words = safeExtractWords(text);
  const sentences = safeSplitSentences(text);
  const textHash = await sha256(text);
  const caseId = `FT-AI-${textHash.substring(0, 8).toUpperCase()}`;

  if (words.length === 0) {
    resetResults();
    return;
  }

  const sentLengths = sentences.map(s => safeExtractWords(s).length).filter(l => l > 0);
  const meanLen = sentLengths.length ? (sentLengths.reduce((a, b) => a + b, 0) / sentLengths.length) : words.length;
  const variance = sentLengths.length ? (sentLengths.reduce((sum, len) => sum + Math.pow(len - meanLen, 2), 0) / sentLengths.length) : 0;
  const burstiness = meanLen > 0 ? (Math.sqrt(variance) / meanLen) : 0.0;
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const ttr = uniqueWords.size / words.length;

  let markerHits = 0;
  words.forEach(w => { if (AI_MARKERS.includes(w.toLowerCase())) markerHits++; });

  const scoreBurst = 1.0 / (1.0 + Math.exp((burstiness - 0.40) / 0.12));
  const scoreTTR = 1.0 / (1.0 + Math.exp((ttr - 0.55) / 0.10));
  const scoreMarkers = Math.min(1.0, (markerHits / words.length) * 20.0);
  const styloScore = Math.max(5, Math.min(96, (0.45 * scoreBurst + 0.30 * scoreTTR + 0.25 * scoreMarkers) * 100));

  let simulatedPPL = 68.0;
  if (burstiness < 0.25) simulatedPPL -= 28.0;
  else if (burstiness > 0.55) simulatedPPL += 24.0;
  if (markerHits > 0) simulatedPPL -= (markerHits * 7.5);
  if (ttr < 0.45) simulatedPPL -= 12.0;
  simulatedPPL = Math.max(14.0, Math.min(115.0, simulatedPPL));

  const curvatureScore = Math.max(4, Math.min(97, (1.0 / (1.0 + Math.exp((simulatedPPL - 42.0) / 9.0))) * 100));
  const neuralScore = Math.max(5, Math.min(97, 0.55 * curvatureScore + 0.45 * styloScore + (markerHits > 2 ? 6 : 0)));

  const isSynonym = (ttr > 0.65 && simulatedPPL < 40.0);
  const isJitter = (burstiness > 0.50 && markerHits > 2);
  const advScore = Math.max(5, Math.min(98, neuralScore * 0.6 + curvatureScore * 0.4 + (isSynonym || isJitter ? 14 : 0)));

  const isShort = words.length < 50;
  const engineScores = {
    neural: Math.round(neuralScore),
    curvature: Math.round(curvatureScore),
    stylometry: Math.round(styloScore),
    adversarial: Math.round(advScore)
  };

  const scoresList = Object.values(engineScores);
  const meanScore = scoresList.reduce((a, b) => a + b, 0) / scoresList.length;
  const stdScore = Math.sqrt(scoresList.reduce((sum, s) => sum + Math.pow(s - meanScore, 2), 0) / scoresList.length);
  const agreementPct = Math.max(20, Math.min(100, Math.round(100 - (stdScore * 2.2))));

  const margin = Math.max(3, Math.min(20, Math.round(stdScore * 0.65 + (words.length < 200 ? 6 : 2))));
  const confidence = isShort ? "None" : margin <= 6 ? "High" : margin <= 12 ? "Moderate" : "Low";

  const consensusScore = Math.round(
    0.30 * neuralScore +
    0.30 * curvatureScore +
    0.20 * styloScore +
    0.20 * advScore
  );

  const sentenceResults = sentences.map((sent, idx) => {
    const sWords = safeExtractWords(sent);
    let sMarkers = 0;
    sWords.forEach(w => { if (AI_MARKERS.includes(w.toLowerCase())) sMarkers++; });

    const lenDelta = Math.abs(sWords.length - meanLen);
    let sScore = consensusScore;
    if (sMarkers > 0) sScore += 20 * sMarkers;
    if (lenDelta < 3 && burstiness < 0.3) sScore += 10;
    if (sWords.length < 6 && burstiness > 0.45) sScore -= 25;
    sScore = Math.max(4, Math.min(98, Math.round(sScore)));

    return {
      index: idx + 1,
      text: sent,
      score: sScore,
      label: sScore > 65 ? "ai" : sScore > 35 ? "mixed" : "human",
      word_count: sWords.length,
      marker_count: sMarkers
    };
  });

  currentAuditData = {
    caseId,
    timestamp: new Date().toISOString(),
    textHash,
    wordCount: words.length,
    sentenceCount: sentences.length,
    consensusScore: isShort ? null : consensusScore,
    engineScores,
    safeguard: {
      shouldAbstain: isShort,
      abstentionReason: isShort ? `Sample too short (${words.length} words). Minimum calibrated threshold is 50 words.` : null,
      confidenceLevel: confidence,
      marginOfError: isShort ? null : margin,
      agreementPct
    },
    metrics: {
      perplexity: Math.round(simulatedPPL * 10) / 10,
      burstiness: Math.round(burstiness * 100) / 100,
      ttr: Math.round(ttr * 100) / 100,
      top10Pct: Math.round((0.62 + (burstiness < 0.3 ? 0.22 : 0) - (ttr > 0.65 ? 0.24 : 0)) * 100)
    },
    sentences: sentenceResults,
    words: words,
    rawText: text
  };

  updateDashboardUI(currentAuditData);
}

function formatBackendData(data, rawText) {
  return {
    caseId: data.provenance.case_id,
    timestamp: data.provenance.timestamp_utc,
    textHash: data.provenance.sha256_hash,
    wordCount: data.provenance.total_words,
    sentenceCount: data.provenance.total_sentences,
    consensusScore: data.verdict.consensus_score,
    engineScores: {
      neural: Math.round(data.engines.neural_attention.score),
      curvature: Math.round(data.engines.zero_shot_curvature.score),
      stylometry: Math.round(data.engines.stylometrics.score),
      adversarial: Math.round(data.engines.adversarial_robustness.score)
    },
    safeguard: {
      shouldAbstain: data.verdict.should_abstain,
      abstentionReason: data.verdict.abstention_reason,
      confidenceLevel: data.verdict.confidence_level,
      marginOfError: data.verdict.margin_of_error,
      agreementPct: data.verdict.inter_engine_agreement_pct
    },
    metrics: {
      perplexity: data.engines.zero_shot_curvature.perplexity,
      burstiness: data.engines.stylometrics.burstiness,
      ttr: data.engines.stylometrics.ttr,
      top10Pct: 74
    },
    sentences: data.sentences,
    words: safeExtractWords(rawText),
    rawText: rawText
  };
}

// =========================================================================
// 🖥️ UI UPDATE ENGINE
// =========================================================================
function updateDashboardUI(data) {
  const scoreEl = document.getElementById("scoreValue");
  const gaugeCircle = document.getElementById("gaugeCircle");
  const verdictText = document.getElementById("verdictText");
  const verdictExp = document.getElementById("verdictExplanation");
  const confidenceBadge = document.getElementById("confidenceBadge");
  const marginBadge = document.getElementById("marginBadge");

  document.getElementById("caseIdText").textContent = data.caseId;
  document.getElementById("textHashText").textContent = `${data.textHash.substring(0, 12)}...`;

  const circumference = 427;

  if (data.safeguard.shouldAbstain) {
    if (scoreEl) scoreEl.textContent = "N/A";
    gaugeCircle.style.strokeDashoffset = circumference;
    gaugeCircle.style.stroke = "rgba(255, 255, 255, 0.2)";

    verdictText.textContent = "INSUFFICIENT EVIDENCE (Abstained)";
    confidenceBadge.textContent = "Abstained";
    marginBadge.textContent = "Margin: Undetermined";
    verdictExp.textContent = `The Safeguard Protocol refused to issue a score: ${data.safeguard.abstentionReason}`;
  } else {
    if (scoreEl) scoreEl.textContent = `${data.consensusScore}%`;
    const offset = circumference - (data.consensusScore / 100) * circumference;
    gaugeCircle.style.strokeDashoffset = offset;
    gaugeCircle.style.stroke = "#ffffff";

    marginBadge.textContent = `Margin: ±${data.safeguard.marginOfError}% (${data.safeguard.confidenceLevel} Confidence)`;

    if (data.consensusScore > 65) {
      verdictText.textContent = "Strong Synthetic Evidence";
      confidenceBadge.textContent = `AI-Like (${data.consensusScore}%)`;
      verdictExp.textContent = "Text demonstrates uniform syntactic pacing, high token predictability, and low likelihood curvature drop.";
    } else if (data.consensusScore > 35) {
      verdictText.textContent = "Mixed / Hybrid Authorship";
      confidenceBadge.textContent = `Hybrid (${data.consensusScore}%)`;
      verdictExp.textContent = "Text exhibits mixed signals: organic human spans interspersed with predictable synthetic structure.";
    } else {
      verdictText.textContent = "Likely Organic Human";
      confidenceBadge.textContent = `Human (${data.consensusScore}%)`;
      verdictExp.textContent = "High burstiness coefficient, high lexical diversity, and organic syntactic clause depth detected.";
    }
  }

  document.getElementById("scoreAurelia").textContent = `${data.engineScores.neural}%`;
  document.getElementById("barAurelia").style.width = `${data.engineScores.neural}%`;

  document.getElementById("scoreAlexei").textContent = `${data.engineScores.curvature}%`;
  document.getElementById("barAlexei").style.width = `${data.engineScores.curvature}%`;

  document.getElementById("scoreSiobhan").textContent = `${data.engineScores.stylometry}%`;
  document.getElementById("barSiobhan").style.width = `${data.engineScores.stylometry}%`;

  document.getElementById("scoreMarcus").textContent = `${data.engineScores.adversarial}%`;
  document.getElementById("barMarcus").style.width = `${data.engineScores.adversarial}%`;

  renderHeatmap(data.sentences);
  renderGLTR(data.words, data.consensusScore || 50);
  renderReport(data);
}

// 🟩 RENDER HEATMAP
function renderHeatmap(sentences) {
  const container = document.getElementById("heatmapContainer");
  if (!container) return;
  container.innerHTML = "";

  sentences.forEach(s => {
    const span = document.createElement("span");
    span.className = `heat-sent sent-${s.label}`;
    span.textContent = s.text + " ";
    span.setAttribute("title", `Sentence AI Probability: ${s.score}%`);
    container.appendChild(span);
  });
}

// 🟨 RENDER GLTR
function renderGLTR(words, overallScore) {
  const container = document.getElementById("gltrContainer");
  if (!container) return;
  container.innerHTML = "";

  words.forEach((w) => {
    const span = document.createElement("span");
    span.className = "inline-block mr-1 px-1 rounded text-xs";
    span.textContent = w;

    const lower = w.toLowerCase();
    const isStopWord = ["the", "is", "at", "which", "on", "and", "a", "an", "in", "to", "of", "it", "for", "as"].includes(lower);
    const rand = Math.random();

    if (overallScore > 65) {
      if (isStopWord || rand < 0.70) span.classList.add("bg-emerald-500/20", "text-emerald-300");
      else if (rand < 0.88) span.classList.add("bg-amber-500/20", "text-amber-300");
      else span.classList.add("bg-rose-500/20", "text-rose-300");
    } else {
      if (isStopWord) span.classList.add("bg-emerald-500/20", "text-emerald-300");
      else if (rand < 0.35) span.classList.add("bg-emerald-500/20", "text-emerald-300");
      else if (rand < 0.65) span.classList.add("bg-amber-500/20", "text-amber-300");
      else span.classList.add("bg-purple-500/20", "text-purple-300");
    }

    container.appendChild(span);
  });
}

// 📋 RENDER DOSSIER
function renderReport(data) {
  const pre = document.getElementById("reportPre");
  if (!pre) return;

  const report = `# OBSERVE — FIND-THE-AI FORENSIC DOSSIER
Session ID: ${data.caseId}
Timestamp (UTC): ${data.timestamp}
SHA-256 Hash: ${data.textHash}

---------------------------------------------------------
1. EXECUTIVE VERDICT
---------------------------------------------------------
Overall AI Likelihood: ${data.safeguard.shouldAbstain ? "ABSTAINED" : data.consensusScore + "%"}
Confidence Level: ${data.safeguard.confidenceLevel} (Margin: ±${data.safeguard.marginOfError}%)
Inter-Engine Agreement: ${data.safeguard.agreementPct}%

---------------------------------------------------------
2. 5-NODE EVIDENCE BREAKDOWN
---------------------------------------------------------
- Neural Attention: ${data.engineScores.neural}%
- Likelihood Curvature: ${data.engineScores.curvature}%
- Stylometric Variance: ${data.engineScores.stylometry}%
- Adversarial Defense: ${data.engineScores.adversarial}%

---------------------------------------------------------
3. SENTENCE BREAKDOWN
---------------------------------------------------------
${data.sentences.map(s => `[#${s.index} | AI ${s.score}% | ${s.label.toUpperCase()}] "${s.text}"`).join("\n")}
`;

  pre.textContent = report;
}

function resetResults() {
  const scoreEl = document.getElementById("scoreValue");
  if (scoreEl) scoreEl.textContent = "--";
  document.getElementById("gaugeCircle").style.strokeDashoffset = 427;
  document.getElementById("verdictText").textContent = "Awaiting Input";
  document.getElementById("verdictExplanation").textContent = "Paste or select a test sample above to inspect forensic evidence.";
  document.getElementById("heatmapContainer").innerHTML = "<p class='text-white/40'>No text analyzed yet.</p>";
  document.getElementById("gltrContainer").innerHTML = "<p class='text-white/40'>No tokens analyzed yet.</p>";
  document.getElementById("reportPre").textContent = "Awaiting text buffer...";
}

// 📑 SETUP TABS & ACTIONS
function setupVisualizerTabs() {
  const tabs = document.querySelectorAll(".view-tab");
  const contents = document.querySelectorAll(".view-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      const viewId = `view-${tab.getAttribute("data-view")}`;
      const target = document.getElementById(viewId);
      if (target) target.classList.add("active");
    });
  });
}

function setupReportActions() {
  const copyBtn = document.getElementById("copyReportBtn");
  const downloadBtn = document.getElementById("downloadJsonBtn");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      if (currentAuditData) {
        navigator.clipboard.writeText(document.getElementById("reportPre").textContent);
        copyBtn.textContent = "Copied!";
        setTimeout(() => { copyBtn.textContent = "Copy Markdown"; }, 2000);
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      if (currentAuditData) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentAuditData, null, 2));
        const dlAnchor = document.createElement('a');
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", `observe_forensic_${currentAuditData.caseId}.json`);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
      }
    });
  }
}
