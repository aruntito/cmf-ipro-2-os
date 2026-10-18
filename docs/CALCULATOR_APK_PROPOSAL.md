# CMF iPro 2 OS — Calculator Implementation Proposal (Phase 6A)

**Target Device:** CMF Phone 2 Pro (`Galaga A001`)  
**Development Host:** macOS (Mac mini, 37 GB free space, Node v26, Python 3.14, No Java Runtime)  
**Objective:** Evaluate the smallest practical Android application development setup to package the proven frosted Calculator into a standalone application without modifying the operating system.

---

## 1. Audit of Existing Prototype Calculator Logic

The calculator interface and calculation engine in [`prototype/app.js`](file:///Users/arun/WORK/CMF%20iPro%202%20OS/prototype/app.js) and [`prototype/styles.css`](file:///Users/arun/WORK/CMF%20iPro%202%20OS/prototype/styles.css) were verified:
- **Math Engine:** Handles 4-function arithmetic (`+`, `−`, `×`, `÷`), chaining operations, clear (`AC`), toggle sign (`±`), percentages (`%`), decimal limits, and division-by-zero protection.
- **Typographic Scaling:** Dynamically scales font size between `3.2rem`, `2.7rem`, and `2.2rem` when digits exceed 5 and 7 characters to prevent overflow.
- **Tactile Visuals:** Circular tactile keys with continuous squircle container, CMF orange arithmetic operators, frosted glass specular highlights, and tabular numeral spacing (`font-variant-numeric: tabular-nums`).

---

## 2. Packaging Options & Toolchain Evaluation

| Packaging Pathway | Host Prerequisites | Disk Cost on Mac | Complexity | Compatibility & Fidelity | Recommendation |
|---|---|:---:|:---:|---|:---:|
| **Pathway 1: Full Native Android Studio (Kotlin / Jetpack Compose)** | OpenJDK 17/21, Android Studio, Android SDK Platforms 34/35, Gradle | **~8 GB to 10 GB** | High | Native Android app. Requires rewriting entire UI in Compose from scratch. | **Reject** (Too heavy for Mac mini storage). |
| **Pathway 2: Headless CLI Builder (OpenJDK + Android Build-Tools)** | OpenJDK 17 (~180 MB), Android `cmdline-tools` (~350 MB) | **~600 MB** | Moderate | Direct compilation via AAPT2 and D8. Preserves 100% of the tested HTML/CSS/JS engine via lightweight WebView wrapper. | **Strong Candidate for Offline APK.** |
| **Pathway 3: Progressive Web App (PWA / WebAPK)** | None (Pure web manifest + Service Worker) | **0 MB** | Minimal | Installs directly from browser onto CMF Phone 2 Pro home screen as a standalone full-screen app with custom squircle icon. Zero APK risk. | **Immediate Best Route for Device Preview.** |

---

## 3. Recommended Staged Execution Plan

1. **Step 1 (Zero-Risk Device Preview via PWA):**
   - Add a lightweight `manifest.json` and basic service worker to `prototype/`.
   - The user can open the prototype on their CMF Phone 2 Pro and tap "Install / Add to Home Screen" to run the Frosted Calculator as an independent standalone app on their phone immediately, with zero flashing, zero root, and zero Mac downloads.
2. **Step 2 (Standalone APK Packaging via Headless CLI):**
   - If a distributable `.apk` file is strictly required, install only the minimal headless OpenJDK 17 (`brew install openjdk@17`) and standalone Android build-tools (~500 MB total), completely avoiding the heavy 10 GB Android Studio suite.
