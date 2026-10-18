# CMF iPro 2 OS — Phase 5: ROM Base Evaluation & Evidence Audit

**Target Device:** CMF Phone 2 Pro (Model `A001`, Codename `Galaga`)  
**Host Architecture:** macOS (Mac mini, 39 GB available disk space)  
**Audit Standard:** Every claim labeled strictly as **[Verified]**, **[Reported]**, or **[Unknown]**.  
**Research Status:** Read-only verification of community releases. Zero device flashing performed.

---

## 1. Candidate Evaluation Matrix

| Candidate | Build Date | Android Version | Package Availability & Size | Maintainer Partition Files | Hardware Status & Bugs | Verification Level | Verdict |
|---|---|---|---|---|---|:---:|---|
| **Unofficial LineageOS 24.0** | Oct 1, 2026 | Android 17 (v24.0) | `lineage-24.0-20261001-UNOFFICIAL-Galaga-gapps.zip` (1.8 GB)<br>`lineage-24.0-20261001-UNOFFICIAL-Galaga.zip` (1.4 GB) | `vendor_boot.img` (67.1 MB) | • NFC issues: **[Reported]**<br>• Calls / RIL: **[Reported functional]**<br>• Camera ISP tuning: **[Reported AOSP baseline]**<br>• Optical Fingerprint: **[Unknown]**<br>• 120Hz Refresh: **[Unknown]**<br>• Essential Key: **[Unknown]** | **[Partially Verified]** | **NO-GO for daily use.** Unverified hardware stability; unverified Android 17 theming compatibility. |
| **Unofficial VoltageOS 5.7** | Mar 24, 2026 | Android 16 (v5.7) | `voltage-5.7-Galaga-20260324-1037-UNOFFICIAL.zip` (1.6 GB) | `init_boot.img` (8.4 MB)<br>`vendor_boot.img` (67.1 MB)<br>`super_empty.img` (5.4 KB) | • Age: 7+ months stale **[Verified]**<br>• Security patch: Outdated **[Verified]**<br>• Hardware integration: **[Unknown]** | **[Verified Stale]** | **NO-GO for daily use.** Inactive maintainer support; unsuitable base. |
| **PixelOS** | N/A | N/A | None (0 items in directory) | None | N/A | **[Verified Empty]** | **REJECTED.** No files published. |

*Sources: SourceForge `projects/galagarom/files/` and Telegram `@CMFPhone2GlobalUpdates`.*

---

## 2. Hardware Subsystem & Theming Evidence Audit

Every hardware capability and theming mechanism is classified into three evidentiary tiers:
- **[Verified]:** Directly confirmed by repository files, official SDK documentation, or platform inspection.
- **[Reported]:** Documented by community testers or maintainers, but not independently benchmarked or reproducible across regional variants.
- **[Unknown]:** Lacking documented testing, configuration files, or release notes.

| Component / Subsystem | Evidentiary Status | Detailed Findings & Technical Context |
|---|:---:|---|
| **File Availability** | **[Verified]** | SourceForge `galagarom` contains Oct 1 LineageOS files (1.8 GB) and Mar 24 VoltageOS files. PixelOS directory is empty. |
| **Maintainer Flashing Flow** | **[Reported / Inferred]** | LineageOS provides `vendor_boot.img` alongside the zip. VoltageOS provides `vendor_boot`, `init_boot`, and `super_empty`. **No official written guide exists in the directory.** Previous generic MediaTek instructions were assumptions and are discarded. |
| **NFC Functionality** | **[Reported]** | Community threads report NFC issues on early Galaga trees. Regional variance (e.g. Indian retail unit A001 vs Global) also affects hardware presence. Specific Oct 1 build status is **[Reported Unstable]**, not universally proven across all hardware SKUs. |
| **Essential Key Integration** | **[Unknown]** | Neither custom ROM documents kernel keymapping for the physical CMF Essential Key (`gpio-keys.kl`). A standalone companion app **cannot guarantee** hardware key restoration if the ROM does not route the key event. |
| **In-Display Optical Fingerprint** | **[Unknown]** | Dimensity 7300 optical fingerprint HAL blobs are proprietary. Behavior under Android 17 on this specific build is unverified. |
| **120Hz Display Pipeline** | **[Unknown]** | Requires verifying whether the custom kernel display HAL supports dynamic 60/120Hz switching or defaults to fixed 60Hz. |
| **Camera Quality** | **[Reported]** | Community reports standard AOSP Camera or GCam port functionality. Proprietary multi-frame Nothing camera algorithms are absent. |
| **Iconify & LSPosed on Android 17** | **[Officially Unsupported]** | Iconify officially documents support up to Android 15. Android 17 compatibility is unverified and untracked. We must **not depend on Iconify or LSPosed** for this project. |

---

## 3. Clear Technical Boundaries: Prototype vs. Android Reality

We establish a permanent distinction between our visual prototype and real Android system modifications:

1. **What a Browser Prototype / Icon Pack CANNOT Do:**
   - It cannot magically transform closed-source OEM system apps (Phone, Messages, Settings).
   - It cannot inject custom layouts into the SystemUI Lock Screen, Notification Shade, or Quick Settings.
   - It cannot capture hardware button presses unless the underlying Android OS exposes those events.
2. **What Requires ROM-Specific Support:**
   - Quick Settings bento restructuring and vertical volume sliders require SystemUI source code support in the custom ROM.
   - Deep background blur requires `ro.surface_flinger.supports_background_blur=1` in the ROM build properties.
3. **What CAN Be Built Safely Right Now:**
   - **Frosted Wallpapers & Palette:** Static, highly refined assets that work natively on any ROM via Monet.
   - **Squircle Icon Pack:** Standard launcher-compatible vector APK.
   - **Frosted Calculator:** Standalone application with full math engine and frosted UI that replaces only the calculator, leaving core system components untouched.
   - **Essential Space UI:** Standalone drawer interface, with hardware integration deferred until ROM keycode support is verified.

---

## 4. Storage Impact on Mac Mini

- Current Available Disk Space: **39 GB** **[Verified]**.
- Android AOSP full source tree: **~250 GB to 350 GB** (Would instantly exhaust Mac mini storage).
- Web Prototype + Python Asset Compiler: **< 15 MB** **[Verified]**.
- **Constraint Compliance:** Maintained 100% read-only research; zero unnecessary downloads.

---

## 5. Phase 5 Final Decision: NO-GO on Flashing

> ### 🛑 **DECISION: NO-GO ON FLASHING AT THIS TIME**
> 
> **Actionable Plan:**
> 1. Physical phone remains **100% stock, untouched, and fully functional**.
> 2. Theming development continues **strictly on decoupled, low-risk deliverables**:
>    - Deliverable 1: Coordinated frosted wallpapers and Monet color palette.
>    - Deliverable 2: Vector squircle icon pack.
>    - Deliverable 3: Standalone frosted Calculator application.
> 3. Evaluation of Galaga custom ROMs remains **read-only monitoring** until a certified stable build with verified hardware support (NFC, camera, fingerprint) and explicit maintainer installation instructions is published.
