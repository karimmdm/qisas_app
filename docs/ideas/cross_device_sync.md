# Cross-Device Progress Sync (Accountless)

## Problem Statement
How might we let students sync their completed units, sentences, and bookmarks across devices (e.g., iPhone Safari and desktop browser) **without** requiring user accounts, logins, passwords, or email addresses?

---

## Option A: Magic Sync URL + Cloudflare Worker & KV *(Automatic Sync on Reload)*

### Architecture
1. **Sync Token Generation**:
   - The app generates a random, unguessable Sync ID (e.g., `crypto.randomUUID()` or short high-entropy token) and stores it in `localStorage`.
   - Students get a shareable **Sync Link** (`https://karimmdm.github.io/qisas_app/?sync=<id>`) or QR code to open once on their second device.
2. **Backend (Cloudflare Worker + Cloudflare KV)**:
   - Free tier: **100,000 reads/day** and **1,000 writes/day**.
   - Single ~35-line Worker exposing `GET /sync/:id` and `PUT /sync/:id` storing `ProgressData` JSON (`completedSpanIds`, `completedSentenceIds`, `bookmark`, `activeStoryId`).
   - Enforces `Origin` check (`https://karimmdm.github.io`) and basic payload size limits.
3. **Merge Strategy (Set Union)**:
   - On page load, if a `syncId` is present, the app fetches remote state and merges it with local `localStorage` using a **set union** of `completedSpanIds` and `completedSentenceIds`.
   - Completing units on either device debounces a background `PUT` without blocking UI.

### Pros & Cons
- **Pros**: True automatic sync on reload; zero login friction; offline work merges cleanly later.
- **Cons**: Requires deploying and maintaining one small Cloudflare Worker + KV namespace (~5 min setup).

---

## Option B: Compressed Progress in the URL Hash *(Zero Backend)*

### Architecture
1. **Bit-Pack / Compress State**:
   - With ~7,600 breakdown spans across the curriculum, the entire `completedSpanIds` set can be bit-packed into a ~950-byte array (or compressed JSON) and base64url-encoded into a URL fragment:
     `https://karimmdm.github.io/qisas_app/#import=<base64url>`
2. **Manual Device Handoff**:
   - **Device A**: Student taps **"Transfer Progress"** &rarr; copies or AirDrops the generated link.
   - **Device B**: Opening the link decodes the `#import=` payload, merges it (set union) into `localStorage`, and clears the URL hash.

### Pros & Cons
- **Pros**: 100% static on GitHub Pages; zero backend, zero quotas, zero maintenance forever.
- **Cons**: Manual handoff when switching devices rather than automatic sync on reload.
