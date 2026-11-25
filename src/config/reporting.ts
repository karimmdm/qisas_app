/**
 * Google Form Pre-Fill Configuration for Reporting Grammar / Sarf Errors.
 *
 * Setup:
 * 1. Create a Google Form with a Short Answer field named "Location"
 *    (plus any Multiple Choice / Paragraph fields like "Issue Type" & "Details").
 * 2. In Google Forms, click the "..." menu -> "Get pre-filled link",
 *    fill in dummy text in "Location", click "Get link", and copy the URL.
 * 3. Paste the form URL (up to `/viewform`) and the `entry.XXXXXXXXX` parameter below.
 */
export const GOOGLE_FORM_BASE_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScxoQE4Sktou0pFogL2mToCTDwaaXp5BjPEwobSonuK3UlQew/viewform";

export const GOOGLE_FORM_LOCATION_ENTRY = "entry.935096248";

export function isReportingConfigured(): boolean {
  return !GOOGLE_FORM_BASE_URL.includes("YOUR_FORM_ID");
}

export function buildFlagUrl(params: {
  storyId: number;
  chapterId: number;
  sentenceOrder: number;
  sentenceId: string;
  unitIndex: number;
  totalUnits: number;
  spanId: string;
  tokenText: string;
}): string {
  const location = [
    `Story ${params.storyId}`,
    `Chapter ${params.chapterId}`,
    `Sentence ${params.sentenceOrder} (${params.sentenceId})`,
    `Unit ${params.unitIndex}/${params.totalUnits} (${params.spanId})`,
    `"${params.tokenText}"`,
  ].join("; ");

  const url = new URL(GOOGLE_FORM_BASE_URL);
  url.searchParams.set("usp", "pp_url");
  url.searchParams.set(GOOGLE_FORM_LOCATION_ENTRY, location);
  return url.toString();
}
