#!/usr/bin/env python3
"""
Enrich Composed Grammar Roles across all 63 Chapters

1. Fixes the 6 Story 2 pronoun bugs where huwa/humu was misclassified as harf jarr.
2. Composes "اِسْمُ إِشَارَةٍ" onto all demonstrative pronoun spans.
3. Composes "اِسْمٌ مَوْصُولٌ" onto all relative pronoun spans.
4. Composes "ضَمِيرٌ مُنْفَصِلٌ" onto all detached personal pronoun spans.
5. Recompiles all chapter TS files and updates public/data/ JSON files.
"""

import os
import re
import json
import glob

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STORIES_DIR = os.path.join(REPO_ROOT, "src", "data", "stories")

DEMONSTRATIVES = {
    "هذا", "هذه", "هؤلاء", "ذلك", "تلك", "اولئك", "هـذا", "هـذه", "هـؤلاء", "ذلـك", "اولـئك"
}

RELATIVES = {
    "الذي", "التي", "الذين", "اللائي", "اللاتي"
}

DETACHED_PRONOUNS = {
    "انا", "انت", "انتما", "انتم", "انتن",
    "هو", "هي", "هما", "هم", "هن",
    "نحن"
}

def clean_arabic(text: str) -> str:
    # Remove harakat and superscripts
    text = re.sub(r'[\u064B-\u065F\u0670\u0640]', '', text)
    # Normalize alifs
    text = re.sub(r'[إأآٱ]', 'ا', text)
    return text.strip()

def process_chapter_file(filepath: str):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    match = re.search(r'const\s+\w+\s*:\s*Chapter\s*=\s*(\{[\s\S]*\});?\s*(?:export|$)', content)
    if not match:
        print(f"⚠️ Could not parse JSON in {filepath}")
        return 0, 0, 0, 0

    chapter = json.loads(match.group(1))
    
    fixed_harf_jarr = 0
    added_ishara = 0
    added_mawsool = 0
    added_damir = 0

    for sentence in chapter.get("sentences", []):
        tokens = sentence.get("tokens", [])
        for b in sentence.get("breakdown", []):
            span = b.get("span", [])
            if len(span) == 2 and span[0] == span[1]:
                idx = span[0]
                if idx < len(tokens):
                    tok = tokens[idx]
                    tok_clean = clean_arabic(tok)
                    roles = b.get("roles", [])

                    # 1. Fix pronoun misclassified as harf jarr
                    if "حَرْفُ جَرٍّ" in roles and tok_clean in {"هو", "هم", "هما", "هي", "هن"}:
                        roles = [r for r in roles if r != "حَرْفُ جَرٍّ"]
                        if "ضَمِيرٌ مُنْفَصِلٌ" not in roles:
                            roles.append("ضَمِيرٌ مُنْفَصِلٌ")
                        if "ضَمِيرُ فَصْلٍ" not in roles:
                            roles.append("ضَمِيرُ فَصْلٍ")
                        b["category"] = "murakkabat"
                        b["roles"] = roles
                        fixed_harf_jarr += 1

                    # 2. Demonstratives
                    if tok_clean in DEMONSTRATIVES:
                        if "اِسْمُ إِشَارَةٍ" not in roles:
                            roles.insert(0, "اِسْمُ إِشَارَةٍ")
                            b["roles"] = roles
                            added_ishara += 1

                    # 3. Relative Pronouns
                    elif tok_clean in RELATIVES:
                        if "اِسْمٌ مَوْصُولٌ" not in roles:
                            roles.insert(0, "اِسْمٌ مَوْصُولٌ")
                            b["roles"] = roles
                            added_mawsool += 1

                    # 4. Detached Pronouns
                    elif tok_clean in DETACHED_PRONOUNS:
                        if "ضَمِيرٌ مُنْفَصِلٌ" not in roles:
                            roles.insert(0, "ضَمِيرٌ مُنْفَصِلٌ")
                            b["roles"] = roles
                            added_damir += 1

    # Format chapter object back to TypeScript
    var_match = re.search(r'const\s+(\w+)\s*:\s*Chapter', content)
    var_name = var_match.group(1) if var_match else "chapter"
    
    formatted_json = json.dumps(chapter, ensure_ascii=False, indent=2)
    new_content = f'import type {{ Chapter }} from "../../../types/grammar";\n\nexport const {var_name}: Chapter = {formatted_json};\n\nexport default {var_name};\n'
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    return fixed_harf_jarr, added_ishara, added_mawsool, added_damir

def main():
    total_harf_jarr = 0
    total_ishara = 0
    total_mawsool = 0
    total_damir = 0

    story_dirs = sorted(glob.glob(os.path.join(STORIES_DIR, "story*")))
    for s_dir in story_dirs:
        story_name = os.path.basename(s_dir)
        ch_files = sorted(glob.glob(os.path.join(s_dir, "ch*.ts")), 
                           key=lambda x: int(re.search(r'ch(\d+)\.ts', x).group(1)))
        print(f"\nScanning {story_name} ({len(ch_files)} chapters)...")
        for ch_file in ch_files:
            fj, ai, am, ad = process_chapter_file(ch_file)
            total_harf_jarr += fj
            total_ishara += ai
            total_mawsool += am
            total_damir += ad

    print("\n" + "="*50)
    print("✨ Migration Complete:")
    print(f"  Fixed pronoun-as-preposition bugs: {total_harf_jarr}")
    print(f"  Composed 'اِسْمُ إِشَارَةٍ' added:       {total_ishara}")
    print(f"  Composed 'اِسْمٌ مَوْصُولٌ' added:     {total_mawsool}")
    print(f"  Composed 'ضَمِيرٌ مُنْفَصِلٌ' added:     {total_damir}")
    print("="*50)

if __name__ == "__main__":
    main()
