import type { BreakdownSpan, Sentence } from "../types/grammar";

export function flattenDepthFirst(nodes: BreakdownSpan[]): BreakdownSpan[] {
  const result: BreakdownSpan[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children?.length) {
      result.push(...flattenDepthFirst(node.children));
    }
  }
  return result;
}

export function getSentenceSpans(sentence: Sentence): BreakdownSpan[] {
  return sentence.tree?.length ? flattenDepthFirst(sentence.tree) : (sentence.breakdown ?? []);
}
