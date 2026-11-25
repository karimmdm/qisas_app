<template>
  <div class="sarf-modal-backdrop" @click.self="$emit('close')">
    <div class="sarf-modal-card" role="dialog" aria-modal="true" aria-label="Sarf Analysis">
      <div class="sarf-modal-header">
        <div>
          <span class="sarf-modal-kicker">Sarf Analysis</span>
          <p class="arabic-font sarf-modal-word">{{ word }}</p>
        </div>
        <button type="button" class="sarf-modal-close" @click="$emit('close')" aria-label="Close">✕</button>
      </div>

      <!-- 1. Family (II - X) -->
      <div class="sarf-group">
        <div class="sarf-group-label">
          <span>Family</span>
          <span class="arabic-font sarf-group-ar">الْبَاب</span>
        </div>
        <div class="sarf-pill-grid is-family">
          <button
            v-for="fam in SARF_FAMILIES"
            :key="fam.value"
            type="button"
            :disabled="solved"
            @click="selectField('family', fam.value)"
            :class="pillClass('family', fam.value)"
          >
            <span class="sarf-pill-en">{{ fam.roman }}</span>
            <span class="arabic-font sarf-pill-ar">{{ fam.pattern }}</span>
          </button>
        </div>
      </div>

      <!-- 2. Person -->
      <div class="sarf-group">
        <div class="sarf-group-label">
          <span>Person</span>
          <span class="arabic-font sarf-group-ar">الشَّخْص</span>
        </div>
        <div class="sarf-pill-row">
          <button
            v-for="p in SARF_PERSONS"
            :key="p.value"
            type="button"
            :disabled="solved"
            @click="selectPerson(p.value)"
            :class="pillClass('person', p.value)"
          >
            <span class="sarf-pill-en">{{ p.en }}</span>
            <span class="arabic-font sarf-pill-ar">{{ p.ar }}</span>
          </button>
        </div>
      </div>

      <!-- 3. Gender (Auto-disabled for 1st person) -->
      <div class="sarf-group" :class="{ 'is-disabled-group': isFirstPerson }">
        <div class="sarf-group-label">
          <span>
            Gender
            <span v-if="isFirstPerson" class="sarf-neutral-note">(gender-neutral)</span>
          </span>
          <span class="arabic-font sarf-group-ar">الْجِنْس</span>
        </div>
        <div class="sarf-pill-row">
          <button
            v-for="g in SARF_GENDERS"
            :key="g.value"
            type="button"
            :disabled="solved || isFirstPerson"
            @click="selectField('gender', g.value)"
            :class="isFirstPerson ? 'sarf-pill' : pillClass('gender', g.value)"
          >
            <span class="sarf-pill-en">{{ g.en }}</span>
            <span class="arabic-font sarf-pill-ar">{{ g.ar }}</span>
          </button>
        </div>
      </div>

      <!-- 4. Number -->
      <div class="sarf-group">
        <div class="sarf-group-label">
          <span>Number</span>
          <span class="arabic-font sarf-group-ar">الْعَدَد</span>
        </div>
        <div class="sarf-pill-row">
          <button
            v-for="n in SARF_NUMBERS"
            :key="n.value"
            type="button"
            :disabled="solved"
            @click="selectField('number', n.value)"
            :class="pillClass('number', n.value)"
          >
            <span class="sarf-pill-en">{{ n.en }}</span>
            <span class="arabic-font sarf-pill-ar">{{ n.ar }}</span>
          </button>
        </div>
      </div>

      <p v-if="wrongFields.size > 0" class="sarf-error-hint">
        Check the highlighted {{ wrongFields.size === 1 ? 'selection' : 'selections' }} and try again.
      </p>

      <button v-if="!solved" type="button" class="btn-sarf-submit" :disabled="!canSubmit" @click="submit">
        Check Sarf
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { SarfInfo, SarfFamily, SarfPerson, SarfGender, SarfNumber, SarfVariant } from "../types/grammar";

const props = defineProps<{
  word: string;
  target: SarfInfo;
  solved: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "solved", choice: SarfVariant): void;
}>();

const SARF_FAMILIES: { value: SarfFamily; roman: string; pattern: string }[] = [
  { value: 2, roman: "II", pattern: "فَعَّلَ" },
  { value: 3, roman: "III", pattern: "فَاعَلَ" },
  { value: 4, roman: "IV", pattern: "أَفْعَلَ" },
  { value: 5, roman: "V", pattern: "تَفَعَّلَ" },
  { value: 6, roman: "VI", pattern: "تَفَاعَلَ" },
  { value: 7, roman: "VII", pattern: "انْفَعَلَ" },
  { value: 8, roman: "VIII", pattern: "افْتَعَلَ" },
  { value: 9, roman: "IX", pattern: "افْعَلَّ" },
  { value: 10, roman: "X", pattern: "اسْتَفْعَلَ" },
];

const SARF_PERSONS: { value: SarfPerson; en: string; ar: string }[] = [
  { value: "3rd", en: "3rd", ar: "غَائِب" },
  { value: "2nd", en: "2nd", ar: "مُخَاطَب" },
  { value: "1st", en: "1st", ar: "مُتَكَلِّم" },
];

const SARF_GENDERS: { value: SarfGender; en: string; ar: string }[] = [
  { value: "masc", en: "Masc", ar: "مُذَكَّر" },
  { value: "fem", en: "Fem", ar: "مُؤَنَّث" },
];

const SARF_NUMBERS: { value: SarfNumber; en: string; ar: string }[] = [
  { value: "singular", en: "Sing", ar: "مُفْرَد" },
  { value: "dual", en: "Dual", ar: "مُثَنَّى" },
  { value: "plural", en: "Plural", ar: "جَمْع" },
];

const draft = ref<Partial<SarfInfo>>({});
const wrongFields = ref<Set<keyof SarfInfo>>(new Set());

watch(
  () => [props.target, props.solved] as const,
  ([target, solved]) => {
    wrongFields.value = new Set();
    draft.value = solved ? { ...target } : {};
  },
  { immediate: true }
);

const isFirstPerson = computed(() => draft.value.person === "1st");

const canSubmit = computed(() => {
  if (!draft.value.family || !draft.value.person || !draft.value.number) return false;
  return isFirstPerson.value || Boolean(draft.value.gender);
});

function pillClass<K extends keyof SarfInfo>(field: K, value: SarfInfo[K]) {
  return [
    "sarf-pill",
    {
      "is-selected": draft.value[field] === value,
      "is-wrong": wrongFields.value.has(field) && draft.value[field] === value,
      "is-correct": props.solved && props.target[field] === value,
    },
  ];
}

function clearWrong(field: keyof SarfInfo) {
  if (wrongFields.value.has(field)) {
    const next = new Set(wrongFields.value);
    next.delete(field);
    wrongFields.value = next;
  }
}

function selectField<K extends "family" | "gender" | "number">(field: K, val: NonNullable<SarfInfo[K]>) {
  draft.value[field] = val;
  clearWrong(field);
}

function selectPerson(val: SarfPerson) {
  draft.value.person = val;
  if (val === "1st") {
    draft.value.gender = undefined;
    clearWrong("gender");
  }
  clearWrong("person");
}

function submit() {
  if (!canSubmit.value) return;

  const validVariants: SarfVariant[] = [
    { person: props.target.person, gender: props.target.gender },
    ...(props.target.alternatives ?? []),
  ];

  const matchedVariant = validVariants.find(
    v => v.person === draft.value.person && (v.person === "1st" || v.gender === draft.value.gender)
  );

  const wrong = new Set<keyof SarfInfo>();
  if (draft.value.family !== props.target.family) wrong.add("family");
  if (draft.value.number !== props.target.number) wrong.add("number");

  if (!matchedVariant) {
    const personMatchesAny = validVariants.some(v => v.person === draft.value.person);
    const genderMatchesAny = validVariants.some(v => v.gender === draft.value.gender);
    if (!personMatchesAny) wrong.add("person");
    if (!isFirstPerson.value && !genderMatchesAny) wrong.add("gender");
    // If both person and gender exist individually in different variants (e.g. 3rd + masc), flag both
    if (personMatchesAny && genderMatchesAny) {
      wrong.add("person");
      wrong.add("gender");
    }
  }

  wrongFields.value = wrong;
  if (wrong.size === 0 && draft.value.person) {
    emit("solved", {
      person: draft.value.person,
      gender: isFirstPerson.value ? undefined : draft.value.gender,
    });
  }
}
</script>

<style scoped>
.sarf-modal-backdrop {
  position: absolute;
  inset: 0;
  z-index: 50;
  background-color: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.sarf-modal-card {
  width: 100%;
  max-width: 390px;
  max-height: 90%;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 18px;
  box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.18);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.sarf-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border);
}

.sarf-modal-kicker {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #4f46e5;
}

.sarf-modal-word {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-text-main);
  line-height: 1.4;
  margin-top: 2px;
}

.sarf-modal-close {
  width: 30px;
  height: 30px;
  border-radius: 9999px;
  background-color: #f1f5f9;
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sarf-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: opacity 0.15s ease;
}

.sarf-group.is-disabled-group {
  opacity: 0.45;
}

.sarf-group-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  color: #334155;
}

.sarf-neutral-note {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-muted);
  margin-left: 4px;
}

.sarf-group-ar {
  font-size: 14px;
  color: var(--color-text-muted);
}

.sarf-pill-grid.is-family {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.sarf-pill-row {
  display: flex;
  gap: 6px;
}

.sarf-pill-row .sarf-pill {
  flex: 1;
}

.sarf-pill {
  padding: 7px 8px;
  border-radius: 10px;
  border: 1.5px solid var(--color-border);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text-main);
  box-shadow: 0 2px 0 #e2e8f0;
  transition: all 0.12s ease;
}

.sarf-pill:disabled {
  cursor: not-allowed;
}

.sarf-pill.is-selected {
  border-color: var(--color-primary);
  background-color: var(--color-primary-light);
  color: #1e40af;
  box-shadow: 0 2px 0 #93c5fd;
}

.sarf-pill.is-wrong {
  border-color: var(--color-error);
  background-color: var(--color-error-bg);
  color: var(--color-error-dark);
  box-shadow: 0 2px 0 #fca5a5;
}

.sarf-pill.is-correct {
  border-color: var(--color-success);
  background-color: var(--color-success-bg);
  color: var(--color-success-dark);
  box-shadow: none;
}

.sarf-pill-en {
  font-size: 11px;
  font-weight: 800;
}

.sarf-pill-ar {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
}

.sarf-error-hint {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-error-dark);
  text-align: center;
}

.btn-sarf-submit {
  width: 100%;
  padding: 11px 16px;
  border-radius: 12px;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 3px 0 #3730a3;
  transition: all 0.15s ease;
}

.btn-sarf-submit:disabled {
  background-color: #cbd5e1;
  box-shadow: none;
  cursor: not-allowed;
}

.btn-sarf-submit:not(:disabled):active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 #3730a3;
}
</style>
