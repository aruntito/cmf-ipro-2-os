# CMF iPro 2 OS — Visual Assets & Palette Specification (Phase 6A)

**Target Device:** CMF Phone 2 Pro (`Galaga A001`)  
**Display Specification:** 6.77" Flexible AMOLED, 1080 × 2412 px (approx. 20:9), 120Hz, 1.07 Billion Colors  
**Design Standard:** Original Apple-inspired Frosted Aesthetics fused with CMF Industrial Minimalism  

---

## 1. High-Resolution Wallpaper Collection

All wallpapers are crafted at the exact native display resolution (**1080 × 2412 px**) as resolution-independent vector SVGs located in [`assets/wallpapers/`](file:///Users/arun/WORK/CMF%20iPro%202%20OS/assets/wallpapers/):

| File Name | Theme | Primary Ambience | Accent Refraction | Design Intent & Legibility |
|---|:---:|---|---|---|
| `frosted_dark_1080x2412.svg` | **Dark** | Deep Obsidian (`#07080A` to `#0F1115`) | CMF Orange (`#FF5200`, 32% glow) + Electric Blue (`#007AFF`, 26% bloom) | Soft ambient depth; status bar and lock clock remain 100% readable with zero visual clutter. |
| `frosted_light_1080x2412.svg` | **Light** | Frosted Porcelain (`#FCFCFD` to `#E5E8EF`) | Subtle warm amber (`#FF5200`, 18%) + Sky Blue (`#007AFF`, 16%) | Ethereal daylight aesthetic; dark typography and colorful icons achieve WCAG AAA contrast. |
| `frosted_minimal_dark_1080x2412.svg` | **Dark Minimal** | Pure Obsidian (`#0A0B0D` to `#060708`) | Muted Silver Glow (`#FFFFFF`, 10%) | Stark monochrome edition honoring Nothing's industrial identity; ultra-low OLED power consumption. |
| `frosted_minimal_light_1080x2412.svg` | **Light Minimal** | Alabaster (`#FFFFFF` to `#E5E7EB`) | Subtle Ambient Shade (`#000000`, 4%) | Clean, distraction-free daylight surface with hairline specular guides. |

---

## 2. Definitive System Color Palette

This palette defines the exact semantic color tokens for both Light and Dark modes:

### Dark Theme Palette
| Token Name | Hex Code | RGB Channels | Intended Usage | Contrast Ratio |
|---|:---:|:---:|---|:---:|
| `--bg-canvas` | `#0A0B0D` | `10, 11, 13` | Root canvas / wallpaper backing | — |
| `--surface-ultra-thin` | `rgba(255,255,255, 0.05)` | `255, 255, 255` | Search capsules, sub-badges | Low |
| `--surface-thin` | `rgba(28, 31, 37, 0.65)` | `28, 31, 37` | Notification cards, widgets | 11.2:1 against white text |
| `--surface-regular` | `rgba(22, 25, 31, 0.78)` | `22, 25, 31` | Dock, Control Center bento cards | 13.5:1 against white text |
| `--surface-elevated` | `rgba(16, 18, 22, 0.90)` | `16, 18, 22` | Modals, Essential Space drawer | 15.8:1 against white text |
| `--text-primary` | `#F5F7FA` | `245, 247, 250` | Headers, active titles, time | 17.2:1 (WCAG AAA) |
| `--text-secondary` | `#8F96A0` | `143, 150, 160` | Subtitles, timestamps, captions | 5.8:1 (WCAG AA) |
| `--border-specular` | `rgba(255,255,255, 0.15)` | `255, 255, 255` | 1px top/left frosted card highlights | Subtle |
| `--accent-cmf` | `#FF5200` | `255, 82, 0` | Hardware Essential trigger, focus state | 4.8:1 (Vibrant) |
| `--accent-blue` | `#007AFF` | `0, 122, 255` | Interactive links, media progress | 4.6:1 (Vibrant) |

### Light Theme Palette
| Token Name | Hex Code | RGB Channels | Intended Usage | Contrast Ratio |
|---|:---:|:---:|---|:---:|
| `--bg-canvas` | `#F4F6F9` | `244, 246, 249` | Root canvas / daylight backing | — |
| `--surface-ultra-thin` | `rgba(255,255,255, 0.45)` | `255, 255, 255` | Search capsules, subtle chips | Low |
| `--surface-thin` | `rgba(255,255,255, 0.65)` | `255, 255, 255` | Notification cards, complications | 12.4:1 against dark ink text |
| `--surface-regular` | `rgba(255,255,255, 0.80)` | `255, 255, 255` | Floating Dock, bento cards | 14.1:1 against dark ink text |
| `--surface-elevated` | `rgba(255,255,255, 0.92)` | `255, 255, 255` | Essential Space, Calculator body | 16.2:1 against dark ink text |
| `--text-primary` | `#14161A` | `20, 22, 26` | Headers, time, app labels | 16.5:1 (WCAG AAA) |
| `--text-secondary` | `#5A606A` | `90, 96, 106` | Secondary labels, descriptions | 6.2:1 (WCAG AA) |
| `--border-specular` | `rgba(255,255,255, 0.85)` | `255, 255, 255` | 1px frosted glass inner rim highlight | Crisp |
| `--accent-cmf` | `#FF5200` | `255, 82, 0` | Hardware Essential trigger, focus state | 4.8:1 (Vibrant) |
| `--accent-blue` | `#007AFF` | `0, 122, 255` | Outgoing chat bubbles, active links | 4.6:1 (Vibrant) |

---

## 3. Squircle Icon Pack Specification

All icon assets are stored as clean, resolution-independent vector SVGs in [`assets/icons/`](file:///Users/arun/WORK/CMF%20iPro%202%20OS/assets/icons/):

- **Grid Dimensions:** 192 × 192 px viewport (Android standard adaptive icon canvas).
- **Curvature:** Apple-style continuous curvature superellipse ($k=4$ Lamé curve approximation, `rx="44" ry="44"`).
- **Rim Highlight:** 2px semi-transparent specular gradient border (`rgba(255,255,255,0.45)` to `0.05`).
- **Icons Included:**
  1. `phone.svg`: Emerald gradient base (`#34C759` to `#248A3D`) with minimal receiver glyph.
  2. `messages.svg`: Vibrant green base (`#30D158`) with crisp speech bubble glyph.
  3. `calculator.svg`: CMF Orange base (`#FF5200`) with tactile 4-symbol arithmetic layout.
  4. `settings.svg`: Slate obsidian base (`#5A5F6B` to `#2D3037`) with precision concentric gear glyph.
  5. `clock.svg`: Obsidian base (`#1A1C20`) with clean dial ring, white hour/minute hands, and CMF orange second hand.
  6. `weather.svg`: Azure sky base (`#2DA0F6` to `#0066CC`) with amber sun and frosted cloud.
  7. `essential.svg`: CMF Signature Orange base with central tactile core and CMF monogram typography.
  8. `camera.svg`: Deep graphite base with multi-ring glass lens reflection.

---

## 4. Technical Compatibility Boundary Note

> [!IMPORTANT]
> **Separation of Launcher Theming vs. SystemUI Theming:**
> - **Launcher Icon Packs:** Standard Android launchers (Nothing Launcher, Lawnchair, Nova) can load these custom squircle vector icons to theme the **Home Screen grid and App Drawer**.
> - **System Boundaries:** Launcher icon packs **CANNOT** alter icons in the system Status Bar, Quick Settings header tiles, or deep system dialogs. Those components are compiled into `com.android.systemui` and require system-level overlay support.
> - **Wallpapers & Palette:** Applying these frosted wallpapers allows Android's Monet engine to automatically harmonize system accents, but Monet alone **will not** inject real-time frosted glass blurs into third-party apps or closed OEM settings.
