# CMF iPro 2 OS — Rooted Custom ROM Theming Strategy

**Target Device:** CMF Phone 2 Pro (Model `A001`, Codename `Galaga` / Dimensity 7300)  
**Core Directive:** **Existing compatible custom ROM + Root + Theming only.** Zero ROM compiling from source, zero Android tree downloads.

---

## 1. System Architecture & Compatibility Stack

```
┌─────────────────────────────────────────────────────────────┐
│                   CMF iPro 2 OS Theme Layer                 │
│  - Frosted Glassmorphism Assets (Ultra-Thin to Thick)        │
│  - App Theming (Phone, Messages, Calculator, Settings, etc.)│
│  - Essential Space Companion (Mapped to Essential Key)     │
└─────────────────────────────────────────────────────────────┘
                               ▲
                               │
┌─────────────────────────────────────────────────────────────┐
│                 SystemUI & Surface Hook Layer               │
│  - Iconify Engine (v7.x - v8.x)                             │
│  - LSPosed / ZygiskNext (Quick Settings blur, Split shade)  │
│  - System OverlayFS / RRO Overlays (/product/overlay)       │
└─────────────────────────────────────────────────────────────┘
                               ▲
                               │
┌─────────────────────────────────────────────────────────────┐
│                      Root Environment                       │
│  - KernelSU (recommended for Dimensity GKI) or Magisk v27+  │
│  - Zygisk Module Support                                    │
└─────────────────────────────────────────────────────────────┘
                               ▲
                               │
┌─────────────────────────────────────────────────────────────┐
│             Compatible Existing Custom ROM                  │
│  - LineageOS / Evolution X / RisingOS / crDroid             │
│  - Android 14 / Android 15 AOSP Base                        │
│  - Hardware keylayout preservation (gpio_keys / Galaga)     │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Component Role Division

### A. The Role of the Compatible Custom ROM
1. **Decoupled SystemUI:** AOSP-based custom ROMs (Evolution X, LineageOS, RisingOS) remove OEM proprietary lock-outs on `com.android.systemui`, enabling full RRO overlay support.
2. **SurfaceFlinger Blur Pipeline:** Custom ROMs enable `ro.surface_flinger.supports_background_blur=1` out of the box, utilizing the Dimensity 7300 Mali-G615 GPU for smooth 120Hz frosted glass backdrop blurs without frame drops.
3. **Split Shade Support:** Most mature AOSP 14/15 custom ROMs feature native split shade quick settings settings.

### B. The Role of Root (KernelSU / Magisk + LSPosed)
1. **LSPosed Framework:** Required specifically for Iconify's advanced Quick Settings features:
   - Deep SystemUI background blur injection (Gaussian blur on the shade scrim).
   - Dynamic vertical brightness and volume slider morphing.
   - Header clock font replacement.
2. **OverlayFS Injection:** Allows our compiled theme overlays to sit in `/product/overlay/` or `/vendor/overlay/` without permanently modifying device system partitions (systemless theming).

### C. The Role of Iconify
- **Status Bar:** iOS-style Wi-Fi wave, cellular signal bars, and battery capsule with inside percentage.
- **Quick Settings Bento:** Squircle tiles with custom active/inactive glass alphas.
- **Volume Panel:** Frosted vertical volume dialog matching our design spec.

### D. The Role of Antigravity Theme Engine
1. **Built-in App Overlays:** Complete frosted glass design overlays for Phone, Messages, Calculator, Settings, Clock, and Weather.
2. **Custom Vector Icon Pack:** High-fidelity Apple-style squircle icons.
3. **Essential Space Integration:** Preserving and enhancing the CMF hardware experience.

---

## 3. Storage & Resource Footprint Guarantees

- **No Android Source Downloads:** Saves ~250 GB–400 GB of local disk space.
- **No Heavy Build Toolchains:** Overlays and companion apps compile into tiny APKs (typically < 15 MB total for all themes combined).
- **Fast Iteration:** Changes to app themes and overlays can be generated, packaged, and tested in seconds.
