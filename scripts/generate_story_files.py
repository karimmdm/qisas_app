#!/usr/bin/env python3
"""
Populates src/data/stories/storyN/ with typed TypeScript chapter files
from the scratch parsed JSON datasets.
"""

import json
import os
import sys

def write_story(story_id: int, json_path: str, repo_root: str):
    if not os.path.exists(json_path):
        print(f"Skipping Story {story_id}: {json_path} does not exist yet.")
        return
        
    with open(json_path, "r", encoding="utf-8") as f:
        chapters = json.load(f)
        
    story_dir = os.path.join(repo_root, "src", "data", "stories", f"story{story_id}")
    os.makedirs(story_dir, exist_ok=True)
    
    chapter_exports = []
    
    for ch in chapters:
        ch_id = ch["id"]
        ch_filename = f"ch{ch_id}.ts"
        ch_path = os.path.join(story_dir, ch_filename)
        var_name = f"chapter{ch_id}"
        
        # Serialize chapter object to TypeScript format
        ch_json_str = json.dumps(ch, ensure_ascii=False, indent=2)
        
        ts_content = f"""import {{ Chapter }} from "../../../types/grammar";

export const {var_name}: Chapter = {ch_json_str};
"""
        with open(ch_path, "w", encoding="utf-8") as out_f:
            out_f.write(ts_content)
            
        chapter_exports.append((ch_id, var_name, f"./ch{ch_id}"))
        
    # Generate index.ts
    index_path = os.path.join(story_dir, "index.ts")
    import_lines = "\n".join([f'import {{ {var} }} from "{rel}";' for _, var, rel in chapter_exports])
    map_entries = ",\n  ".join([f'{cid}: {var}' for cid, var, _ in chapter_exports])
    
    index_content = f"""import type {{ Chapter }} from "../../../types/grammar";
{import_lines}

export const story{story_id}Chapters: Record<number, Chapter> = {{
  {map_entries}
}};
"""
    with open(index_path, "w", encoding="utf-8") as out_f:
        out_f.write(index_content)
        
    print(f"✅ Generated {len(chapters)} chapter files and index.ts in {story_dir}")

def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    scratch_dir = "/home/mdkarim/.gemini/antigravity/brain/85b88fe9-1442-42a8-ba3e-7e8bbf64f7fb/scratch"
    
    for s_id in [1, 2, 3]:
        json_path = os.path.join(scratch_dir, f"story{s_id}_parsed.json")
        write_story(s_id, json_path, repo_root)

if __name__ == "__main__":
    main()
