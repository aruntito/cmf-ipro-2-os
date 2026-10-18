# CMF iPro 2 OS — App Source & Launcher Compatibility Matrix

**Target Device:** CMF Phone 2 Pro (`Galaga A001`)  
**Context:** Pre-Packaging Decision Matrix for Application Icons & Theming  
**Rule:** Source, Don't Redesign. Do not package icons until the target ROM's actual app suite is established.

---

## 1. Ecosystem App Comparison Matrix

This matrix evaluates each core system application across the three potential ROM environments:
1. **Stock Nothing OS (CMF):** The OEM firmware shipping on the device.
2. **Google Mobile Services (GApps):** What is added when MindTheGapps / NikGApps is flashed onto a custom ROM.
3. **Pure LineageOS (AOSP):** The default open-source packages bundled with LineageOS 24.0.

| # | Application | (1) Original Nothing/CMF App | (2) Original Google App | (3) Original LineageOS App | (4) Upstream Asset Status | (5) Target Launcher Compatibility |
|---|---|---|---|---|---|---|
| 1 | **Phone** | Google Phone (`com.google.android.dialer`) bundled by default on Nothing OS | Google Phone (`com.google.android.dialer`) | LineageOS Dialer (`com.android.dialer`) | **LineageOS:** VERIFIED (Apache-2.0)<br>**Google:** MISSING (Proprietary) | **Nothing Launcher:** Supported via `appfilter.xml` or native.<br>**Trebuchet:** Native.<br>**Limitation:** Cannot theme in-call UI. |
| 2 | **Messages** | Google Messages (`com.google.android.apps.messaging`) bundled by default | Google Messages (`com.google.android.apps.messaging`) | LineageOS Messaging (`com.android.messaging`) | **LineageOS:** VERIFIED (Apache-2.0)<br>**Google:** MISSING (Proprietary) | **Nothing Launcher:** Supported.<br>**Trebuchet:** Native.<br>**Limitation:** Cannot theme conversation bubble UI. |
| 3 | **Calculator** | Nothing Calculator (custom dot-matrix) or Google Calculator | Google Calculator (`com.google.android.calculator`) | ExactCalculator (`com.android.calculator2`) | **LineageOS:** VERIFIED (Apache-2.0)<br>**Google/Nothing:** MISSING (Proprietary) | **All Launchers:** Supported via standard icon pack. |
| 4 | **Settings** | Nothing OS Settings (`com.android.settings`, customized dot-matrix / Glyph UI) | Pixel Settings (AOSP derivative for Pixel) | LineageOS Settings (`com.android.settings`) | **LineageOS:** VERIFIED (Apache-2.0)<br>**Nothing OS:** MISSING (Proprietary) | **CRITICAL BOUNDARY:** Launcher only styles the home screen icon. **CANNOT** alter icons, cards, or menus inside the Settings app itself. |
| 5 | **Clock** | Google Clock (`com.google.android.deskclock`) or Nothing Clock | Google Clock (`com.google.android.deskclock`) | LineageOS DeskClock (`com.android.deskclock`) | **LineageOS:** VERIFIED (Apache-2.0)<br>**Google/Nothing:** MISSING (Proprietary) | **All Launchers:** Supported via standard icon pack. Dynamic clock hand animation requires launcher-specific XML. |
| 6 | **Weather** | Nothing Weather (`com.nothing.weather`) | Google Weather (embedded in Google App / Pixel Weather) | *None bundled* (Only background weather provider service) | **All:** MISSING / UNRESOLVED (Proprietary) | **Unresolved:** Do not package. When omitted from `appfilter.xml`, launcher retains the native app icon untouched. |
| 7 | **Essential Space** | Nothing OS Essential Space (hardware key triggered) | *None* (CMF hardware exclusive) | *None* (Not in AOSP or LineageOS) | **All:** MISSING / HARDWARE BOUND | **NOT AN ICON:** Cannot be replaced by a launcher icon pack. Bound directly to kernel Linux input event `KEY_CMF_ESSENTIAL`. |
| 8 | **Camera** | Nothing Camera (`com.nothing.camera`, tuned MediaTek 50MP ISP) | Google Camera (GCam port / Mod) | Aperture Camera (`org.lineageos.aperture`) | **LineageOS (Aperture):** VERIFIED (Apache-2.0)<br>**Nothing Camera:** MISSING (Proprietary) | **Mismatch Hazard:** Aperture is a completely different app from Nothing Camera. Packaging Aperture's icon for a ROM that ports Nothing Camera causes an app mismatch. |

---

## 2. Key Technical Findings & Theming Boundaries

### Finding 1: The Vanilla vs. GApps Dilemma
- If the eventual custom ROM is run **vanilla (without Google apps)**:
  - The installed apps are the LineageOS suite (Dialer, Messaging, DeskClock, ExactCalculator, Aperture). In this case, **no icon pack is even needed** because LineageOS’s default launcher (Trebuchet) already displays these verified adaptive icons out-of-the-box.
- If the custom ROM is run with **GApps (Google Mobile Services)**:
  - The phone will use Google Phone, Google Messages, Google Clock, and Google Calculator.
  - Packaging the verified LineageOS icons would **substitute AOSP/LineageOS icons over Google apps**, which contradicts the goal of preserving original app identities.
  - Google's official icons are proprietary copyright of Google LLC and cannot be legally redistributed from upstream git trees without device extraction.

### Finding 2: Camera Identity Mismatch
- `org.lineageos.aperture` is LineageOS's modern CameraX-based open-source camera.
- `com.nothing.camera` is Nothing's proprietary camera app utilizing MediaTek's custom ISP tuning.
- These are completely distinct applications with different package names, launcher activities, and feature sets. An icon for Aperture must not be mapped to Nothing Camera.

### Finding 3: Launcher Scope & SystemUI Boundaries
Applying an icon pack via `appfilter.xml` (whether in Nothing Launcher, Lawnchair, or Nova) has hard technical limits:
1. **Home Screen & App Drawer Only:** Launcher icon packs **only** restyle application shortcuts on the launcher desktop and drawer grid.
2. **In-App Menus Untouched:** An icon pack **cannot** change the icons, typography, or cards inside Settings, Phone dialpad, or Clock tabs.
3. **SystemUI Untouched:** Launcher icon packs **cannot** restyle Status Bar icons (WiFi, cellular, battery), Quick Settings bento tiles, notification drawer icons, or system dialogs. Those assets are compiled directly into `com.android.systemui`.
4. **Nothing Launcher Monochrome Override:** If the user has Nothing Launcher's "Monochrome" theme enabled, Nothing Launcher programmatically overrides full-color adaptive icons and converts them into two-tone monochrome dot patterns.

---

## 3. Recommended Architectural Rule

> [!IMPORTANT]
> **Do Not Package a Launcher Icon Pack Until the Target ROM Base Is Certified:**
> 1. Because the custom ROM installation is currently on a strict **NO-GO** (per Phase 5 audit), the exact set of installed apps (Pure LineageOS vs. GApps vs. Nothing OS Port) is not yet fixed.
> 2. Sourcing icons for apps that may not be installed creates package mismatches and broken launcher mappings.
> 3. **Safest Rule:** Keep verified LineageOS vector drawables documented as upstream references, leave proprietary OEM apps untouched on device, and defer icon packaging until the real ROM environment is finalized.
