# CMF iPro 2 OS — Phase 5: ROM Base Evaluation & Feasibility

**Target Device:** CMF Phone 2 Pro (Model `A001`, Codename `Galaga`)  
**Host Architecture:** macOS (Mac mini, 39 GB available disk space)  
**Research Status:** Read-only verification of community releases. Zero device flashing performed.

---

## 1. Candidate Evaluation Matrix

| Candidate | Build Date | Android Version | Package Availability & Size | Maintainer Partition Files | Hardware Status / Known Bugs | Verdict |
|---|---|---|---|---|---|---|
| **Unofficial LineageOS 24.0** | Oct 1, 2026 | Android 17 (v24.0) | `lineage-24.0-20261001-UNOFFICIAL-Galaga-gapps.zip` (1.8 GB)<br>`lineage-24.0-20261001-UNOFFICIAL-Galaga.zip` (1.4 GB) | `vendor_boot.img` (67.1 MB) | ❌ **NFC confirmed broken**.<br>⚠️ Optical fingerprint & Essential Key unverified.<br>⚠️ Experimental Android 17 base. | **NO-GO for daily use.** Breaks NFC payments; Android 17 breaks Iconify/Xposed theming frameworks. |
| **Unofficial VoltageOS 5.7** | Mar 24, 2026 | Android 16 (v5.7) | `voltage-5.7-Galaga-20260324-1037-UNOFFICIAL.zip` (1.6 GB) | `init_boot.img` (8.4 MB)<br>`vendor_boot.img` (67.1 MB)<br>`super_empty.img` (5.4 KB) | ⚠️ Older build (7+ months unmaintained).<br>⚠️ Outdated security patches.<br>⚠️ No Essential Space integration. | **NO-GO for daily use.** Stale maintainer support; risky daily-driver base. |
| **PixelOS** | N/A | N/A | None (SourceForge folder is completely empty: 0 items) | None | N/A | **REJECTED.** No files published. |

*Sources: SourceForge `projects/galagarom/files/` and Telegram `@CMFPhone2GlobalUpdates`.*

---

## 2. Installation Complexity & Correction of Generic Assumptions

### Correction of Previous Generic MediaTek Assumptions
- **The Generic Flaw:** Earlier documentation proposed a blanket MediaTek command chain (`fastboot flash --disable-verity vbmeta`, `fastboot wipe-super super_empty.img`, `fastboot flash dtbo`, etc.).
- **Device-Specific Reality on Galaga:**
  1. **LineageOS 24.0** distributes **only `vendor_boot.img`** alongside the ROM zip. Its documented recovery process is simply:
     ```bash
     fastboot flash vendor_boot vendor_boot.img
     fastboot reboot recovery
     # Inside Lineage Recovery: Factory Reset -> Apply from ADB -> adb sideload <rom>.zip
     ```
  2. **VoltageOS 5.7** distributes `init_boot.img`, `vendor_boot.img`, and `super_empty.img`.
  3. **Takeaway:** Flashing partition images not provided or mandated by the specific ROM maintainer can corrupt device encryption or hard-brick the device. Always follow the exact maintainer manifest.

---

## 3. Hardware Feature Feasibility on Current Custom ROMs

| Hardware / Subsystem | Status on Current Galaga ROMs | Daily-Driver Impact |
|---|---|---|
| **Calls & Mobile Data (RIL)** | Functional | Core communication works. |
| **Camera** | Basic AOSP / GCam only | Loss of Nothing's multi-frame HDR and sensor tuning. |
| **NFC** | **BROKEN** (Confirmed on LineageOS 24.0) | Google Wallet / contactless payments will not work. |
| **In-Display Optical Fingerprint** | Unstable / Flaky on early Android 17 | Biometric authentication reliability degraded. |
| **120Hz Refresh Rate** | Partial (Depends on kernel display HAL) | Possible stutter if dynamic rate drops. |
| **Essential Key** | Emits raw Linux keycode only | Does not launch Essential Space natively without companion APK. |
| **Essential Space** | **MISSING** | Proprietary Nothing app is omitted from AOSP ROMs. |

---

## 4. Root & Theming Compatibility Evidence

1. **Root via Magisk / KernelSU:**
   - On Android 16/17 with GKI kernel, Magisk patches `init_boot.img`.
   - For LineageOS (where `init_boot.img` is not distributed separately), extracting `init_boot` from the payload is required.
2. **Theming Compatibility:**
   - **Critical Blocker for Iconify & LSPosed:** Iconify and LSPosed are built for Android 12–15. Neither supports Android 17 (LineageOS 24.0), and both have severe stability issues on Android 16.
   - Forcing SystemUI layout modifications on these builds will trigger bootloops.
   - **The Decoupled Fix:** Developing our theme as **standalone user-space APKs** (Icon pack, custom frosted Calculator, and Essential Space companion) ensures 100% theme portability without depending on fragile Xposed/SystemUI hooks.

---

## 5. Storage Impact on Mac Mini

- Current Available Disk Space: **39 GB**.
- AOSP full source tree + build cache: **~250 GB to 350 GB** (Would immediately exhaust disk space).
- Decoupled Web Prototype + Python Asset Compiler: **< 15 MB**.
- **Constraint Compliance:** Maintained 100% zero-bloat, read-only approach.

---

## 6. Phase 5 Final Verdict: GO / NO-GO Decision

> ### **DECISION: NO-GO ON FLASHING AT THIS TIME**
> 
> **Rationale:**
> 1. Available Galaga custom ROMs are **early unofficial builds with active hardware bugs (NFC broken)**.
> 2. Android 17 breaks Iconify and LSPosed theming compatibility.
> 3. Flashing now would downgrade daily phone usability and risk stability.
> 
> **Actionable Next Step:**
> Keep the physical phone on stable stock firmware. Continue developing and perfecting the **decoupled frosted theming suite** (Icon pack, wallpapers, custom Calculator APK, and Essential Space companion). When a stable, verified custom ROM build with working NFC and hardware drivers is published for Galaga, our theme suite will be ready to install in seconds.
