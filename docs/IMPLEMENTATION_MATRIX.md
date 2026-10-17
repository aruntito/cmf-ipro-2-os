# CMF iPro 2 OS — Real Theme Implementation Matrix (Audited Phase 3)

**Target Device:** CMF Phone 2 Pro (Model `A001`, Codename `Galaga`)  
**SoC:** MediaTek Dimensity 7300  
**Core Directive:** Existing Compatible ROM + Root + Theming. No ROM compiling or AOSP tree checkout.

---

## 1. ROM Candidate Evaluation for Galaga

| ROM Candidate | Availability & Stability Status | Essential Key HAL Support | Theming & Iconify Compatibility | Verdict |
|---|---|---|---|---|
| **Rooted Stock Nothing OS (Android 14/15 base)** | ✅ **Available, 100% Stable** (Official OEM) | ✅ **100% Native** (Stock Settings) | ⚠️ **Partial** (Requires selective Iconify / LSPosed; avoid layout-breaking mods) | **Primary Recommended Base** for daily-driver reliability. |
| **Unofficial LineageOS / crDroid for Galaga** | ⚠️ **Early Community Bringup** (`nothing-galaga` tree) | ⚠️ Requires verifying `gpio-keys.kl` mapping | ✅ **High** (Standard AOSP SystemUI fully compatible with Iconify) | **Secondary Candidate** once vendor camera & sensor HALs stabilize. |
| **Generic System Image (GSI - Treble)** | ⚠️ **Experimental** (Generic AOSP / Lineage GSI) | ❌ **Broken / Missing** (No OEM key routing) | ⚠️ Medium (MediaTek display & camera glitches common) | **Not Recommended** (Breaks hardware identity). |

---

## 2. Technical Feasibility & Feature Categorization

Features are categorized strictly according to technical reality:
- **Category A:** Achievable with existing ROM settings (Zero external tools).
- **Category B:** Achievable with compatible root modules or RRO resource overlays.
- **Category C:** Requires modifying or replacing an individual app (RRO cannot alter layout trees).
- **Category D:** Unsupported or too risky (Likely to cause SystemUI bootloops).

### Detailed Breakdown

| Component / Feature | Target Design | Category | Required Mechanism & Realistic Feasibility |
|---|---|:---:|---|
| **Dynamic Palette & Accents** | CMF Signature Orange & Apple Blue | **A** | Android Monet engine + curated frosted wallpapers. |
| **Lock Screen Shortcuts** | Torch & Camera quick toggles | **A** | Built-in ROM lock screen customization. |
| **Essential Key Mapping** | Hardware key launches Essential Space | **A** | Built-in Nothing OS / Custom ROM button settings. |
| **System Surface Blurs** | Real-time Gaussian blur on QS & windows | **A/B** | Hardware-accelerated `SurfaceFlinger` blur natively supported by Dimensity 7300 GPU. |
| **App Icon Shapes** | Apple superellipse squircles | **B** | Standard vector Icon Pack APK applied via launcher. |
| **Status Bar Minimal Icons** | iOS-style Wi-Fi wave, cellular bars | **B** | Iconify status bar icon pack overlay or custom RRO icon pack. |
| **Status Bar Battery Capsule** | Pill with internal % | **B / D** | Supported via Iconify on AOSP; **D (Risky)** on newer Nothing OS builds without testing. |
| **Split Quick Settings** | Swipe right for CC, swipe left for Notifs | **B** | Supported natively in AOSP custom ROMs; requires selective LSPosed hook on Nothing OS. |
| **Vertical QS Sliders** | Dual vertical Brightness & Volume | **B / D** | Supported via Iconify QS themes on AOSP; **D (Risky)** on Nothing OS if proprietary QS is active. |
| **Themed Settings App** | Apple grouped bento cards | **B** | RRO overlay for card corner radiuses, item backgrounds, and icons. |
| **Themed Calculator App** | Apple round keypad with live math | **C** | **Requires App Implementation:** RRO cannot rewrite Calculator layouts into circular keys. Replaced with lightweight open-source frosted calculator. |
| **Themed Phone / Dialer** | Circular keypad & blurred call screen | **B / C** | RRO for AOSP Dialer keys; or lightweight frosted dialer replacement. |
| **Themed Messages App** | Frosted chat bubbles & pill input | **B / C** | RRO for AOSP Messaging. Note: Google Messages resists third-party RRO. |
| **Themed Weather App** | Dynamic sky canvas & forecast cards | **C** | **Requires App Implementation:** Stock weather is closed-source; replaced with lightweight frosted weather companion. |
| **Themed Essential Space** | Frosted slide-in drawer with voice memo | **C** | **Requires App Implementation:** Standalone frosted companion APK mapped to Essential Key. |

---

## 3. Minimalist Implementation Checklist

To minimize storage, background overhead, and device risks:

1. **Host Environment (Mac):**
   - Pure web prototype in `prototype/` (Zero disk overhead, verified visual blueprint).
   - Lightweight Python asset compiler for vector icons and RRO XMLs (< 5 MB).
2. **Device Environment (Galaga A001):**
   - **Base:** Stable Rooted Stock Nothing OS (or verified LineageOS build).
   - **Root Engine:** KernelSU (clean kernel-level root) or Magisk v27+.
   - **Xposed Framework (Selective):** ZygiskNext + LSPosed (used ONLY for verified SystemUI blurs, no experimental layout mods).
   - **Iconify:** Applied strictly for verified icon packs and status bar glyphs.
   - **Companion Apps (Track 2):**
     - `CMF-iPro-Icons.apk` (Squircle icons).
     - `CMF-iPro-Calculator.apk` (Frosted Apple-style calculator).
     - `CMF-iPro-EssentialSpace.apk` (Mapped to physical hardware key).
