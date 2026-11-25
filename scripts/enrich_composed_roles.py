#!/usr/bin/env python3
"""
Enrich composed grammar roles across all story chapters:
1. Fixes pronouns misclassified as harf jarr.
2. Prepends demonstrative, relative, and detached pronoun roles where missing.
"""

import re

from story_io import iter_chapter_files, load_chapter_ts, save_chapter_ts, strip_harakat

DEMONSTRATIVES = {"هذا", "هذه", "هؤلاء", "ذلك", "تلك", "اولئك"}
RELATIVES = {"الذي", "التي", "الذين", "اللائي", "اللاتي"}
DETACHED_PRONOUNS = {"انا", "انت", "انتما", "انتم", "انتن", "هو", "هي", "هما", "هم", "هن", "نحن"}


def clean_arabic(text: str) -> str:
    return re.sub(r"[إأآٱ]", "ا", strip_harakat(text)).strip()


def process_chapter_file(filepath: str) -> tuple[int, int, int, int]:
    chapter, prefix, suffix = load_chapter_ts(filepath)
    fixed_harf_jarr = added_ishara = added_mawsool = added_damir = 0

    for sentence in chapter.get("sentences", []):
        tokens = sentence.get("tokens", [])
        for b in sentence.get("breakdown", []):
            span = b.get("span", [])
            if len(span) != 2 or span[0] != span[1] or span[0] >= len(tokens):
                continue

            tok_clean = clean_arabic(tokens[span[0]])
            roles = b.get("roles", [])

            if "حَرْفُ جَرٍّ" in roles and tok_clean in {"هو", "هم", "هما", "هي", "هن"}:
                roles = [r for r in roles if r != "حَرْفُ جَرٍّ"]
                for r in ("ضَمِيرٌ مُنْفَصِلٌ", "ضَمِيرُ فَصْلٍ"):
                    if r not in roles:
                        roles.append(r)
                b["category"] = "murakkabat"
                b["roles"] = roles
                fixed_harf_jarr += 1

            for vocab, role, counter_idx in (
                (DEMONSTRATIVES, "اِسْمُ إِشَارَةٍ", 0),
                (RELATIVES, "اِسْمٌ مَوْصُولٌ", 1),
                (DETACHED_PRONOUNS, "ضَمِيرٌ مُنْفَصِلٌ", 2),
            ):
                if tok_clean in vocab:
                    if role not in roles:
                        roles.insert(0, role)
                        b["roles"] = roles
                        if counter_idx == 0:
                            added_ishara += 1
                        elif counter_idx == 1:
                            added_mawsool += 1
                        else:
                            added_damir += 1
                    break

    if fixed_harf_jarr or added_ishara or added_mawsool or added_damir:
        save_chapter_ts(filepath, chapter, prefix, suffix)

    return fixed_harf_jarr, added_ishara, added_mawsool, added_damir


def main() -> None:
    totals = [0, 0, 0, 0]
    for _, _, ch_file in iter_chapter_files():
        counts = process_chapter_file(ch_file)
        for i, c in enumerate(counts):
            totals[i] += c

    print(
        f"Enrichment complete — fixed_harf_jarr={totals[0]}, "
        f"ishara={totals[1]}, mawsool={totals[2]}, damir={totals[3]}"
    )


if __name__ == "__main__":
    main()
