# CMF iPro 2 OS: Design Specification
**Device Target:** CMF Phone 2 Pro (Model A001, Codename *Galaga*)  
**Architecture:** System Theming, Overlays, and UI Customisation Layer (Non-Invasive)  
**Version:** 1.0.0-Draft  

---

## 1. Executive Summary & Design Vision

**CMF iPro 2 OS** is an Apple-inspired frosted UI customisation framework designed exclusively for the CMF Phone 2 Pro. Rather than compiling an untestable custom Android OS fork from source or compromising hardware safety, this project delivers a cohesive, lightweight, high-performance visual transformation through a layered theming architecture.

### Core Philosophy: "Frosted Tactility"
The interface synthesizes two design languages:
1. **Apple Human Interface Aesthetics:** Translucent frosted materials, continuous curvature (squircles), disciplined typography, micro-specular rim lighting, and intuitive spatial hierarchy.
2. **CMF / Nothing Functional Minimalism:** Tactile modular layouts, geometric honesty, high-contrast monochrome accents, and preserved hardware affordances (Essential Key & Essential Space).

---

## 2. Design Constraints & Guardrails

- **Zero Device Compromise:** No bootloader unlocking, no firmware flashing, no risk of bricking.
- **Lightweight Footprint:** Avoid heavy background daemons; utilize native Android SurfaceFlinger blurs and Runtime Resource Overlays (RRO).
- **Stock App Parity:** Do not modify proprietary or 3rd-party application internals; theme system surfaces (SystemUI, Launcher, Lock Screen, Quick Settings, Notifications, Framework drawables).
- **Hardware Preservation:** Maintain 100% functional integrity for CMF Essential Key events and Essential Space launcher integration.
- **Original Asset Pipeline:** All icons, glyphs, shaders, and vector shapes are custom-crafted vector assets (no extracted iOS proprietary assets).

---

## 3. Surface Materials & Blur Engine

### 3.1 Material Hierarchy (Frosted Glass Tokens)

| Material Level | Usage | Blur Radius | Light Theme Fill | Dark Theme Fill | Border Specular |
|---|---|---|---|---|---|
| **Ultra-Thin** | Sub-elements, secondary badges, search fields | 16px | `rgba(255, 255, 255, 0.45)` | `rgba(255, 255, 255, 0.06)` | `1px solid rgba(255,255,255,0.12)` |
| **Thin** | Notification cards, widgets, quick tiles | 24px | `rgba(255, 255, 255, 0.65)` | `rgba(28, 30, 34, 0.68)` | `1px solid rgba(255,255,255,0.22)` |
| **Regular (System)** | Control Center bento modules, Dock | 36px | `rgba(255, 255, 255, 0.78)` | `rgba(22, 24, 28, 0.78)` | `1px solid rgba(255,255,255,0.28)` |
| **Thick** | Modals, Power menu, Essential Space drawer | 48px | `rgba(255, 255, 255, 0.88)` | `rgba(16, 17, 20, 0.86)` | `1px solid rgba(255,255,255,0.35)` |

*Note: All frosted materials apply `backdrop-filter: blur(...) saturate(180%)` to maintain color vibrancy beneath the glass layer without causing washed-out milky artifacts.*

### 3.2 Dynamic Rim Highlights
Each frosted container uses an inner highlight reflection:
- **Light Theme:** Top/Left edge highlight `linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.1) 100%)`.
- **Dark Theme:** Subtle rim glow `linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.02) 100%)`.

---

## 4. Color System

### 4.1 System Palette

```
/* Base Canvas */
--bg-light: #F2F4F7;
--bg-dark: #0A0B0D;

/* Text & Content */
--label-primary-light: #121316;
--label-secondary-light: #6E737B;
--label-tertiary-light: #9DA3AE;

--label-primary-dark: #F5F7FA;
--label-secondary-dark: #8F96A0;
--label-tertiary-dark: #585D67;

/* Brand & Interactive Accents */
--accent-apple-blue: #007AFF;
--accent-cmf-orange: #FF5200;       /* Signature CMF accent integration */
--accent-glass-active: rgba(0, 122, 255, 0.90);
--status-green: #34C759;
--status-red: #FF3B30;
--status-amber: #FF9500;
```

---

## 5. Typography & Geometry

### 5.1 Typography Stack
- **Primary Interface Font:** Inter / SF Pro Display fallback (`-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif`).
- **Clock & Digital Numeric Display:** Neo-grotesque high-legibility bold weight with tabular numerals (`font-feature-settings: "tnum"`).
- **CMF Hardware Reference Accent:** Optional subtle dot-matrix sub-headers for technical status readouts (preserving device identity).

### 5.2 Curvature & Metrics
- **Continuous Squircle Radius:** `border-radius: 24px` for app cards, `32px` for Control Center sliders and Dock container, `18px` for notification banners.
- **Icon Squircles:** Superellipse mask `smooth-corners: 60%` (standard iOS-style `k=4` Lamé curve).
- **Touch Target Minimum:** `48dp x 48dp` strictly enforced across all interactive tiles.

---

## 6. System Surface Specifications

### 6.1 Status Bar
- Minimalist indicators: custom vector Wi-Fi, Cellular signal, and battery capsule.
- Battery icon: Rounded pill with internal percentage fill or clean percentage label.
- Left-aligned clean time with optional location / privacy dot indicator.

### 6.2 Lock Screen
- **Time Display:** Large 76pt clean numeric header with dynamic light/dark contrast compensation.
- **Date & Weather Pill:** Compact frosted chip with real-time glanceable info.
- **Widget Strip:** Modular 4-column widget area (battery levels, calendar ring, activity ring, CMF Essential trigger).
- **Bottom Actions:** Floating circular frosted buttons for Flashlight (left) and Camera (right) with active spring haptic states.
- **Home Indicator:** Centered pill bar (`134px x 5px`, rounded 100px).

### 6.3 Home Screen & Dock
- **Grid Layout:** 4x6 icon grid with generous breathing room.
- **Floating Dock:** Translucent frosted capsule suspended 14px above the bottom edge, accommodating 4 priority applications.
- **Quick Glance Widget:** Rounded frosted weather + calendar split widget.

### 6.4 Control Center (Quick Settings)
- **Top Bar:** Network status and battery metrics summary.
- **Bento Connectivity 2x2 Card:** Cellular, Wi-Fi, Bluetooth, Airplane mode toggles.
- **Media Player 2x2 Card:** Album art preview, track titles, scrub bar, frosted play/pause controls.
- **Dual Vertical Sliders:** Full-height rounded vertical sliders for Brightness and Volume with vector glyphs embedded inside the fill pill.
- **Quick Utility 1x1 Tiles:** Flashlight, Focus Mode, Screen Rotation, Dark Mode, Hotspot, and **CMF Essential Space** quick-launch.

### 6.5 CMF Essential Key & Essential Space Integration
- **Preserved Hardware Function:** The physical CMF Essential Key continues sending native Android `KEYCODE` / intent broadcasts.
- **Custom Aesthetic Mapping:** The Essential Key invokes a frosted slide-in drawer ("Essential Space") featuring:
  - Quick audio note recorder.
  - Device diagnostic & battery health glance.
  - Fast camera mode picker.
  - Essential widgets without cluttering the main lock screen or home screen.

---

## 7. Motion & Micro-interactions

- **Spring Dynamics:** Standardized spring curve `cubic-bezier(0.16, 1, 0.3, 1)` (duration: 260ms to 320ms).
- **Press States:** Micro-scale down to `transform: scale(0.96)` with rapid 120ms release on all cards, tiles, and dock icons.
- **Backdrop Transitions:** Smooth blur fade `backdrop-filter` interpolation to prevent GPU stuttering.
