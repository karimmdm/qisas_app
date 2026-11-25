<template>
  <div class="app-shell">
    <!-- Phone Frame Container -->
    <div class="phone-frame">
      <!-- View 1: Table of Contents -->
      <TableOfContents
        v-if="currentView === 'toc'"
        :stories="storyTabs"
        :activeStoryId="activeStoryId"
        :chapters="currentStoryChaptersList"
        :bookmark="activeBookmark"
        @selectStory="handleSelectStory"
        @selectChapter="handleSelectChapter"
        @resumeBookmark="handleResumeBookmark"
      />

      <!-- View 2: Sentence Quiz -->
      <SentenceQuiz
        v-else-if="currentView === 'quiz' && activeChapter"
        :key="`${activeStoryId}-${activeChapterId}-${resumeSentenceId || 'init'}`"
        :chapter="activeChapter"
        :initialSentenceId="resumeSentenceId"
        :initialSpanIndex="resumeSpanIndex"
        @backToTOC="handleBackToTOC"
        @spanSolved="handleSpanSolved"
        @chapterFinished="handleChapterFinished"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import TableOfContents, { type StoryTabItem, type ChapterItem } from "./components/TableOfContents.vue";
import SentenceQuiz from "./components/SentenceQuiz.vue";
import { STORIES } from "./data/stories";
import type { Chapter } from "./types/grammar";
import {
  loadProgress,
  markSpanCompleted,
  saveBookmark,
  saveProgress,
  type ProgressData,
} from "./services/storage";

const currentView = ref<"toc" | "quiz">("toc");
const activeStoryId = ref<number>(1);
const activeChapterId = ref<number>(1);
const resumeSentenceId = ref<string | undefined>(undefined);
const resumeSpanIndex = ref<number | undefined>(undefined);

// Reactive progress state
const progress = ref<ProgressData>(loadProgress());

if (progress.value.activeStoryId) {
  activeStoryId.value = progress.value.activeStoryId;
}

const activeStory = computed(() => {
  return STORIES.find((s) => s.id === activeStoryId.value) || STORIES[0];
});

const storyTabs = computed<StoryTabItem[]>(() => {
  return STORIES.map((s) => {
    let shortArabic = "إِبْرَاهِيمُ";
    if (s.id === 2) shortArabic = "يُوسُفُ";
    if (s.id === 3) shortArabic = "نُوحٌ";
    return {
      id: s.id,
      title: s.title,
      arabicTitle: s.arabicTitle,
      shortArabicTitle: shortArabic,
    };
  });
});

function handleSelectStory(storyId: number) {
  activeStoryId.value = storyId;
  progress.value.activeStoryId = storyId;
  saveProgress(progress.value);
}

function getChapterProgress(ch: Chapter | undefined, fallbackTotal: number) {
  if (!ch) {
    return {
      total: fallbackTotal,
      completed: 0,
      status: "not_started" as const,
      available: false,
    };
  }
  const completed = ch.sentences.filter((s) =>
    progress.value.completedSentenceIds.includes(s.id)
  ).length;
  const status =
    completed === ch.sentences.length
      ? "mastered"
      : completed > 0
      ? "in_progress"
      : "not_started";
  return {
    total: ch.sentences.length,
    completed,
    status: status as "mastered" | "in_progress" | "not_started",
    available: true,
  };
}

const currentStoryChaptersList = computed<ChapterItem[]>(() => {
  const story = activeStory.value;
  const map = story.chaptersMap;
  const list: ChapterItem[] = [];

  for (let i = 1; i <= story.totalChapters; i++) {
    const ch = map[i];
    if (ch) {
      const p = getChapterProgress(ch, ch.sentences.length);
      list.push({
        id: ch.id,
        title: ch.title,
        translation: ch.translation,
        totalSentences: p.total,
        completedSentences: p.completed,
        status: p.status,
        available: true,
      });
    } else {
      list.push({
        id: i,
        title: `Chapter ${i}`,
        translation: "Loading...",
        totalSentences: 0,
        completedSentences: 0,
        status: "not_started",
        available: false,
      });
    }
  }
  return list;
});

const activeChapter = computed<Chapter | null>(() => {
  return activeStory.value.chaptersMap[activeChapterId.value] || null;
});

const activeBookmark = computed(() => {
  if (!progress.value.bookmark) return undefined;
  if (progress.value.bookmark.storyId && progress.value.bookmark.storyId !== activeStoryId.value) {
    return undefined;
  }
  const ch = activeStory.value.chaptersMap[progress.value.bookmark.chapterId];
  const sentence = ch?.sentences.find(
    (s) => s.id === progress.value.bookmark?.sentenceId
  );
  return {
    ...progress.value.bookmark,
    sentenceOrder: sentence?.order || 1,
  };
});

function handleSelectChapter(id: number) {
  const ch = activeStory.value.chaptersMap[id];
  if (!ch) return;
  activeChapterId.value = id;

  // Smart Resume: find the first incomplete sentence in this chapter!
  const chSentences = ch.sentences;
  const firstIncomplete = chSentences.find(
    (s) => !progress.value.completedSentenceIds.includes(s.id)
  );

  resumeSentenceId.value = firstIncomplete ? firstIncomplete.id : chSentences[0].id;
  resumeSpanIndex.value = 0;
  currentView.value = "quiz";
}

function handleResumeBookmark() {
  if (progress.value.bookmark) {
    if (progress.value.bookmark.storyId) {
      activeStoryId.value = progress.value.bookmark.storyId;
    }
    activeChapterId.value = progress.value.bookmark.chapterId;
    resumeSentenceId.value = progress.value.bookmark.sentenceId;
    resumeSpanIndex.value = progress.value.bookmark.spanIndex;
    currentView.value = "quiz";
  }
}

function handleBackToTOC() {
  progress.value = loadProgress();
  currentView.value = "toc";
}

function handleSpanSolved(payload: {
  spanId: string;
  sentenceId: string;
  isSentenceFinished: boolean;
}) {
  progress.value = markSpanCompleted(
    payload.spanId,
    payload.sentenceId,
    payload.isSentenceFinished
  );

  const currentCh = activeChapter.value;
  if (!currentCh) return;

  const sIdx = currentCh.sentences.findIndex((s) => s.id === payload.sentenceId);
  const sentence = currentCh.sentences[sIdx];
  const spanIdx = sentence?.breakdown.findIndex((b) => b.id === payload.spanId) ?? 0;

  const nextSpanIdx = payload.isSentenceFinished ? 0 : spanIdx + 1;
  const nextSentence = payload.isSentenceFinished
    ? currentCh.sentences[sIdx + 1]?.id || payload.sentenceId
    : payload.sentenceId;

  // Persist bookmark scoped to activeStoryId
  saveBookmark({
    storyId: activeStoryId.value,
    chapterId: activeChapterId.value,
    sentenceId: nextSentence,
    spanIndex: nextSpanIdx,
  });

  progress.value.bookmark = {
    storyId: activeStoryId.value,
    chapterId: activeChapterId.value,
    sentenceId: nextSentence,
    spanIndex: nextSpanIdx,
  };

  resumeSentenceId.value = nextSentence;
  resumeSpanIndex.value = nextSpanIdx;
}

function handleChapterFinished(chapterId: number) {
  console.log(`Story ${activeStoryId.value} - Chapter ${chapterId} completed!`);
  handleBackToTOC();
}
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 0;
  width: 100%;
}

.phone-frame {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
</style>
