# CMF iPro 2 OS — Essential Key & Essential Space Integration

**Device Target:** CMF Phone 2 Pro (Galaga A001)  
**Goal:** Maintain 100% hardware utility for the physical Essential Key while elevating Essential Space into an Apple-inspired frosted quick-drawer.

---

## 1. Hardware Key Routing Architecture

```
[ Physical CMF Key ] (Left chassis on Galaga)
        │
        ▼ (Kernel GPIO Interrupt)
[ /system/usr/keylayout/gpio-keys.kl ]
        │
        ▼ (KeyEvent: KEYCODE_ASSIST / KEYCODE_PROG_RED)
[ Android WindowManagerService / Custom ROM KeyHandler ]
        │
        ├── Pathway A: Direct Broadcast (`com.cmf.ipro.ESSENTIAL_TRIGGER`)
        │
        └── Pathway B: App Launch Intent (`com.cmf.ipro.essentialspace`)
```

---

## 2. Essential Space UI Capabilities

The themed **Essential Space** replaces cluttered overlays with a clean, tactile frosted glass sheet:

1. **Quick Voice Memo:**
   - Tap-to-record with animated real-time waveform visualization.
   - One-tap copy/share of transcribed audio notes.
2. **Hardware & Battery Glance:**
   - Live telemetry: SoC temp, active refresh rate (120Hz), and connected accessories (CMF Buds Pro, CMF Watch).
3. **Speed Dial & Emergency ICE:**
   - One-touch frosted quick pills for instant contacts and quick tools (Torch Strobe, Camera Snap).
4. **Haptic Feedback:**
   - Uses the Galaga linear vibration motor to simulate an Apple Taptic-style crisp click on keypress.

---

## 3. Custom ROM Deployment Options

### Option 1: On NothingOS-Based Custom Ports
- Retains `com.nothing.essentialspace` natively.
- Apply CMF iPro 2 OS RRO theme overlay directly to `com.nothing.essentialspace` to frost the drawer surfaces and replace stock icons.

### Option 2: On Clean AOSP Custom ROMs (LineageOS, Evolution X, RisingOS)
- Map the hardware key in `gpio-keys.kl` or via LineageOS *Settings > System > Buttons*.
- Install the lightweight **CMF iPro Essential Companion APK** (< 3 MB).
- The companion renders an identical frosted drawer using Android `WindowManager` with `TYPE_APPLICATION_OVERLAY` and hardware-accelerated RenderEffect blurs.
