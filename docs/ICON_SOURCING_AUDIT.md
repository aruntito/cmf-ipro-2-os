# CMF iPro 2 OS — Icon Sourcing & Asset Provenance Audit (Phase 6B)

**Device Target:** CMF Phone 2 Pro (`Galaga A001`)  
**OS Target Context:** LineageOS 24.0 (Android 17 Base) / Stock Nothing OS Reference  
**Audit Policy:** Strict Provenance Verification. No invented icons in production; original assets must be sourced from official repositories, published packages, or verified system partitions. No untrusted third-party APK scraping. Unfound assets are marked **NOT SOURCED / NOT VERIFIED**.

---

## 1. Executive Summary

In accordance with project constraints, **we do not invent or redesign application icons for the production release**. The production theming layer must use original icons sourced directly from:
1. Official Nothing/CMF application packages and published resources.
2. The selected custom ROM repository (LineageOS 24.0 upstream trees).
3. The actual installed system app resources when accessible under proper licensing.

Any icons previously generated as vector squircles are reclassified as **Concept Placeholders** for layout testing in the web prototype and are **excluded** from the proposed production theme pack.

---

## 2. Phase 6B Detailed Verification Matrix

Every entry below has been verified against the official upstream GitHub repositories on branch `lineage-24.0` (or marked `NOT VERIFIED / NOT SOURCED` where proprietary/unavailable):

| # | Component / App | Verified Package ID | Verified Launcher Activity | Upstream Repo & Branch | Exact Resource Path & URL | Android Resource Type | Licence / Terms | Verification Status |
|---|---|---|---|---|---|---|---|---|
| 1 | **Phone** | `com.android.dialer` | `com.android.dialer.main.impl.MainActivity` | [`LineageOS/android_packages_apps_Dialer`](https://github.com/LineageOS/android_packages_apps_Dialer)<br>Branch: `lineage-24.0` | [`java/com/android/dialer/app/res/mipmap-anydpi/ic_launcher.xml`](https://raw.githubusercontent.com/LineageOS/android_packages_apps_Dialer/lineage-24.0/java/com/android/dialer/app/res/mipmap-anydpi/ic_launcher.xml) | `<adaptive-icon>`<br>Bg: Vector Drawable (`@drawable/ic_launcher_background`)<br>Fg: Vector Drawable (`@drawable/ic_launcher_foreground`) | Apache-2.0 | **VERIFIED (LineageOS Upstream)**<br>*Stock Google: NOT VERIFIED / NOT SOURCED* |
| 2 | **Messages** | `com.android.messaging` | `com.android.messaging.ui.conversationlist.ConversationListActivity` | [`LineageOS/android_packages_apps_Messaging`](https://github.com/LineageOS/android_packages_apps_Messaging)<br>Branch: `lineage-24.0` | [`res/mipmap-anydpi/ic_launcher.xml`](https://raw.githubusercontent.com/LineageOS/android_packages_apps_Messaging/lineage-24.0/res/mipmap-anydpi/ic_launcher.xml) | `<adaptive-icon>`<br>Bg: Vector Drawable (`@drawable/ic_launcher_background`)<br>Fg: Vector Drawable (`@drawable/ic_launcher_foreground`) | Apache-2.0 | **VERIFIED (LineageOS Upstream)**<br>*Stock Google: NOT VERIFIED / NOT SOURCED* |
| 3 | **Calculator** | `com.android.calculator2` | `com.android.calculator2.Calculator` | [`LineageOS/android_packages_apps_ExactCalculator`](https://github.com/LineageOS/android_packages_apps_ExactCalculator)<br>Branch: `lineage-24.0` | [`res/mipmap-anydpi/ic_launcher.xml`](https://raw.githubusercontent.com/LineageOS/android_packages_apps_ExactCalculator/lineage-24.0/res/mipmap-anydpi/ic_launcher.xml) | `<adaptive-icon>`<br>Bg: Vector Drawable (`@drawable/ic_launcher_background`)<br>Fg: Vector Drawable (`@drawable/ic_launcher_foreground`) | Apache-2.0 | **VERIFIED (LineageOS Upstream)**<br>*Stock Google: NOT VERIFIED / NOT SOURCED* |
| 4 | **Settings** | `com.android.settings` | `com.android.settings.Settings` | [`LineageOS/android_packages_apps_Settings`](https://github.com/LineageOS/android_packages_apps_Settings)<br>Branch: `lineage-24.0` | [`res/drawable/ic_launcher_settings.xml`](https://raw.githubusercontent.com/LineageOS/android_packages_apps_Settings/lineage-24.0/res/drawable/ic_launcher_settings.xml) | `<adaptive-icon>`<br>Bg: Vector Drawable (`@drawable/ic_launcher_background`)<br>Fg: Vector Drawable (`@drawable/ic_launcher_foreground`) | Apache-2.0 | **VERIFIED (LineageOS Upstream)**<br>*Nothing OS: NOT VERIFIED / NOT SOURCED* |
| 5 | **Clock** | `com.android.deskclock` | `com.android.deskclock.DeskClock` | [`LineageOS/android_packages_apps_DeskClock`](https://github.com/LineageOS/android_packages_apps_DeskClock)<br>Branch: `lineage-24.0` | [`res/mipmap-anydpi/ic_launcher.xml`](https://raw.githubusercontent.com/LineageOS/android_packages_apps_DeskClock/lineage-24.0/res/mipmap-anydpi/ic_launcher.xml) | `<adaptive-icon>`<br>Bg: Vector Drawable (`@drawable/ic_launcher_background`)<br>Fg: Vector Drawable (`@drawable/ic_launcher_foreground`) | Apache-2.0 | **VERIFIED (LineageOS Upstream)**<br>*Stock Google: NOT VERIFIED / NOT SOURCED* |
| 6 | **Weather** | `com.nothing.weather` | `NOT VERIFIED` (Requires device dump) | None (Closed source) | None published officially | `NOT VERIFIED` (Proprietary APK) | Proprietary Nothing Technology Ltd | **NOT VERIFIED / NOT SOURCED**<br>*(No public repo; untrusted extraction prohibited)* |
| 7 | **Essential Space** | `NOT APPLICABLE` (System hardware feature) | `NOT APPLICABLE` | None (Closed source) | None (Hardware/kernel binding) | Hardware subsystem / Driver | Proprietary Nothing Technology Ltd | **NOT VERIFIED / NOT SOURCED**<br>*(Hardware-bound; no standalone icon asset exists)* |
| 8 | **Camera** | `org.lineageos.aperture` | `org.lineageos.aperture.CameraLauncher` | [`LineageOS/android_packages_apps_Aperture`](https://github.com/LineageOS/android_packages_apps_Aperture)<br>Branch: `lineage-24.0` | [`app/src/main/res/mipmap-anydpi/ic_launcher.xml`](https://raw.githubusercontent.com/LineageOS/android_packages_apps_Aperture/lineage-24.0/app/src/main/res/mipmap-anydpi/ic_launcher.xml) | `<adaptive-icon>`<br>Bg: Vector Drawable (`@drawable/ic_launcher_background`)<br>Fg: Vector Drawable (`@drawable/ic_launcher_foreground`) | Apache-2.0 | **VERIFIED (LineageOS Upstream)**<br>*Nothing Camera: NOT VERIFIED / NOT SOURCED* |

---

## 3. Crucial Technical Constraint: Android Vector Drawables vs. W3C SVG

> [!WARNING]
> **Android XML Vector Drawables CANNOT Be Directly Copied into W3C SVGs:**
> 1. **Schema & Tag Differences:** Android Vector Drawables use `<vector>` roots with attributes like `android:pathData`, `android:fillColor`, and `android:viewportWidth`. Standard W3C SVGs use `<svg>` with `d`, `fill`, and `viewBox`.
> 2. **Multi-Layer Adaptive Composition:** Android adaptive icons use an `<adaptive-icon>` container declaring `<background>` and `<foreground>` drawables. The outer viewport is $108 \times 108$ dp, while the launcher masks the inner $72 \times 72$ dp (the inner 66% safe zone). A direct copy into a single flat SVG loses layer depth, parallax dynamics, and mask clipping.
> 3. **Themed Resource References:** Attributes such as `android:fillColor="?android:attr/colorPrimary"` or `@color/icon_tint` resolve at runtime within the Android OS resource framework and are invalid inside standalone SVG viewers.
> 4. **Conversion Requirement:** Converting an Android Vector Drawable to SVG requires an explicit parser transformation (e.g. converting `android:pathData` strings to SVG path `d` strings, resolving color constants, and compositing the $108 \times 108$ background and foreground layers).

---

## 4. Recommendations for Launcher-Compatible Packaging

### The Simplest Implementation Path: Standard `appfilter.xml` Adaptive APK
To package the verified original icons into a format compatible with modern Android launchers:

1. **Package Format:** A standard lightweight Android icon pack APK.
2. **Component Mapping (`res/xml/appfilter.xml`):**
   ```xml
   <resources>
       <!-- LineageOS Aperture Camera -->
       <item component="ComponentInfo{org.lineageos.aperture/org.lineageos.aperture.CameraLauncher}" drawable="ic_launcher_aperture" />
       <!-- LineageOS ExactCalculator -->
       <item component="ComponentInfo{com.android.calculator2/com.android.calculator2.Calculator}" drawable="ic_launcher_calculator" />
       <!-- LineageOS DeskClock -->
       <item component="ComponentInfo{com.android.deskclock/com.android.deskclock.DeskClock}" drawable="ic_launcher_deskclock" />
       <!-- LineageOS Settings -->
       <item component="ComponentInfo{com.android.settings/com.android.settings.Settings}" drawable="ic_launcher_settings" />
       <!-- LineageOS Messaging -->
       <item component="ComponentInfo{com.android.messaging/com.android.messaging.ui.conversationlist.ConversationListActivity}" drawable="ic_launcher_messaging" />
       <!-- LineageOS Dialer -->
       <item component="ComponentInfo{com.android.dialer/com.android.dialer.main.impl.MainActivity}" drawable="ic_launcher_dialer" />
   </resources>
   ```
3. **Handling Unverified / Missing Apps (Weather, Essential Space):**
   - **Omit from `appfilter.xml` entirely.** When a component is not defined in `appfilter.xml`, the launcher automatically preserves the application's built-in native icon. This guarantees zero broken or invented icons.

---

## 5. Launcher Limitations & Realities

1. **Trebuchet (Default LineageOS Launcher):**
   - On the target ROM (LineageOS 24.0), the 6 verified apps are **already native system apps**. Trebuchet automatically displays their official adaptive icons out-of-the-box without requiring any icon pack installation.
2. **Nothing Launcher:**
   - Supports third-party icon packs via `Customisation -> Icon pack`.
   - **Monochrome Mode Limitation:** Nothing Launcher includes an aggressive global monochrome toggle. If active, it converts all launcher icons to two-tone monochrome dots, overriding the original colors.
   - **SystemUI Boundary:** Launcher icon packs only theme the Home Screen and App Drawer. They **cannot** theme icons in the Notification Shade, Quick Settings header tiles, Settings submenus, or system dialogs (which are hardcoded in `com.android.systemui`).
3. **Lawnchair / Nova Launcher:**
   - Full support for adaptive vector drawables and dynamic squircles via standard `appfilter.xml`.
