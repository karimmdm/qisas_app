<template>
  <div class="quiz-container">
    <!-- Top Navigation & Progress -->
    <header class="quiz-header">
      <div class="header-nav">
        <button @click="$emit('backToTOC')" class="btn-back">
          <span>&larr;</span>
          <span>Chapters</span>
        </button>

        <div class="header-chapter-info">
          <span class="chapter-label">Chapter {{ chapter.id }}</span>
          <p class="arabic-font chapter-arabic-name">{{ chapter.title }}</p>
        </div>
      </div>

      <!-- Sentence Progress Counter -->
      <div class="sentence-progress-row">
        <span>Sentence {{ currentSentenceIndex + 1 }} of {{ chapter.sentences.length }}</span>
        <span class="active-step-indicator">{{ currentSpanIndex + 1 }} / {{ currentSentence.breakdown.length }}</span>
      </div>

      <!-- Segmented Bar for Sentence Constituents -->
      <div class="segmented-track" role="tablist" aria-label="Sentence Units">
        <button
          v-for="(span, idx) in currentSentence.breakdown"
          :key="span.id"
          type="button"
          @click="jumpToSpan(idx)"
          :disabled="!canNavigateToSpan(idx)"
          :class="[
            'segment-pill',
            idx === currentSpanIndex
              ? 'is-active'
              : isSpanDone(span.id)
              ? 'is-completed'
              : 'is-pending',
            canNavigateToSpan(idx) ? 'is-clickable' : ''
          ]"
          :title="`Unit ${idx + 1} of ${currentSentence.breakdown.length}`"
        ></button>
      </div>
    </header>

    <!-- Main Quiz Body: Top Section (Sentence Display) + Bottom Section (Answer Controls) -->
    <div class="quiz-body">
      <!-- TOP PINNED: Sentence Display -->
      <div class="quiz-top-section">
        <div class="sentence-card">
          <!-- Arabic Sentence with Target Span Highlighted -->
          <div class="arabic-sentence arabic-font">
            <template v-for="(token, tIdx) in currentSentence.tokens" :key="tIdx">
              <span
                v-if="isTokenInActiveSpan(tIdx)"
                class="arabic-highlight"
              >
                {{ token }}
              </span>
              <span v-else class="token-normal">
                {{ token }}
              </span>
            </template>
          </div>

          <!-- English Translation -->
          <div class="sentence-translation">
            <p>"{{ currentSentence.translation }}"</p>
          </div>
        </div>
      </div>

      <!-- BOTTOM PINNED: Multiple Choice Buttons & Taqdīr -->
      <div class="quiz-bottom-section">
        <!-- Constituent Roles Composition Prompt -->
        <div class="composition-banner">
          <span class="composition-pill">
            Select all correct roles ({{ selectedRoles.length }} / {{ currentSpan.roles.length }})
          </span>
        </div>

        <!-- Multiple Choice Options -->
        <div class="options-list">
          <button
            v-for="option in currentOptions"
            :key="option"
            @click.stop="handleOptionClick(option)"
            :disabled="isOptionDisabled(option)"
            :class="['option-btn', getOptionClass(option)]"
          >
            <div class="option-indicator">
              <span v-if="isOptionCorrect(option)" class="indicator-icon icon-correct">✓</span>
              <span v-else-if="incorrectOptions.includes(option)" class="indicator-icon icon-incorrect">✕</span>
              <span v-else class="indicator-dot">&bull;</span>
            </div>

            <span class="arabic-font option-text">{{ option }}</span>
          </button>
        </div>

        <!-- Classical Taqdīr Reveal (When Solved) -->
        <div v-if="isUnitSolved && currentSpan.taqdeer" class="taqdeer-box">
          <div class="taqdeer-header">
            <span>📖</span>
            <span>Classical Taqdīr</span>
          </div>
          <p class="arabic-font taqdeer-text">{{ currentSpan.taqdeer }}</p>
        </div>

        <!-- Manual Next Action Button (Shown when unit is solved) -->
        <div v-if="isUnitSolved" class="advance-action-bar">
          <button class="btn-advance" @click="advanceNext">
            <span class="btn-advance-label">{{ nextButtonLabel }}</span>
            <span class="btn-advance-arrow">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Chapter, BreakdownSpan, Sentence, GrammarRole } from "../types/grammar";
import { CATEGORY_POOLS } from "../types/grammar";
import { isSpanCompleted } from "../services/storage";

const props = defineProps<{
  chapter: Chapter;
  initialSentenceId?: string;
  initialSpanIndex?: number;
}>();

const emit = defineEmits<{
  (e: "backToTOC"): void;
  (e: "spanSolved", payload: { spanId: string; sentenceId: string; isSentenceFinished: boolean }): void;
  (e: "chapterFinished", chapterId: number): void;
}>();

const currentSentenceIndex = ref(0);
const currentSpanIndex = ref(0);

// Initialize starting position
function syncStartingPosition() {
  if (props.initialSentenceId) {
    const sIdx = props.chapter.sentences.findIndex(s => s.id === props.initialSentenceId);
    if (sIdx !== -1) {
      currentSentenceIndex.value = sIdx;
      currentSpanIndex.value = props.initialSpanIndex !== undefined ? props.initialSpanIndex : 0;
      return;
    }
  }
  currentSentenceIndex.value = 0;
  currentSpanIndex.value = 0;
}

syncStartingPosition();

const currentSentence = computed<Sentence>(() => props.chapter.sentences[currentSentenceIndex.value]);
const currentSpan = computed<BreakdownSpan>(() => currentSentence.value.breakdown[currentSpanIndex.value]);

const isLastSpanOfSentence = computed(() => currentSpanIndex.value === currentSentence.value.breakdown.length - 1);
const isLastSentenceOfChapter = computed(() => currentSentenceIndex.value === props.chapter.sentences.length - 1);

const nextButtonLabel = computed(() => {
  if (!isLastSpanOfSentence.value) {
    return "Next Unit";
  }
  if (!isLastSentenceOfChapter.value) {
    return "Next Sentence";
  }
  return "Complete Chapter";
});

// Completed spans in current sentence
const completedSpansInSentence = ref<Set<string>>(new Set());

function refreshCompletedSpans() {
  const ids = new Set<string>();
  currentSentence.value.breakdown.forEach(b => {
    if (isSpanCompleted(b.id)) {
      ids.add(b.id);
    }
  });
  completedSpansInSentence.value = ids;
}

function isSpanDone(spanId: string): boolean {
  return completedSpansInSentence.value.has(spanId);
}

function canNavigateToSpan(idx: number): boolean {
  if (idx === currentSpanIndex.value) return true;
  const span = currentSentence.value.breakdown[idx];
  if (!span) return false;
  if (isSpanDone(span.id)) return true;

  // The first uncompleted span in this sentence is also reachable
  const firstUncompletedIdx = currentSentence.value.breakdown.findIndex(s => !isSpanDone(s.id));
  return idx === firstUncompletedIdx;
}

function jumpToSpan(idx: number) {
  if (idx === currentSpanIndex.value) return;
  if (!canNavigateToSpan(idx)) return;
  currentSpanIndex.value = idx;
}

// Active question attempt state (strictly typed with GrammarRole)
const selectedRoles = ref<GrammarRole[]>([]);
const incorrectOptions = ref<GrammarRole[]>([]);
const isUnitSolved = ref(false);
const currentOptions = ref<GrammarRole[]>([]);

// Generate multiple-choice options with canonical distractors
function loadSpan(span: BreakdownSpan) {
  const correctRoles = span.roles;
  const pool = CATEGORY_POOLS[span.category] || [];
  
  const potentialDistractors = pool.filter(r => !correctRoles.includes(r));
  const shuffled = [...potentialDistractors].sort(() => 0.5 - Math.random());
  const chosenDistractors = shuffled.slice(0, Math.max(3, 4 - correctRoles.length));
  
  currentOptions.value = [...correctRoles, ...chosenDistractors].sort(() => 0.5 - Math.random());

  if (isSpanDone(span.id)) {
    selectedRoles.value = [...correctRoles];
    incorrectOptions.value = [];
    isUnitSolved.value = true;
  } else {
    selectedRoles.value = [];
    incorrectOptions.value = [];
    isUnitSolved.value = false;
  }
}

watch(
  currentSentenceIndex,
  () => {
    refreshCompletedSpans();
  },
  { immediate: true }
);

watch(
  [currentSentenceIndex, currentSpanIndex],
  () => {
    loadSpan(currentSpan.value);
  },
  { immediate: true }
);

function isTokenInActiveSpan(tokenIndex: number): boolean {
  const [start, end] = currentSpan.value.span;
  return tokenIndex >= start && tokenIndex <= end;
}

function isOptionCorrect(option: GrammarRole): boolean {
  return selectedRoles.value.includes(option);
}

function isOptionDisabled(option: GrammarRole): boolean {
  return isUnitSolved.value || incorrectOptions.value.includes(option);
}

function getOptionClass(option: GrammarRole): string {
  if (isOptionCorrect(option)) return "is-correct";
  if (incorrectOptions.value.includes(option)) return "is-incorrect";
  return "";
}

function handleOptionClick(option: GrammarRole) {
  if (isUnitSolved.value) return;

  const isCorrect = currentSpan.value.roles.includes(option);

  if (isCorrect) {
    if (!selectedRoles.value.includes(option)) {
      selectedRoles.value.push(option);
    }

    // Verification check: constituent is solved when user selected roles match span.roles
    const hasAllRoles = currentSpan.value.roles.every(r => selectedRoles.value.includes(r));
    if (hasAllRoles && selectedRoles.value.length === currentSpan.value.roles.length) {
      isUnitSolved.value = true;
      completedSpansInSentence.value.add(currentSpan.value.id);
      
      emit("spanSolved", {
        spanId: currentSpan.value.id,
        sentenceId: currentSentence.value.id,
        isSentenceFinished: isLastSpanOfSentence.value
      });
      // No automated timer! Student navigates deliberately via Next button or track pills.
    }
  } else {
    if (!incorrectOptions.value.includes(option)) {
      incorrectOptions.value.push(option);
    }
  }
}

function advanceNext() {
  if (!isLastSpanOfSentence.value) {
    currentSpanIndex.value++;
  } else if (!isLastSentenceOfChapter.value) {
    currentSentenceIndex.value++;
    currentSpanIndex.value = 0;
  } else {
    emit("chapterFinished", props.chapter.id);
  }
}
</script>

<style scoped>
.quiz-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  overflow: hidden;
}

.quiz-header {
  padding: calc(16px + env(safe-area-inset-top, 0px)) 20px 14px 20px;
  background-color: #f8fafc;
  border-bottom: 1px solid var(--color-border);
}

.header-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text-muted);
  padding: 6px 10px;
  border-radius: 10px;
  background-color: #f1f5f9;
  border: 1px solid var(--color-border);
  transition: all 0.15s ease;
}

.btn-back:hover {
  background-color: #e2e8f0;
  color: var(--color-text-main);
}

.header-chapter-info {
  text-align: right;
}

.chapter-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary);
}

.chapter-arabic-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text-main);
  margin-top: 1px;
}

.sentence-progress-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  color: #334155;
  margin-bottom: 8px;
}

.active-step-indicator {
  color: var(--color-primary);
  font-weight: 800;
}

.segmented-track {
  display: flex;
  gap: 6px;
  width: 100%;
}

.segment-pill {
  height: 9px;
  border-radius: 9999px;
  flex: 1;
  border: none;
  padding: 0;
  background-color: #e2e8f0;
  cursor: default;
  transition: all 0.25s ease;
}

.segment-pill.is-clickable {
  cursor: pointer;
}

.segment-pill.is-completed {
  background-color: var(--color-success);
}

.segment-pill.is-completed:hover {
  filter: brightness(1.15);
  transform: scaleY(1.35);
}

.segment-pill.is-active {
  background-color: var(--color-primary);
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.4);
}

.segment-pill.is-pending {
  background-color: #e2e8f0;
}

.segment-pill:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.quiz-body {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 18px calc(24px + env(safe-area-inset-bottom, 0px)) 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
}

.quiz-top-section {
  width: 100%;
  flex: 0 0 auto;
}

.quiz-bottom-section {
  width: 100%;
  flex: 0 0 auto;
  margin-top: 0;
}

.sentence-card {
  background-color: #f8fafc;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 20px 16px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.arabic-sentence {
  font-size: 29px;
  font-weight: 600;
  line-height: 2.3;
  word-spacing: 0.1em;
  color: var(--color-text-main);
  padding: 6px 0;
  text-rendering: optimizeLegibility;
}

.arabic-highlight {
  background-color: var(--color-highlight-bg);
  color: var(--color-highlight-text);
  border: 2px solid var(--color-highlight-border);
  border-radius: 14px;
  padding: 0.2em 0.45em 0.35em 0.45em;
  margin: 0 0.18em;
  display: inline-block;
  line-height: 1.4;
  vertical-align: middle;
  box-shadow: 0 2px 4px rgba(234, 179, 8, 0.15);
  transition: all 0.2s ease;
}

.token-normal {
  padding: 0 3px;
  display: inline-block;
}

.sentence-translation {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
  font-size: 12px;
  font-style: italic;
  color: var(--color-text-muted);
}

.composition-banner {
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-start;
}

.composition-pill {
  font-size: 11px;
  font-weight: 700;
  color: #1e40af;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 4px 10px;
  border-radius: 8px;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-btn {
  padding: 12px 14px;
  border-radius: 14px;
  border: 2px solid var(--color-border);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  width: 100%;
  box-shadow: 0 3px 0 #cbd5e1;
  transition: all 0.15s ease;
}

.option-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  background-color: #f8faff;
  transform: translateY(-1px);
  box-shadow: 0 4px 0 #93c5fd;
}

.option-btn:active:not(:disabled) {
  transform: translateY(2px);
  box-shadow: 0 1px 0 #cbd5e1;
}

.option-btn.is-correct {
  border-color: var(--color-success) !important;
  background-color: var(--color-success-bg) !important;
  color: var(--color-success-dark) !important;
  box-shadow: 0 3px 0 #059669 !important;
}

.option-btn.is-incorrect {
  border-color: var(--color-error-border) !important;
  background-color: var(--color-error-bg) !important;
  color: var(--color-error-dark) !important;
  opacity: 0.55;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.option-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.indicator-icon {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
}

.icon-correct {
  background-color: var(--color-success);
}

.icon-incorrect {
  background-color: var(--color-error);
}

.indicator-dot {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: var(--color-text-light);
}

.option-text {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
}

.taqdeer-box {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 12px;
  background-color: var(--color-success-bg);
  border: 1px solid var(--color-success-border);
  animation: fadeIn 0.2s ease-out;
}

.taqdeer-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #047857;
}

.taqdeer-text {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-success-dark);
  margin-top: 4px;
  line-height: 1.7;
}

.advance-action-bar {
  margin-top: 14px;
  animation: slideUp 0.25s ease-out;
}

.btn-advance {
  width: 100%;
  padding: 13px 20px;
  background-color: var(--color-primary);
  color: #ffffff;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 4px 0 #1d4ed8;
  transition: all 0.15s ease;
}

.btn-advance:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 5px 0 #1e40af;
}

.btn-advance:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 #1d4ed8;
}

.btn-advance-label {
  letter-spacing: 0.02em;
}

.btn-advance-arrow {
  font-size: 18px;
  line-height: 1;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
