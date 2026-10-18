/* ==========================================================================
   CMF iPro Calculator — Frosted Glass PWA Logic
   Robust arithmetic, keyboard support, haptics, theme toggle & offline PWA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const displayVal = document.getElementById('calc-display-val');
  const formulaPreview = document.getElementById('calc-formula-preview');
  const keypad = document.getElementById('calc-keypad');
  const themeToggle = document.getElementById('btn-toggle-theme');
  const offlineStatus = document.getElementById('offline-status');

  let currentVal = '0';
  let previousVal = null;
  let activeOperator = null;
  let resetNext = false;

  // 1. Service Worker Registration for Offline Execution
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then((reg) => {
          console.log('[PWA] ServiceWorker registered with scope:', reg.scope);
          if (reg.installing) {
            reg.installing.addEventListener('statechange', (e) => {
              if (e.target.state === 'installed') {
                showOfflineBadge('Offline Ready');
              }
            });
          } else if (reg.active) {
            showOfflineBadge('Offline Cached');
          }
        })
        .catch((err) => {
          console.warn('[PWA] ServiceWorker registration failed:', err);
        });
    });
  }

  function showOfflineBadge(text) {
    if (!offlineStatus) return;
    offlineStatus.textContent = text;
    offlineStatus.classList.add('visible');
    setTimeout(() => {
      offlineStatus.classList.remove('visible');
    }, 2800);
  }

  // 2. Theme Management (Sync with localStorage & system preference)
  function initTheme() {
    const savedTheme = localStorage.getItem('cmf_calc_theme');
    if (savedTheme === 'light') {
      document.body.classList.add('theme-light');
      updateThemeIcon(true);
    } else if (savedTheme === 'dark') {
      document.body.classList.remove('theme-light');
      updateThemeIcon(false);
    } else {
      // System preference fallback
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      if (prefersLight) {
        document.body.classList.add('theme-light');
        updateThemeIcon(true);
      }
    }
  }

  function updateThemeIcon(isLight) {
    if (!themeToggle) return;
    themeToggle.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('theme-light');
      localStorage.setItem('cmf_calc_theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
      triggerHaptic(15);
    });
  }

  initTheme();

  // 3. Haptic Feedback Helper
  function triggerHaptic(duration = 8) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(duration);
      } catch (err) {}
    }
  }

  // 4. Display Update with Dynamic Typographic Auto-Scale
  function updateDisplay() {
    if (!displayVal) return;
    displayVal.textContent = currentVal;

    const len = currentVal.length;
    if (len > 9) {
      displayVal.style.fontSize = '2.2rem';
    } else if (len > 6) {
      displayVal.style.fontSize = '3.0rem';
    } else {
      displayVal.style.fontSize = '4.0rem';
    }

    if (formulaPreview) {
      if (activeOperator && previousVal !== null) {
        const symbol = activeOperator === '*' ? '×' : (activeOperator === '/' ? '÷' : activeOperator);
        formulaPreview.textContent = `${previousVal} ${symbol}`;
      } else {
        formulaPreview.textContent = '';
      }
    }

    // Highlight active operator button
    const opButtons = document.querySelectorAll('.key-op');
    opButtons.forEach(btn => {
      if (btn.dataset.op === activeOperator && resetNext) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // 5. Arithmetic Core Operations
  function inputDigit(digit) {
    triggerHaptic(6);
    if (currentVal === 'Error') {
      currentVal = digit === '.' ? '0.' : digit;
      resetNext = false;
      updateDisplay();
      return;
    }

    if (resetNext) {
      currentVal = digit === '.' ? '0.' : digit;
      resetNext = false;
    } else {
      if (digit === '.') {
        if (!currentVal.includes('.')) {
          currentVal += '.';
        }
      } else {
        currentVal = currentVal === '0' ? digit : currentVal + digit;
      }
    }
    updateDisplay();
  }

  function clearAll() {
    triggerHaptic(12);
    currentVal = '0';
    previousVal = null;
    activeOperator = null;
    resetNext = false;
    updateDisplay();
  }

  function toggleSign() {
    triggerHaptic(8);
    if (currentVal === '0' || currentVal === 'Error') return;
    currentVal = currentVal.startsWith('-') ? currentVal.slice(1) : '-' + currentVal;
    updateDisplay();
  }

  function applyPercent() {
    triggerHaptic(8);
    if (currentVal === 'Error') return;
    const num = parseFloat(currentVal);
    if (isNaN(num)) return;
    currentVal = String(Math.round((num / 100) * 100000000) / 100000000);
    updateDisplay();
  }

  function setOperator(op) {
    triggerHaptic(10);
    if (currentVal === 'Error') return;

    if (activeOperator && !resetNext && previousVal !== null) {
      computeResult();
    }

    previousVal = currentVal;
    activeOperator = op;
    resetNext = true;
    updateDisplay();
  }

  function computeResult() {
    if (activeOperator === null || previousVal === null) return;
    const prev = parseFloat(previousVal);
    const curr = parseFloat(currentVal);
    let result = 0;

    switch (activeOperator) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        if (curr === 0) {
          result = 'Error';
        } else {
          result = prev / curr;
        }
        break;
      default:
        return;
    }

    if (typeof result === 'number') {
      // Floating point correction (e.g. 0.1 + 0.2 = 0.30000000000000004 -> 0.3)
      result = Math.round(result * 10000000) / 10000000;
    }

    currentVal = String(result);
  }

  function handleEquals() {
    triggerHaptic(14);
    if (activeOperator && previousVal !== null) {
      computeResult();
      activeOperator = null;
      previousVal = null;
      resetNext = true;
      updateDisplay();
    }
  }

  function handleBackspace() {
    triggerHaptic(6);
    if (currentVal === 'Error' || resetNext) {
      currentVal = '0';
      resetNext = false;
    } else if (currentVal.length > 1) {
      currentVal = currentVal.slice(0, -1);
      if (currentVal === '-' || currentVal === '') currentVal = '0';
    } else {
      currentVal = '0';
    }
    updateDisplay();
  }

  // 6. Keypad Click Listeners
  if (keypad) {
    keypad.addEventListener('click', (e) => {
      const target = e.target.closest('.calc-key');
      if (!target) return;

      const digit = target.dataset.num;
      const op = target.dataset.op;
      const action = target.dataset.action;

      if (digit !== undefined) {
        inputDigit(digit);
      } else if (op !== undefined) {
        setOperator(op);
      } else if (action === 'clear') {
        clearAll();
      } else if (action === 'negate') {
        toggleSign();
      } else if (action === 'percent') {
        applyPercent();
      } else if (action === 'equals') {
        handleEquals();
      }
    });
  }

  // 7. Physical / External Keyboard Support
  window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
      inputDigit(e.key);
    } else if (e.key === '.') {
      inputDigit('.');
    } else if (e.key === '+') {
      setOperator('+');
    } else if (e.key === '-') {
      setOperator('-');
    } else if (e.key === '*') {
      setOperator('*');
    } else if (e.key === '/') {
      e.preventDefault();
      setOperator('/');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      handleEquals();
    } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
      clearAll();
    } else if (e.key === '%') {
      applyPercent();
    } else if (e.key === 'Backspace') {
      handleBackspace();
    }
  });

  // Initial paint
  updateDisplay();
});
