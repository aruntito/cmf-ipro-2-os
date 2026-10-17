# CMF iPro 2 OS — Rooted ROM Candidate & Theming Strategy (Phase 3)

**Target Device:** CMF Phone 2 Pro (Model `A001`, Codename `Galaga`)  
**Architecture:** Existing Compatible ROM + Root + Selective Theming  

---

## 1. ROM Candidate Analysis for Galaga (Dimensity 7300)

Dedicated AOSP custom ROMs for the CMF Phone 2 Pro are currently in active community bring-up (`nothing-galaga` trees). Because MediaTek vendor drivers for camera and display HALs take time to mature in custom trees:

1. **Primary Immediate Candidate: Rooted Stock Nothing OS (Android 14/15 base)**
   - **Advantage:** 100% stable hardware drivers, fully working camera ISP, flawless display refresh rate (120Hz), and zero risk of broken Essential Key keycodes.
   - **Theming Approach:** Use KernelSU / Magisk with Zygisk + LSPosed to inject selective systemless overlays and status bar packs.
2. **Future Secondary Candidate: Community LineageOS / crDroid for Galaga**
   - **Advantage:** Unencumbered AOSP SystemUI where full Iconify split-shade features work without OEM conflicts.
   - **Prerequisite:** Device tree and vendor blobs must be certified stable by the community before flashing.

---

## 2. Realistic Technical Boundaries

### What Overlays (RRO) Can & Cannot Do
- **Can Do:** Replace colors, vector drawables, corner radii, dimensions, string tokens, and icon packs.
- **Cannot Do:** RRO cannot add new interactive buttons, rewrite layout XML hierarchies, or change app state machines.
- **Strategic Fix:** For apps requiring fundamental layout shifts (such as the Apple-style circular Calculator, dynamic Weather canvas, and Essential Space drawer), we provide **lightweight standalone companion APKs** rather than attempting impossible RRO hacks.

---

## 3. Minimal Practical Toolset

| Tool | Purpose | Storage Footprint | Risk Level |
|---|---|---|---|
| **Web Prototype (`prototype/`)** | Interactive blueprint & visual testing | ~100 KB | **Zero (Host Only)** |
| **Python Asset Script** | Compiles XML overlays and squircle icons | ~10 KB | **Zero (Host Only)** |
| **KernelSU / Magisk** | Systemless root environment on device | ~15 MB | Low (when using stock boot image) |
| **LSPosed (Selective)** | Framework for Quick Settings blur injection | ~5 MB | Low (applied selectively) |
| **Iconify (Selective)** | Status bar vector icons and corner styles | ~12 MB | Low (avoiding experimental layout mods) |
| **Companion APKs** | Frosted Calculator & Essential Space | < 10 MB total | **Zero (Standard User APKs)** |
