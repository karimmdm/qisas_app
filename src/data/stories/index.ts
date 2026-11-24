import { story1Chapters } from "./story1";
import { story2Chapters } from "./story2";
import { story3Chapters } from "./story3";
import { story4Chapters } from "./story4";
import type { Chapter } from "../../types/grammar";

export interface StoryMeta {
  id: number;
  title: string;
  arabicTitle: string;
  translation: string;
  source: string;
  totalChapters: number;
  chaptersMap: Record<number, Chapter>;
}

export const STORIES: StoryMeta[] = [
  {
    id: 1,
    title: "Sayyiduna Ibrahim (AS)",
    arabicTitle: "سَيِّدُنَا إِبْرَاهِيمُ (عَلَيْهِ السَّلَامُ)",
    translation: "The Story of Ibrahim",
    source: "Qisas an-Nabiyeen (Story 1)",
    totalChapters: 16,
    chaptersMap: story1Chapters,
  },
  {
    id: 2,
    title: "Sayyiduna Yusuf (AS)",
    arabicTitle: "سَيِّدُنَا يُوسُفُ (عَلَيْهِ السَّلَامُ)",
    translation: "The Story of Yusuf",
    source: "Qisas an-Nabiyeen (Story 2)",
    totalChapters: 25,
    chaptersMap: story2Chapters,
  },
  {
    id: 3,
    title: "Sayyiduna Nooh (AS)",
    arabicTitle: "سَيِّدُنَا نُوحٌ (عَلَيْهِ السَّلَامُ)",
    translation: "The Story of Nooh",
    source: "Qisas an-Nabiyeen (Story 3)",
    totalChapters: 22,
    chaptersMap: story3Chapters,
  },
  {
    id: 4,
    title: "Sayyiduna Hud (AS)",
    arabicTitle: "سَيِّدُنَا هُودٌ (عَلَيْهِ السَّلَامُ)",
    translation: "The Story of Hud",
    source: "Qisas an-Nabiyeen (Story 4)",
    totalChapters: 11,
    chaptersMap: story4Chapters,
  },
];
