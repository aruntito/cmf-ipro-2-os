# CMF iPro 2 OS (Galaga A001)

An Apple-inspired, frosted UI customisation project designed specifically for the **CMF Phone 2 Pro** (Model: `A001`, Codename: `Galaga`).

This is a **pure system theming layer**, not a custom Android OS ROM. It preserves device firmware integrity, requires no bootloader unlocking or flashing, and keeps full hardware compatibility with CMF features (Essential Key & Essential Space).

---

## 📁 Project Structure

```
CMF iPro 2 OS/
├── docs/
│   ├── ENVIRONMENT.md          # Development environment & toolchain inspection
│   ├── DESIGN_SPEC.md          # Full Apple-inspired frosted glass design spec
│   └── IMPLEMENTATION_MATRIX.md # Breakdown of changes: RRO, Iconify, Stock ROM, Companion
├── prototype/
│   ├── index.html              # Interactive System UI prototype
│   ├── styles.css              # Glassmorphic tokens, squircles & responsive phone stage
│   └── app.js                  # Dynamic clock, interactive sliders, theme engine
└── package.json                # Quick preview scripts
```

---

## 🚀 Interactive UI Prototype

Preview the interactive visual prototype locally:

```bash
npm run dev
# Or run directly:
python3 -m http.server 3000 --directory prototype
```

Then open `http://localhost:3000` in your web browser.

### Key Interactive Features in the Prototype:
1. **Realistic CMF Phone 2 Pro Chassis:** Accurate Galaga A001 proportions, punch hole camera, and signature physical **Essential Key**.
2. **Surface Switcher:** Live toggle between **Home Screen**, **Lock Screen**, **Control Center**, and **Essential Space**.
3. **Interactive Control Center Sliders:** Drag the vertical frosted Brightness and Volume sliders up and down in real-time.
4. **Hardware Essential Key Simulation:** Click the physical orange button on the phone's left chassis to slide out the Essential Space drawer.
5. **Real-Time Material Customisation:** Live Light/Dark theme switching, blur radius adjustment (12px–54px), and CMF signature accent swatches.

---

## 🛠️ Theming Architecture Summary

| Layer | Tools | Scope |
|---|---|---|
| **Tier 1: Stock ROM** | Nothing OS Settings | Monet palette, Essential Key intent routing, Light/Dark schedule |
| **Tier 2: Android Overlays** | Shizuku + `cmd overlay` | SystemUI corner radiuses, card opacities, status bar dimensions |
| **Tier 3: Iconify** | Iconify Engine | Split shade Quick Settings, vertical brightness/volume bars, custom status icons |
| **Tier 4: Companion App** | Non-root Android Service | Frosted Essential Space slide-in drawer bound to `com.nothing.essentialspace` |

---

## 🔒 Safety & Device Integrity
- **No Device Flashing**
- **No Bootloader Unlocking**
- **Zero Risk of Brick**
- **Original Vector Assets** (No proprietary Apple copyrighted binaries)
