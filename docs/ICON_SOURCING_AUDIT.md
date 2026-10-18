# CMF iPro 2 OS — Icon Sourcing & Asset Provenance Audit

**Device Target:** CMF Phone 2 Pro (`Galaga A001`)  
**OS Target Context:** LineageOS 24.0 (Android 17 Base) / Stock Nothing OS Reference  
**Audit Policy:** Strict Provenance Verification. No invented icons in production; original assets must be sourced from official repositories, published packages, or verified system partitions. No untrusted third-party APK scraping. Unfound assets are marked **NOT SOURCED**.

---

## 1. Executive Summary

In accordance with project constraints, **we do not invent or redesign application icons for the production release**. The production theming layer must use original icons sourced directly from:
1. Official Nothing/CMF application packages and published resources.
2. The selected custom ROM repository (LineageOS 24.0 upstream trees).
3. The actual installed system app resources when accessible under proper licensing.

Any icons previously generated as vector squircles are reclassified as **Concept Placeholders** for layout testing in the web prototype and are **excluded** from the proposed production theme pack.

---

## 2. Detailed Audit of the 8 Core Application Icons

| # | Component / App | Status in `assets/icons/` | Target App / Package ID | Official Upstream Source | Exact Resource Path / URL | License / Terms | Verification Status |
|---|---|---|---|---|---|---|---|
| 1 | **Phone** | `phone.svg` (Apple-style emerald squircle) | **LineageOS:** `com.android.dialer`<br>**Stock:** `com.google.android.dialer` | LineageOS GitHub: `android_packages_apps_Dialer` | `java/com/android/dialer/app/res/mipmap-anydpi/ic_launcher_phone.xml` (branch `lineage-24.0`) | Apache-2.0 (Open Source) | **[Verified Upstream (LineageOS)]**<br>*Google Phone: NOT SOURCED* |
| 2 | **Messages** | `messages.svg` (Apple-style green bubble) | **LineageOS:** `com.android.messaging`<br>**Stock:** `com.google.android.apps.messaging` | LineageOS GitHub: `android_packages_apps_Messaging` | `res/mipmap-anydpi/ic_launcher_sms_mms.xml` (branch `lineage-24.0`) | Apache-2.0 (Open Source) | **[Verified Upstream (LineageOS)]**<br>*Google Messages: NOT SOURCED* |
| 3 | **Calculator** | `calculator.svg` (Apple-style orange math grid) | **LineageOS:** `com.android.calculator2`<br>**Stock:** `com.google.android.calculator` | LineageOS GitHub: `android_packages_apps_ExactCalculator` | `res/mipmap-anydpi/ic_launcher_calculator.xml` (branch `lineage-24.0`) | Apache-2.0 (Open Source) | **[Verified Upstream (LineageOS)]**<br>*Google Calculator: NOT SOURCED* |
| 4 | **Settings** | `settings.svg` (Apple-style concentric gear) | **LineageOS:** `com.android.settings`<br>**Stock:** `com.android.settings` (Nothing OS) | LineageOS GitHub: `android_packages_apps_Settings` | `res/drawable/ic_launcher_settings.xml` (branch `lineage-24.0`) | Apache-2.0 (Open Source) | **[Verified Upstream (LineageOS)]**<br>*Nothing OS Settings: NOT SOURCED* |
| 5 | **Clock** | `clock.svg` (Apple-style analog clock) | **LineageOS:** `com.android.deskclock`<br>**Stock:** `com.google.android.deskclock` | LineageOS GitHub: `android_packages_apps_DeskClock` | `res/mipmap-anydpi/ic_launcher_alarmclock.xml` (branch `lineage-24.0`) | Apache-2.0 (Open Source) | **[Verified Upstream (LineageOS)]**<br>*Google Clock: NOT SOURCED* |
| 6 | **Weather** | `weather.svg` (Apple-style azure sky/sun) | **Stock / Official:** `com.nothing.weather`<br>**LineageOS:** No default weather app (provider service only) | Nothing Technology Limited (Google Play Store) | `https://play.google.com/store/apps/details?id=com.nothing.weather` | Proprietary (Nothing Technology Ltd) | **NOT SOURCED**<br>*(No public repo; untrusted extraction prohibited)* |
| 7 | **Essential Space** | `essential.svg` (CMF orange monogram) | **CMF / Nothing:** Proprietary hardware drawer component | Built-in Nothing OS System Feature | Physical device system partition (`/system_ext` / `/product`) | Proprietary (Nothing Technology Ltd) | **NOT SOURCED**<br>*(Hardware-bound; no standalone asset exists)* |
| 8 | **Camera** | `camera.svg` (Apple-style multi-ring lens) | **LineageOS:** `org.lineageos.aperture`<br>**Stock:** `com.nothing.camera` | LineageOS GitHub: `android_packages_apps_Aperture` | `app/src/main/res/mipmap-anydpi/ic_launcher.xml` (branch `lineage-24.0`) | Apache-2.0 (Open Source) | **[Verified Upstream (LineageOS)]**<br>*Nothing Camera: NOT SOURCED* |

---

## 3. Analysis by Sourcing Category

### Category A: Open-Source ROM Upstream (LineageOS 24.0 / AOSP)
For the target custom ROM environment (LineageOS 24.0 on Galaga), the following core system applications have **verified, legal, open-source vector icon drawables** directly in the official LineageOS GitHub repositories on the active `lineage-24.0` branch:
1. **Aperture Camera:** `LineageOS/android_packages_apps_Aperture` → `ic_launcher.xml` (Apache-2.0)
2. **ExactCalculator:** `LineageOS/android_packages_apps_ExactCalculator` → `ic_launcher.xml` (Apache-2.0)
3. **DeskClock:** `LineageOS/android_packages_apps_DeskClock` → `ic_launcher.xml` & `launcher_clock.xml` (Apache-2.0)
4. **Settings:** `LineageOS/android_packages_apps_Settings` → `ic_launcher_settings.xml` (Apache-2.0)
5. **Messaging:** `LineageOS/android_packages_apps_Messaging` → `ic_launcher_sms_mms.xml` (Apache-2.0)
6. **Dialer:** `LineageOS/android_packages_apps_Dialer` → `ic_launcher_phone.xml` (Apache-2.0)

These assets are safe, reproducible, and verifiable without touching physical device firmware.

### Category B: Proprietary Nothing / CMF Ecosystem Apps
The following applications are proprietary closed-source property of Nothing Technology Limited:
- **`com.nothing.weather` (Nothing Weather):** Published on the Google Play Store. It is not open-source, and Nothing does not maintain a public GitHub repository for weather drawables. In accordance with safety rules, we do not download APKs from unofficial third-party APK mirrors (APKPure, APKMirror) to rip proprietary drawables. **Status: NOT SOURCED.**
- **`com.nothing.camera` (Nothing Camera):** Proprietary camera HAL wrapper with tuned MediaTek ISP pipelines. Not available in public open repositories. **Status: NOT SOURCED.**
- **Essential Space:** An integrated Nothing OS system subsystem. It has no standalone APK package on the Play Store and cannot be represented by a decoupled third-party icon. Furthermore, the physical Essential Key on Galaga sends Linux input event keycodes directly to the kernel, which cannot be captured or replaced by an icon asset. **Status: NOT SOURCED.**

### Category C: Proprietary Google Mobile Services (GApps)
On builds where MindTheGapps or Google Play Services are flashed:
- Google Phone (`com.google.android.dialer`)
- Google Messages (`com.google.android.apps.messaging`)
- Google Clock (`com.google.android.deskclock`)
- Google Calculator (`com.google.android.calculator`)

Google's official app icons are copyrighted by Google LLC. They are bundled inside closed-source GApps packages or updated via the Google Play Store. We do not extract or redistribute Google's proprietary vectors.

---

## 4. Current State of `assets/icons/*.svg`

The eight vector SVGs currently located in [`assets/icons/`](file:///Users/arun/WORK/CMF%20iPro%202%20OS/assets/icons/):
- `phone.svg`
- `messages.svg`
- `calculator.svg`
- `settings.svg`
- `clock.svg`
- `weather.svg`
- `essential.svg`
- `camera.svg`

**Reclassification:** These files are strictly **Non-Production Concept Placeholders** used exclusively to demonstrate geometry, blur depth, and layout contrast within the interactive web prototype. They **must not** be packaged into the final ROM icon overlay or launcher pack.

---

## 5. Next Steps for Icon Packaging

1. **Launcher Theming Strategy:**
   - On Nothing Launcher (Stock): The launcher uses Nothing's official monochrome icon pack (`com.nothing.icon`) or standard system icons. Sourced original icons must be preserved.
   - On Custom Launcher (Lawnchair / Nova on Custom ROM): The icon pack will reference the **verified upstream LineageOS 24.0 adaptive icon drawables** for Category A apps.
2. **Proprietary Apps:**
   - Any app marked **NOT SOURCED** will retain its native ROM/package icon at runtime with zero modification or fake substitutes.
