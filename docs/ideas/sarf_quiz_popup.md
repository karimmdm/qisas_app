# Sarf Quiz Popup for Derived Verbs (Forms II–X)

## Problem Statement
How might we quiz students on **Sarf** (verb family II–X, person, gender, and number) directly inside the existing sentence quiz without cluttering the interface or bogging down common Form I verbs?

## Recommended Direction
Add an optional `sarf` metadata block to `BreakdownSpan` in `src/types/grammar.ts` exclusively for **non-Form I verbs (Forms II–X)**. Whenever `currentSpan.sarf` is present, `SentenceQuiz.vue` renders a dedicated **Sarf Analysis** button directly above the Nahw options.

Tapping this button opens a minimal, style-matched popup card containing **4 bilingual tap-pill rows**:
1. **Family (الْبَاب)**: Forms **II–X** (`II · فَعَّلَ`, `III · فَاعَلَ`, `IV · أَفْعَلَ`, `V · تَفَعَّلَ`, `VI · تَفَاعَلَ`, `VII · انْفَعَلَ`, `VIII · افْتَعَلَ`, `IX · افْعَلَّ`, `X · اسْتَفْعَلَ`)
2. **Person (الشَّخْص)**: `3rd · غَائِب` · `2nd · مُخَاطَب` · `1st · مُتَكَلِّم`
3. **Gender (الْجِنْس)**: `Masc · مُذَكَّر` · `Fem · مُؤَنَّث` *(auto-disabled when `1st · مُتَكَلِّم` is selected, since 1st-person Arabic verbs are gender-neutral)*
4. **Number (الْعَدَد)**: `Sing · مُفْرَد` · `Dual · مُثَنَّى` · `Plural · جَمْع`

Upon submitting a correct combination, the popup closes and the Sarf button turns green (`✓ Sarf: Form II · 3rd · Masc · Sing` or `✓ Sarf: Form IV · 1st · Sing`). The **"Next →"** button only unlocks once **both** the Nahw role(s) and the Sarf analysis are solved.

## Key Assumptions to Validate
- [ ] **1-Step Tap-Pills Fit on Mobile**: All 4 pill rows + Submit button fit comfortably inside one iPhone viewport without scrolling inside the popup.
- [ ] **Non-Form I Density**: Derived verbs (II–X) appear frequently enough to feel rewarding, yet rarely enough not to exhaust the student.
- [ ] **Data Accuracy**: Automated/LLM tagging of `sarf` across Stories 1–3 handles edge cases cleanly (e.g., hollow/defective Form IV/VIII verbs like `أَقَامَ` or `اخْتَارَ`).

## MVP Scope
- **In**:
  - `SarfInfo` TypeScript interface on `BreakdownSpan` (`family`, `person`, `gender?`, `number`).
  - "Identify Sarf" trigger button above Nahw options (`v-if="currentSpan.sarf"`).
  - Minimal popup card with 4 bilingual tap-pill rows, auto-disabled Gender for 1st-person, per-row feedback, and green solved state.
  - Gating `isUnitSolved` on `isNahwSolved && (!currentSpan.sarf || isSarfSolved)`.
  - Pilot tagging on **Story 1** (or Chapters 1–4) first to verify UX before scaling to all 63 chapters.
- **Out** (see below).

## Not Doing (and Why)
- **No Form I verbs** — ~80% of *Qisas* verbs are Form I; skipping them avoids repetitive clicking and spotlights derived patterns.
- **No native `<select>` dropdowns** — avoids iOS Safari's bottom spinner wheel and keeps the fast tap-chip feel consistent.
- **No Tense / Voice / Weak-root sub-categories yet** — keeps the popup minimal (4 rows max) and easy to complete in under 5 seconds.
- **No derived nouns (اسْم فَاعِل / مَفْعُول / مَصْدَر) in v1** — keeps scope strictly on verbs until the verb flow feels effortless.
