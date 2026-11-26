#!/usr/bin/env python3
"""
Convert all sentences across src/data/stories/story*/ch*.ts from flat `breakdown`
lists into top-down pre-order depth-first `tree` structures.
"""

import copy

from story_io import iter_chapter_files, load_chapter_ts, save_chapter_ts


def _resolve_overlaps(spans: list[dict]) -> list[dict]:
    """Resolve any partial span overlaps by expanding the earlier enclosing phrase."""
    ordered = sorted(spans, key=lambda b: (b["span"][0], -(b["span"][1] - b["span"][0])))
    for i in range(len(ordered)):
        a0, a1 = ordered[i]["span"]
        for j in range(i + 1, len(ordered)):
            b0, b1 = ordered[j]["span"]
            if a0 < b0 <= a1 < b1:
                ordered[i]["span"] = [a0, b1]
                a1 = b1
    return ordered


def build_tree(breakdown: list[dict]) -> list[dict]:
    """Nest flat spans into a clean pre-order depth-first tree by interval containment."""
    nodes = [copy.deepcopy(b) for b in _resolve_overlaps(breakdown)]
    # Sort outermost-first: earlier start, wider span first
    nodes.sort(key=lambda b: (b["span"][0], -(b["span"][1] - b["span"][0])))

    roots: list[dict] = []
    # Track placed nodes in reverse order to find the tightest enclosing parent
    placed: list[dict] = []

    for node in nodes:
        s0, s1 = node["span"]
        parent = None
        for cand in reversed(placed):
            c0, c1 = cand["span"]
            if c0 <= s0 and s1 <= c1 and (c0, c1) != (s0, s1):
                parent = cand
                break

        if parent is not None:
            parent.setdefault("children", []).append(node)
        else:
            roots.append(node)
        placed.append(node)

    return roots


def main() -> None:
    converted_sentences = 0
    already_tree = 0
    updated_files = 0

    for _, _, filepath in iter_chapter_files():
        chapter, prefix, suffix = load_chapter_ts(filepath)
        changed = False

        for sent in chapter.get("sentences", []):
            if sent.get("tree"):
                already_tree += 1
                if "breakdown" in sent:
                    sent.pop("breakdown", None)
                    changed = True
                continue

            flat = sent.pop("breakdown", [])
            if flat:
                sent["tree"] = build_tree(flat)
                converted_sentences += 1
                changed = True

        if changed:
            save_chapter_ts(filepath, chapter, prefix, suffix)
            updated_files += 1

    print(
        f"Converted {converted_sentences} sentences to v2 tree "
        f"({already_tree} already had tree) across {updated_files} files."
    )


if __name__ == "__main__":
    main()
