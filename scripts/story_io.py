"""Shared I/O and Arabic text helpers for story chapter TypeScript scripts."""

import json
import os
import re
from typing import Iterator

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STORIES_DIR = os.path.join(REPO_ROOT, "src", "data", "stories")

_HARAKAT_RE = re.compile(r"[\u064B-\u065F\u0670\u0640]")
_TS_OBJECT_RE = re.compile(
    r"((?:export\s+)?const\s+\w+(?::\s*\w+)?\s*=\s*)(\{[\s\S]*\})(;?(?:\s*export\s+default\s+\w+;)?\s*)$"
)


def strip_harakat(text: str) -> str:
    """Remove Arabic diacritics (harakat), superscript alif, and tatweel."""
    return _HARAKAT_RE.sub("", text)


def iter_chapter_files() -> Iterator[tuple[str, str, str]]:
    """Yield (story_dirname, filename, full_path) in numeric story/chapter order."""
    story_dirs = sorted(
        (d for d in os.listdir(STORIES_DIR) if d.startswith("story") and os.path.isdir(os.path.join(STORIES_DIR, d))),
        key=lambda x: int(re.search(r"\d+", x).group()),
    )
    for s_dir in story_dirs:
        s_path = os.path.join(STORIES_DIR, s_dir)
        ch_files = sorted(
            (f for f in os.listdir(s_path) if f.startswith("ch") and f.endswith(".ts")),
            key=lambda x: int(re.search(r"\d+", x).group()),
        )
        for ch_file in ch_files:
            yield s_dir, ch_file, os.path.join(s_path, ch_file)


def load_chapter_ts(filepath: str) -> tuple[dict, str, str]:
    """Parse a TypeScript chapter file and return (chapter_dict, prefix, suffix)."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    match = _TS_OBJECT_RE.search(content)
    if not match:
        raise ValueError(f"Could not find exported chapter object in {filepath}")

    prefix = content[: match.start()] + match.group(1)
    raw_obj = match.group(2)
    suffix = match.group(3)

    try:
        return json.loads(raw_obj), prefix, suffix
    except json.JSONDecodeError:
        cleaned = re.sub(r"//.*$", "", raw_obj, flags=re.MULTILINE)
        cleaned = re.sub(r'([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1"\2":', cleaned)
        cleaned = re.sub(r",\s*([}\]])", r"\1", cleaned)
        return json.loads(cleaned), prefix, suffix


def save_chapter_ts(filepath: str, chapter: dict, prefix: str, suffix: str) -> None:
    """Serialize a chapter dict back to its TypeScript file."""
    formatted = json.dumps(chapter, ensure_ascii=False, indent=2)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(prefix + formatted + suffix)
