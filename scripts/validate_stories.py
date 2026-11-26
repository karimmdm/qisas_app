#!/usr/bin/env python3
"""
Validates TypeScript story chapter data (non-empty sentences/tokens/breakdowns,
valid span bounds, and non-empty roles).
"""

import sys

from story_io import iter_chapter_files, load_chapter_ts


def validate_chapter(chapter: dict) -> list[str]:
    """Return a list of validation error strings for a single chapter dict."""
    errors = []
    sentences = chapter.get("sentences", [])
    if not sentences:
        return ["Chapter has no sentences"]

    for s_idx, sentence in enumerate(sentences):
        s_id = sentence.get("id", f"idx_{s_idx}")
        tokens = sentence.get("tokens", [])
        num_tokens = len(tokens)
        if num_tokens == 0:
            errors.append(f"Sentence {s_id} has no tokens")
            continue

        root_nodes = sentence.get("tree") or sentence.get("breakdown") or []
        if not root_nodes:
            errors.append(f"Sentence {s_id} has no tree or breakdown spans")
            continue

        def _check_nodes(nodes: list[dict]) -> None:
            for b_idx, b in enumerate(nodes):
                b_id = b.get("id", f"{s_id}_b{b_idx}")
                span = b.get("span")
                if not span or len(span) != 2:
                    errors.append(f"[{s_id}] Span {b_id} must have [start, end]")
                    continue

                start, end = span[0], span[1]
                if start < 0 or end >= num_tokens or start > end:
                    errors.append(
                        f"[{s_id}] Span {b_id} ({start}, {end}) is out of bounds for token count ({num_tokens}): "
                        f"tokens are {tokens}"
                    )

                if not b.get("roles"):
                    errors.append(f"[{s_id}] Span {b_id} must have at least one role")

                if b.get("children"):
                    _check_nodes(b["children"])

        _check_nodes(root_nodes)

    return errors


def main() -> None:
    total_chapters = 0
    total_sentences = 0
    all_errors = []
    seen_stories = set()

    for s_dirname, filename, filepath in iter_chapter_files():
        if s_dirname not in seen_stories:
            seen_stories.add(s_dirname)
            print(f"Validating {s_dirname}...")

        chapter_data, _, _ = load_chapter_ts(filepath)
        for err in validate_chapter(chapter_data):
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
