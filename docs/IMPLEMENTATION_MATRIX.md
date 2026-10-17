# CMF iPro 2 OS: Implementation Architecture Matrix (Audited for Android 16)

**Target Device:** CMF Phone 2 Pro (Model A001, Codename *Galaga*)  
**Operating System:** Android 16 (Nothing OS)  
**Hardware & Security Status:** Locked Bootloader, Non-Rooted, Stock ROM  

---

## 1. Technical Boundary Assessment for Android 16

### Limitations of Unprivileged RRO & Fabricated Overlays (`cmd overlay`)
1. **No Layout Modification:** Fabricated runtime overlays cannot replace `res/layout/*.xml` structures. They cannot reorganize horizontal sliders into vertical capsules or create split pull-down shades.
2. **Overlayable Restrictions:** In Android 14+, target packages must declare an `<overlayable>` specification. Stock Nothing OS SystemUI restricts private resources from unprivileged overlay manipulation.

### Limitations of Iconify
1. **Platform Incompatibility:** Iconify is built for AOSP 12–14 and selected 15 builds. It is not verified on Android 16 and conflicts with Nothing OS's proprietary SystemUI extensions.
2. **Root Requirement:** Iconify requires Magisk/KernelSU and LSPosed. Running it on stock Nothing OS without a custom ROM can trigger immediate SystemUI crash loops.

---

## 2. Realistic Feature Feasibility Matrix

| System Component | Target Visual / Behavior | Stock Nothing OS 16 Feasibility | Privileged / Custom ROM Feasibility | Recommended Implementation Path |
|---|---|---|---|---|
| **App Icons** | Apple squircle curvature with minimal vector glyphs | ✅ 100% Feasible | ✅ 100% Feasible | Standard Android Icon Pack APK applied via Nothing OS Launcher settings. |
| **Essential Key** | Hardware key launches Essential Space | ✅ 100% Feasible | ✅ 100% Feasible | Native Nothing OS Settings > Special Features > Essential Key mapped to app/shortcut. |
| **Essential Space** | Frosted slide-in drawer with quick widgets | ✅ 100% Feasible | ✅ 100% Feasible | Standalone non-root companion app using `SYSTEM_ALERT_WINDOW` or standard intent. |
| **Material Colors** | Frosted light whites, obsidian dark themes | ✅ 100% Feasible | ✅ 100% Feasible | Android Monet color engine paired with curated frosted wallpapers. |
| **Lock Screen Clock** | Custom typography, bold centered layout | ⚠️ Limited to built-in Nothing OS styles | ✅ Full layout customization | Use closest built-in Nothing OS clock on stock; full custom clock in Custom ROM. |
| **Floating Dock** | Translucent frosted dock pill with 4 apps | ❌ Not on stock launcher | ✅ Launcher customization | Use modern 3rd-party launcher (Lawnchair 14) or Custom ROM launcher. |
| **Split Control Center** | Swipe right for CC, swipe left for Notifs | ❌ Not possible on stock SystemUI | ✅ Custom ROM / Privileged SystemUI | Preserve prototype as blueprint; requires SystemUI fork or custom ROM. |
| **Dual Vertical Sliders** | Vertical Brightness & Volume in Quick Settings | ❌ Not possible on stock SystemUI | ✅ Custom ROM / Privileged SystemUI | Preserve prototype as blueprint; requires SystemUI fork or custom ROM. |
| **Status Bar Pill Battery** | Minimal capsule with internal % | ❌ Not possible via RRO | ✅ Custom ROM / Privileged SystemUI | Preserve prototype as blueprint; requires SystemUI fork or custom ROM. |

---

## 3. Safe Two-Track Execution Strategy

### Track 1: Safe Stock Experience (Current Phone State)
- **Zero Risk:** Phone stays untouched, bootloader locked, no flashing.
- **Custom Icon Pack:** Build a stand-alone APK providing Apple-inspired squircles for Galaga.
- **Companion Essential Space:** Build a lightweight Android app providing the frosted widgets and voice memo, mapped to the physical Essential Key.
- **Frosted Launcher Theme:** Pair with Lawnchair / stock launcher widgets and curated wallpapers.

### Track 2: Custom ROM Blueprint (Future SystemUI Fork)
- The interactive visual prototype in `prototype/` serves as the exact design blueprint and behavioral specification if and when a compatible custom ROM (e.g., LineageOS, Paranoid Android) is developed for Galaga.
