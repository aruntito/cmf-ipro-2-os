# CMF iPro 2 OS — Risk-Minimised Implementation Plan (Phase 4)

**Permanent Project Scope:**  
- **Base:** Existing compatible custom ROM for CMF Phone 2 Pro (`Galaga A001`).  
- **Environment:** Rooted environment (KernelSU / Magisk).  
- **Boundary:** **Theming only.** Never compile, build, or maintain an operating system.  
- **Philosophy:** **Easiest, safest method first.** If a feature is risky, skip it or choose a safe alternative.  
- **Target Aesthetic:** Apple-inspired frosted interface with CMF hardware identity preserved.  

---

## 1. Galaga Custom ROM Installation & Recovery Architecture

Based on the MediaTek Dimensity 7300 partition layout (shared with the CMF platform):

### Required Recovery & Partition Flow
1. **Bootloader:** Unlocked via `fastboot flashing unlock` (erases user data).
2. **AVB / Verification:** Flashed with `vbmeta.img` (`--disable-verity --disable-verification`).
3. **Core Partitions:** `dtbo.img`, `boot.img`, and `init_boot.img` (used for KernelSU / Magisk systemless rooting).
4. **Super Partition:** Dynamically allocated via `super_empty.img` before sideloading.
5. **Recovery:** Custom recovery (Lineage Recovery / crDroid Recovery) used to `adb sideload <rom>.zip`.

> [!IMPORTANT]
> **Safety Rule:** No fastboot flashing or bootloader unlocking will be performed until a community build of a custom ROM (e.g. LineageOS or crDroid) for `Galaga` is certified stable with working camera, audio, display (120Hz), and keylayout.

---

## 2. Feature Risk, Method & Storage Table

| Feature | Recommended Method (Easiest First) | Safe Fallback (If Risky/Unsupported) | Risk Level | Storage Required | Safe to Skip? |
|---|---|---|:---:|:---:|:---:|
| **App Icons** | Standard vector Icon Pack APK (`.apk`) applied in launcher | Launcher-supported adaptive squircle icon pack | **Zero** | < 15 MB | No (Core aesthetic) |
| **Wallpapers & Colors** | Native ROM theme settings + Android Monet engine | Coordinated static frosted wallpapers & dark/light palettes | **Zero** | < 8 MB | No (Core aesthetic) |
| **Lock Screen** | Built-in ROM customisation (clock fonts, shortcuts) | Keep native layout; theme only supported clock & widget elements | **Zero** | 0 MB | Yes (Native layout works well) |
| **Frosted Panels** | Built-in ROM blur toggles (`SurfaceFlinger` GPU blur) | Soft translucent shaded backgrounds (`rgba`) without deep blur | **Very Low** | 0 MB | Yes (Soft shading works cleanly) |
| **Settings App** | Compatible RRO resource overlays (corner radii, icons) | Keep original AOSP Settings layout; theme colors & vector glyphs | **Low** | < 2 MB | Yes (Stock settings layout is fine) |
| **Calculator** | Custom themed standalone calculator APK | Replace only the calculator app; never touch system framework | **Zero** | < 3 MB | No (Key visual showpiece) |
| **Weather** | Custom themed standalone weather companion APK | Lightweight open-source weather app with clean frosted card widgets | **Zero** | < 5 MB | Yes (Optional widget) |
| **Phone & Contacts** | Preserve native custom ROM dialer; theme drawables via RRO | Keep existing stock calling implementation completely untouched | **Low** | < 2 MB | Yes (Dialer stability is critical) |
| **Messages** | Preserve native custom ROM SMS; theme drawables via RRO | Keep existing stock SMS app completely untouched | **Low** | < 2 MB | Yes (SMS stability is critical) |
| **Clock & Alarms** | Theme native DeskClock drawables via RRO | Keep existing stock clock app completely untouched | **Low** | < 2 MB | Yes (Alarm reliability is critical) |
| **Essential Key** | Preserve ROM hardware keylayout (`gpio-keys.kl`) | Standard Android key assignment via ROM button settings | **Very Low** | 0 MB | No (Essential hardware feature) |
| **Essential Space** | Lightweight standalone companion APK mapped to key | Launch standard quick memo or voice recorder app | **Zero** | < 5 MB | Yes (Can launch native tools) |
| **Status Bar Icons** | Compatible Iconify vector status bar pack | Keep native custom ROM status bar icons | **Medium** | < 10 MB | **Yes (Skip if unverified)** |
| **Quick Settings Layout** | Native ROM QS customisation (tile shapes, row counts) | Keep stock QS layout; theme supported accent colors only | **Low** | 0 MB | **Yes (Deep redesign skipped)** |
| **Deep QS Split Shade** | **SKIPPED / OPTIONAL** (Only if native to ROM) | Keep standard pull-down shade with frosted accenting | **High** | N/A | **Yes (Avoid bootloop risk)** |
| **Vertical Sliders in QS** | **SKIPPED / OPTIONAL** (Only if native to ROM) | Keep standard horizontal brightness slider with themed pill track | **High** | N/A | **Yes (Avoid bootloop risk)** |

---

## 3. What We Will Strictly Avoid

1. **No Experimental SystemUI Hooks:** We will not install experimental Xposed / LSPosed hooks that modify `NotificationPanelViewController` or `QSPanel` layouts.
2. **No Unverified Iconify Layout Packs:** Only verified status bar icon drawables will be enabled; layout-altering mods will be avoided.
3. **No Overlapping Root Modules:** Never install multiple conflicting overlay engines or sub-frameworks.
4. **No Core Calling / SMS Disruptions:** The core telephony stack and SMS telephony databases are kept 100% native.
5. **No Custom Kernel or Firmware Compiling:** Flashing stays strictly within prebuilt, signed custom ROM packages.

---

## 4. Minimalist Packaging Summary

When the custom ROM for Galaga is ready to be themed, the entire project deploys through **three tiny, safe packages**:

```
Total Download & Storage Budget: ~30 MB
├── 1. CMF-iPro-Icons.apk (~12 MB)
│      Standard user-space squircle icon pack for the launcher.
│
├── 2. CMF-iPro-ThemeOverlay.apk (~3 MB)
│      Safe RRO overlay targeting colors, squircle radii, and status icons.
│
└── 3. CMF-iPro-Apps.apk (~15 MB)
       Standalone frosted Calculator & Essential Space drawer.
```
