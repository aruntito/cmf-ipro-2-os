/**
 * CMF iPro 2 OS — Interactive System UI Prototype Logic
 * Target Device: CMF Phone 2 Pro (Galaga A001)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const body = document.body;
  const statusClock = document.getElementById('status-clock');
  const lockClock = document.getElementById('lock-clock');
  const widgetClock = document.getElementById('widget-clock');
  const lockDate = document.getElementById('lock-date');

  // Screen Switcher
  const screenButtons = document.querySelectorAll('#screen-selector .segment-btn');
  const screenViews = {
    home: document.getElementById('view-home'),
    lock: document.getElementById('view-lock'),
    control: document.getElementById('view-control'),
    space: document.getElementById('view-space')
  };

  // Hardware buttons & Home bar
  const hwEssentialKey = document.getElementById('hw-essential-key');
  const appLaunchEssential = document.getElementById('app-launch-essential');
  const homeIndicator = document.getElementById('home-indicator');
  const btnCloseCc = document.getElementById('btn-close-cc');
  const btnCloseSpace = document.getElementById('btn-close-space');

  // Toolbar Controls
  const btnThemeDark = document.getElementById('btn-theme-dark');
  const btnThemeLight = document.getElementById('btn-theme-light');
  const accentCircles = document.querySelectorAll('.accent-circle');
  const blurSlider = document.getElementById('blur-slider');
  const blurVal = document.getElementById('blur-val');

  // Control Center Sliders
  const sliderBoxBrightness = document.getElementById('slider-box-brightness');
  const fillBrightness = document.getElementById('fill-brightness');
  const lblBrightness = document.getElementById('lbl-brightness');

  const sliderBoxVolume = document.getElementById('slider-box-volume');
  const fillVolume = document.getElementById('fill-volume');
  const lblVolume = document.getElementById('lbl-volume');

  // Media Play/Pause
  const btnMediaToggle = document.getElementById('btn-media-toggle');
  let isPlaying = true;

  // 1. Clock & Date Real-time Engine
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    if (statusClock) statusClock.textContent = timeString;
    if (lockClock) lockClock.textContent = timeString;
    if (widgetClock) widgetClock.textContent = timeString;

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (lockDate) {
      lockDate.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
    }
  }

  setInterval(updateTime, 1000);
  updateTime();

  // 2. Screen Switcher Routine
  function switchScreen(screenKey) {
    Object.keys(screenViews).forEach(key => {
      if (screenViews[key]) {
        screenViews[key].classList.remove('active');
      }
    });

    if (screenViews[screenKey]) {
      screenViews[screenKey].classList.add('active');
    }

    screenButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.screen === screenKey);
    });
  }

  screenButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchScreen(btn.dataset.screen);
    });
  });

  // Home indicator tap -> returns to home
  if (homeIndicator) {
    homeIndicator.addEventListener('click', () => {
      switchScreen('home');
    });
  }

  if (btnCloseCc) {
    btnCloseCc.addEventListener('click', () => {
      switchScreen('home');
    });
  }

  if (btnCloseSpace) {
    btnCloseSpace.addEventListener('click', () => {
      switchScreen('home');
    });
  }

  // 3. Hardware Essential Key Trigger (CMF Physical Key Simulation)
  if (hwEssentialKey) {
    hwEssentialKey.addEventListener('click', () => {
      const isSpaceActive = screenViews.space.classList.contains('active');
      switchScreen(isSpaceActive ? 'home' : 'space');
    });
  }

  if (appLaunchEssential) {
    appLaunchEssential.addEventListener('click', () => {
      switchScreen('space');
    });
  }

  // 4. Theme & Accent Customisation
  if (btnThemeDark && btnThemeLight) {
    btnThemeDark.addEventListener('click', () => {
      body.classList.remove('theme-light');
      body.classList.add('theme-dark');
      btnThemeDark.classList.add('active');
      btnThemeLight.classList.remove('active');
    });

    btnThemeLight.addEventListener('click', () => {
      body.classList.remove('theme-dark');
      body.classList.add('theme-light');
      btnThemeLight.classList.add('active');
      btnThemeDark.classList.remove('active');
    });
  }

  // Hex to RGB Helper
  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }

  accentCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      accentCircles.forEach(c => c.classList.remove('active'));
      circle.classList.add('active');
      const accent = circle.dataset.accent;
      document.documentElement.style.setProperty('--theme-accent', accent);
      document.documentElement.style.setProperty('--theme-accent-rgb', hexToRgb(accent));
    });
  });

  // Blur Intensity Slider
  if (blurSlider && blurVal) {
    blurSlider.addEventListener('input', (e) => {
      const radius = `${e.target.value}px`;
      blurVal.textContent = radius;
      document.documentElement.style.setProperty('--blur-radius', radius);
    });
  }

  // 5. Interactive Vertical Sliders (Brightness & Volume Drag / Scrub)
  function initVerticalSlider(container, fillElement, labelElement) {
    if (!container || !fillElement || !labelElement) return;

    let isDragging = false;

    function updateFromPointer(clientY) {
      const rect = container.getBoundingClientRect();
      const height = rect.height;
      let offsetY = clientY - rect.top;
      offsetY = Math.max(0, Math.min(height, offsetY));
      const percentage = Math.round((1 - (offsetY / height)) * 100);
      fillElement.style.height = `${percentage}%`;
      labelElement.textContent = `${percentage}%`;
    }

    container.addEventListener('pointerdown', (e) => {
      isDragging = true;
      container.setPointerCapture(e.pointerId);
      updateFromPointer(e.clientY);
    });

    container.addEventListener('pointermove', (e) => {
      if (isDragging) {
        updateFromPointer(e.clientY);
      }
    });

    const endDrag = (e) => {
      if (isDragging) {
        isDragging = false;
        try { container.releasePointerCapture(e.pointerId); } catch(err) {}
      }
    };

    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);
  }

  initVerticalSlider(sliderBoxBrightness, fillBrightness, lblBrightness);
  initVerticalSlider(sliderBoxVolume, fillVolume, lblVolume);

  // 6. Control Center Quick Tiles Toggle
  const ccTiles = document.querySelectorAll('.cc-toggle-tile, .cc-action-tile');
  ccTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      if (tile.id === 'tile-essential') {
        switchScreen('space');
        return;
      }
      tile.classList.toggle('active');
    });
  });

  // 7. Lock Screen Actions
  const btnLockTorch = document.getElementById('btn-lock-torch');
  if (btnLockTorch) {
    btnLockTorch.addEventListener('click', () => {
      btnLockTorch.classList.toggle('active');
      btnLockTorch.style.backgroundColor = btnLockTorch.classList.contains('active') 
        ? 'rgba(255, 255, 255, 0.95)' 
        : '';
      btnLockTorch.style.color = btnLockTorch.classList.contains('active') ? '#000' : '';
    });
  }

  const btnLockCamera = document.getElementById('btn-lock-camera');
  if (btnLockCamera) {
    btnLockCamera.addEventListener('click', () => {
      switchScreen('home');
    });
  }

  // Media Toggle
  if (btnMediaToggle) {
    btnMediaToggle.addEventListener('click', () => {
      isPlaying = !isPlaying;
      btnMediaToggle.textContent = isPlaying ? '⏸' : '▶';
    });
  }

  // Voice Memo Record Simulation in Essential Space
  const btnRecordMemo = document.getElementById('btn-record-memo');
  let isRecording = false;
  if (btnRecordMemo) {
    btnRecordMemo.addEventListener('click', () => {
      isRecording = !isRecording;
      btnRecordMemo.textContent = isRecording ? 'Recording... Tap to Stop' : 'Tap to Record';
      btnRecordMemo.style.background = isRecording ? 'var(--status-red)' : '';
      btnRecordMemo.style.color = isRecording ? '#FFF' : '';
    });
  }
});
