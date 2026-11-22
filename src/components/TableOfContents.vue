<template>
  <div class="toc-container">
    <!-- Header -->
    <header class="toc-header">
      <div class="header-top">
        <div>
          <a
            href="https://www.alqalaminstitute.org/resources/literature-resources/qisas-an-nabiyeen-resources"
            target="_blank"
            rel="noopener noreferrer"
            class="badge-kicker"
          >
            <span>Source: Al Qalam Institute</span>
            <span class="kicker-arrow">&nearr;</span>
          </a>
          <h1 class="header-title">Qisas an-Nabiyeen</h1>
          <p class="arabic-font header-arabic">{{ currentStoryArabicTitle }}</p>
        </div>
      </div>

      <!-- Story Switcher Tabs -->
      <div class="story-tabs-track" role="tablist" aria-label="Stories">
        <button
          v-for="s in stories"
          :key="s.id"
          type="button"
          role="tab"
          :aria-selected="s.id === activeStoryId"
          :class="['story-tab-btn', { 'is-active': s.id === activeStoryId }]"
          @click="$emit('selectStory', s.id)"
        >
          <span class="story-tab-num">Story {{ s.id }}</span>
          <span class="arabic-font story-tab-arabic">{{ s.shortArabicTitle }}</span>
        </button>
      </div>

      <!-- Story Overall Progress -->
      <div class="progress-card">
        <div class="progress-meta">
          <span class="progress-label">Story Progress</span>
          <span class="progress-percent">
            {{ completedCount }} of {{ totalSentences }} Sentences ({{ overallPercent }}%)
          </span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: `${overallPercent}%` }"></div>
        </div>
      </div>

      <!-- Quick Resume Banner -->
      <div v-if="bookmark" class="resume-wrapper">
        <button @click="$emit('resumeBookmark')" class="resume-button">
          <div class="resume-left">
            <div class="play-icon">▶</div>
            <div>
              <p class="resume-title">Resume Where You Left Off</p>
              <p class="resume-subtitle">Chapter {{ bookmark.chapterId }} &bull; Sentence {{ bookmark.sentenceOrder || 1 }}</p>
            </div>
          </div>
          <span class="resume-arrow">Continue &rarr;</span>
        </button>
      </div>
    </header>

    <!-- Chapter List -->
    <div class="chapter-list">
      <div
        v-for="chapter in chapters"
        :key="chapter.id"
        @click="chapter.available ? $emit('selectChapter', chapter.id) : null"
        :class="['chapter-card', { 'is-available': chapter.available, 'is-locked': !chapter.available }]"
      >
        <div class="chapter-info">
          <!-- Chapter Number / Status Badge -->
          <div :class="['chapter-badge', `status-${chapter.status}`]">
            <span v-if="chapter.status === 'mastered'">✓</span>
            <span v-else>{{ chapter.id }}</span>
          </div>

          <div>
            <div class="chapter-title-row">
              <h3 class="chapter-num">Chapter {{ chapter.id }}</h3>
              <span v-if="chapter.status === 'mastered'" class="tag-status tag-mastered">Mastered</span>
              <span v-else-if="chapter.status === 'in_progress'" class="tag-status tag-in-progress">In Progress</span>
            </div>
            <p class="chapter-translation">{{ chapter.translation }}</p>
          </div>
        </div>

        <!-- Arabic Title & Sentence Count -->
        <div class="chapter-arabic-meta">
          <p class="arabic-font chapter-arabic-title">{{ chapter.title }}</p>
          <span class="chapter-count">
            {{ chapter.available ? `${chapter.completedSentences} / ${chapter.totalSentences} sentences` : 'Coming soon' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Bookmark } from "../services/storage";

export interface StoryTabItem {
  id: number;
  title: string;
  arabicTitle: string;
  shortArabicTitle: string;
}

export interface ChapterItem {
  id: number;
  title: string;
  translation: string;
  totalSentences: number;
  completedSentences: number;
  status: "mastered" | "in_progress" | "not_started";
  available: boolean;
}

const props = defineProps<{
  stories: StoryTabItem[];
  activeStoryId: number;
  chapters: ChapterItem[];
  bookmark?: Bookmark & { sentenceOrder?: number };
}>();

defineEmits<{
  (e: "selectStory", id: number): void;
  (e: "selectChapter", id: number): void;
  (e: "resumeBookmark"): void;
}>();

const currentStoryArabicTitle = computed(() => {
  const current = props.stories.find(s => s.id === props.activeStoryId);
  return current?.arabicTitle || "قِصَصُ النَّبِيِّينَ";
});

const totalSentences = computed(() =>
  props.chapters.reduce((sum, ch) => sum + ch.totalSentences, 0)
);

const completedCount = computed(() =>
  props.chapters.reduce((sum, ch) => sum + ch.completedSentences, 0)
);

const overallPercent = computed(() => {
  if (totalSentences.value === 0) return 0;
  return Math.round((completedCount.value / totalSentences.value) * 100);
});
</script>

<style scoped>
.toc-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  overflow: hidden;
}

.toc-header {
  padding: 24px 20px 20px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid var(--color-border);
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.badge-kicker {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  gap: 3px;
  text-decoration: none;
  transition: opacity 0.15s ease, color 0.15s ease;
}

.badge-kicker:hover {
  text-decoration: underline;
  opacity: 0.85;
}

.kicker-arrow {
  font-size: 11px;
  line-height: 1;
}

.header-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-text-main);
  line-height: 1.2;
  margin-top: 2px;
}

.header-arabic {
  font-size: 18px;
  font-weight: 700;
  color: #475569;
  margin-top: 4px;
  line-height: 1.3;
}

.story-tabs-track {
  display: flex;
  gap: 6px;
  padding: 4px;
  background-color: #f1f5f9;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  margin-top: 14px;
}

.story-tab-btn {
  flex: 1;
  border: none;
  padding: 8px 6px;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  text-align: center;
}

.story-tab-btn:hover:not(.is-active) {
  background-color: #e2e8f0;
}

.story-tab-btn.is-active {
  background-color: #ffffff;
  color: var(--color-primary);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.story-tab-num {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.story-tab-btn.is-active .story-tab-num {
  color: var(--color-primary);
}

.story-tab-arabic {
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}





.progress-card {
  margin-top: 18px;
  padding: 16px 16px;
  background-color: #f8fafc;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 10px;
}

.progress-label {
  color: #334155;
}

.progress-percent {
  color: var(--color-primary);
  font-weight: 800;
}

.progress-track {
  width: 100%;
  height: 10px;
  background-color: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 9999px;
  transition: width 0.4s ease;
}

.resume-wrapper {
  margin-top: 14px;
}

.resume-button {
  width: 100%;
  background-color: var(--color-primary-light);
  border: 1px solid var(--color-primary-border);
  border-radius: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  transition: background-color 0.15s ease;
}

.resume-button:hover {
  background-color: #dbeafe;
}

.resume-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.play-icon {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background-color: var(--color-primary);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
}

.resume-title {
  font-size: 12px;
  font-weight: 800;
  color: #1e3a8a;
}

.resume-subtitle {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary);
  margin-top: 1px;
}

.resume-arrow {
  font-size: 12px;
  font-weight: 800;
  color: var(--color-primary);
}

.chapter-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chapter-card {
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  transition: all 0.15s ease;
}

.chapter-card.is-available {
  cursor: pointer;
}

.chapter-card.is-available:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
  transform: translateY(-1px);
}

.chapter-card.is-available:active {
  transform: translateY(0);
}

.chapter-card.is-locked {
  background-color: #f1f5f9;
  opacity: 0.6;
  cursor: not-allowed;
}

.chapter-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chapter-badge {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
}

.chapter-badge.status-mastered {
  background-color: var(--color-success);
  color: #ffffff;
}

.chapter-badge.status-in_progress {
  background-color: var(--color-primary);
  color: #ffffff;
}

.chapter-badge.status-not_started {
  background-color: #e2e8f0;
  color: var(--color-text-muted);
}

.chapter-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.chapter-num {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text-main);
}

.tag-status {
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.tag-mastered {
  background-color: var(--color-success-bg);
  color: var(--color-success-dark);
  border: 1px solid var(--color-success-border);
}

.tag-in-progress {
  background-color: var(--color-primary-light);
  color: #1e40af;
  border: 1px solid var(--color-primary-border);
}

.chapter-translation {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.chapter-arabic-meta {
  text-align: right;
}

.chapter-arabic-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-main);
  line-height: 1.3;
}

.chapter-count {
  font-size: 10px;
  color: var(--color-text-light);
  font-weight: 600;
}
</style>
