#!/usr/bin/env python3
"""
Validates TypeScript story chapter data (non-empty sentences/tokens/breakdowns,
valid span bounds, and non-empty roles).
"""

import json
import os
import re
import sys


def parse_ts_to_dict(ts_content: str) -> dict:
    """Extract and parse the chapter object literal from a TypeScript chapter file."""
    match = re.search(
        r"(?:export\s+)?const\s+\w+(?::\s*\w+)?\s*=\s*(\{[\s\S]*\});(?:\s*export\s+default\s+\w+;)?\s*$",
        ts_content,
    )
    if not match:
        raise ValueError("Could not find exported chapter object in file")

    raw_obj = match.group(1)
    try:
        return json.loads(raw_obj)
    except json.JSONDecodeError:
        cleaned = re.sub(r"//.*$", "", raw_obj, flags=re.MULTILINE)
        cleaned = re.sub(r'([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1"\2":', cleaned)
        cleaned = re.sub(r",\s*([}\]])", r"\1", cleaned)
        return json.loads(cleaned)


def validate_chapter(chapter: dict) -> list[str]:
    """Return a list of validation error strings for a single chapter dict."""
    errors = []
    sentences = chapter.get("sentences", [])
    if not sentences:
        errors.append("Chapter has no sentences")
        return errors

    for s_idx, sentence in enumerate(sentences):
        s_id = sentence.get("id", f"idx_{s_idx}")
        tokens = sentence.get("tokens", [])
        num_tokens = len(tokens)

        if num_tokens == 0:
            errors.append(f"Sentence {s_id} has no tokens")
            continue

        breakdown = sentence.get("breakdown", [])
        if not breakdown:
            errors.append(f"Sentence {s_id} has no breakdown spans")
            continue

        for b_idx, b in enumerate(breakdown):
            b_id = b.get("id", f"{s_id}_b{b_idx}")
            span = b.get("span")
            roles = b.get("roles", [])

            if not span or len(span) != 2:
                errors.append(f"[{s_id}] Span {b_id} must have [start, end]")
                continue

            start, end = span[0], span[1]
            if start < 0 or end >= num_tokens or start > end:
                errors.append(
                    f"[{s_id}] Span {b_id} ({start}, {end}) is out of bounds for token count ({num_tokens}): "
                    f"tokens are {tokens}"
                )

            if not roles:
                errors.append(f"[{s_id}] Span {b_id} must have at least one role")

    return errors


def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    stories_src_dir = os.path.join(repo_root, "src", "data", "stories")

    story_dirs = sorted(
        [d for d in os.listdir(stories_src_dir) if d.startswith("story") and os.path.isdir(os.path.join(stories_src_dir, d))],
        key=lambda x: int(re.search(r"\d+", x).group()),
    )
    if not story_dirs:
        print(f"No story directories found in {stories_src_dir}")
        sys.exit(1)

    total_chapters = 0
    total_sentences = 0
    all_errors = []

    for s_dirname in story_dirs:
        s_src_path = os.path.join(stories_src_dir, s_dirname)
        chapter_files = sorted(
            [f for f in os.listdir(s_src_path) if f.startswith("ch") and f.endswith(".ts")],
            key=lambda x: int(re.search(r"\d+", x).group()),
        )

        print(f"Validating {s_dirname} ({len(chapter_files)} chapters)...")
        for filename in chapter_files:
            src_file_path = os.path.join(s_src_path, filename)
            with open(src_file_path, "r", encoding="utf-8") as f:
                chapter_data = parse_ts_to_dict(f.read())

            errors = validate_chapter(chapter_data)
            if errors:
                for err in errors:
                    all_errors.append(f"{s_dirname}/{filename}: {err}")
            total_chapters += 1
            total_sentences += len(chapter_data.get("sentences", []))

    if all_errors:
        print("\nValidation failed with errors:")
        for err in all_errors:
            print(f"  - {err}")
        sys.exit(1)

    print(f"\nAll {total_chapters} chapters ({total_sentences} sentences) passed validation.")


if __name__ == "__main__":
    main()
