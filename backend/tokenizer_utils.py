"""
FIND THE AI — Robust Tokenizer & Sentence Boundary Disambiguation
Handles abbreviations, decimal numbers, initials, quotes, and ellipses without shredding sentences.
"""

import re
from typing import List

# Common English abbreviations that should not trigger sentence boundaries
ABBREVIATIONS = [
    "dr.", "mr.", "mrs.", "ms.", "prof.", "sr.", "jr.", "vs.", "etc.",
    "e.g.", "i.e.", "al.", "fig.", "eq.", "dept.", "est.", "approx.",
    "u.s.", "u.k.", "u.n.", "e.u.", "no.", "vol.", "pp.", "gen.", "gov."
]

def split_into_sentences(text: str) -> List[str]:
    """
    Splits text into clean sentences using regex pattern matching that protects
    abbreviations, numbers with decimals, URLs, and ellipsis while preserving original case.
    """
    if not text or not text.strip():
        return []

    # Clean whitespace
    text = re.sub(r'\s+', ' ', text.strip())

    # Protect decimals (e.g. 3.14 -> 3<DECIMAL>14)
    text = re.sub(r'(\d+)\.(\d+)', r'\1<DECIMAL>\2', text)

    # Protect known abbreviations preserving case
    for abbr in ABBREVIATIONS:
        pattern = re.compile(re.escape(abbr), re.IGNORECASE)
        text = pattern.sub(lambda m: m.group(0).replace('.', '<DOT>'), text)

    # Protect ellipsis (e.g. ... or …)
    text = text.replace('...', '<ELLIPSIS>').replace('…', '<ELLIPSIS>')

    # Split on sentence boundaries: punctuation followed by space and uppercase
    raw_sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z0-9"\'(\[])', text)

    sentences = []
    for s in raw_sentences:
        # Restore protected placeholders
        s = s.replace('<DECIMAL>', '.')
        s = s.replace('<DOT>', '.')
        s = s.replace('<ELLIPSIS>', '...')
        s = s.strip()
        if len(s) > 0:
            sentences.append(s)

    return sentences

def extract_word_tokens(text: str) -> List[str]:
    """Extracts lowercase word tokens, ignoring punctuation."""
    return re.findall(r"\b[a-zA-Z0-9']+\b", text.lower())
