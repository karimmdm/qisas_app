/**
 * Local Storage Adapter for Student Progress
 * 
 * Provides a clean interface for saving/loading progress in localStorage,
 * completely decoupled from the UI. Ready for future Export/Import expansion.
 */

export interface Bookmark {
  storyId?: number;
  chapterId: number;
  sentenceId: string;
  spanIndex: number;
}

export interface ProgressData {
  /** Active selected story */
  activeStoryId?: number;
  /** IDs of completed spans (e.g. ["c1_1", "c1_2"]) */
  completedSpanIds: string[];
  /** IDs of fully mastered sentences (e.g. ["ch1_s1"]) */
  completedSentenceIds: string[];
  /** Last active student position */
  bookmark?: Bookmark;
}

const STORAGE_KEY = "sarf_nahw_progress_v1";

const DEFAULT_PROGRESS: ProgressData = {
  completedSpanIds: [],
  completedSentenceIds: [],
};

/**
 * Loads the user's progress from localStorage.
 * Falls back to clean default if not found or corrupted.
 */
export function loadProgress(): ProgressData {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return DEFAULT_PROGRESS;
    }
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return JSON.parse(raw) as ProgressData;
  } catch (err) {
    console.warn("Failed to load progress from localStorage:", err);
    return DEFAULT_PROGRESS;
  }
}

/**
 * Persists user progress to localStorage.
 */
export function saveProgress(data: ProgressData): void {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save progress to localStorage:", err);
  }
}

/**
 * Checks if a specific span has been completed.
 */
export function isSpanCompleted(spanId: string): boolean {
  const progress = loadProgress();
  return progress.completedSpanIds.includes(spanId);
}

/**
 * Marks a span as completed, and optionally marks the parent sentence as completed.
 */
export function markSpanCompleted(
  spanId: string,
  sentenceId?: string,
  isSentenceFinished: boolean = false
): ProgressData {
  const progress = loadProgress();

  if (!progress.completedSpanIds.includes(spanId)) {
    progress.completedSpanIds.push(spanId);
  }

  if (sentenceId && isSentenceFinished && !progress.completedSentenceIds.includes(sentenceId)) {
    progress.completedSentenceIds.push(sentenceId);
  }

  saveProgress(progress);
  return progress;
}

/**
 * Updates the student's active bookmark.
 */
export function saveBookmark(bookmark: Bookmark): void {
  const progress = loadProgress();
  progress.bookmark = bookmark;
  saveProgress(progress);
}

/**
 * Exports progress as a formatted JSON string (for easy backup or sharing).
 */
export function exportProgressJson(): string {
  const progress = loadProgress();
  return JSON.stringify(progress, null, 2);
}

/**
 * Imports progress from a JSON string, validating basic structure.
 */
export function importProgressJson(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr) as ProgressData;
    if (Array.isArray(parsed.completedSpanIds) && Array.isArray(parsed.completedSentenceIds)) {
      saveProgress(parsed);
      return true;
    }
    return false;
  } catch (err) {
    console.error("Invalid progress JSON during import:", err);
    return false;
  }
}

/**
 * Resets all stored progress (useful for testing or starting over).
 */
export function resetProgress(): void {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.error("Failed to reset progress:", err);
  }
}
