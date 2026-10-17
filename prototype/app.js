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
    space: document.getElementById('view-space'),
    calc: document.getElementById('view-calc'),
    settings: document.getElementById('view-settings'),
    phone: document.getElementById('view-phone'),
    messages: document.getElementById('view-messages'),
    clock: document.getElementById('view-clock'),
    weather: document.getElementById('view-weather')
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

    const clockDigitalReadout = document.getElementById('clock-digital-readout');
    if (clockDigitalReadout) clockDigitalReadout.textContent = timeString;

    // Analog Clock Hands Rotation
    const analogHour = document.getElementById('analog-hour');
    const analogMin = document.getElementById('analog-min');
    const analogSec = document.getElementById('analog-sec');
    if (analogHour && analogMin && analogSec) {
      const h = now.getHours() % 12;
      const m = now.getMinutes();
      const s = now.getSeconds();
      analogHour.style.transform = `translateX(-50%) rotate(${h * 30 + m * 0.5}deg)`;
      analogMin.style.transform = `translateX(-50%) rotate(${m * 6}deg)`;
      analogSec.style.transform = `translateX(-50%) rotate(${s * 6}deg)`;
    }

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

  // 8. Themed Apps Navigation Handlers
  const appLaunchSettings = document.getElementById('app-launch-settings');
  const appLaunchCalc = document.getElementById('app-launch-calc');
  const btnCalcBack = document.getElementById('btn-calc-back');
  const btnSettingsBack = document.getElementById('btn-settings-back');

  // Phone App
  const dockPhone = document.querySelector('.dock-app.icon-phone');
  const btnPhoneBack = document.getElementById('btn-phone-back');
  const phoneDisplay = document.getElementById('phone-display');
  const btnPhoneDelete = document.getElementById('btn-phone-delete');
  const phoneKeys = document.querySelectorAll('.phone-key');
  const btnPhoneCall = document.getElementById('btn-phone-call');

  if (dockPhone) {
    dockPhone.addEventListener('click', () => switchScreen('phone'));
  }
  if (btnPhoneBack) {
    btnPhoneBack.addEventListener('click', () => switchScreen('home'));
  }

  phoneKeys.forEach(k => {
    k.addEventListener('click', () => {
      if (phoneDisplay) {
        phoneDisplay.textContent += k.dataset.key;
        if (btnPhoneDelete) btnPhoneDelete.style.display = 'block';
      }
    });
  });

  if (btnPhoneDelete) {
    btnPhoneDelete.addEventListener('click', () => {
      if (phoneDisplay) {
        phoneDisplay.textContent = phoneDisplay.textContent.slice(0, -1);
        if (phoneDisplay.textContent.length === 0) {
          btnPhoneDelete.style.display = 'none';
        }
      }
    });
  }

  if (btnPhoneCall) {
    btnPhoneCall.addEventListener('click', () => {
      if (phoneDisplay && phoneDisplay.textContent.length > 0) {
        alert(`Calling ${phoneDisplay.textContent}... (CMF iPro 2 OS Dialer Simulation)`);
      }
    });
  }

  // Messages App
  const dockMessages = document.querySelector('.dock-app.icon-messages');
  const btnMessagesBack = document.getElementById('btn-messages-back');
  const msgInput = document.getElementById('msg-input');
  const btnSendMsg = document.getElementById('btn-send-msg');
  const messagesThread = document.getElementById('messages-thread');

  if (dockMessages) {
    dockMessages.addEventListener('click', () => switchScreen('messages'));
  }
  if (btnMessagesBack) {
    btnMessagesBack.addEventListener('click', () => switchScreen('home'));
  }

  function sendMessage() {
    if (!msgInput || !messagesThread) return;
    const text = msgInput.value.trim();
    if (!text) return;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bubble-outgoing';
    bubble.innerHTML = `<p>${text}</p>`;
    messagesThread.appendChild(bubble);
    msgInput.value = '';
    messagesThread.scrollTop = messagesThread.scrollHeight;
  }

  if (btnSendMsg) {
    btnSendMsg.addEventListener('click', sendMessage);
  }
  if (msgInput) {
    msgInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // Clock App
  const appClock = document.querySelector('.app-icon-item[data-app="Clock"]');
  const btnClockBack = document.getElementById('btn-clock-back');
  if (appClock) {
    appClock.addEventListener('click', () => switchScreen('clock'));
  }
  if (btnClockBack) {
    btnClockBack.addEventListener('click', () => switchScreen('home'));
  }

  // Weather App
  const appWeather = document.querySelector('.app-icon-item[data-app="Weather"]');
  const btnWeatherBack = document.getElementById('btn-weather-back');
  if (appWeather) {
    appWeather.addEventListener('click', () => switchScreen('weather'));
  }
  if (btnWeatherBack) {
    btnWeatherBack.addEventListener('click', () => switchScreen('home'));
  }

  if (appLaunchSettings) {
    appLaunchSettings.addEventListener('click', () => switchScreen('settings'));
  }
  if (appLaunchCalc) {
    appLaunchCalc.addEventListener('click', () => switchScreen('calc'));
  }
  if (btnCalcBack) {
    btnCalcBack.addEventListener('click', () => switchScreen('home'));
  }
  if (btnSettingsBack) {
    btnSettingsBack.addEventListener('click', () => switchScreen('home'));
  }

  // 9. Interactive Calculator State & Computation Engine
  const calcDisplay = document.getElementById('calc-display');
  const calcOpPreview = document.getElementById('calc-op-preview');
  const calcButtons = document.querySelectorAll('.calc-btn');

  let calcCurrentVal = '0';
  let calcPreviousVal = null;
  let calcOperator = null;
  let calcResetNext = false;

  function updateCalcDisplay() {
    if (!calcDisplay) return;
    calcDisplay.textContent = calcCurrentVal;
    // Auto-shrink font size if numbers get long
    if (calcCurrentVal.length > 7) {
      calcDisplay.style.fontSize = '2.2rem';
    } else if (calcCurrentVal.length > 5) {
      calcDisplay.style.fontSize = '2.7rem';
    } else {
      calcDisplay.style.fontSize = '3.2rem';
    }

    if (calcOpPreview) {
      if (calcOperator && calcPreviousVal !== null) {
        const opSymbol = calcOperator === '*' ? '×' : (calcOperator === '/' ? '÷' : calcOperator);
        calcOpPreview.textContent = `${calcPreviousVal} ${opSymbol}`;
      } else {
        calcOpPreview.textContent = '';
      }
    }
  }

  calcButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.val;
      const action = btn.dataset.action;

      if (val !== undefined && action !== 'op') {
        // Number or decimal point input
        if (calcResetNext) {
          calcCurrentVal = val === '.' ? '0.' : val;
          calcResetNext = false;
        } else {
          if (val === '.') {
            if (!calcCurrentVal.includes('.')) {
              calcCurrentVal += '.';
            }
          } else {
            calcCurrentVal = calcCurrentVal === '0' ? val : calcCurrentVal + val;
          }
        }
        updateCalcDisplay();
        return;
      }

      if (action === 'clear') {
        calcCurrentVal = '0';
        calcPreviousVal = null;
        calcOperator = null;
        calcResetNext = false;
        updateCalcDisplay();
        return;
      }

      if (action === 'negate') {
        if (calcCurrentVal !== '0') {
          calcCurrentVal = calcCurrentVal.startsWith('-') ? calcCurrentVal.slice(1) : '-' + calcCurrentVal;
          updateCalcDisplay();
        }
        return;
      }

      if (action === 'percent') {
        const num = parseFloat(calcCurrentVal) / 100;
        calcCurrentVal = String(num);
        updateCalcDisplay();
        return;
      }

      if (action === 'op') {
        const op = btn.dataset.val;
        if (calcOperator && !calcResetNext && calcPreviousVal !== null) {
          // Perform intermediate computation
          calculateResult();
        }
        calcPreviousVal = calcCurrentVal;
        calcOperator = op;
        calcResetNext = true;
        updateCalcDisplay();
        return;
      }

      if (action === 'equals') {
        if (calcOperator && calcPreviousVal !== null) {
          calculateResult();
          calcOperator = null;
          calcPreviousVal = null;
          calcResetNext = true;
          updateCalcDisplay();
        }
        return;
      }
    });
  });

  function calculateResult() {
    const prev = parseFloat(calcPreviousVal);
    const curr = parseFloat(calcCurrentVal);
    let res = 0;

    switch (calcOperator) {
      case '+': res = prev + curr; break;
      case '-': res = prev - curr; break;
      case '*': res = prev * curr; break;
      case '/': res = curr !== 0 ? prev / curr : 'Error'; break;
      default: return;
    }

    if (typeof res === 'number') {
      // Clean up floating point inaccuracies
      res = Math.round(res * 10000000) / 10000000;
    }
    calcCurrentVal = String(res);
  }
});

