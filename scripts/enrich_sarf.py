#!/usr/bin/env python3
"""
Retroactively enrich BreakdownSpan objects in src/data/stories/story*/ch*.ts
with `sarf` metadata for non-Form I (derived) verbs (Forms II-X).

Usage:
  python3 scripts/enrich_sarf.py --dry-run   # Print all detected derived verbs without modifying files
  python3 scripts/enrich_sarf.py             # Write `sarf` metadata into all chapter .ts files
"""

import argparse
import re
from typing import Optional

from story_io import iter_chapter_files, load_chapter_ts, save_chapter_ts, strip_harakat

SHADDA = "\u0651"
SUKUN = "\u0652"
FATHA = "\u064E"
DAMMA = "\u064F"
KASRA = "\u0650"


def normalize_token(tok: str) -> str:
    """Strip trailing tatweel used when object pronouns were segmented separately."""
    return tok.rstrip("\u0640").strip()


def detect_tense(roles: list[str], tok: str = "") -> str:
    joined = re.sub(r"[إأآٱ]", "ا", strip_harakat(" ".join(roles)))
    if "ماض" in joined:
        return "past"
    if "مضارع" in joined:
        return "present"
    if "امر" in joined:
        return "imperative"

    # Fallback by vocalization when role is generic (e.g. "فِعْلٌ وَفَاعِلٌ")
    v = normalize_token(tok)
    clean = strip_harakat(v)
    if v.startswith("أُ") and v.endswith(FATHA):
        return "past"
    # Present tense markers: ends in damma (أَحْمِلُ, يَفْعَلُ), or defective 1st-person ُو (أَدْعُو), or starts with يَ/يُ/نَ/نُ
    if v.endswith((DAMMA, DAMMA + "و")) or v.endswith(("ونَ", "ِينَ", "انِ")):
        return "present"
    if re.match(r"^[ينت][َُ]", v) and not v.endswith((FATHA, "تْ", "تِ", "وْا", "ُوا")):
        return "present"
    # Form IV imperative: أَفْعِلْ / أَفْعِلُوا / أَكْرِمِي (kasra before final radical or sukun on end with kasra)
    if v.startswith("أَ") and SUKUN in v[:6] and KASRA in v and (v.endswith(SUKUN) or clean.endswith(("وا", "ي", "ا"))):
        return "imperative"
    return "past"


# Known Form I verbs that contain shadda (geminate roots like مَرَّ, ظَنَّ, حَجَّ, رَدَّ, فَرَّ, شَدَّ, دَلَّ, مَسَّ, هَمَّ, عَدَّ)
# or start with أَ / تَ (Form I hamza-initial like أَخَذَ, أَمَرَ, أَكَلَ, أَتَى, أَبَى, أَذِنَ or تَابَ, تَرَكَ, تَلَا)
FORM_1_EXCEPTIONS = {
    "مر", "ظن", "حج", "رد", "فر", "شد", "دل", "مس", "هم", "عد", "صب", "مد", "سر", "ضر", "ود", "حل", "قل", "مل",
    "اخذ", "امر", "اكل", "اتى", "ابى", "اذن", "امن", "اثر", "اسر", "اسف",
    "تؤمر", "يؤمر",  # Form I passive of أمر
    "تاب", "ترك", "تلا", "تبع", "تم",
}

# Known derived verbs whose orthographic form is compact (e.g. hollow/geminate Form IV like أراد, أقام, أحب, أجاب)
EXPLICIT_FAMILY_OVERRIDES: dict[str, int] = {
    "اراد": 4, "يريد": 4, "تريد": 4, "نريد": 4, "اريد": 4, "اردت": 4, "ارادوا": 4, "ارادت": 4,
    "اقام": 4, "يقيم": 4, "اقم": 4, "اقاموا": 4,
    "اجاب": 4, "يجيب": 4, "اجب": 4, "اجابوا": 4, "اجابت": 4,
    "احاط": 4, "يحيط": 4,
    "اصاب": 4, "يصيب": 4, "اصابوا": 4, "اصابت": 4,
    "اطاع": 4, "يطيع": 4, "اطيعوا": 4, "اطيعو": 4,
    "اعان": 4, "يعين": 4, "اعن": 4,
    "احب": 4, "يحب": 4, "تحب": 4, "نحب": 4, "احببت": 4, "احبوا": 4, "يحبون": 4,
    "احس": 4, "يحس": 4,
    "اتم": 4, "يتم": 4,
    "اوحى": 4, "يوحي": 4,
    "اوتوا": 4, "يؤتي": 4, "آتى": 4, "آتي": 4,
    "آمن": 4, "يؤمن": 4, "تؤمن": 4, "نؤمن": 4, "آمنوا": 4, "آمنت": 4, "يؤمنون": 4,
    "استطاع": 10, "يستطيع": 10, "تستطيع": 10, "استطاعوا": 10,
    "اختار": 8, "يختار": 8, "اختر": 8,
    "اتخذ": 8, "يتخذ": 8, "اتخذوا": 8,
    "اتقى": 8, "يتقي": 8, "تتقون": 8, "يتقون": 8, "اتقوا": 8, "اتق": 8,
    "اضطر": 8, "يضطر": 8,
    "اهتم": 8, "يهتم": 8,
    "ارتد": 8, "يرتد": 8,
    "امتلأ": 8, "يمتلئ": 8,
    "اطمأن": 10,  # Quad/complex derived, skip or handle if needed
}

# Remove prefixes/suffixes to inspect verb stem for overrides
PAST_SUFFIXES = ["تما", "تن", "تم", "تا", "نا", "وا", "و", "ت", "ن", "ا"]


def detect_family(tok: str, tense: str) -> Optional[int]:
    """Return 2..10 for derived verbs, or None for Form I / uncertain."""
    v = normalize_token(tok)
    clean = strip_harakat(v)
    # Normalize alif variants for lookup
    clean_norm = re.sub(r"[إأآٱ]", "ا", clean)

    if clean_norm in EXPLICIT_FAMILY_OVERRIDES:
        fam = EXPLICIT_FAMILY_OVERRIDES[clean_norm]
        return fam if 2 <= fam <= 10 else None

    if clean_norm in FORM_1_EXCEPTIONS:
        return None

    # 1. Form X: اِسْتَـ / يَسْتَـ / تَسْتَـ / أَسْتَـ / نَسْتَـ
    if clean_norm.startswith("است") and len(clean_norm) >= 6:
        return 10
    if tense == "present" and len(clean_norm) >= 6 and clean_norm[0] in "يتان" and clean_norm[1:4] == "ست":
        return 10

    # 2. Form VIII (check before Form VII so ن-initial Form VIII like انْتَشَرَ/انْتَظَرَ isn't misread as Form VII)
    if tense in ("past", "imperative") and re.match(r"^[اإ]ِ?[^َُِْ]ْ?تَ", v):
        stem = re.sub(r"(تما|تن|تم|تا|نا|وا|ت|ن|و)$", "", clean_norm)
        if len(stem) >= 5 and stem[2] == "ت":
            return 8
    if tense == "present" and re.match(r"^[يتأن]َ[^َُِْ]ْ?تَ", v) and len(clean_norm) >= 5:
        stem = re.sub(r"(ون|وا|ان|ين|ن)$", "", clean_norm)
        if len(stem) >= 5 and stem[2] == "ت":
            return 8

    # 3. Form VII: اِنْفَعَلَ / يَنْفَعِلُ (must have 5+ consonants in stem: ا + ن + R1 + R2 + R3)
    if tense in ("past", "imperative") and v.startswith(("اِنْ", "إنْ", "انْ")):
        stem = re.sub(r"(تما|تن|تم|تا|نا|وا|ت|ن|و)$", "", clean_norm)
        if len(stem) >= 5:
            return 7
    if tense == "present" and len(clean_norm) >= 6 and clean_norm[0] in "يتان" and clean_norm[1] == "ن" and (SUKUN in v[:6]):
        stem = re.sub(r"(ون|وا|ان|ين|ن)$", "", clean_norm)
        if len(stem) >= 6 and stem[1] == "ن":
            return 7

    # 4. Form VI: تَفَاعَلَ / يَتَفَاعَلُ
    if tense in ("past", "imperative") and clean_norm.startswith("ت") and len(clean_norm) >= 5 and clean_norm[2] == "ا":
        return 6
    if tense == "present" and len(clean_norm) >= 6 and clean_norm[0] in "يتان" and clean_norm[1] == "ت" and clean_norm[3] == "ا":
        return 6

    # 5. Form V: تَفَعَّلَ / يَتَفَعَّلُ (starts with ت / يت + shadda on middle radical)
    if tense in ("past", "imperative") and v.startswith("تَ") and SHADDA in v:
        return 5
    if tense == "present" and re.match(r"^[يتأن]َ?تَ", v) and SHADDA in v:
        return 5

    # 6. Form II: فَعَّلَ / يُفَعِّلُ / فَعِّلْ (shadda on 2nd radical)
    # Exclude Form I geminate verbs (like مَرَّ, يَمُرُّ, ظَنَّ, يَظُنُّ) where shadda is on the LAST letter!
    if SHADDA in v:
        # Check if shadda is NOT on the final radical
        # In Form II past: C1 + fatha + C2 + shadda + fatha + C3
        # In Form II present: [يتأن]ُ + C1 + fatha + C2 + shadda + kasra + C3
        if tense == "present" and re.match(r"^[يتأنأ]ُ", v):
            return 2
        if tense == "past" and not re.match(r"^[اأإ]", v) and re.search(r"[^ّ]" + SHADDA + FATHA + r"[^ّ]", v):
            return 2
        if tense == "imperative" and re.search(r"[^ّ]" + SHADDA + KASRA, v):
            return 2

    # 7. Form III: فَاعَلَ / يُفَاعِلُ / فَاعِلْ
    if tense == "present" and re.match(r"^[يتأنأ]ُ[^َُِْ]َ?ا", v):
        return 3
    if tense == "past" and not clean_norm.startswith(("ا", "ت")) and len(clean_norm) >= 4 and clean_norm[1] == "ا":
        # Exclude Form I hollow verbs (قَالَ, كَانَ, جَاءَ, رَآى, سَارَ, مَاتَ, خَافَ)!
        # Form I hollow has ONLY 3 letters in clean stem: ق-ا-ل (len 3 without suffixes).
        # Form III has 4 letters in stem: ب-ا-ر-ك, ق-ا-ت-ل, ن-ا-د-ى, ج-ا-د-ل (len >= 4).
        stem = re.sub(r"(تما|تن|تم|تا|نا|وا|ت|ن|و)$", "", clean_norm)
        if len(stem) >= 4 and stem[1] == "ا":
            return 3
    if tense == "imperative" and len(clean_norm) >= 4 and clean_norm[1] == "ا" and KASRA in v:
        return 3

    # 8. Form IV: أَفْعَلَ / يُفْعِلُ / أَفْعِلْ
    if tense == "past" and v.startswith("أَ") and SUKUN in v[:6]:
        # Verify sukūn is on the 2nd letter (أَ + C1 + ْ)
        if re.match(r"^أَ[^َُِْ]" + SUKUN, v):
            return 4
    if tense == "present" and re.match(r"^[يتأنأ]ُ[^َُِْ]" + SUKUN, v):
        return 4
    if tense == "imperative" and re.match(r"^أَ[^َُِْ]" + SUKUN, v) and KASRA in v:
        return 4

    return None


def detect_sighah(tok: str, tense: str) -> tuple[str, Optional[str], str, list[dict]]:
    """Return (person, gender, number, alternatives) for a verb token."""
    v = normalize_token(tok)
    clean = strip_harakat(v)

    if tense == "imperative":
        if v.endswith(("ي", "ِي")):
            return ("2nd", "fem", "singular", [])
        if clean.endswith(("وا", "و")):
            return ("2nd", "masc", "plural", [])
        if v.endswith("نَ"):
            return ("2nd", "fem", "plural", [])
        if clean.endswith("ا") and len(clean) >= 4:
            return ("2nd", "masc", "dual", [])
        return ("2nd", "masc", "singular", [])

    if tense == "past":
        if v.endswith("تُ"):
            return ("1st", None, "singular", [])
        if v.endswith("نَا"):
            return ("1st", None, "plural", [])
        if v.endswith("تَ"):
            return ("2nd", "masc", "singular", [])
        if v.endswith("تُمَا"):
            return ("2nd", "masc", "dual", [])
        if v.endswith(("تُمْ", "تُمُ")):
            return ("2nd", "masc", "plural", [])
        if v.endswith("تُنَّ"):
            return ("2nd", "fem", "plural", [])
        if v.endswith(("تْ", "تِ")) and not v.endswith("تْتِ"):
            if v.endswith(SUKUN + "تِ"):
                return ("2nd", "fem", "singular", [])
            return ("3rd", "fem", "singular", [])
        if v.endswith("تَا"):
            return ("3rd", "fem", "dual", [])
        if clean.endswith(("وا", "و")) or v.endswith(("وْا", "ُوا", "وْ", "ُو")):
            return ("3rd", "masc", "plural", [])
        if re.search(SUKUN + r"نَ$", v):
            return ("3rd", "fem", "plural", [])
        return ("3rd", "masc", "singular", [])

    # Present (مضارع)
    first = clean[0] if clean else ""
    if first in ("أ", "ا", "آ"):
        return ("1st", None, "singular", [])
    if first == "ن":
        return ("1st", None, "plural", [])

    if first == "ي":
        if v.endswith(("ونَ", "ُونَ", "وا", "ُوا", "وْ", "ُو")):
            return ("3rd", "masc", "plural", [])
        if v.endswith(("انِ", "َانِ")):
            return ("3rd", "masc", "dual", [])
        if re.search(SUKUN + r"نَ$", v):
            return ("3rd", "fem", "plural", [])
        return ("3rd", "masc", "singular", [])

    if first == "ت":
        if v.endswith(("ينَ", "ِينَ")):
            return ("2nd", "fem", "singular", [])
        if v.endswith(("ونَ", "ُونَ", "وا", "ُوا", "وْ", "ُو")):
            return ("2nd", "masc", "plural", [])
        if v.endswith(("انِ", "َانِ")):
            return ("2nd", "masc", "dual", [])
        if re.search(SUKUN + r"نَ$", v):
            return ("2nd", "fem", "plural", [])
        # Morphologically, تَـ/تُـ singular mudāriʿ is valid for both 3rd fem sing and 2nd masc sing
        return ("3rd", "fem", "singular", [{"person": "2nd", "gender": "masc"}])

    return ("3rd", "masc", "singular", [])


def process_chapter(filepath: str, dry_run: bool = False) -> list[tuple[str, int, str, str, str]]:
    chapter, prefix, suffix = load_chapter_ts(filepath)
    found = []

    for sent in chapter.get("sentences", []):
        tokens = sent.get("tokens", [])
        for b in sent.get("breakdown", []):
            if b.get("category") not in ("afal_tammah", "afal_naqisah"):
                continue
            span = b.get("span", [])
            if len(span) != 2 or span[0] != span[1] or span[0] >= len(tokens):
                continue

            tok = tokens[span[0]]
            tense = detect_tense(b.get("roles", []), tok)
            family = detect_family(tok, tense)
            if family is None:
                b.pop("sarf", None)
                continue

            person, gender, number, alternatives = detect_sighah(tok, tense)
            sarf_obj: dict = {"family": family, "person": person, "number": number}
            if person != "1st" and gender:
                sarf_obj["gender"] = gender
            if alternatives:
                sarf_obj["alternatives"] = alternatives

            b["sarf"] = sarf_obj
            found.append((tok, family, person, gender or "-", number))

    if not dry_run and found:
        save_chapter_ts(filepath, chapter, prefix, suffix)

    return found


def main() -> None:
    parser = argparse.ArgumentParser(description="Enrich chapter .ts files with Sarf metadata for Forms II-X verbs.")
    parser.add_argument("--dry-run", action="store_true", help="Inspect detections without modifying files.")
    args = parser.parse_args()

    total = 0
    unique_samples: dict[str, tuple[int, str, str, str]] = {}

    for _, _, ch_path in iter_chapter_files():
        results = process_chapter(ch_path, dry_run=args.dry_run)
        total += len(results)
        for tok, fam, per, gen, num in results:
            unique_samples[tok] = (fam, per, gen, num)

    mode = "DRY RUN" if args.dry_run else "UPDATED"
    print(f"[{mode}] Tagged {total} derived verb occurrences ({len(unique_samples)} unique tokens).")
    for tok, (fam, per, gen, num) in sorted(unique_samples.items())[:40]:
        print(f"  {tok} -> Form {fam} | {per} | {gen} | {num}")


if __name__ == "__main__":
    main()
