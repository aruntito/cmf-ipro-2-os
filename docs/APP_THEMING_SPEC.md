# CMF iPro 2 OS — Built-In App Theming Specification

**Theme Standard:** Apple-Inspired Frosted Glassmorphism with CMF Tactile Minimalism  
**Target Architecture:** RRO (Runtime Resource Overlays) + Systemless Magisk/KernelSU Overlays  
**Target Base:** AOSP Built-in Applications on Rooted Custom ROM (Galaga A001)  

---

## 1. Global App Theming Tokens

All themed apps inherit the unified **CMF iPro 2 OS Glass Design Language**:
- **App Bar / Toolbar:** Translucent frosted header `rgba(var(--glass-bg), 0.72)` with 28px blur and 1px specular bottom divider.
- **Card / Cell Enclosures:** Rounded squircles (`border-radius: 18px`–`22px`), background `var(--glass-regular)`, subtle 1px border `rgba(255, 255, 255, 0.15)`.
- **Dividers:** Hairline semi-transparent borders (`rgba(255, 255, 255, 0.08)` dark / `rgba(0, 0, 0, 0.06)` light) indented 16px from edges.
- **Interactive Buttons:** Scaled-down tactile feedback (`transform: scale(0.95)`), rounded pill or circular geometry.

---

## 2. Detailed App-by-App Theming Breakdown

### 2.1 Phone / Dialer (`com.android.dialer` / `com.google.android.dialer`)
- **Keypad Buttons:**
  - Perfect circular frosted keys (`width: 68dp`, `height: 68dp`).
  - Dark Theme: `rgba(255, 255, 255, 0.10)` with high-contrast centered digits and sub-alphabet typography.
  - Light Theme: `rgba(0, 0, 0, 0.05)` with dark ink glyphs.
  - Pressed State: Smooth spring transition to `rgba(255, 255, 255, 0.25)` with haptic click.
- **Call Button:**
  - Vibrant Emerald Pill (`#34C759`) with centered white telephone icon.
- **In-Call Screen:**
  - Full-screen dynamic blurred contact avatar backdrop (`blur(40px) saturate(160%)`).
  - Floating 2x3 frosted action matrix (Mute, Keypad, Audio Route, Add Call, FaceTime/Video, Contacts).
  - Bottom centered End Call circle (`#FF3B30`).

### 2.2 Messages (`com.android.messaging` / `com.google.android.apps.messaging`)
- **Message Bubbles:**
  - **Incoming Bubbles:** Frosted translucent gray/slate (`rgba(255, 255, 255, 0.12)` dark / `rgba(0, 0, 0, 0.06)` light), squircle corners with smooth tail radius.
  - **Outgoing Bubbles:** Apple Electric Blue (`#007AFF`) or CMF Signature Orange (`#FF5200`), with white crisp typography and subtle specular gradient.
- **Input Capsule:**
  - Floating pill at bottom of conversation (`height: 44dp`, `border-radius: 22dp`).
  - Frosted background with embedded attachment "+" circular button and dynamic mic/send trigger.
- **Conversation List:**
  - Full-width swipeable frosted cards with contact avatar discs and muted unread badges.

### 2.3 Calculator (`com.android.calculator2` / `com.google.android.calculator`)
- **Display Area:**
  - Minimalist black/white frosted header with dynamic auto-shrinking tabular typography (`font-variant-numeric: tabular-nums`).
- **Keypad Matrix (iOS-Inspired Bento):**
  - **Function Keys (AC, ±, %):** Frosted silver glass (`rgba(255, 255, 255, 0.35)` dark / `rgba(0, 0, 0, 0.12)` light).
  - **Operator Keys (÷, ×, −, +, =):** CMF Orange (`#FF5200`) or Vibrant Amber (`#FF9500`) circular buttons.
  - **Numeric Keys (0–9, .):** Deep slate frosted glass with crisp white numerals.
  - **Zero Key:** Extended horizontal pill geometry.

### 2.4 Settings (`com.android.settings`)
- **Grouped Bento Card Layout (Apple System Preferences Style):**
  - Continuous flat list replaced by grouped rounded cards (`border-radius: 20px`, margin `16dp`).
  - Each setting item features a vibrant colored squircle glyph icon (28dp x 28dp) on the left.
- **Top Profile / CMF Device Header:**
  - Dedicated frosted card displaying:
    - Device Name: *CMF Phone 2 Pro (Galaga)*
    - Active OS: *CMF iPro 2 OS (Themed)*
    - Storage, Battery Health, and SoC telemetry at a glance.
- **Switches & Sliders:**
  - Custom vector switches (iOS-style green `#34C759` pill track with floating circular white thumb).

### 2.5 Clock (`com.android.deskclock` / `com.google.android.deskclock`)
- **Analog / Digital Hybrid Face:**
  - Obsidian dark canvas with subtle glowing orange second hand (`#FF5200`).
  - Frosted clock face with hour marks and smooth continuous second-hand sweep.
- **World Clock:**
  - Frosted rectangular cards with time-zone difference pill (`+5.5 HRS`, `YESTERDAY`), large digital readout, and mini sun/moon indicator.
- **Stopwatch & Timer:**
  - Large centered circular progress ring with frosted glass inner cutout.
  - Frosted Lap time table with green (best lap) and red (worst lap) callouts.

### 2.6 Weather (`com.google.android.apps.weather` / AOSP Weather)
- **Immersive Frosted Sky Canvas:**
  - Dynamic ambient gradient corresponding to real-time condition (Rain, Sunny, Haze, Thunderstorm).
- **Hero Temperature Section:**
  - Ultra-large bold numeric readout with high/low pills and condition subtitle.
- **Hourly & 10-Day Forecast Bento Cards:**
  - Frosted glass cards with horizontal scroll for hourly weather and vertical strip for 10-day outlook.
  - UV Index, Wind, Air Quality, and Sunrise/Sunset represented as 2x2 modular frosted widgets.

---

## 3. Overlay Generation Architecture

Overlays for these 6 applications will be structured in `overlays/`:
```
overlays/
├── com.android.settings/
│   └── res/values/colors.xml, styles.xml, dimens.xml
├── com.android.dialer/
│   └── res/values/colors.xml, drawables/
├── com.android.calculator2/
│   └── res/values/colors.xml, styles.xml
├── com.android.messaging/
│   └── res/values/colors.xml, drawables/
└── com.android.deskclock/
    └── res/values/colors.xml, styles.xml
```
*Compiled via lightweight Python/AAPT2 scripts into RRO APKs deployed to `/product/overlay/` via a single Magisk/KernelSU module.*
