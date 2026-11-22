#!/usr/bin/env python3
"""
Validates TypeScript story chapter data and compiles it to static JSON for production.
"""

import json
import os
import re
import sys

def parse_ts_to_dict(ts_content: str):
    # Match object literal after `export const chapterX: Chapter = { ... };`
    match = re.search(r"export const \w+(?::\s*\w+)?\s*=\s*(\{[\s\S]*\});\s*$", ts_content)
    if not match:
        raise ValueError("Could not find exported chapter object in file")
    
    raw_obj = match.group(1)
    try:
        return json.loads(raw_obj)
    except json.JSONDecodeError:
        # Fallback for unquoted TS object literals
        cleaned = re.sub(r"//.*$", "", raw_obj, flags=re.MULTILINE)
        cleaned = re.sub(r'([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1"\2":', cleaned)
        cleaned = re.sub(r",\s*([}\]])", r"\1", cleaned)
        return json.loads(cleaned)

def validate_chapter(chapter: dict):
    print(f"  Validating Chapter {chapter.get('id')}: {chapter.get('title')}...")
    errors = []
    
    sentences = chapter.get("sentences", [])
    if not sentences:
        errors.append("Chapter has no sentences")
        
    for s_idx, sentence in enumerate(sentences):
        s_id = sentence.get("id", f"idx_{s_idx}")
        tokens = sentence.get("tokens", [])
        num_tokens = len(tokens)
        
        if num_tokens == 0:
            errors.append(f"Sentence {s_id} has no tokens")
            continue
            
        breakdown = sentence.get("breakdown", [])
        if not breakdown:
            errors.append(f"Sentence {s_id} has no breakdown spans")
            continue
            
        for b_idx, b in enumerate(breakdown):
            b_id = b.get("id", f"{s_id}_b{b_idx}")
            span = b.get("span")
            roles = b.get("roles", [])
            
            if not span or len(span) != 2:
                errors.append(f"[{s_id}] Span {b_id} must have [start, end]")
                continue
                
            start, end = span[0], span[1]
            if start < 0 or end >= num_tokens or start > end:
                errors.append(
                    f"[{s_id}] Span {b_id} ({start}, {end}) is out of bounds for token count ({num_tokens}): "
                    f"tokens are {tokens}"
                )
                
            if not roles:
                errors.append(f"[{s_id}] Span {b_id} must have at least one role")
                
    if errors:
        print("  ❌ Validation failed with errors:")
        for err in errors:
            print(f"    - {err}")
        sys.exit(1)
        
    print(f"  ✅ Passed validation! ({len(sentences)} sentences)")

def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    stories_src_dir = os.path.join(repo_root, "src", "data", "stories")
    stories_out_dir = os.path.join(repo_root, "public", "data", "stories")
    os.makedirs(stories_out_dir, exist_ok=True)
    
    # Story titles metadata
    story_titles = {
        1: ("Sayyiduna Ibrahim (AS)", "سَيِّدُنَا إِبْرَاهِيمُ (عَلَيْهِ السَّلَامُ)"),
        2: ("Sayyiduna Yusuf (AS)", "سَيِّدُنَا يُوسُفُ (عَلَيْهِ السَّلَامُ)"),
        3: ("Sayyiduna Nooh (AS)", "سَيِّدُنَا نُوحٌ (عَلَيْهِ السَّلَامُ)"),
    }
    
    story_dirs = sorted([d for d in os.listdir(stories_src_dir) if d.startswith("story")])
    if not story_dirs:
        print(f"❌ No story directories found in {stories_src_dir}")
        sys.exit(1)
        
    stories_manifest = []
    
    for s_dirname in story_dirs:
        s_src_path = os.path.join(stories_src_dir, s_dirname)
        if not os.path.isdir(s_src_path):
            continue
            
        s_num = int(s_dirname.replace("story", ""))
        s_out_path = os.path.join(stories_out_dir, s_dirname)
        os.makedirs(s_out_path, exist_ok=True)
        
        chapter_files = sorted(
            [f for f in os.listdir(s_src_path) if f.startswith("ch") and f.endswith(".ts")],
            key=lambda x: int(re.search(r'\d+', x).group())
        )
        
        print(f"\n==========================================")
        print(f"📚 Processing Story {s_num}: {story_titles.get(s_num, ('', ''))[0]}")
        print(f"==========================================")
        
        chapters_list = []
        
        for filename in chapter_files:
            src_file_path = os.path.join(s_src_path, filename)
            out_json_name = filename[:-3] + ".json"
            out_json_path = os.path.join(s_out_path, out_json_name)
            
            with open(src_file_path, "r", encoding="utf-8") as f:
                content = f.read()
                
            chapter_data = parse_ts_to_dict(content)
            validate_chapter(chapter_data)
            
            with open(out_json_path, "w", encoding="utf-8") as f:
                json.dump(chapter_data, f, ensure_ascii=False, indent=2)
                
            chapters_list.append({
                "id": chapter_data.get("id"),
                "file": out_json_name,
                "title": chapter_data.get("title"),
                "translation": chapter_data.get("translation"),
                "totalSentences": len(chapter_data.get("sentences", []))
            })
            
        # Write story manifest
        s_manifest_path = os.path.join(s_out_path, "manifest.json")
        with open(s_manifest_path, "w", encoding="utf-8") as f:
            json.dump(chapters_list, f, ensure_ascii=False, indent=2)
            
        stories_manifest.append({
            "id": s_num,
            "title": story_titles.get(s_num, (f"Story {s_num}", ""))[0],
            "arabicTitle": story_titles.get(s_num, ("", ""))[1],
            "totalChapters": len(chapters_list),
            "chapters": chapters_list
        })
        
        # Master stories manifest
    master_manifest_path = os.path.join(stories_out_dir, "stories_manifest.json")
    with open(master_manifest_path, "w", encoding="utf-8") as f:
        json.dump(stories_manifest, f, ensure_ascii=False, indent=2)
    print(f"\n✨ Master stories manifest compiled: {master_manifest_path}")

if __name__ == "__main__":
    main()
