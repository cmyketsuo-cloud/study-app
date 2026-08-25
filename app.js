/**
 * わくわく漢字ドリル - app.js
 * 1〜6年生対応・一文字/熟語/文章バラエティ問題・苦手重点出題・アカウント管理
 */

// =============================================
//  POINT FORMATTING UTILITY (小数点対応)
// =============================================
function formatPoints(pts) {
  if (typeof pts !== 'number' || isNaN(pts)) return '0';
  const rounded = Math.round(pts * 100) / 100;
  return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(rounded * 10 % 1 === 0 ? 1 : 2);
}

// =============================================
//  SOUND EFFECTS MODULE (Web Audio API)
// =============================================
const SoundFx = (() => {
  let ctx = null;
  let muted = localStorage.getItem('sound_muted') === 'true';

  function getContext() {
    if (!ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        ctx = new AudioContext();
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
    return ctx;
  }

  function isMuted() {
    return muted;
  }

  function setMuted(val) {
    muted = !!val;
    localStorage.setItem('sound_muted', muted ? 'true' : 'false');
    updateSoundButton();
  }

  function toggleMute() {
    setMuted(!muted);
    if (!muted) {
      playTap();
    }
  }

  function updateSoundButton() {
    const btn = document.getElementById('btn-sound-toggle');
    const icon = document.getElementById('sound-toggle-icon');
    if (btn && icon) {
      if (muted) {
        btn.classList.add('muted');
        icon.textContent = '🔇';
        btn.title = 'おと OFF（クリックでON）';
      } else {
        btn.classList.remove('muted');
        icon.textContent = '🔊';
        btn.title = 'おと ON（クリックでOFF）';
      }
    }
  }

  // 1. ポコッ (ボタンタップ音)
  function playTap() {
    if (muted) return;
    const c = getContext();
    if (!c) return;
    try {
      const now = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.05);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

      osc.connect(gain);
      gain.connect(c.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {}
  }

  // 2. ピンポーン♪ (正解音: 明るい2和音)
  function playCorrect() {
    if (muted) return;
    const c = getContext();
    if (!c) return;
    try {
      const now = c.currentTime;
      
      const osc1 = c.createOscillator();
      const gain1 = c.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1318.5, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc1.connect(gain1);
      gain1.connect(c.destination);
      osc1.start(now);
      osc1.stop(now + 0.26);

      const osc2 = c.createOscillator();
      const gain2 = c.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1760, now + 0.12);
      gain2.gain.setValueAtTime(0.0, now);
      gain2.gain.setValueAtTime(0.22, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.55);
      osc2.connect(gain2);
      gain2.connect(c.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.56);
    } catch (e) {}
  }

  // 3. ブブー (不正解音)
  function playWrong() {
    if (muted) return;
    const c = getContext();
    if (!c) return;
    try {
      const now = c.currentTime;
      [0, 0.14].forEach(offset => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now + offset);
        gain.gain.setValueAtTime(0.18, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.1);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.11);
      });
    } catch (e) {}
  }

  // 4. ピッ (タイピング打鍵音)
  function playKey() {
    if (muted) return;
    const c = getContext();
    if (!c) return;
    try {
      const now = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch (e) {}
  }

  // 5. チャリン🪙 (コイン・ポイント音)
  function playCoin() {
    if (muted) return;
    const c = getContext();
    if (!c) return;
    try {
      const now = c.currentTime;
      const osc1 = c.createOscillator();
      const gain1 = c.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(c.destination);
      osc1.start(now);
      osc1.stop(now + 0.16);

      const osc2 = c.createOscillator();
      const gain2 = c.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, now + 0.08);
      gain2.gain.setValueAtTime(0.0, now);
      gain2.gain.setValueAtTime(0.2, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(c.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.36);
    } catch (e) {}
  }

  // 6. ファンファーレ (結果発表)
  function playFanfare() {
    if (muted) return;
    const c = getContext();
    if (!c) return;
    try {
      const notes = [
        { f: 523.25, t: 0, d: 0.1 },
        { f: 659.25, t: 0.1, d: 0.1 },
        { f: 783.99, t: 0.2, d: 0.1 },
        { f: 1046.50, t: 0.32, d: 0.4 }
      ];
      const now = c.currentTime;
      notes.forEach(n => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, now + n.t);
        gain.gain.setValueAtTime(0.0, now);
        gain.gain.setValueAtTime(0.22, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.01, now + n.t + n.d);
        osc.connect(gain);
        gain.connect(c.destination);
        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.02);
      });
    } catch (e) {}
  }

  return {
    getContext,
    isMuted,
    setMuted,
    toggleMute,
    updateSoundButton,
    playTap,
    playCorrect,
    playWrong,
    playKey,
    playCoin,
    playFanfare,
  };
})();

// =============================================
//  CONFETTI & STAR PARTICLES MODULE (Canvas)
// =============================================
const ConfettiFx = (() => {
  let canvas = null;
  let ctx = null;
  let particles = [];
  let animId = null;

  function init() {
    canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      ctx = canvas.getContext('2d');
      resize();
      window.addEventListener('resize', resize);
    }
  }

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  const COLORS = ['#ff4b72', '#ff8800', '#f59e0b', '#10b981', '#0284c7', '#8b5cf6', '#ec4899', '#ffd700'];

  function launch(count = 60) {
    if (!canvas) init();
    if (!canvas || !ctx) return;

    resize();
    const w = canvas.width;
    const h = canvas.height;

    for (let i = 0; i < count; i++) {
      const isStar = Math.random() < 0.35;
      particles.push({
        x: w * (0.2 + Math.random() * 0.6),
        y: h * 0.4 + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 18,
        vy: -Math.random() * 14 - 4,
        gravity: 0.35 + Math.random() * 0.15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: isStar ? (8 + Math.random() * 8) : (6 + Math.random() * 6),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        isStar: isStar,
        life: 1,
        decay: 0.008 + Math.random() * 0.008,
      });
    }

    if (!animId) {
      loop();
    }
  }

  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    if (!ctx || particles.length === 0) {
      if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
      animId = null;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > canvas.height + 50) {
        particles.splice(i, 1);
        continue;
      }

      const alpha = Math.max(0, p.life);

      if (p.isStar) {
        drawStar(ctx, p.x, p.y, 5, p.size, p.size * 0.45, p.color, alpha);
      } else {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        ctx.restore();
      }
    }

    animId = requestAnimationFrame(loop);
  }

  return {
    init,
    launch,
  };
})();

// =============================================
//  GRADE POP THEMES & ACCENTS
// =============================================
const GRADE_THEMES = {
  1: { 
    primary: '#ff4b72', 
    primaryLight: '#ff7597', 
    primaryDark: '#e11d48',
    glow: 'rgba(255, 75, 114, 0.35)', 
    badge: '🍓 1年生',
    label: '1年生' 
  },
  2: { 
    primary: '#ff8800', 
    primaryLight: '#ffa733', 
    primaryDark: '#ea580c',
    glow: 'rgba(255, 136, 0, 0.35)', 
    badge: '🍊 2年生',
    label: '2年生' 
  },
  3: { 
    primary: '#10b981', 
    primaryLight: '#34d399', 
    primaryDark: '#059669',
    glow: 'rgba(16, 185, 129, 0.35)', 
    badge: '🍏 3年生',
    label: '3年生' 
  },
  4: { 
    primary: '#0284c7', 
    primaryLight: '#38bdf8', 
    primaryDark: '#0369a1',
    glow: 'rgba(2, 132, 199, 0.35)', 
    badge: '🐬 4年生',
    label: '4年生' 
  },
  5: { 
    primary: '#8b5cf6', 
    primaryLight: '#a78bfa', 
    primaryDark: '#7c3aed',
    glow: 'rgba(139, 92, 246, 0.35)', 
    badge: '🍇 5年生',
    label: '5年生' 
  },
  6: { 
    primary: '#d97706', 
    primaryLight: '#f59e0b', 
    primaryDark: '#b45309',
    glow: 'rgba(217, 119, 6, 0.35)', 
    badge: '🌟 6年生',
    label: '6年生' 
  },
};

const SLOT_THEMES = [
  { color: '#ff4b72', bg: '#ffe4e6', emoji: '🐱', name: 'スロット1' },
  { color: '#ff8800', bg: '#ffedd5', emoji: '🐶', name: 'スロット2' },
  { color: '#10b981', bg: '#dcfce7', emoji: '🐼', name: 'スロット3' },
];

// =============================================
//  QUIZ DATA (quiz_data.js から自動ロード)
// =============================================
// ※ GRADE_DATA (1〜6年生) は quiz_data.js で定義されています。
if (typeof GRADE_DATA === 'undefined') {
  console.warn('quiz_data.js not loaded. Using fallback.');
  window.GRADE_DATA = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
}


// 為替レート管理 (USD / JPY)
let currentFxRate = 158.50; // デフォルトレート
let isFxRateLoaded = false;

async function fetchFxRate() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates.JPY) {
        currentFxRate = parseFloat(data.rates.JPY.toFixed(2));
        isFxRateLoaded = true;
        updateFxDisplays();
        return;
      }
    }
  } catch (e) {
    console.log('Using simulated FX rate:', e);
  }
  // フォールバック: 日付に応じた自然な変動（155〜165円）
  const day = new Date().getDate();
  currentFxRate = parseFloat((155 + (day % 10) * 1.05).toFixed(2));
  updateFxDisplays();
}

function updateFxDisplays() {
  const el = document.getElementById('wallet-fx-rate');
  if (el) el.textContent = currentFxRate.toFixed(2);
  if (currentAccountId !== null) {
    updateWalletPreviews();
  }
}

// =============================================
//  ACCOUNT & HISTORY MANAGEMENT (LocalStorage)
// =============================================
const ACCOUNTS_KEY = 'kanjiQuiz_accounts';
const HISTORY_KEY_PREFIX = 'kanjiQuiz_history_';
const PARENT_PIN_KEY = 'kanjiQuiz_parent_pin';

function getParentPin() {
  return localStorage.getItem(PARENT_PIN_KEY) || '0000';
}

function setParentPin(pin) {
  localStorage.setItem(PARENT_PIN_KEY, pin);
}

function getCurrentMonthStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getCurrentDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getDefaultLimits() {
  return {
    month: getCurrentMonthStr(),
    monthlyEarned: 0,
    todayDate: getCurrentDateStr(),
    todayEarned: 0,
    maxMonthly: 1000,
    maxDaily: 50,
    carryOverUnlocked: true
  };
}

function checkAndResetLimits(acc) {
  if (!acc) return;
  if (!acc.monthlyLimits) {
    acc.monthlyLimits = getDefaultLimits();
    return;
  }

  const curMonth = getCurrentMonthStr();
  const curDate = getCurrentDateStr();

  // 月が変わった場合は当月獲得をリセット
  if (acc.monthlyLimits.month !== curMonth) {
    acc.monthlyLimits.month = curMonth;
    acc.monthlyLimits.monthlyEarned = 0;
  }

  // 日付が変わった場合は当日獲得をリセット
  if (acc.monthlyLimits.todayDate !== curDate) {
    acc.monthlyLimits.todayDate = curDate;
    acc.monthlyLimits.todayEarned = 0;
  }

  if (typeof acc.monthlyLimits.maxMonthly !== 'number') acc.monthlyLimits.maxMonthly = 1000;
  if (typeof acc.monthlyLimits.maxDaily !== 'number') acc.monthlyLimits.maxDaily = 50;
  if (typeof acc.monthlyLimits.carryOverUnlocked !== 'boolean') acc.monthlyLimits.carryOverUnlocked = true;
}

function loadAccounts() {
  const saved = localStorage.getItem(ACCOUNTS_KEY);
  let list = [
    { id: 0, name: null, birthYear: null, points: 0, bookPoints: 0, pointHistory: [], wishlist: [], monthlyLimits: getDefaultLimits(), themeColor: SLOT_THEMES[0].color, avatarPhoto: null, avatarEmoji: null },
    { id: 1, name: null, birthYear: null, points: 0, bookPoints: 0, pointHistory: [], wishlist: [], monthlyLimits: getDefaultLimits(), themeColor: SLOT_THEMES[1].color, avatarPhoto: null, avatarEmoji: null },
    { id: 2, name: null, birthYear: null, points: 0, bookPoints: 0, pointHistory: [], wishlist: [], monthlyLimits: getDefaultLimits(), themeColor: SLOT_THEMES[2].color, avatarPhoto: null, avatarEmoji: null },
  ];

  if (saved) {
    try { 
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 3) {
        list = parsed.map((acc, i) => {
          const limits = acc.monthlyLimits ? { ...getDefaultLimits(), ...acc.monthlyLimits } : getDefaultLimits();
          return {
            id: i,
            name: acc.name || null,
            birthYear: acc.birthYear || null,
            points: typeof acc.points === 'number' ? acc.points : 0,
            bookPoints: typeof acc.bookPoints === 'number' ? acc.bookPoints : 0,
            pointHistory: Array.isArray(acc.pointHistory) ? acc.pointHistory : [],
            wishlist: Array.isArray(acc.wishlist) ? acc.wishlist : [],
            monthlyLimits: limits,
            themeColor: acc.themeColor || SLOT_THEMES[i].color,
            avatarPhoto: acc.avatarPhoto || null,
            avatarEmoji: acc.avatarEmoji || null,
          };
        });
      }
    } catch (e) {}
  }
  list.forEach(acc => checkAndResetLimits(acc));
  return list;
}

function saveAccounts() {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function calcBookEquiv(points) {
  if (points <= 0) return 0;
  // 100pt = 1ドル = currentFxRate 円
  return Math.floor(points * (currentFxRate / 100));
}

function loadHistory(accountId) {
  if (accountId === null || accountId === undefined) return {};
  const saved = localStorage.getItem(HISTORY_KEY_PREFIX + accountId);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) {}
  }
  return {};
}

function saveHistory(accountId, history) {
  if (accountId === null || accountId === undefined) return;
  localStorage.setItem(HISTORY_KEY_PREFIX + accountId, JSON.stringify(history));
}

function getWeakQuestionsForGrade(accountId, grade) {
  const history = loadHistory(accountId);
  const data = GRADE_DATA[grade] || [];
  return data.filter(item => {
    const record = history[item.q];
    return record && record.isWeak === true;
  });
}

function calcGrade(birthYear) {
  if (!birthYear || isNaN(birthYear)) return null;
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1; // 1-12
  return m >= 4 ? y - birthYear - 6 : y - birthYear - 7;
}

function gradeLabel(grade) {
  if (grade === null || isNaN(grade)) return '';
  if (grade < 1) return '🍼 未就学';
  if (grade > 6) return '🎓 卒業生';
  return `${grade}年生`;
}

function getGradeForAccount(acc) {
  if (!acc || !acc.birthYear) return null;
  const g = calcGrade(acc.birthYear);
  return (g >= 1 && g <= 6) ? g : null;
}

function applyGradeTheme(grade) {
  const t = GRADE_THEMES[grade] || GRADE_THEMES[5];
  document.documentElement.style.setProperty('--color-primary', t.primary);
  document.documentElement.style.setProperty('--color-primary-light', t.primaryLight);
  document.documentElement.style.setProperty('--color-primary-dark', t.primaryDark);
  document.documentElement.style.setProperty('--color-primary-glow', t.glow);
  document.body.setAttribute('data-grade', grade || 5);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }
}

// =============================================
//  ACCOUNT SCREEN RENDERING
// =============================================
let accounts = loadAccounts();
let currentAccountId = null;
let settingsAccountId = null;

function renderAccountScreen() {
  const grid = document.getElementById('account-grid');
  grid.innerHTML = '';

  accounts.forEach((acc, idx) => {
    const card = document.createElement('div');
    const grade = getGradeForAccount(acc);
    const theme = grade ? GRADE_THEMES[grade] : null;
    const slotInfo = SLOT_THEMES[idx];
    const weakList = acc.name ? getWeakQuestionsForGrade(acc.id, grade || 5) : [];

    card.className = 'account-card pop-card' + (acc.name ? ' filled' : ' empty');
    card.id = `account-card-${acc.id}`;
    card.setAttribute('data-id', acc.id);

    if (acc.name) {
      // テーマカラー: カスタム > 学年テーマ > スロットデフォルト
      const cardBorder = acc.themeColor || (theme ? theme.primary : slotInfo.color);
      const badgeText = grade ? theme.badge : (calcGrade(acc.birthYear) > 6 ? '🎓 卒業' : '🍼 未就学');
      const weakBadgeHtml = weakList.length > 0
        ? `<div class="card-weak-tag">🔥 にがて: ${weakList.length}問</div>`
        : `<div class="card-weak-tag zero">💮 にがてゼロ</div>`;
      const pointsBadgeHtml = `<div class="card-point-tag">🪙 ${formatPoints(acc.points || 0)} pt</div>`;

      // アバター内容: 写真 > 絵文字 > 名前1文字
      let avatarInnerHtml;
      if (acc.avatarPhoto) {
        avatarInnerHtml = `<img class="avatar-photo-img" src="${acc.avatarPhoto}" alt="${acc.name}" draggable="false">`;
      } else if (acc.avatarEmoji) {
        avatarInnerHtml = `<span class="avatar-letter">${acc.avatarEmoji}</span>`;
      } else {
        avatarInnerHtml = `<span class="avatar-letter">${acc.name.charAt(0)}</span>`;
      }

      card.style.setProperty('--card-accent', cardBorder);

      card.innerHTML = `
        <button class="account-settings-btn pop-btn-circle" data-id="${acc.id}" aria-label="設定" title="設定">⚙</button>
        <div class="account-avatar pop-avatar" style="background: ${cardBorder};">
          ${avatarInnerHtml}
        </div>
        <div class="account-info">
          <div class="account-name">${acc.name}</div>
          <div class="account-grade-badge pop-pill" style="background: ${cardBorder}18; color: ${cardBorder}; border-color: ${cardBorder}50;">
            ${badgeText}
          </div>
          <div class="card-badges-row">
            ${pointsBadgeHtml}
            ${weakBadgeHtml}
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.account-settings-btn')) return;
        selectAccount(acc.id);
      });

      card.querySelector('.account-settings-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        openSettings(acc.id);
      });
    } else {
      card.innerHTML = `
        <div class="account-add-icon pop-bounce">＋</div>
        <div class="account-add-label">あたらしく追加</div>
        <div class="account-add-sub">${slotInfo.emoji} ${slotInfo.name}</div>
      `;
      card.addEventListener('click', () => openSettings(acc.id));
    }

    grid.appendChild(card);

  });
}

function selectAccount(id) {
  currentAccountId = id;
  const acc = accounts[id];
  if (!acc || !acc.name) { openSettings(id); return; }

  const grade = getGradeForAccount(acc);
  const effectiveGrade = (grade && grade >= 1 && grade <= 6) ? grade : 5;

  currentQuizData = dedupeData(GRADE_DATA[effectiveGrade] || QUIZ_DATA_G5);
  ALL_READINGS = [...new Set(currentQuizData.map(d => d.a))];

  applyGradeTheme(effectiveGrade);

  renderPortalScreen();
}

function renderPortalScreen() {
  if (currentAccountId === null) return;
  const acc = accounts[currentAccountId];
  if (!acc || !acc.name) return;

  const grade = getGradeForAccount(acc);
  const effectiveGrade = (grade && grade >= 1 && grade <= 6) ? grade : 5;
  const weakList = getWeakQuestionsForGrade(currentAccountId, effectiveGrade);

  // ヘッダー情報
  const portalAvatarEl = document.getElementById('portal-avatar-letter');
  const accColor = acc.themeColor || SLOT_THEMES[currentAccountId] .color;
  portalAvatarEl.style.background = accColor;
  // 写真/絵文字/文字 優先順位で表示
  const existingPortalImg = portalAvatarEl.querySelector('.portal-avatar-img');
  if (existingPortalImg) existingPortalImg.remove();
  if (acc.avatarPhoto) {
    portalAvatarEl.textContent = '';
    const img = document.createElement('img');
    img.className = 'portal-avatar-img';
    img.src = acc.avatarPhoto;
    img.alt = acc.name;
    portalAvatarEl.appendChild(img);
  } else if (acc.avatarEmoji) {
    portalAvatarEl.textContent = acc.avatarEmoji;
  } else {
    portalAvatarEl.textContent = acc.name.charAt(0);
  }
  document.getElementById('portal-account-name').textContent = acc.name;
  document.getElementById('portal-grade-pill').textContent = gradeLabel(grade) || '5年生';
  document.getElementById('portal-points-display').textContent = formatPoints(acc.points || 0);

  // 漢字カード情報
  const mStats = getMasteryStats(currentAccountId, effectiveGrade);
  document.getElementById('portal-kanji-count').textContent = `📚 ${mStats.total}問収録`;
  const mTag = document.getElementById('portal-kanji-mastery-tag');
  if (mTag) {
    mTag.textContent = `👑 マスター: ${mStats.master}問 (${mStats.masterPct}%)`;
  }

  const weakTag = document.getElementById('portal-kanji-weak-tag');
  if (weakList.length > 0) {
    weakTag.className = 'subject-weak-tag';
    weakTag.textContent = `🔥 にがて: ${weakList.length}問`;
  } else {
    weakTag.className = 'subject-weak-tag zero';
    weakTag.textContent = '💮 にがてゼロ！';
  }

  // ほしい本 目標バナー更新
  const wishlist = acc.wishlist || [];
  const banner = document.getElementById('portal-wishlist-banner');
  if (wishlist.length > 0) {
    const targetBook = wishlist[0];
    const totalBookFunds = (acc.bookPoints || 0) + calcBookEquiv(acc.points || 0);
    const pct = Math.min(100, Math.floor((totalBookFunds / targetBook.price) * 100));
    const remain = Math.max(0, targetBook.price - totalBookFunds);

    banner.style.display = 'flex';
    document.getElementById('portal-target-book-title').textContent = `🎯 目標の本: ${targetBook.title} (${targetBook.price}円)`;
    document.getElementById('portal-target-book-bar').style.width = pct + '%';
    document.getElementById('portal-target-book-pct').textContent = pct + '%';

    const statusEl = document.getElementById('portal-target-book-status');
    if (remain === 0) {
      statusEl.innerHTML = '<span style="color:#059669; font-weight:900;">🎉 達成！買えるよ！</span>';
    } else {
      statusEl.innerHTML = `あと <strong id="portal-target-book-remain">${remain}</strong> 円分`;
    }
  } else {
    banner.style.display = 'none';
  }

  // 🪙 今日のポイント残枠 ＆ 今月のポイント上限バナー更新
  checkAndResetLimits(acc);
  const limits = acc.monthlyLimits || getDefaultLimits();
  const maxToday = limits.maxDaily || 50;
  const earnedToday = limits.todayEarned || 0;
  const remainToday = Math.max(0, Math.round((maxToday - earnedToday) * 100) / 100);
  const pctToday = Math.min(100, Math.max(0, Math.round((remainToday / maxToday) * 100)));

  const maxMonth = limits.maxMonthly || 1000;
  const earnedMonth = limits.monthlyEarned || 0;
  const remainMonth = Math.max(0, Math.round((maxMonth - earnedMonth) * 100) / 100);
  const pctMonth = Math.min(100, Math.max(0, Math.round((remainMonth / maxMonth) * 100)));

  const todayMaxEl = document.getElementById('portal-limit-today-max');
  const todayRemainEl = document.getElementById('portal-limit-today-remain');
  const todayBarEl = document.getElementById('portal-limit-today-bar');
  if (todayMaxEl) todayMaxEl.textContent = formatPoints(maxToday);
  if (todayRemainEl) todayRemainEl.textContent = formatPoints(remainToday);
  if (todayBarEl) todayBarEl.style.width = pctToday + '%';

  const monthMaxEl = document.getElementById('portal-limit-month-max');
  const monthRemainEl = document.getElementById('portal-limit-month-remain');
  const monthBarEl = document.getElementById('portal-limit-month-bar');
  if (monthMaxEl) monthMaxEl.textContent = formatPoints(maxMonth);
  if (monthRemainEl) monthRemainEl.textContent = formatPoints(remainMonth);
  if (monthBarEl) monthBarEl.style.width = pctMonth + '%';

  showScreen('screen-portal');
}

function updateStartScreenMasteryBanner() {
  if (currentAccountId === null) return;
  const acc = accounts[currentAccountId];
  const grade = acc ? (getGradeForAccount(acc) || 5) : 5;
  const mStats = getMasteryStats(currentAccountId, grade);

  const pctEl = document.getElementById('start-mastery-pct');
  if (pctEl) pctEl.textContent = `${mStats.masterPct}% (${mStats.master} / ${mStats.total}問)`;

  const total = mStats.total || 1;
  const barMaster = document.getElementById('m-bar-master');
  const barLearning = document.getElementById('m-bar-learning');
  const barWeak = document.getElementById('m-bar-weak');

  if (barMaster) barMaster.style.width = ((mStats.master / total) * 100) + '%';
  if (barLearning) barLearning.style.width = ((mStats.learning / total) * 100) + '%';
  if (barWeak) barWeak.style.width = ((mStats.weak / total) * 100) + '%';

  const cntMaster = document.getElementById('m-count-master');
  const cntLearning = document.getElementById('m-count-learning');
  const cntWeak = document.getElementById('m-count-weak');
  const cntUnseen = document.getElementById('m-count-unseen');

  if (cntMaster) cntMaster.textContent = mStats.master;
  if (cntLearning) cntLearning.textContent = mStats.learning;
  if (cntWeak) cntWeak.textContent = mStats.weak;
  if (cntUnseen) cntUnseen.textContent = mStats.unseen;
}

function openKanjiDrill() {
  const acc = accounts[currentAccountId];
  if (!acc) return;
  const grade = getGradeForAccount(acc);
  const effectiveGrade = (grade && grade >= 1 && grade <= 6) ? grade : 5;

  document.getElementById('grade-label').textContent = `${effectiveGrade}年生の`;
  document.getElementById('start-account-name').textContent = `${acc.name}さん、`;
  document.getElementById('start-q-count-badge').textContent = `📚 ${currentQuizData.length}問収録！`;
  document.getElementById('start-points-display').textContent = formatPoints(acc.points || 0);

  updateStartScreenWeakBanner();
  updateStartScreenMasteryBanner();

  // Reset mode buttons
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.mode-btn[data-count="10"]').classList.add('active');
  selectedCount = 10;
  isWeakTrainingMode = false;

  showScreen('screen-start');
}

function updateStartScreenWeakBanner() {
  const acc = accounts[currentAccountId];
  if (!acc) return;
  const grade = getGradeForAccount(acc) || 5;
  const weakList = getWeakQuestionsForGrade(currentAccountId, grade);

  const banner = document.getElementById('start-weak-banner');
  const icon = document.getElementById('weak-banner-icon');
  const text = document.getElementById('weak-banner-text');
  const weakBtn = document.getElementById('btn-start-weak');
  const weakBtnCount = document.getElementById('weak-btn-count');

  if (weakList.length > 0) {
    banner.className = 'start-weak-banner has-weak';
    icon.textContent = '🔥';
    text.textContent = `現在のにがて問題: ${weakList.length}問（重点的に出題されるよ！）`;
    weakBtn.style.display = 'inline-flex';
    weakBtnCount.textContent = weakList.length;
  } else {
    banner.className = 'start-weak-banner zero-weak';
    icon.textContent = '💮';
    text.textContent = 'にがてな問題はありません！この調子でがんばろう！';
    weakBtn.style.display = 'none';
  }
}

// =============================================
//  SETTINGS SCREEN
// =============================================

// 設定画面で一時保持するカスタム情報
let settingsThemeColor = null;   // 選択中のカラー
let settingsAvatarEmoji = null;  // 選択中の絵文字
let settingsAvatarPhoto = null;  // 選択中の写真 (Base64)

function openSettings(id) {
  settingsAccountId = id;
  const acc = accounts[id];
  const slotInfo = SLOT_THEMES[id];

  const nameEl = document.getElementById('settings-name');
  const yearEl = document.getElementById('settings-birthyear');
  const weakCountEl = document.getElementById('settings-weak-count');

  nameEl.value = acc.name || '';
  yearEl.value = acc.birthYear || '';

  // 一時変数を現在のアカウント値で初期化
  settingsThemeColor = acc.themeColor || slotInfo.color;
  settingsAvatarEmoji = acc.avatarEmoji || null;
  settingsAvatarPhoto = acc.avatarPhoto || null;

  // カラーパレット: 選択中のカラーを highlight
  document.querySelectorAll('#color-palette .color-swatch').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.color === settingsThemeColor);
  });

  // 絵文字グリッド: 選択中の絵文字を highlight
  document.querySelectorAll('#avatar-emoji-grid .avatar-emoji-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.emoji === settingsAvatarEmoji);
  });

  // アバタープレビュー更新
  refreshSettingsAvatarPreview();

  // 写真削除ボタン表示切替
  document.getElementById('btn-avatar-photo-clear').style.display = settingsAvatarPhoto ? '' : 'none';

  const grade = getGradeForAccount(acc) || 5;
  const weakList = acc.name ? getWeakQuestionsForGrade(id, grade) : [];
  weakCountEl.textContent = acc.name ? `${weakList.length}問` : '0問';

  updateGradePreview();
  showScreen('screen-settings');
}

// アバタープレビューをリフレッシュ（写真 > 絵文字 > 名前1文字）
function refreshSettingsAvatarPreview() {
  const avatarEl = document.getElementById('settings-avatar');
  const photoEl = document.getElementById('settings-avatar-photo');
  const textEl = document.getElementById('settings-avatar-text');
  const nameVal = document.getElementById('settings-name').value.trim();
  const slotInfo = SLOT_THEMES[settingsAccountId || 0];

  // 背景カラー
  avatarEl.style.background = settingsThemeColor || slotInfo.color;

  if (settingsAvatarPhoto) {
    photoEl.src = settingsAvatarPhoto;
    photoEl.style.display = '';
    textEl.style.display = 'none';
  } else {
    photoEl.style.display = 'none';
    textEl.style.display = '';
    if (settingsAvatarEmoji) {
      textEl.textContent = settingsAvatarEmoji;
    } else if (nameVal) {
      textEl.textContent = nameVal.charAt(0);
    } else {
      textEl.textContent = slotInfo.emoji;
    }
  }
}

function updateGradePreview() {
  const yearVal = parseInt(document.getElementById('settings-birthyear').value);
  const previewEl = document.getElementById('settings-grade-preview');

  // アバターも合わせて更新
  refreshSettingsAvatarPreview();

  if (!yearVal || isNaN(yearVal)) {
    previewEl.textContent = '---';
    previewEl.style.color = 'var(--color-text-muted)';
    return;
  }

  const grade = calcGrade(yearVal);
  const label = gradeLabel(grade);
  previewEl.textContent = label;

  const theme = GRADE_THEMES[grade];
  if (theme) {
    previewEl.style.color = theme.primary;
  } else {
    previewEl.style.color = 'var(--color-text-muted)';
  }
}

function saveSettings() {
  const name = document.getElementById('settings-name').value.trim();
  const birthYear = parseInt(document.getElementById('settings-birthyear').value);

  if (!name) { 
    document.getElementById('settings-name').focus(); 
    return; 
  }

  accounts[settingsAccountId].name = name;
  accounts[settingsAccountId].birthYear = isNaN(birthYear) ? null : birthYear;
  accounts[settingsAccountId].themeColor = settingsThemeColor || SLOT_THEMES[settingsAccountId].color;
  accounts[settingsAccountId].avatarEmoji = settingsAvatarEmoji || null;
  accounts[settingsAccountId].avatarPhoto = settingsAvatarPhoto || null;
  saveAccounts();
  renderAccountScreen();
  showScreen('screen-account');
}

function deleteAccount(id) {
  accounts[id] = { 
    id, name: null, birthYear: null, 
    points: 0, bookPoints: 0, pointHistory: [], wishlist: [],
    monthlyLimits: getDefaultLimits(),
    themeColor: SLOT_THEMES[id].color, avatarPhoto: null, avatarEmoji: null
  };
  saveAccounts();
  saveHistory(id, {}); // 履歴も消去
  renderAccountScreen();
  showScreen('screen-account');
}

function resetWeakHistory(id) {
  if (id === null || id === undefined) return;
  saveHistory(id, {});
  document.getElementById('settings-weak-count').textContent = '0問';
  alert('にがて履歴をリセットしました！');
}

// =============================================
//  WALLET & POINTS MANAGEMENT
// =============================================
function openWalletScreen(accountId) {
  if (accountId === null || accountId === undefined) {
    accountId = currentAccountId;
  }
  if (accountId === null || accountId === undefined) {
    accountId = 0;
  }
  currentAccountId = accountId;
  const acc = accounts[accountId];
  if (!acc || !acc.name) {
    alert('アカウントが設定されていません。');
    return;
  }

  document.getElementById('wallet-account-name').textContent = `${acc.name}さんの通帳`;
  document.getElementById('wallet-points-num').textContent = formatPoints(acc.points || 0);
  document.getElementById('wallet-cash-equiv').textContent = formatPoints(acc.points || 0);
  document.getElementById('wallet-book-stock').textContent = `${acc.bookPoints || 0} 円分`;
  document.getElementById('wallet-fx-rate').textContent = currentFxRate.toFixed(2);

  updateWalletPreviews();
  renderWalletHistory(acc);
  renderWishlist(acc);

  // パネル & フォーム初期状態は閉じる
  const panel = document.getElementById('parent-panel');
  if (panel) panel.style.display = 'none';
  const formPanel = document.getElementById('wishlist-form-panel');
  if (formPanel) formPanel.style.display = 'none';

  showScreen('screen-wallet');
}

function updateWalletPreviews() {
  if (currentAccountId === null) return;
  const acc = accounts[currentAccountId];
  if (!acc) return;

  const points = acc.points || 0;
  const bookEquiv = calcBookEquiv(points);
  const bonus = bookEquiv - points;

  const bookEl = document.getElementById('wallet-book-equiv');
  const bonusEl = document.getElementById('wallet-bonus-amount');
  const bonusLine = document.getElementById('wallet-bonus-line');

  if (bookEl) bookEl.textContent = `${bookEquiv} 円分`;
  if (bonusEl) bonusEl.textContent = `+${Math.max(0, bonus)}`;
  if (bonusLine) {
    bonusLine.style.display = bonus > 0 ? 'block' : 'none';
  }
}

// =============================================
//  WISHLIST (ほしい本メモ) LOGIC
// =============================================
function renderWishlist(acc) {
  const container = document.getElementById('wishlist-items-container');
  if (!container) return;
  container.innerHTML = '';

  const wishlist = acc.wishlist || [];
  if (wishlist.length === 0) {
    container.innerHTML = '<div class="wishlist-empty">まだほしい本が登録されていません。「＋ ほしい本を追加」から読みたい本を登録しよう！</div>';
    return;
  }

  // 総本購入可能額 (交換済み本ポイント ＋ 通常ポイントの為替換算額)
  const totalBookFunds = (acc.bookPoints || 0) + calcBookEquiv(acc.points || 0);

  wishlist.forEach(item => {
    const card = document.createElement('div');
    const isReady = totalBookFunds >= item.price;
    card.className = 'wishlist-item-card' + (isReady ? ' ready' : '');

    const pct = Math.min(100, Math.floor((totalBookFunds / item.price) * 100));
    const remain = Math.max(0, item.price - totalBookFunds);

    const progressLabelHtml = isReady
      ? '<span class="wishlist-label-ready">🎉 目標達成！本を買えるよ！</span>'
      : `<span class="wishlist-label-need">あと <strong>${remain}</strong> 円分 (約 ${Math.ceil(remain / (currentFxRate / 100))} pt)</span>`;

    const urlBtnHtml = item.url
      ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn-pop-link-small"><span>🛒</span> 本を見に行く ↗</a>`
      : '';

    card.innerHTML = `
      <div class="wishlist-item-top">
        <div class="wishlist-item-title-wrap">
          <div class="wishlist-item-title">📖 ${item.title}</div>
          <div class="wishlist-item-price">目標価格: ${item.price} 円</div>
        </div>
        <div class="wishlist-item-actions-top">
          <button class="btn-icon-danger" data-id="${item.id}" aria-label="削除" title="削除">🗑</button>
        </div>
      </div>

      <div class="wishlist-card-progress">
        <div class="wishlist-card-progress-labels">
          <span>進捗率: ${pct}%</span>
          ${progressLabelHtml}
        </div>
        <div class="wishlist-progress-bar-bg">
          <div class="wishlist-progress-bar-fill" style="width: ${pct}%;"></div>
        </div>
      </div>

      <div class="wishlist-item-bottom-actions">
        ${urlBtnHtml}
        <button class="btn-pop-bought" data-id="${item.id}">
          <span>🎉</span> 買ってもらった！
        </button>
      </div>
    `;

    // 削除イベント
    card.querySelector('.btn-icon-danger').addEventListener('click', () => {
      deleteWishlistItem(item.id);
    });

    // 買ってもらったイベント
    card.querySelector('.btn-pop-bought').addEventListener('click', () => {
      completeWishlistItem(item);
    });

    container.appendChild(card);
  });
}

function toggleWishlistForm(show) {
  const panel = document.getElementById('wishlist-form-panel');
  if (!panel) return;
  const isVisible = panel.style.display === 'block';
  const shouldShow = show !== undefined ? show : !isVisible;
  panel.style.display = shouldShow ? 'block' : 'none';

  if (shouldShow) {
    document.getElementById('wishlist-input-title').value = '';
    document.getElementById('wishlist-input-price').value = '';
    document.getElementById('wishlist-input-url').value = '';
    document.getElementById('wishlist-input-title').focus();
  }
}

function saveWishlistItem() {
  const acc = accounts[currentAccountId];
  if (!acc) return;

  const title = document.getElementById('wishlist-input-title').value.trim();
  const price = parseInt(document.getElementById('wishlist-input-price').value);
  const url = document.getElementById('wishlist-input-url').value.trim();

  if (!title) {
    alert('本のなまえ（タイトル）を入力してください。');
    document.getElementById('wishlist-input-title').focus();
    return;
  }
  if (isNaN(price) || price <= 0) {
    alert('正しいお値段を入力してください。');
    document.getElementById('wishlist-input-price').focus();
    return;
  }

  if (!acc.wishlist) acc.wishlist = [];
  acc.wishlist.push({
    id: 'w_' + Date.now(),
    title,
    price,
    url: url || null,
    createdAt: Date.now()
  });

  saveAccounts();
  toggleWishlistForm(false);
  renderWishlist(acc);
  renderPortalScreen();
  alert(`📖 「${title}」をほしい本リストに登録しました！\n目標達成に向けてクイズをがんばろう！`);
}

function deleteWishlistItem(id) {
  const acc = accounts[currentAccountId];
  if (!acc || !acc.wishlist) return;

  const ok = confirm('この本をほしい本リストから削除しますか？');
  if (!ok) return;

  acc.wishlist = acc.wishlist.filter(item => item.id !== id);
  saveAccounts();
  renderWishlist(acc);
  renderPortalScreen();
}

function completeWishlistItem(item) {
  const acc = accounts[currentAccountId];
  if (!acc) return;

  const ok = confirm(`【本を購入！】\n\n「${item.title}」を購入しましたか？\nほしい本リストから達成完了とし、履歴に記録します！`);
  if (!ok) return;

  // リストから削除
  acc.wishlist = (acc.wishlist || []).filter(w => w.id !== item.id);

  // 本ポイントが十分にあれば精算（なければ記念記録）
  if ((acc.bookPoints || 0) >= item.price) {
    acc.bookPoints -= item.price;
  }

  if (!acc.pointHistory) acc.pointHistory = [];
  acc.pointHistory.push({
    type: 'settle',
    title: `🎉 欲しい本達成: 「${item.title}」を購入！`,
    amount: 0,
    date: Date.now()
  });

  saveAccounts();
  renderAccountScreen();
  openWalletScreen(currentAccountId);
  renderPortalScreen();
  alert(`🎊 おめでとう！「${item.title}」の購入達成を記録しました！\nたくさん本を読んでね！`);
}

function renderWalletHistory(acc) {
  const listEl = document.getElementById('wallet-history-list');
  if (!listEl) return;
  listEl.innerHTML = '';

  const history = acc.pointHistory || [];
  if (history.length === 0) {
    listEl.innerHTML = '<div class="history-empty">まだきろくがありません。クイズを解いてポイントをためよう！</div>';
    return;
  }

  const reversed = [...history].reverse();
  reversed.slice(0, 15).forEach(item => {
    const el = document.createElement('div');
    el.className = 'history-item';

    let badgeClass = 'earn';
    let badgeText = '獲得';
    if (item.type === 'book') { badgeClass = 'book'; badgeText = '本交換'; }
    else if (item.type === 'cash') { badgeClass = 'cash'; badgeText = 'お小遣い'; }
    else if (item.type === 'settle') { badgeClass = 'settle'; badgeText = '精算'; }

    const isPlus = item.amount > 0;
    const amountStr = isPlus ? `+${formatPoints(item.amount)} pt` : `${formatPoints(item.amount)} pt`;

    const d = new Date(item.date);
    const dateStr = `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;

    el.innerHTML = `
      <div class="history-item-left">
        <span class="history-item-badge ${badgeClass}">${badgeText}</span>
        <span class="history-item-title">${item.title}</span>
        <small style="color:#94a3b8; font-size:0.75rem;">${dateStr}</small>
      </div>
      <div class="history-item-amount ${isPlus ? 'plus' : 'minus'}">${amountStr}</div>
    `;
    listEl.appendChild(el);
  });
}

function exchangeToBooks() {
  const acc = accounts[currentAccountId];
  if (!acc) return;
  const currentPoints = acc.points || 0;

  if (currentPoints <= 0) {
    alert('交換できるポイントがありません。クイズに挑戦してポイントをためてね！');
    return;
  }

  const bookVal = calcBookEquiv(currentPoints);
  const ok = confirm(
    `【バリューブックスポイントに交換】\n\n` +
    `現在の為替レート: 1ドル = ${currentFxRate}円\n` +
    `所持ポイント ${currentPoints} pt を、\n` +
    `👉 ${bookVal} 円分 のバリューブックスポイントに交換しますか？\n` +
    `（現金よりも ${bookVal - currentPoints} 円分おトク！）`
  );

  if (ok) {
    acc.points = 0;
    acc.bookPoints = (acc.bookPoints || 0) + bookVal;
    if (!acc.pointHistory) acc.pointHistory = [];
    acc.pointHistory.push({
      type: 'book',
      title: `バリューブックスポイント交換 (${bookVal}円分)`,
      amount: -currentPoints,
      bookAmount: bookVal,
      date: Date.now()
    });

    saveAccounts();
    renderAccountScreen();
    openWalletScreen(currentAccountId);
    SoundFx.playCoin();
    alert(`🎉 やったね！ ${bookVal} 円分のバリューブックスポイントに交換しました！\n本を選んでおうちの人に買ってもらおう！`);
  }
}

function claimCash() {
  const acc = accounts[currentAccountId];
  if (!acc) return;
  const currentPoints = acc.points || 0;

  if (currentPoints <= 0) {
    alert('お小遣いにできるポイントがありません。クイズをがんばってね！');
    return;
  }

  const ok = confirm(
    `【お小遣い申請】\n\n` +
    `所持ポイント ${currentPoints} pt を使って、\n` +
    `お小遣い ${currentPoints} 円 をおうちの人に申請しますか？`
  );

  if (ok) {
    SoundFx.playCoin();
    alert(`💴 おうちの人に ${currentPoints} 円のお小遣いを申請しました！\nおうちの人からお小遣いをもらったら「保護者メニュー」で精算してもらってね。`);
  }
}

// =============================================
//  PARENT PIN MODAL & PANEL LOGIC
// =============================================
let enteredPin = '';
let pinSuccessCallback = null;

function openParentPinModal(callback) {
  enteredPin = '';
  pinSuccessCallback = callback;
  updatePinDotsDisplay();
  const errorEl = document.getElementById('pin-error-msg');
  if (errorEl) errorEl.style.display = 'none';

  const modal = document.getElementById('modal-parent-pin');
  if (modal) modal.style.display = 'flex';
}

function closeParentPinModal() {
  enteredPin = '';
  pinSuccessCallback = null;
  const modal = document.getElementById('modal-parent-pin');
  if (modal) modal.style.display = 'none';
}

function updatePinDotsDisplay() {
  const dots = document.querySelectorAll('.pin-dot');
  dots.forEach((dot, index) => {
    if (index < enteredPin.length) {
      dot.classList.add('filled');
    } else {
      dot.classList.remove('filled');
    }
  });
}

function handlePinKey(key) {
  if (enteredPin.length >= 4) return;
  enteredPin += key;
  updatePinDotsDisplay();

  if (enteredPin.length === 4) {
    const savedPin = getParentPin();
    if (enteredPin === savedPin) {
      const cb = pinSuccessCallback;
      closeParentPinModal();
      if (cb) cb();
    } else {
      const errorEl = document.getElementById('pin-error-msg');
      if (errorEl) errorEl.style.display = 'block';
      setTimeout(() => {
        enteredPin = '';
        updatePinDotsDisplay();
      }, 700);
    }
  }
}

function handlePinBackspace() {
  if (enteredPin.length > 0) {
    enteredPin = enteredPin.slice(0, -1);
    updatePinDotsDisplay();
  }
}

function toggleParentPanel() {
  const panel = document.getElementById('parent-panel');
  if (!panel) return;
  if (panel.style.display === 'none' || !panel.style.display) {
    openParentPinModal(() => {
      renderParentPanel();
      panel.style.display = 'block';
    });
  } else {
    panel.style.display = 'none';
  }
}

function renderParentPanel() {
  if (currentAccountId === null) return;
  const acc = accounts[currentAccountId];
  if (!acc) return;
  checkAndResetLimits(acc);

  const limits = acc.monthlyLimits || getDefaultLimits();

  document.getElementById('parent-stat-monthly').textContent = limits.monthlyEarned || 0;
  document.getElementById('parent-stat-max-monthly').textContent = limits.maxMonthly || 1000;
  document.getElementById('parent-stat-daily').textContent = limits.todayEarned || 0;
  document.getElementById('parent-stat-max-daily').textContent = limits.maxDaily || 50;

  document.getElementById('cfg-max-monthly').value = limits.maxMonthly || 1000;
  document.getElementById('cfg-max-daily').value = limits.maxDaily || 50;
  document.getElementById('cfg-carryover').checked = limits.carryOverUnlocked !== false;
}

function savePointConfig() {
  if (currentAccountId === null) return;
  const acc = accounts[currentAccountId];
  if (!acc) return;
  checkAndResetLimits(acc);

  const maxMonthly = parseInt(document.getElementById('cfg-max-monthly').value);
  const maxDaily = parseInt(document.getElementById('cfg-max-daily').value);
  const carryover = document.getElementById('cfg-carryover').checked;

  if (isNaN(maxMonthly) || maxMonthly <= 0) {
    alert('正しい月間上限を入力してください。');
    return;
  }
  if (isNaN(maxDaily) || maxDaily <= 0) {
    alert('正しい1日の目安上限を入力してください。');
    return;
  }

  acc.monthlyLimits.maxMonthly = maxMonthly;
  acc.monthlyLimits.maxDaily = maxDaily;
  acc.monthlyLimits.carryOverUnlocked = carryover;

  saveAccounts();
  renderParentPanel();
  alert('⚙️ ポイント上限の設定を保存しました！');
}

function changeParentPin() {
  const currentPin = getParentPin();
  const inputOld = prompt('【暗証番号の変更】\n現在の4桁の暗証番号を入力してください:');
  if (inputOld === null) return;
  if (inputOld !== currentPin) {
    alert('現在の暗証番号が正しくありません。');
    return;
  }

  const newPin1 = prompt('新しく設定する【4桁の数字】を入力してください:');
  if (newPin1 === null) return;
  if (!/^\d{4}$/.test(newPin1)) {
    alert('暗証番号は半角数字4桁で入力してください。');
    return;
  }

  const newPin2 = prompt('確認のため、もう一度新しい【4桁の数字】を入力してください:');
  if (newPin2 === null) return;
  if (newPin1 !== newPin2) {
    alert('暗証番号が一致しませんでした。もう一度やり直してください。');
    return;
  }

  setParentPin(newPin1);
  alert('🔑 保護者暗証番号を新しく変更しました！\n忘れないようご注意ください。');
}

function parentSettleCash() {
  const acc = accounts[currentAccountId];
  if (!acc) return;
  const currentPoints = acc.points || 0;

  if (currentPoints <= 0) {
    alert('現在精算するポイントはありません。');
    return;
  }

  const input = prompt(`【お小遣い精算】\n実際に渡した金額（ポイント数）を入力してください:\n（現在の所持: ${currentPoints} pt）`, currentPoints);
  if (input === null) return;
  const amount = parseInt(input);

  if (isNaN(amount) || amount <= 0 || amount > currentPoints) {
    alert('正しいポイント数を入力してください。');
    return;
  }

  acc.points -= amount;
  if (!acc.pointHistory) acc.pointHistory = [];
  acc.pointHistory.push({
    type: 'cash',
    title: `お小遣い精算（${amount}円支払い済み）`,
    amount: -amount,
    date: Date.now()
  });

  saveAccounts();
  renderAccountScreen();
  openWalletScreen(currentAccountId);
  alert(`お小遣い ${amount} 円の精算（ポイント消費）が完了しました。`);
}

function parentSettleBook() {
  const acc = accounts[currentAccountId];
  if (!acc) return;
  const currentBookPoints = acc.bookPoints || 0;

  if (currentBookPoints <= 0) {
    alert('現在使用できるバリューブックスポイントはありません。');
    return;
  }

  const input = prompt(`【本ポイント精算】\nバリューブックスで本を購入した金額（ポイント数）を入力してください:\n（保有本ポイント: ${currentBookPoints} 円分）`, currentBookPoints);
  if (input === null) return;
  const amount = parseInt(input);

  if (isNaN(amount) || amount <= 0 || amount > currentBookPoints) {
    alert('正しい金額を入力してください。');
    return;
  }

  acc.bookPoints -= amount;
  if (!acc.pointHistory) acc.pointHistory = [];
  acc.pointHistory.push({
    type: 'settle',
    title: `バリューブックス本購入（${amount}円分使用）`,
    amount: 0,
    note: `本ポイント${amount}円使用`,
    date: Date.now()
  });

  saveAccounts();
  renderAccountScreen();
  openWalletScreen(currentAccountId);
  alert(`バリューブックス本ポイント ${amount} 円分の使用記録が完了しました。`);
}

function parentAddPoints() {
  const acc = accounts[currentAccountId];
  if (!acc) return;

  const input = prompt(`【ごほうびポイント追加】\n追加するポイント数を入力してください（例: 50）:`, '50');
  if (input === null) return;
  const amount = parseInt(input);

  if (isNaN(amount) || amount <= 0) {
    alert('正しいポイント数を入力してください。');
    return;
  }

  const reason = prompt('理由・名目を入力してください（例: お手伝いごほうび、漢字テスト満点など）:', 'お手伝いごほうび') || 'ごほうびポイント';

  acc.points = (acc.points || 0) + amount;
  if (!acc.pointHistory) acc.pointHistory = [];
  acc.pointHistory.push({
    type: 'earn',
    title: `🎁 ${reason}`,
    amount: amount,
    date: Date.now()
  });

  saveAccounts();
  renderAccountScreen();
  openWalletScreen(currentAccountId);
  alert(`🎁 ${amount} pt をプレゼントしました！`);
}


// =============================================
//  QUIZ STATE & SMART ADAPTIVE SELECTION
// =============================================
let currentQuizData = dedupeData(QUIZ_DATA_G5);
let ALL_READINGS = [...new Set(currentQuizData.map(d => d.a))];

let quizQuestions = [];
let currentIndex = 0;
let score = 0;
let selectedCount = 10;
let wrongAnswers = [];
let answered = false;
let isWeakTrainingMode = false;
let conqueredThisSession = []; // 今回克服できた問題
let masteredThisSession = [];  // 今回新しくマスターした問題

function dedupeData(data) {
  const seen = new Set();
  return data.filter(item => {
    if (seen.has(item.q)) return false;
    seen.add(item.q);
    return true;
  });
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 読み方ダミー選択肢生成
 */
function getDistractors(correct, count) {
  const confusing = ALL_READINGS.filter(r => {
    if (r === correct) return false;
    if (correct.length <= 2) {
      return r.length <= 3 && (r[0] === correct[0] || r.slice(-1) === correct.slice(-1));
    }
    return (r.slice(0, 2) === correct.slice(0, 2)) ||
           (r.slice(-2) === correct.slice(-2));
  });

  const similarLen = ALL_READINGS.filter(r => {
    if (r === correct || confusing.includes(r)) return false;
    return Math.abs(r.length - correct.length) <= 1;
  });

  const rest = ALL_READINGS.filter(r => r !== correct && !confusing.includes(r) && !similarLen.includes(r));
  const pool = shuffle([...confusing, ...similarLen, ...rest]);
  return pool.slice(0, count);
}

/**
 * アカウントの漢字マスター度・学習進捗の集計
 */
function getMasteryStats(accountId, grade) {
  const g = grade || (accounts[accountId] ? getGradeForAccount(accounts[accountId]) : 5) || 5;
  const data = (typeof GRADE_DATA !== 'undefined' && GRADE_DATA[g]) ? GRADE_DATA[g] : [];
  const total = data.length;
  const history = loadHistory(accountId);

  let master = 0;
  let learning = 0;
  let weak = 0;
  let unseen = 0;

  data.forEach(item => {
    const rec = history[item.q];
    if (!rec || ((rec.correctCount || 0) === 0 && (rec.wrongCount || 0) === 0)) {
      unseen++;
    } else if (rec.isWeak === true) {
      weak++;
    } else if ((rec.streak || 0) >= 3) {
      master++;
    } else {
      learning++;
    }
  });

  const masterPct = total > 0 ? Math.round((master / total) * 100) : 0;
  return { total, master, learning, weak, unseen, masterPct };
}

/**
 * スマート習熟度サイクル出題ビルダー
 * - にがて問題 (弱点克服)
 * - 学習中問題 (忘却防止の反復学習)
 * - 未挑戦問題 / マスター維持確認
 * を黄金比率でブレンド出題！
 */
function buildQuiz(count, isWeakOnly = false) {
  const acc = accounts[currentAccountId];
  const grade = acc ? (getGradeForAccount(acc) || 5) : 5;
  const history = loadHistory(currentAccountId);

  // 4つのプールに分類
  const weakPool = [];
  const learningPool = [];
  const unseenPool = [];
  const masterPool = [];

  currentQuizData.forEach(item => {
    const rec = history[item.q];
    if (!rec || ((rec.correctCount || 0) === 0 && (rec.wrongCount || 0) === 0)) {
      unseenPool.push(item);
    } else if (rec.isWeak === true) {
      weakPool.push(item);
    } else if ((rec.streak || 0) >= 3) {
      masterPool.push(item);
    } else {
      learningPool.push(item);
    }
  });

  let selected = [];

  if (isWeakOnly) {
    // 苦手特訓モード: 苦手問題だけを出題
    const shuffledWeak = shuffle(weakPool);
    selected = shuffledWeak.slice(0, Math.min(count, shuffledWeak.length));
  } else {
    // スマート習熟度サイクル出題（黄金ブレンド比率）
    // 1. にがて枠 (最大約35%)
    const targetWeak = Math.min(Math.ceil(count * 0.35), weakPool.length);
    const chosenWeak = shuffle(weakPool).slice(0, targetWeak);

    // 2. 定着・反復学習枠 (最大約35% — 1〜2回正解した問題を忘れる前に再登場！)
    const targetLearning = Math.min(Math.ceil(count * 0.35), learningPool.length);
    const chosenLearning = shuffle(learningPool).slice(0, targetLearning);

    // 3. 残り枠は「未挑戦」から優先選出、足りなければ「マスター（定期忘却チェック）」から補填
    const remainingSlots = count - (chosenWeak.length + chosenLearning.length);
    const shuffledUnseen = shuffle(unseenPool);
    const chosenUnseen = shuffledUnseen.slice(0, remainingSlots);

    const neededFromMaster = remainingSlots - chosenUnseen.length;
    const chosenMaster = neededFromMaster > 0 ? shuffle(masterPool).slice(0, neededFromMaster) : [];

    selected = shuffle([...chosenWeak, ...chosenLearning, ...chosenUnseen, ...chosenMaster]);
  }

  // 万一問題数が不足している場合は全データから補填
  if (selected.length < count) {
    const usedSet = new Set(selected.map(s => s.q));
    const leftovers = shuffle(currentQuizData.filter(i => !usedSet.has(i.q)));
    selected = [...selected, ...leftovers.slice(0, count - selected.length)];
  }

  return selected.map(item => {
    const distractors = getDistractors(item.a, 3);
    const choices = shuffle([item.a, ...distractors]);
    const rec = history[item.q];
    const isWeakRevenge = rec && rec.isWeak === true;

    return { 
      question: item.q, 
      correct: item.a, 
      choices, 
      hint: item.h,
      isWeakRevenge
    };
  });
}

// =============================================
//  DIFFICULTY & POINT CALCULATION (漢字読みクイズ: 基本0.2pt)
// =============================================
function calcQuestionPoint(q) {
  const basePoints = 0.2;
  const bonus = q.isWeakRevenge ? 0.2 : 0;
  const total = Math.round((basePoints + bonus) * 100) / 100;

  return {
    basePoints,
    bonus,
    total,
    label: bonus > 0 ? `正解で +${total}pt (克服ボーナス+0.2!)` : `正解で +${basePoints}pt`,
    badgeClass: bonus > 0 ? 'gold' : 'bronze'
  };
}

function skipQuizQuestion() {
  if (answered) return;
  SoundFx.playTap();
  currentIndex++;
  if (currentIndex < quizQuestions.length) {
    renderQuestion();
  } else {
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = '100%';
    setTimeout(() => showResult(), 300);
  }
}

let sessionEarnedPoints = 0;

function startQuiz(weakOnly = false) {
  isWeakTrainingMode = weakOnly;
  const count = selectedCount;

  quizQuestions = buildQuiz(count, weakOnly);
  if (quizQuestions.length === 0) {
    alert('出題できる問題がありません！');
    return;
  }

  currentIndex = 0;
  score = 0;
  sessionEarnedPoints = 0;
  wrongAnswers = [];
  conqueredThisSession = [];
  masteredThisSession = [];
  answered = false;

  document.getElementById('q-total').textContent = quizQuestions.length;
  document.getElementById('quiz-mode-tag').textContent = weakOnly ? '🔥 特訓' : '通常';
  document.getElementById('quiz-session-points').textContent = '0';
  updateScore();
  renderQuestion();
  showScreen('screen-quiz');
}

function renderQuestion() {
  answered = false;
  const q = quizQuestions[currentIndex];
  const ptInfo = calcQuestionPoint(q);

  document.getElementById('q-current').textContent = currentIndex + 1;
  const pct = (currentIndex / quizQuestions.length) * 100;
  const bar = document.getElementById('progress-bar');
  bar.style.width = pct + '%';
  bar.parentElement.setAttribute('aria-valuenow', pct);

  const kanjiCard = document.getElementById('kanji-display');
  const kanjiCharEl = document.getElementById('kanji-char');
  const qLabel = document.getElementById('question-label');
  const weakBadge = document.getElementById('question-weak-badge');
  const pointBadge = document.getElementById('question-point-badge');
  const pointBadgeText = document.getElementById('point-badge-text');

  kanjiCard.classList.remove('flip');
  void kanjiCard.offsetWidth;
  kanjiCard.classList.add('flip');

  // ポイントバッジ表示
  pointBadge.className = `question-point-badge ${ptInfo.badgeClass}`;
  pointBadgeText.textContent = ptInfo.label;

  // 苦手リベンジバッジ表示
  if (q.isWeakRevenge) {
    weakBadge.style.display = 'inline-block';
  } else {
    weakBadge.style.display = 'none';
  }

  const text = q.question;
  const hasBrackets = text.includes('【') && text.includes('】');

  if (hasBrackets) {
    qLabel.textContent = '赤いわくの漢字の「読み方」は？';
    kanjiCard.className = 'kanji-card pop-card pop-kanji-box mode-sentence';
    const highlighted = text.replace(/【(.*?)】/g, '<span class="target-kanji-highlight serif-text">$1</span>');
    kanjiCharEl.innerHTML = `<span class="sentence-text">${highlighted}</span>`;
  } else if (text.length === 1) {
    qLabel.textContent = 'この漢字の「読み方」は？';
    kanjiCard.className = 'kanji-card pop-card pop-kanji-box mode-single';
    kanjiCharEl.innerHTML = `<span class="single-kanji serif-text">${text}</span>`;
  } else if (text.length <= 4) {
    qLabel.textContent = 'この言葉の「読み方」は？';
    kanjiCard.className = 'kanji-card pop-card pop-kanji-box mode-word';
    kanjiCharEl.innerHTML = `<span class="word-kanji serif-text">${text}</span>`;
  } else {
    qLabel.textContent = 'この言葉の「読み方」は？';
    kanjiCard.className = 'kanji-card pop-card pop-kanji-box mode-phrase';
    kanjiCharEl.innerHTML = `<span class="phrase-kanji serif-text">${text}</span>`;
  }

  document.getElementById('example-sentence').textContent = q.hint ? `💡 意味: ${q.hint}` : '';

  // 選択肢（明朝体）
  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';

  q.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn pop-btn-choice serif-choice';
    btn.setAttribute('role', 'listitem');
    btn.id = `choice-${i}`;
    btn.style.setProperty('--i', i);
    btn.innerHTML = `<span class="choice-text serif-text">${choice}</span>`;
    btn.addEventListener('click', () => handleChoice(btn, choice, q));
    grid.appendChild(btn);
  });

  const fb = document.getElementById('feedback-overlay');
  fb.classList.remove('show');
  fb.textContent = '';
}

function handleChoice(btn, choice, q) {
  if (answered) return;
  answered = true;

  const isCorrect = choice === q.correct;
  const allBtns = document.querySelectorAll('.choice-btn');
  allBtns.forEach(b => b.disabled = true);

  const fb = document.getElementById('feedback-overlay');
  const history = loadHistory(currentAccountId);
  if (!history[q.question]) {
    history[q.question] = { wrongCount: 0, correctCount: 0, streak: 0, isWeak: false, lastAnswered: Date.now() };
  }
  const record = history[q.question];
  const prevStreak = record.streak || 0;
  const ptInfo = calcQuestionPoint(q);

  if (isCorrect) {
    SoundFx.playCorrect();
    btn.classList.add('correct');
    btn.innerHTML = `<span class="choice-icon">💮</span> <span class="choice-text serif-text">${choice}</span>`;
    score++;
    sessionEarnedPoints += ptInfo.total;
    document.getElementById('quiz-session-points').textContent = sessionEarnedPoints;

    record.correctCount = (record.correctCount || 0) + 1;
    record.streak = (record.streak || 0) + 1;
    record.lastAnswered = Date.now();

    // 苦手問題だった場合は克服判定！
    if (record.isWeak) {
      record.isWeak = false;
      record.streak = 1;
      conqueredThisSession.push(q);
      ConfettiFx.launch(35);
      fb.innerHTML = `
        <span class="fb-symbol fb-correct pop-bounce">
          💮<br>
          <small style="font-size:1.5rem;background:#ffffff;padding:0.2rem 0.8rem;border-radius:20px;border:3px solid #10b981;color:#065f46;">こくふく！ +${ptInfo.total}pt</small>
        </span>
      `;
    } else if (record.streak === 3 && prevStreak < 3) {
      // 3回連続正解で新マスター達成！
      masteredThisSession.push(q);
      fb.innerHTML = `
        <span class="fb-symbol fb-correct pop-bounce">
          👑<br>
          <small style="font-size:1.4rem;background:#ffffff;padding:0.2rem 0.8rem;border-radius:20px;border:3px solid #f59e0b;color:#b45309;">マスター達成！ +${ptInfo.total}pt</small>
        </span>
      `;
    } else {
      fb.innerHTML = `
        <span class="fb-symbol fb-correct pop-bounce">
          ⭕<br>
          <small style="font-size:1.3rem;background:#ffffff;padding:0.2rem 0.7rem;border-radius:20px;border:2px solid #f59e0b;color:#b45309;">+${ptInfo.total}pt</small>
        </span>
      `;
    }
  } else {
    SoundFx.playWrong();
    btn.classList.add('wrong');
    btn.innerHTML = `<span class="choice-icon">❌</span> <span class="choice-text serif-text">${choice}</span>`;
    fb.innerHTML = '<span class="fb-symbol fb-wrong pop-shake">❌</span>';

    // 苦手フラグをONにして連続正解をリセット
    record.wrongCount = (record.wrongCount || 0) + 1;
    record.streak = 0;
    record.isWeak = true;
    record.lastAnswered = Date.now();

    allBtns.forEach(b => {
      const choiceSpan = b.querySelector('.choice-text');
      if (choiceSpan && choiceSpan.textContent.trim() === q.correct) {
        b.classList.add('correct');
        b.innerHTML = `<span class="choice-icon">💮</span> <span class="choice-text serif-text">${q.correct}</span>`;
      }
    });

    wrongAnswers.push({
      question: q.question,
      correct: q.correct,
      yourAnswer: choice,
      hint: q.hint,
    });
  }

  saveHistory(currentAccountId, history);

  fb.classList.add('show');
  updateScore();

  setTimeout(() => {
    fb.classList.remove('show');
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
      renderQuestion();
    } else {
      const bar = document.getElementById('progress-bar');
      bar.style.width = '100%';
      setTimeout(() => showResult(), 400);
    }
  }, 1200);
}

function updateScore() {
  document.getElementById('score-correct').textContent = score;
  document.getElementById('score-answered').textContent = currentIndex;
}

// =============================================
//  RESULT SCREEN
// =============================================
function showResult() {
  const total = quizQuestions.length;
  const pct = Math.round((score / total) * 100);

  document.getElementById('result-correct').textContent = score;
  document.getElementById('result-total').textContent = total;
  document.getElementById('result-percent').textContent = pct;

  // ポイント付与 & 保存（月間・日別上限判定）
  const acc = accounts[currentAccountId];
  let actualEarnedPoints = 0;
  let limitNoticeText = '';

  if (acc && sessionEarnedPoints > 0) {
    checkAndResetLimits(acc);
    const limits = acc.monthlyLimits || getDefaultLimits();

    const monthlyRemain = Math.max(0, limits.maxMonthly - (limits.monthlyEarned || 0));
    // 月末残枠解放モードがONなら、月間残枠まで獲得可能。OFFなら1日残枠まで。
    const dailyRemain = limits.carryOverUnlocked
      ? monthlyRemain
      : Math.max(0, limits.maxDaily - (limits.todayEarned || 0));

    const availableLimit = Math.min(monthlyRemain, dailyRemain);
    actualEarnedPoints = Math.min(sessionEarnedPoints, availableLimit);

    if (actualEarnedPoints < sessionEarnedPoints) {
      if (monthlyRemain <= 0) {
        limitNoticeText = `🌟 今月のポイント上限（${limits.maxMonthly}pt）を達成したよ！すごい！来月1日にリセットされるよ！（練習クイズはそのまま続けられるよ）`;
      } else if (dailyRemain <= 0) {
        limitNoticeText = `🌟 今日のポイント目安上限（${limits.maxDaily}pt）を達成したよ！あしたもがんばろう！（練習クイズはそのまま続けられるよ）`;
      } else {
        limitNoticeText = `🌟 上限まであと ${actualEarnedPoints}pt 獲得しました！（残りの問題も練習できるよ）`;
      }
    }

    if (actualEarnedPoints > 0) {
      acc.points = (acc.points || 0) + actualEarnedPoints;
      limits.monthlyEarned = (limits.monthlyEarned || 0) + actualEarnedPoints;
      limits.todayEarned = (limits.todayEarned || 0) + actualEarnedPoints;

      if (!acc.pointHistory) acc.pointHistory = [];
      acc.pointHistory.push({
        type: 'earn',
        title: `クイズ${score}問正解 (${total}問中)`,
        amount: actualEarnedPoints,
        date: Date.now()
      });
      saveAccounts();
      renderAccountScreen();
    }
  }

  const noticeEl = document.getElementById('result-limit-notice');
  if (noticeEl) {
    if (limitNoticeText) {
      noticeEl.style.display = 'block';
      noticeEl.textContent = limitNoticeText;
    } else {
      noticeEl.style.display = 'none';
    }
  }

  const currentTotalPoints = acc ? (acc.points || 0) : 0;
  const bookEquiv = calcBookEquiv(currentTotalPoints);

  document.getElementById('result-earned-points').textContent = actualEarnedPoints;
  document.getElementById('result-total-points').textContent = currentTotalPoints;
  document.getElementById('result-cash-equiv').textContent = currentTotalPoints;
  document.getElementById('result-book-equiv').textContent = bookEquiv;

  let emoji, title;
  if (pct === 100)    { emoji = '🏆'; title = 'てんさい！満点だよ！'; }
  else if (pct >= 80) { emoji = '🎉'; title = 'すごい！よくできたね！'; }
  else if (pct >= 60) { emoji = '😊'; title = 'ナイスチャレンジ！'; }
  else if (pct >= 40) { emoji = '📖'; title = 'もう少し！つぎはがんばろう！'; }
  else                { emoji = '💪'; title = 'たくさん練習して強くなろう！'; }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;

  const circumference = 314;
  const offset = circumference - (pct / 100) * circumference;
  setTimeout(() => {
    document.getElementById('ring-fill').style.strokeDashoffset = offset;
  }, 300);

  // 今回新しくマスターした漢字ボックス
  const masteredBox = document.getElementById('result-mastered-box');
  if (masteredBox) {
    if (masteredThisSession.length > 0) {
      masteredBox.style.display = 'block';
      const tagList = masteredThisSession.map(q => {
        const cleanQ = q.question.replace(/【(.*?)】/g, '$1');
        return `<span class="mastered-tag pop-pill serif-text">👑 ${cleanQ}</span>`;
      }).join('');
      masteredBox.innerHTML = `
        <div class="mastered-header">👑 新しくマスターした漢字！（${masteredThisSession.length}問）</div>
        <div class="mastered-tags">${tagList}</div>
      `;
    } else {
      masteredBox.style.display = 'none';
    }
  }

  // 克服できた問題ボックス
  const conqueredBox = document.getElementById('result-conquered-box');
  if (conqueredBox) {
    if (conqueredThisSession.length > 0) {
      conqueredBox.style.display = 'block';
      const tagList = conqueredThisSession.map(q => {
        const cleanQ = q.question.replace(/【(.*?)】/g, '$1');
        return `<span class="conquered-tag pop-pill serif-text">💮 ${cleanQ}</span>`;
      }).join('');
      conqueredBox.innerHTML = `
        <div class="conquered-header">✨ 今回こくふくした問題（${conqueredThisSession.length}問）</div>
        <div class="conquered-tags">${tagList}</div>
      `;
    } else {
      conqueredBox.style.display = 'none';
    }
  }

  // 間違えた問題リスト
  const listEl = document.getElementById('result-wrong-list');
  listEl.innerHTML = '';

  if (wrongAnswers.length > 0) {
    const titleEl = document.createElement('p');
    titleEl.className = 'wrong-list-title';
    titleEl.textContent = `▼ おさらいしよう (${wrongAnswers.length}問・次回優先して出題されます)`;
    listEl.appendChild(titleEl);

    wrongAnswers.forEach(w => {
      const item = document.createElement('div');
      item.className = 'wrong-item pop-card-mini';
      const cleanQ = w.question.replace(/【(.*?)】/g, '$1');
      item.innerHTML = `
        <span class="wrong-kanji serif-text">${cleanQ}</span>
        <div class="wrong-details">
          <div class="wrong-correct-reading">せいかい: <strong class="serif-text">${w.correct}</strong></div>
          <div class="wrong-your-answer">あなたのこたえ: <span class="serif-text">${w.yourAnswer}</span></div>
        </div>
      `;
      listEl.appendChild(item);
    });
  } else {
    const perfect = document.createElement('div');
    perfect.className = 'perfect-banner pop-bounce';
    perfect.innerHTML = '🌟 全問大せいかい！はなまる満点！ 💮';
    listEl.appendChild(perfect);
  }

  showScreen('screen-result');
  SoundFx.playFanfare();
  ConfettiFx.launch(score >= currentQuizList.length ? 80 : 50);
}

// =============================================
//  MATH QUEST (算数クエスト) LOGIC
// =============================================
let mathQuestions = [];
let mathCurrentIndex = 0;
let mathScore = 0;
let mathSelectedCount = 10;
let mathSessionEarnedPoints = 0;
let mathInputVal = '';
let mathWrongAnswers = [];
let mathAnswered = false;

const MATH_GRADE_INFO = {
  1: { title: "1年生の計算メニュー", desc: "10までの足し算・引き算や、くり上がり・くり下がりの計算を練習しよう！" },
  2: { title: "2年生の計算メニュー", desc: "2けたの計算や、九九（かけ算）をテンポよくマスターしよう！" },
  3: { title: "3年生の計算メニュー", desc: "わり算・かけ算の筆算・3けたの計算を手元のノートで解こう！" },
  4: { title: "4年生の計算メニュー", desc: "2けたのわり算・小数の足し引き・大きな数の計算にチャレンジ！" },
  5: { title: "5年生の計算メニュー", desc: "小数の掛け算・割り算・平均・割合など、高学年の計算に挑戦！" },
  6: { title: "6年生の計算メニュー", desc: "分数のかけ算・割り算・比・速さの計算をしっかりマスターしよう！" },
};

function openMathStart() {
  if (currentAccountId === null) return;
  const acc = accounts[currentAccountId];
  if (!acc) return;

  const grade = getGradeForAccount(acc);
  const effectiveGrade = (grade && grade >= 1 && grade <= 6) ? grade : 5;
  const info = MATH_GRADE_INFO[effectiveGrade] || MATH_GRADE_INFO[5];

  document.getElementById('math-grade-label').textContent = `${effectiveGrade}年生の`;
  document.getElementById('math-start-account-name').textContent = `${acc.name}さん、`;
  document.getElementById('math-grade-title').textContent = info.title;
  document.getElementById('math-grade-desc').textContent = info.desc;
  document.getElementById('math-start-points-display').textContent = formatPoints(acc.points || 0);

  // Reset count buttons
  document.querySelectorAll('.math-mode-btn').forEach(b => b.classList.remove('active'));
  const btn10 = document.getElementById('math-mode-10');
  if (btn10) btn10.classList.add('active');
  mathSelectedCount = 10;

  showScreen('screen-math-start');
}

function startMathQuiz() {
  if (currentAccountId === null) return;
  const acc = accounts[currentAccountId];
  const grade = acc ? (getGradeForAccount(acc) || 5) : 5;

  if (typeof generateMathQuiz !== 'function') {
    alert('算数データエンジンが読み込まれていません！');
    return;
  }

  mathQuestions = generateMathQuiz(grade, mathSelectedCount, 'normal');
  if (mathQuestions.length === 0) {
    alert('問題の生成に失敗しました！');
    return;
  }

  mathCurrentIndex = 0;
  mathScore = 0;
  mathSessionEarnedPoints = 0;
  mathWrongAnswers = [];
  mathAnswered = false;
  mathInputVal = '';

  document.getElementById('math-q-total').textContent = mathQuestions.length;
  document.getElementById('math-session-points').textContent = '0';

  renderMathQuestion();
  showScreen('screen-math-quiz');
}

function renderMathQuestion() {
  mathAnswered = false;
  mathInputVal = '';
  updateMathInputDisplay();

  const q = mathQuestions[mathCurrentIndex];

  document.getElementById('math-q-current').textContent = mathCurrentIndex + 1;
  const pct = (mathCurrentIndex / mathQuestions.length) * 100;
  const bar = document.getElementById('math-progress-bar');
  bar.style.width = pct + '%';
  bar.parentElement.setAttribute('aria-valuenow', pct);

  document.getElementById('math-genre-badge').textContent = q.genre || '算数計算';
  document.getElementById('math-point-badge-text').textContent = `正解で +${q.points}pt`;
  document.getElementById('math-expr-text').textContent = q.expr;
  document.getElementById('math-question-text').textContent = q.text || '計算の答えを入力してね！';
  document.getElementById('math-hint-box').textContent = q.hint ? `💡 ヒント: ${q.hint}` : '';

  const fb = document.getElementById('math-feedback-overlay');
  fb.classList.remove('show');
  fb.textContent = '';
}

function handleMathKey(key) {
  if (mathAnswered) return;
  if (mathInputVal.length >= 8) return;

  // 小数点は1つまで
  if (key === '.' && mathInputVal.includes('.')) return;

  mathInputVal += key;
  updateMathInputDisplay();
}

function handleMathBackspace() {
  if (mathAnswered) return;
  mathInputVal = mathInputVal.slice(0, -1);
  updateMathInputDisplay();
}

function handleMathClear() {
  if (mathAnswered) return;
  mathInputVal = '';
  updateMathInputDisplay();
}

function updateMathInputDisplay() {
  const el = document.getElementById('math-ans-val');
  if (!el) return;

  if (mathInputVal === '') {
    el.textContent = '?';
    el.className = 'math-ans-val placeholder';
  } else {
    el.textContent = mathInputVal;
    el.className = 'math-ans-val';
  }
}

function submitMathAnswer() {
  if (mathAnswered) return;
  if (mathInputVal.trim() === '') return;

  mathAnswered = true;
  const q = mathQuestions[mathCurrentIndex];
  const userAns = mathInputVal.trim();
  const correctAns = q.ans.trim();

  // 数値比較と文字列比較
  const isCorrect = (userAns === correctAns) || (parseFloat(userAns) === parseFloat(correctAns));

  const fb = document.getElementById('math-feedback-overlay');

  if (isCorrect) {
    SoundFx.playCorrect();
    mathScore++;
    mathSessionEarnedPoints += q.points;
    document.getElementById('math-session-points').textContent = mathSessionEarnedPoints;

    fb.innerHTML = `
      <span class="fb-symbol fb-correct pop-bounce">
        💮<br>
        <small style="font-size:1.5rem;background:#ffffff;padding:0.2rem 0.8rem;border-radius:20px;border:3px solid #10b981;color:#065f46;">せいかい！ +${q.points}pt</small>
      </span>
    `;
  } else {
    SoundFx.playWrong();
    fb.innerHTML = `
      <span class="fb-symbol fb-wrong pop-shake">
        ❌<br>
        <small style="font-size:1.2rem;background:#ffffff;padding:0.2rem 0.8rem;border-radius:20px;border:3px solid #ef4444;color:#991b1b;">こたえ: ${correctAns}</small>
      </span>
    `;

    mathWrongAnswers.push({
      expr: q.expr,
      question: q.text,
      correct: correctAns,
      yourAnswer: userAns,
      hint: q.hint,
      genre: q.genre
    });
  }

  fb.classList.add('show');

  setTimeout(() => {
    fb.classList.remove('show');
    mathCurrentIndex++;
    if (mathCurrentIndex < mathQuestions.length) {
      renderMathQuestion();
    } else {
      const bar = document.getElementById('math-progress-bar');
      bar.style.width = '100%';
      setTimeout(() => showMathResult(), 400);
    }
  }, 1200);
}

function skipMathQuestion() {
  if (mathAnswered) return;
  SoundFx.playTap();
  mathCurrentIndex++;
  if (mathCurrentIndex < mathQuestions.length) {
    renderMathQuestion();
  } else {
    const bar = document.getElementById('math-progress-bar');
    if (bar) bar.style.width = '100%';
    setTimeout(() => showMathResult(), 300);
  }
}

function showMathResult() {
  const total = mathQuestions.length;
  const pct = Math.round((mathScore / total) * 100);

  document.getElementById('math-result-correct').textContent = mathScore;
  document.getElementById('math-result-total').textContent = total;
  document.getElementById('math-result-percent').textContent = pct;

  const acc = accounts[currentAccountId];
  let actualEarnedPoints = 0;
  let limitNoticeText = '';

  if (acc && mathSessionEarnedPoints > 0) {
    checkAndResetLimits(acc);
    const limits = acc.monthlyLimits || getDefaultLimits();

    const monthlyRemain = Math.max(0, limits.maxMonthly - (limits.monthlyEarned || 0));
    const dailyRemain = limits.carryOverUnlocked
      ? monthlyRemain
      : Math.max(0, limits.maxDaily - (limits.todayEarned || 0));

    const availableLimit = Math.min(monthlyRemain, dailyRemain);
    actualEarnedPoints = Math.min(mathSessionEarnedPoints, availableLimit);

    if (actualEarnedPoints < mathSessionEarnedPoints) {
      if (monthlyRemain <= 0) {
        limitNoticeText = `🌟 今月のポイント上限（${limits.maxMonthly}pt）を達成したよ！すごい！来月1日にリセットされるよ！（練習はそのまま続けられるよ）`;
      } else if (dailyRemain <= 0) {
        limitNoticeText = `🌟 今日のポイント目安上限（${limits.maxDaily}pt）を達成したよ！あしたもがんばろう！（練習はそのまま続けられるよ）`;
      } else {
        limitNoticeText = `🌟 上限まであと ${actualEarnedPoints}pt 獲得しました！（残りの問題も練習できるよ）`;
      }
    }

    if (actualEarnedPoints > 0) {
      acc.points = (acc.points || 0) + actualEarnedPoints;
      limits.monthlyEarned = (limits.monthlyEarned || 0) + actualEarnedPoints;
      limits.todayEarned = (limits.todayEarned || 0) + actualEarnedPoints;

      if (!acc.pointHistory) acc.pointHistory = [];
      acc.pointHistory.push({
        type: 'earn',
        title: `算数クエスト${mathScore}問正解 (${total}問中)`,
        amount: actualEarnedPoints,
        date: Date.now()
      });
      saveAccounts();
      renderAccountScreen();
    }
  }

  const noticeEl = document.getElementById('math-result-limit-notice');
  if (noticeEl) {
    if (limitNoticeText) {
      noticeEl.style.display = 'block';
      noticeEl.textContent = limitNoticeText;
    } else {
      noticeEl.style.display = 'none';
    }
  }

  const currentTotalPoints = acc ? (acc.points || 0) : 0;
  const bookEquiv = calcBookEquiv(currentTotalPoints);

  document.getElementById('math-result-earned-points').textContent = actualEarnedPoints;
  document.getElementById('math-result-total-points').textContent = currentTotalPoints;
  document.getElementById('math-result-cash-equiv').textContent = currentTotalPoints;
  document.getElementById('math-result-book-equiv').textContent = bookEquiv;

  let emoji, title;
  if (pct === 100)    { emoji = '🏆'; title = 'てんさい！満点だよ！'; }
  else if (pct >= 80) { emoji = '🎉'; title = 'すごい！よくできたね！'; }
  else if (pct >= 60) { emoji = '😊'; title = 'ナイスチャレンジ！'; }
  else if (pct >= 40) { emoji = '📖'; title = 'もう少し！つぎはがんばろう！'; }
  else                { emoji = '💪'; title = '計算ノートでたくさん練習しよう！'; }

  document.getElementById('math-result-emoji').textContent = emoji;
  document.getElementById('math-result-title').textContent = title;

  const circumference = 314;
  const offset = circumference - (pct / 100) * circumference;
  setTimeout(() => {
    document.getElementById('math-ring-fill').style.strokeDashoffset = offset;
  }, 300);

  const listEl = document.getElementById('math-result-wrong-list');
  listEl.innerHTML = '';

  if (mathWrongAnswers.length > 0) {
    const titleEl = document.createElement('p');
    titleEl.className = 'wrong-list-title';
    titleEl.textContent = `▼ おさらいしよう (${mathWrongAnswers.length}問)`;
    listEl.appendChild(titleEl);

    mathWrongAnswers.forEach(w => {
      const item = document.createElement('div');
      item.className = 'wrong-item pop-card-mini';
      item.innerHTML = `
        <div class="wrong-kanji-wrap">
          <span class="wrong-kanji-char">${w.expr}</span>
          <span class="wrong-arrow">→</span>
          <span class="wrong-correct-ans">答え: ${w.correct}</span>
        </div>
        <div class="wrong-your-ans">あなたの答え: <span class="wrong-ans-text">${w.yourAnswer}</span></div>
        ${w.hint ? `<div class="wrong-hint">💡 ${w.hint}</div>` : ''}
      `;
      listEl.appendChild(item);
    });
  }

  showScreen('screen-math-result');
  SoundFx.playFanfare();
  ConfettiFx.launch(mathScore >= mathQuestions.length ? 80 : 50);
}

// =============================================
//  TYPING PRACTICE MODULE (ローマ字タイピング練習)
// =============================================
// ポイントテーブル: easy=0.1固定, normal/hard=タイム成績次第, insane=大量ポイント
const TYPING_POINT_TABLE = {
  easy:   { S: 0.1, A: 0.1, B: 0.1, C: 0.1 },  // かんたん: 一律0.1pt (練習用)
  normal: { S: 0.4, A: 0.3, B: 0.2, C: 0.05 }, // ふつう: タイムアタック成績次第
  hard:   { S: 0.9, A: 0.7, B: 0.5, C: 0.1 },  // 激ムズ: タイムアタック成績次第
  insane: { CLEAR: 1.8, FAIL: 0 },               // 激激ムズムズ: ノーミス全完走で1.8pt
};

// タイムアタック: 1文字あたりの制限秒数（ローマ字は平均1.2〜2文字/かな文字）
const TYPING_TIME_PER_CHAR = {
  easy:   0,    // 制限なし
  normal: 1.4,  // ふつう: 1かな文字あたり1.4秒
  hard:   0.9,  // 激ムズ: 1かな文字あたり0.9秒
  insane: 0.55, // 激激ムズムズ: 1かな文字あたり0.55秒（超高速！）
};

const TYPING_COURSE_NAMES = {
  easy:   '🐣 かんたん',
  normal: '🐥 ふつう',
  hard:   '🦅 激ムズ',
  insane: '🔥 激激ムズムズ',
};

let typingSelectedWorld = 'chiikawa';
let typingSelectedCourse = 'easy';
let typingShowFingerGuide = true;

let typingQuizList = [];
let typingCurrentIndex = 0;
let typingPatternNodes = [];
let typingNodeIndex = 0;
let typingCurrentCandidate = '';
let typingMatchedLen = 0;
let typingTypedString = '';

let typingTotalKeystrokes = 0;
let typingMissCount = 0;
let typingCurrentCombo = 0;
let typingMaxCombo = 0;
let typingStartTime = 0;
let typingSessionPoints = 0;
let isTypingInputBlocked = false;

// タイムアタック用変数
let typingTimerInterval = null;   // setInterval ID
let typingTimerRemain = 0;        // 残り秒数
let typingTimerTotal = 0;         // 問題の制限秒数
let typingInsaneFailed = false;   // 激激ムズムズ失敗フラグ
let typingInsaneTotalScore = 0;   // 激激ムズムズ クリア問題数カウント

// =============================================
//  タイムアタックタイマー関数
// =============================================

/**
 * 問題のかな文字列からコースに応じた制限秒数を計算する
 * ローマ字では 1 かな ≒ 2 キーストロークになることを考慮
 */
function calcQuestionTime(kana, course) {
  const timePerChar = TYPING_TIME_PER_CHAR[course] || 0;
  if (timePerChar === 0) return 0;
  // かな文字数（記号・スペースを除く実質文字数）でカウント
  const charCount = [...kana].filter(c => c !== '…' && c !== ' ').length;
  return Math.max(5, Math.round(charCount * timePerChar * 10) / 10);
}

function stopQuestionTimer() {
  if (typingTimerInterval) {
    clearInterval(typingTimerInterval);
    typingTimerInterval = null;
  }
  const wrap = document.getElementById('typing-timer-wrap');
  if (wrap) wrap.style.display = 'none';
}

function startQuestionTimer(totalSec) {
  stopQuestionTimer();
  if (!totalSec || totalSec <= 0) return;

  typingTimerRemain = totalSec;
  typingTimerTotal = totalSec;

  const wrap = document.getElementById('typing-timer-wrap');
  if (wrap) wrap.style.display = 'flex';

  _updateTimerDisplay();

  typingTimerInterval = setInterval(() => {
    typingTimerRemain = Math.max(0, Math.round((typingTimerRemain - 0.1) * 10) / 10);
    _updateTimerDisplay();

    if (typingTimerRemain <= 0) {
      clearInterval(typingTimerInterval);
      typingTimerInterval = null;
      onTimeUp();
    }
  }, 100);
}

function _updateTimerDisplay() {
  const secEl = document.getElementById('typing-timer-sec');
  if (secEl) secEl.textContent = typingTimerRemain.toFixed(1);

  const barEl = document.getElementById('typing-timer-bar');
  if (barEl) {
    const pct = typingTimerTotal > 0 ? (typingTimerRemain / typingTimerTotal) * 100 : 0;
    barEl.style.width = pct + '%';

    // 残り30%以下で赤く点滅
    if (pct <= 30) {
      barEl.classList.add('danger');
    } else {
      barEl.classList.remove('danger');
    }
  }

  const badge = document.getElementById('typing-timer-badge');
  if (badge) {
    if (typingTimerRemain <= 3) {
      badge.classList.add('danger');
    } else {
      badge.classList.remove('danger');
    }
  }
}

function onTimeUp() {
  if (isTypingInputBlocked) return;
  isTypingInputBlocked = true;
  stopQuestionTimer();

  const fb = document.getElementById('typing-feedback-overlay');

  if (typingSelectedCourse === 'insane') {
    // 激激ムズムズ: タイムアップ = 即ゲームオーバー
    typingInsaneFailed = true;
    if (fb) {
      fb.innerHTML = `
        <span class="fb-symbol fb-wrong pop-bounce">
          ⏰<br>
          <small style="font-size:1.1rem;background:#ffffff;padding:0.2rem 0.7rem;border-radius:20px;border:2px solid #dc2626;color:#dc2626;">タイムアップ！ゲームオーバー！</small>
        </span>
      `;
      fb.classList.add('show');
    }
    setTimeout(() => {
      fb && fb.classList.remove('show');
      finishTypingQuiz();
    }, 1800);
  } else {
    // ふつう・激ムズ: タイムアップで次の問題へ（0点）
    if (fb) {
      fb.innerHTML = `
        <span class="fb-symbol fb-wrong pop-bounce">
          ⏰<br>
          <small style="font-size:1.1rem;background:#ffffff;padding:0.2rem 0.7rem;border-radius:20px;border:2px solid #f59e0b;color:#d97706;">タイムアップ！次の問題へ</small>
        </span>
      `;
      fb.classList.add('show');
    }
    setTimeout(() => {
      fb && fb.classList.remove('show');
      typingCurrentIndex++;
      setupTypingQuestion();
    }, 1500);
  }
}


function openTypingStart() {
  if (currentAccountId === null) return;
  const acc = accounts[currentAccountId];
  if (!acc) return;

  const grade = getGradeForAccount(acc) || calcGrade(acc.birthYear) || 5;
  const isAdvancedGrade = grade >= 3;

  document.getElementById('typing-start-account-name').textContent = `${acc.name}さん、`;
  document.getElementById('typing-start-points-display').textContent = formatPoints(acc.points || 0);

  const badgeTag = document.getElementById('typing-start-badge-tag');
  if (badgeTag) {
    if (isAdvancedGrade) {
      badgeTag.innerHTML = `🔥 ${grade}年生: ローマ字アシストなし（日本語実践特訓！）`;
      badgeTag.style.background = '#fef2f2';
      badgeTag.style.color = '#dc2626';
      badgeTag.style.borderColor = '#fecaca';
    } else {
      badgeTag.innerHTML = `🔰 ${grade}年生: ローマ字ガイド＆アシストつき`;
      badgeTag.style.background = '#f0fdf4';
      badgeTag.style.color = '#16a34a';
      badgeTag.style.borderColor = '#bbf7d0';
    }
  }

  // insane-warning の表示/非表示
  const insaneWarn = document.getElementById('insane-warning');
  if (insaneWarn) {
    insaneWarn.style.display = typingSelectedCourse === 'insane' ? 'block' : 'none';
  }

  switchTypingWorld(typingSelectedWorld);
  showScreen('screen-typing-start');
}

function switchTypingWorld(worldId) {
  if (!TYPING_WORLDS[worldId]) worldId = 'chiikawa';
  typingSelectedWorld = worldId;
  const world = TYPING_WORLDS[worldId];

  // タブボタンのactive切り替え
  document.querySelectorAll('.world-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.world === worldId);
  });

  // ワールド説明カードの更新
  document.getElementById('typing-world-icon').textContent = world.emoji;
  document.getElementById('typing-world-name').textContent = world.name;
  document.getElementById('typing-world-desc').textContent = world.desc;

  // テーマカラーとクラスの適用
  const startCard = document.getElementById('typing-start-card');
  if (startCard) {
    startCard.style.borderTopColor = world.primaryColor;
  }
  const startBtn = document.getElementById('btn-typing-start-run');
  if (startBtn) {
    startBtn.style.background = `linear-gradient(135deg, ${world.primaryColor}, #e11d48)`;
  }
}

function startTypingGame() {
  const world = TYPING_WORLDS[typingSelectedWorld];
  const courseQuestions = (world.courses && world.courses[typingSelectedCourse]) || world.courses.easy;

  // 出題リスト（シャッフルして激激ムズムズは全問、それ以外は8問）
  const shuffled = [...courseQuestions].sort(() => Math.random() - 0.5);
  typingQuizList = typingSelectedCourse === 'insane'
    ? shuffled  // insaneは全問使用
    : shuffled.slice(0, Math.min(8, shuffled.length));

  typingCurrentIndex = 0;
  typingTotalKeystrokes = 0;
  typingMissCount = 0;
  typingCurrentCombo = 0;
  typingMaxCombo = 0;
  typingSessionPoints = 0;
  typingStartTime = Date.now();
  isTypingInputBlocked = false;
  typingInsaneFailed = false;
  typingInsaneTotalScore = 0;

  stopQuestionTimer();

  const totalEl = document.getElementById('typing-q-total');
  if (totalEl) totalEl.textContent = typingQuizList.length;

  const pointsEl = document.getElementById('typing-session-points');
  if (pointsEl) pointsEl.textContent = '0';

  const tagEl = document.getElementById('typing-quiz-world-tag');
  if (tagEl) tagEl.textContent = `${world.emoji} ${world.name.split(' ')[0]}`;

  // テーマクラスの適用
  const stageCard = document.getElementById('typing-stage-card');
  if (stageCard) {
    stageCard.className = `typing-stage-card pop-card ${world.themeClass}${typingSelectedCourse === 'insane' ? ' insane-mode' : ''}`;
  }

  // 指ガイドの表示/非表示
  const kbCard = document.getElementById('typing-keyboard-card');
  if (kbCard) {
    kbCard.style.display = typingShowFingerGuide ? 'block' : 'none';
  }

  setupTypingQuestion();
  showScreen('screen-typing-quiz');
}

function setupTypingQuestion() {
  if (typingCurrentIndex >= typingQuizList.length) {
    finishTypingQuiz();
    return;
  }

  // 激激ムズムズの失敗時はそのまま終了画面へ
  if (typingInsaneFailed) {
    finishTypingQuiz();
    return;
  }

  stopQuestionTimer();

  const fb = document.getElementById('typing-feedback-overlay');
  if (fb) {
    fb.classList.remove('show');
    fb.innerHTML = '';
  }

  const q = typingQuizList[typingCurrentIndex];
  const curEl = document.getElementById('typing-q-current');
  if (curEl) curEl.textContent = typingCurrentIndex + 1;

  const barEl = document.getElementById('typing-progress-bar');
  if (barEl) {
    const progress = ((typingCurrentIndex) / typingQuizList.length) * 100;
    barEl.style.width = `${progress}%`;
  }

  const kanjiEl = document.getElementById('typing-target-kanji');
  if (kanjiEl) kanjiEl.textContent = q.kanji;

  const kanaEl = document.getElementById('typing-target-kana');
  if (kanaEl) kanaEl.textContent = q.kana;

  const hintEl = document.getElementById('typing-hint-text');
  if (hintEl) hintEl.textContent = q.hint ? `💡 ヒント: ${q.hint}` : '';

  // ワールドキャラクター初期メッセージ
  const world = TYPING_WORLDS[typingSelectedWorld];
  const charEmojiEl = document.getElementById('typing-char-emoji');
  if (charEmojiEl) charEmojiEl.textContent = world.emoji;

  const bubbleEl = document.getElementById('typing-speech-bubble');
  if (bubbleEl) {
    bubbleEl.textContent = typingSelectedCourse === 'insane'
      ? '★ノーミスクリアで大量ポイント！★'
      : 'がんばってタイプしよう！';
  }

  const comboEl = document.getElementById('typing-combo-num');
  if (comboEl) comboEl.textContent = typingCurrentCombo;

  // ローマ字パターンのパース
  typingPatternNodes = buildRomajiPattern(q.kana);
  typingNodeIndex = 0;
  typingCurrentCandidate = typingPatternNodes[0].options[0];
  typingMatchedLen = 0;
  typingTypedString = '';
  isTypingInputBlocked = false;

  updateTypingDisplay();

  // タイムアタックタイマー開始（easyは0なので無効）
  const timeSec = calcQuestionTime(q.kana, typingSelectedCourse);
  startQuestionTimer(timeSec);
}

function updateTypingDisplay() {
  if (typingNodeIndex >= typingPatternNodes.length) return;

  const acc = (currentAccountId !== null) ? accounts[currentAccountId] : null;
  const grade = acc ? (getGradeForAccount(acc) || calcGrade(acc.birthYear) || 5) : 5;
  const isAdvancedGrade = grade >= 3;

  const node = typingPatternNodes[typingNodeIndex];
  const candidate = typingCurrentCandidate;
  const nextChar = candidate[typingMatchedLen] || '';

  // 残りのノードの代表ローマ字を連結
  let remainRest = candidate.slice(typingMatchedLen + 1);
  for (let i = typingNodeIndex + 1; i < typingPatternNodes.length; i++) {
    remainRest += typingPatternNodes[i].options[0];
  }

  const typedEl = document.getElementById('romaji-typed');
  if (typedEl) typedEl.textContent = typingTypedString;

  const nextEl = document.getElementById('romaji-next');
  const remainEl = document.getElementById('romaji-remain');
  const romajiBox = document.getElementById('typing-romaji-box');

  if (isAdvancedGrade) {
    // 🔥 3年生以上: 打つべきローマ字アシスト（next / remain）を完全非表示
    if (nextEl) nextEl.textContent = '';
    if (remainEl) remainEl.textContent = '';
    if (romajiBox) {
      romajiBox.classList.add('no-assist');
    }
    // キーボードの光るキーガイドもオフ（自力で打鍵）
    updateKeyboardGuide(null);
  } else {
    // 🔰 1・2年生: ローマ字ガイド＆アシストを表示
    if (nextEl) nextEl.textContent = nextChar;
    if (remainEl) remainEl.textContent = remainRest;
    if (romajiBox) {
      romajiBox.classList.remove('no-assist');
    }
    // キーボードの次打鍵ガイドをハイライト
    updateKeyboardGuide(nextChar.toUpperCase());
  }
}

function updateKeyboardGuide(charUpper) {
  document.querySelectorAll('.kb-key').forEach(k => k.classList.remove('active-target'));
  if (!charUpper) return;

  const targetBtn = document.querySelector(`.kb-key[data-char="${charUpper}"]`);
  if (targetBtn) {
    targetBtn.classList.add('active-target');
  }
}

function handleTypingInput(inputChar) {
  if (isTypingInputBlocked || typingNodeIndex >= typingPatternNodes.length) return;

  const charLower = inputChar.toLowerCase();
  const node = typingPatternNodes[typingNodeIndex];

  // 特殊判定: 「ん」で 1文字 'n' を入力済みの状態で、次のノードの先頭文字が入力された場合
  if (node.kana === 'ん' && typingMatchedLen === 1 && node.options.includes('n') && typingNodeIndex + 1 < typingPatternNodes.length) {
    const nextNode = typingPatternNodes[typingNodeIndex + 1];
    let nextMatched = false;
    for (const nextOpt of nextNode.options) {
      if (nextOpt.startsWith(charLower)) {
        nextMatched = true;
        break;
      }
    }
    if (nextMatched) {
      // 'ん' を 1文字 'n' で確定して次へ進める
      typingNodeIndex++;
      typingMatchedLen = 0;
      typingCurrentCandidate = typingPatternNodes[typingNodeIndex].options[0];
      handleTypingInput(inputChar);
      return;
    }
  }

  typingTotalKeystrokes++;

  // ユーザーの入力が現在の候補群のいずれかにマッチするか探す
  let matchedCandidate = null;
  for (const opt of node.options) {
    // 既にマッチ済みのプレフィックス + 今回の文字で始まるか
    const prefix = typingCurrentCandidate.slice(0, typingMatchedLen) + charLower;
    if (opt.startsWith(prefix)) {
      matchedCandidate = opt;
      break;
    }
  }

  const world = TYPING_WORLDS[typingSelectedWorld];

  if (matchedCandidate) {
    // 正解打鍵！
    SoundFx.playKey();
    typingCurrentCandidate = matchedCandidate;
    typingMatchedLen++;
    typingTypedString += charLower;
    typingCurrentCombo++;
    if (typingCurrentCombo > typingMaxCombo) typingMaxCombo = typingCurrentCombo;

    const comboEl = document.getElementById('typing-combo-num');
    if (comboEl) comboEl.textContent = typingCurrentCombo;
    const comboBadge = document.getElementById('typing-combo-badge');
    if (comboBadge) comboBadge.style.display = typingCurrentCombo >= 3 ? 'inline-flex' : 'none';

    // リアクションセリフ
    const speechEl = document.getElementById('typing-speech-bubble');
    if (speechEl && typingCurrentCombo % 5 === 0) {
      speechEl.textContent = world.sounds.streak;
    }

    // ノード（かな1単位）完了判定
    if (typingMatchedLen >= typingCurrentCandidate.length) {
      typingNodeIndex++;
      typingMatchedLen = 0;
      if (typingNodeIndex < typingPatternNodes.length) {
        typingCurrentCandidate = typingPatternNodes[typingNodeIndex].options[0];
      } else {
        // お題1問クリア！
        handleQuestionComplete();
        return;
      }
    }

    updateTypingDisplay();
  } else {
    // ミスタイプ
    SoundFx.playWrong();
    typingMissCount++;
    typingCurrentCombo = 0;
    const comboEl = document.getElementById('typing-combo-num');
    if (comboEl) comboEl.textContent = '0';
    const comboBadge = document.getElementById('typing-combo-badge');
    if (comboBadge) comboBadge.style.display = 'none';

    if (typingSelectedCourse === 'insane') {
      // 🔥 激激ムズムズ: 1文字ミスで即ゲームオーバー！
      isTypingInputBlocked = true;
      stopQuestionTimer();
      typingInsaneFailed = true;

      const speechEl = document.getElementById('typing-speech-bubble');
      if (speechEl) speechEl.textContent = '⚡ミスタイプ！一発終了！';

      const stageCard = document.getElementById('typing-stage-card');
      if (stageCard) {
        stageCard.classList.add('pop-shake');
        setTimeout(() => stageCard.classList.remove('pop-shake'), 300);
      }

      const fb = document.getElementById('typing-feedback-overlay');
      if (fb) {
        fb.innerHTML = `
          <span class="fb-symbol fb-wrong pop-bounce">
            ⚡<br>
            <small style="font-size:1.1rem;background:#ffffff;padding:0.2rem 0.7rem;border-radius:20px;border:2px solid #dc2626;color:#dc2626;">ミスタイプ！ゲームオーバー！</small>
          </span>
        `;
        fb.classList.add('show');
      }
      setTimeout(() => {
        fb && fb.classList.remove('show');
        finishTypingQuiz();
      }, 1800);
    } else {
      // 通常: ミスエフェクトのみ、次の打鍵を待つ
      const speechEl = document.getElementById('typing-speech-bubble');
      if (speechEl) speechEl.textContent = 'おしい！もういちど！';

      const stageCard = document.getElementById('typing-stage-card');
      if (stageCard) {
        stageCard.classList.add('pop-shake');
        setTimeout(() => stageCard.classList.remove('pop-shake'), 300);
      }
    }
  }
}

function handleQuestionComplete() {
  isTypingInputBlocked = true;
  stopQuestionTimer();
  SoundFx.playCorrect();
  const world = TYPING_WORLDS[typingSelectedWorld];

  const typedEl = document.getElementById('romaji-typed');
  if (typedEl) typedEl.textContent = typingTypedString;

  const nextEl = document.getElementById('romaji-next');
  if (nextEl) nextEl.textContent = '';

  const remainEl = document.getElementById('romaji-remain');
  if (remainEl) remainEl.textContent = '';

  const speechEl = document.getElementById('typing-speech-bubble');
  if (speechEl) speechEl.textContent = world.sounds.success;

  // 激激ムズムズ: クリア問題数をカウント
  if (typingSelectedCourse === 'insane') {
    typingInsaneTotalScore++;
  }

  // ポイントプレビュー（セッション中の暫定）
  let previewPts = 0;
  if (typingSelectedCourse === 'easy') previewPts = 0.1;
  else if (typingSelectedCourse === 'normal') previewPts = 0.3;
  else if (typingSelectedCourse === 'hard') previewPts = 0.7;
  else if (typingSelectedCourse === 'insane') previewPts = 0; // 全問クリア後に確定
  typingSessionPoints += previewPts;
  const pointsEl = document.getElementById('typing-session-points');
  if (pointsEl && typingSelectedCourse !== 'insane') {
    pointsEl.textContent = typingSessionPoints.toFixed(1);
  }

  // 正解エフェクト
  const fb = document.getElementById('typing-feedback-overlay');
  if (fb) {
    fb.innerHTML = `
      <span class="fb-symbol fb-correct pop-bounce">
        ⭕<br>
        <small style="font-size:1.3rem;background:#ffffff;padding:0.2rem 0.7rem;border-radius:20px;border:2px solid #f43f5e;color:#be123c;">${world.sounds.success}</small>
      </span>
    `;
    fb.classList.add('show');
  }

  setTimeout(() => {
    if (fb) fb.classList.remove('show');
    typingCurrentIndex++;
    isTypingInputBlocked = false;
    setupTypingQuestion();
  }, 700);
}

function skipTypingQuestion() {
  SoundFx.playTap();
  stopQuestionTimer();
  typingCurrentIndex++;
  isTypingInputBlocked = false;
  if (typingCurrentIndex < typingQuizList.length) {
    setupTypingQuestion();
  } else {
    finishTypingQuiz();
  }
}

function finishTypingQuiz() {
  stopQuestionTimer();
  const elapsedSec = Math.max(1, (Date.now() - typingStartTime) / 1000);
  const wpm = Math.round((typingTotalKeystrokes / elapsedSec) * 60);
  const accuracy = typingTotalKeystrokes > 0 
    ? Math.max(0, Math.round(((typingTotalKeystrokes - typingMissCount) / typingTotalKeystrokes) * 100))
    : 100;

  // 総合ランク判定
  let rank = 'B';
  if (wpm >= 140 && accuracy >= 94) rank = 'S';
  else if (wpm >= 90 && accuracy >= 88) rank = 'A';
  else if (wpm >= 50) rank = 'B';
  else rank = 'C';

  // 獲得ポイント（難易度コース × 達成ランクの傾斜ポイント設計）
  let basePoints = 0;
  if (typingSelectedCourse === 'insane') {
    // 激激ムズムズ: 全問ノーミスクリアのみ 1.8pt、失敗は0pt
    const totalQ = typingQuizList.length;
    basePoints = (!typingInsaneFailed && typingInsaneTotalScore >= totalQ)
      ? TYPING_POINT_TABLE.insane.CLEAR
      : TYPING_POINT_TABLE.insane.FAIL;
  } else {
    const courseTable = TYPING_POINT_TABLE[typingSelectedCourse] || TYPING_POINT_TABLE.easy;
    basePoints = courseTable[rank] || courseTable['C'] || 0;
  }

  // ポイント通帳への加算処理（上限チェック）
  const acc = (currentAccountId !== null) ? accounts[currentAccountId] : null;
  let actualEarnedPoints = 0;
  let limitNoticeText = '';

  if (acc) {
    checkAndResetLimits(acc);
    const limits = acc.monthlyLimits || getDefaultLimits();
    const monthlyRemain = Math.max(0, limits.maxMonthly - (limits.monthlyEarned || 0));
    const dailyRemain = limits.carryOverUnlocked
      ? monthlyRemain
      : Math.max(0, limits.maxDaily - (limits.todayEarned || 0));

    const availableLimit = Math.min(monthlyRemain, dailyRemain);
    actualEarnedPoints = Math.min(basePoints, availableLimit);
    actualEarnedPoints = Math.round(actualEarnedPoints * 100) / 100;

    if (actualEarnedPoints < basePoints) {
      if (monthlyRemain <= 0) {
        limitNoticeText = `🌟 今月のポイント上限（${limits.maxMonthly}pt）を達成したよ！すごい！来月1日にリセットされるよ！（練習はそのまま続けられるよ）`;
      } else if (dailyRemain <= 0) {
        limitNoticeText = `🌟 今日のポイント目安上限（${limits.maxDaily}pt）を達成したよ！あしたもがんばろう！（練習はそのまま続けられるよ）`;
      } else {
        limitNoticeText = `🌟 上限まであと ${formatPoints(actualEarnedPoints)}pt 獲得しました！（残りの問題も練習できるよ）`;
      }
    }

    if (actualEarnedPoints > 0) {
      acc.points = Math.round(((acc.points || 0) + actualEarnedPoints) * 100) / 100;
      limits.monthlyEarned = Math.round(((limits.monthlyEarned || 0) + actualEarnedPoints) * 100) / 100;
      limits.todayEarned = Math.round(((limits.todayEarned || 0) + actualEarnedPoints) * 100) / 100;

      if (!acc.pointHistory) acc.pointHistory = [];
      const courseName = TYPING_COURSE_NAMES[typingSelectedCourse] || '激ムズ';
      acc.pointHistory.push({
        type: 'earn',
        title: `⌨️ タイピング特訓 (${TYPING_WORLDS[typingSelectedWorld].name} / ${courseName} ランク${rank})`,
        amount: actualEarnedPoints,
        date: Date.now()
      });

      saveAccounts();
      renderAccountScreen();
    }
  }

  // 結果画面UIの反映
  const world = TYPING_WORLDS[typingSelectedWorld];
  document.getElementById('typing-result-rank').textContent = rank;
  document.getElementById('typing-result-wpm').textContent = wpm;
  document.getElementById('typing-result-acc').textContent = accuracy;
  document.getElementById('typing-result-maxcombo').textContent = typingMaxCombo;

  document.getElementById('typing-result-subtitle').textContent = 
    rank === 'S' ? `神技！${world.sounds.finish}` : (rank === 'A' ? `すばらしい！${world.sounds.finish}` : 'ナイスファイト！よくがんばったね！');

  const currentTotalPoints = acc ? (acc.points || 0) : 0;
  const bookEquiv = calcBookEquiv(currentTotalPoints);

  document.getElementById('typing-result-earned-points').textContent = formatPoints(actualEarnedPoints);
  document.getElementById('typing-result-total-points').textContent = formatPoints(currentTotalPoints);
  document.getElementById('typing-result-cash-equiv').textContent = formatPoints(currentTotalPoints);
  document.getElementById('typing-result-book-equiv').textContent = bookEquiv;

  const limitNotice = document.getElementById('typing-result-limit-notice');
  if (limitNotice) {
    if (limitNoticeText) {
      limitNotice.style.display = 'block';
      limitNotice.textContent = limitNoticeText;
    } else {
      limitNotice.style.display = 'none';
    }
  }

  showScreen('screen-typing-result');
  SoundFx.playFanfare();
  if (rank === 'S' || rank === 'A') {
    ConfettiFx.launch(70);
  }
}

// データバックアップ（JSONエクスポート）
function exportDataBackup() {
  const data = {
    version: 10,
    exportedAt: new Date().toISOString(),
    accounts: accounts,
    parentPin: loadParentPin(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `wakuwaku_learning_backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// データ復元（JSONインポート）
function importDataBackup(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || !data.accounts || !Array.isArray(data.accounts)) {
        alert('無効なバックアップファイルです。');
        return;
      }

      if (!confirm('バックアップデータを復元しますか？\n（現在のデータはバックアップ内容に上書きされます）')) {
        event.target.value = '';
        return;
      }

      accounts = data.accounts;
      saveAccounts();
      if (data.parentPin && data.parentPin.length === 4) {
        saveParentPin(data.parentPin);
      }

      alert('バックアップデータを正常に復元しました！');
      renderAccountScreen();
      if (currentAccountId !== null) {
        openWalletScreen(currentAccountId);
      }
    } catch (err) {
      alert('ファイルの読み込み中にエラーが発生しました: ' + err.message);
    }
    event.target.value = '';
  };
  reader.readAsText(file);
}

// 物理キーボード対応（タイピング画面）
window.addEventListener('keydown', (e) => {
  const typingQuizScreen = document.getElementById('screen-typing-quiz');
  if (!typingQuizScreen || !typingQuizScreen.classList.contains('active')) return;

  // 特殊キーの無視（Shift, Ctrl, Alt, etc）
  if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta' || e.key === 'Tab') {
    return;
  }

  if (e.key.length === 1) {
    e.preventDefault();
    handleTypingInput(e.key);
  }
});

// 物理キーボード対応（算数画面でのテンキー入力）
window.addEventListener('keydown', (e) => {
  const mathQuizScreen = document.getElementById('screen-math-quiz');
  if (!mathQuizScreen || !mathQuizScreen.classList.contains('active')) return;

  if (e.key >= '0' && e.key <= '9') {
    handleMathKey(e.key);
  } else if (e.key === '.') {
    handleMathKey('.');
  } else if (e.key === 'Backspace') {
    handleMathBackspace();
  } else if (e.key === 'Escape' || e.key === 'Delete') {
    handleMathClear();
  } else if (e.key === 'Enter') {
    submitMathAnswer();
  }
});

// 物理キーボード対応（PIN入力モーダル）
window.addEventListener('keydown', (e) => {
  const pinModal = document.getElementById('modal-parent-pin');
  if (!pinModal || pinModal.style.display === 'none' || !pinModal.style.display) return;

  if (e.key >= '0' && e.key <= '9') {
    handlePinKey(e.key);
  } else if (e.key === 'Backspace') {
    handlePinBackspace();
  } else if (e.key === 'Escape') {
    closeParentPinModal();
  }
});

// =============================================
//  ✍️ 漢字書き取りドリル モジュール (WritingDrill & WritingCanvas)
// =============================================
let writingQuestions = [];
let writingCurrentIndex = 0;
let writingCorrectCount = 0;
let writingEarnedPoints = 0;
let writingSelectedCount = 5;

// 手書きキャンバス管理オブジェクト
const WritingCanvas = (() => {
  let canvas = null;
  let ctx = null;
  let isDrawing = false;
  let currentTool = 'pencil'; // 'pencil' | 'redpen' | 'eraser'
  let undoStack = [];
  const MAX_UNDO = 20;

  function init() {
    canvas = document.getElementById('writing-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d', { willReadFrequently: true });

    // 解像度（高DPI / Retina）対応
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const size = rect.width > 0 ? rect.width : 320;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    // Pointer Events（Apple Pencil・タッチ・マウス共通）
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointercancel', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);
  }

  function saveState() {
    if (!ctx) return;
    if (undoStack.length >= MAX_UNDO) undoStack.shift();
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  }

  function handlePointerDown(e) {
    e.preventDefault();
    isDrawing = true;
    saveState();

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    applyStrokeStyle(e.pressure);
  }

  function handlePointerMove(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const pos = getPos(e);
    applyStrokeStyle(e.pressure);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function handlePointerUp(e) {
    if (!isDrawing) return;
    e.preventDefault();
    isDrawing = false;
    ctx.closePath();
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function applyStrokeStyle(pressure) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const p = pressure && pressure > 0 ? pressure : 0.6;

    if (currentTool === 'pencil') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 6 + p * 6; // 6〜12px
    } else if (currentTool === 'redpen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 6 + p * 6;
    } else if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 26;
    }
  }

  function setTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.canvas-tool-btn').forEach(btn => btn.classList.remove('active'));
    if (tool === 'pencil') {
      const b = document.getElementById('btn-tool-pencil');
      if (b) b.classList.add('active');
    } else if (tool === 'redpen') {
      const b = document.getElementById('btn-tool-redpen');
      if (b) b.classList.add('active');
    } else if (tool === 'eraser') {
      const b = document.getElementById('btn-tool-eraser');
      if (b) b.classList.add('active');
    }
  }

  function undo() {
    if (!ctx || undoStack.length === 0) return;
    SoundFx.playTap();
    const last = undoStack.pop();
    ctx.putImageData(last, 0, 0);
  }

  function clear() {
    if (!canvas || !ctx) return;
    SoundFx.playTap();
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function reset() {
    undoStack = [];
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setTool('pencil');
  }

  return {
    init,
    setTool,
    undo,
    clear,
    reset
  };
})();

// 出題生成ロジック（現学年70% ＋ 前学年30%）
function generateWritingQuestions(grade, count) {
  const curGrade = Math.min(Math.max(grade || 1, 1), 6);
  const prevGrade = curGrade > 1 ? curGrade - 1 : 1;

  let curCount = count;
  let prevCount = 0;

  if (curGrade > 1) {
    curCount = Math.round(count * 0.7); // 7割
    prevCount = count - curCount;       // 3割
  }

  const curPool = (typeof WRITING_DATA !== 'undefined' && WRITING_DATA[curGrade]) ? WRITING_DATA[curGrade] : [];
  const prevPool = (typeof WRITING_DATA !== 'undefined' && WRITING_DATA[prevGrade]) ? WRITING_DATA[prevGrade] : [];

  const curSelected = shuffle([...curPool]).slice(0, curCount).map(item => ({ ...item, grade: curGrade }));
  const prevSelected = shuffle([...prevPool]).slice(0, prevCount).map(item => ({ ...item, grade: prevGrade }));

  return shuffle([...curSelected, ...prevSelected]);
}

function openWritingStart() {
  SoundFx.playTap();
  const acc = accounts[currentAccountId];
  const grade = acc ? calcGrade(acc.birthYear) : 1;

  const descEl = document.getElementById('writing-ratio-desc');
  if (descEl) {
    if (grade > 1) {
      descEl.innerHTML = `現在の学年（<strong>${grade}年生 70%</strong>） ＋ 前の学年（<strong>${grade - 1}年生 30%</strong>）`;
    } else {
      descEl.innerHTML = `1年生の配当漢字（<strong>100%</strong>）を出題！`;
    }
  }

  showScreen('screen-writing-start');
}

function startWritingQuiz() {
  SoundFx.playTap();
  const acc = accounts[currentAccountId];
  const grade = acc ? calcGrade(acc.birthYear) : 1;

  writingQuestions = generateWritingQuestions(grade, writingSelectedCount);
  if (writingQuestions.length === 0) {
    alert('問題データが見つかりませんでした。');
    return;
  }

  writingCurrentIndex = 0;
  writingCorrectCount = 0;
  writingEarnedPoints = 0;

  showScreen('screen-writing-quiz');
  setTimeout(() => {
    WritingCanvas.init();
    renderWritingQuestion();
  }, 100);
}

function renderWritingQuestion() {
  WritingCanvas.reset();

  const q = writingQuestions[writingCurrentIndex];
  if (!q) return;

  // 上部プログレス
  document.getElementById('writing-quiz-step').textContent = `第 ${writingCurrentIndex + 1} 問 / ${writingQuestions.length} 問`;
  document.getElementById('writing-quiz-grade-tag').textContent = `${q.grade}年生の漢字`;
  const pct = Math.round(((writingCurrentIndex) / writingQuestions.length) * 100);
  document.getElementById('writing-quiz-progress-bar').style.width = `${pct}%`;

  // 問題文（【】部分をハイライト）
  const formattedSentence = q.q.replace(/【(.*?)】/g, '<mark>$1</mark>');
  document.getElementById('writing-question-sentence').innerHTML = formattedSentence;
  document.getElementById('writing-target-reading-text').textContent = q.reading || '';
  document.getElementById('writing-hint-text').textContent = `💡 ヒント：${q.hint || ''}`;
  document.getElementById('writing-stroke-text').textContent = `✏️ 画数：${q.stroke || '―'}画`;

  // 見本オーバーレイ
  document.getElementById('writing-sample-kanji').textContent = q.kanji;
  const overlay = document.getElementById('writing-sample-overlay');
  overlay.style.display = 'none';

  // 答え合わせ前状態
  document.getElementById('btn-writing-check-answer').style.display = 'block';
  document.getElementById('writing-grading-area').style.display = 'none';
  document.getElementById('check-toggle-overlay').checked = true;
}

function checkWritingAnswer() {
  SoundFx.playTap();
  document.getElementById('btn-writing-check-answer').style.display = 'none';
  document.getElementById('writing-grading-area').style.display = 'flex';

  const overlay = document.getElementById('writing-sample-overlay');
  const toggle = document.getElementById('check-toggle-overlay');
  overlay.style.display = toggle.checked ? 'flex' : 'none';
}

function handleWritingGrading(isCorrect) {
  const q = writingQuestions[writingCurrentIndex];
  const acc = accounts[currentAccountId];

  if (isCorrect) {
    SoundFx.playCorrect();
    writingCorrectCount++;
    const pts = 1.0; // 1問 1.0pt
    writingEarnedPoints = Math.round((writingEarnedPoints + pts) * 100) / 100;
  } else {
    SoundFx.playWrong();
    if (acc) {
      if (!acc.weakQuestions) acc.weakQuestions = [];
      const exists = acc.weakQuestions.some(w => w.question === q.q && w.type === 'writing');
      if (!exists) {
        acc.weakQuestions.push({
          type: 'writing',
          question: q.q,
          target: q.kanji,
          reading: q.reading,
          grade: q.grade
        });
        saveAccounts();
      }
    }
  }

  writingCurrentIndex++;
  if (writingCurrentIndex < writingQuestions.length) {
    renderWritingQuestion();
  } else {
    document.getElementById('writing-quiz-progress-bar').style.width = '100%';
    setTimeout(() => showWritingResult(), 300);
  }
}

function skipWritingQuestion() {
  SoundFx.playTap();
  writingCurrentIndex++;
  if (writingCurrentIndex < writingQuestions.length) {
    renderWritingQuestion();
  } else {
    const bar = document.getElementById('writing-quiz-progress-bar');
    if (bar) bar.style.width = '100%';
    setTimeout(() => showWritingResult(), 300);
  }
}

function showWritingResult() {
  const total = writingQuestions.length;
  const pct = Math.round((writingCorrectCount / total) * 100);

  document.getElementById('writing-result-correct').textContent = writingCorrectCount;
  document.getElementById('writing-result-total').textContent = total;
  document.getElementById('writing-result-accuracy').textContent = `正解率 ${pct}%`;

  const acc = accounts[currentAccountId];
  let actualEarned = 0;
  let limitNotice = '';

  if (acc && writingEarnedPoints > 0) {
    checkAndResetLimits(acc);
    const limits = acc.monthlyLimits || getDefaultLimits();

    const monthlyRemain = Math.max(0, limits.maxMonthly - (limits.monthlyEarned || 0));
    const dailyRemain = limits.carryOverUnlocked
      ? monthlyRemain
      : Math.max(0, limits.maxDaily - (limits.todayEarned || 0));

    const availableLimit = Math.min(monthlyRemain, dailyRemain);
    actualEarned = Math.min(writingEarnedPoints, availableLimit);
    actualEarned = Math.round(actualEarned * 100) / 100;

    if (actualEarned < writingEarnedPoints) {
      if (monthlyRemain <= 0) {
        limitNotice = `🌟 今月のポイント上限（${limits.maxMonthly}pt）を達成したよ！すごい！来月1日にリセットされるよ！（練習はそのまま続けられるよ）`;
      } else if (dailyRemain <= 0) {
        limitNotice = `🌟 今日のポイント目安上限（${limits.maxDaily}pt）を達成したよ！あしたもがんばろう！（練習はそのまま続けられるよ）`;
      } else {
        limitNotice = `🌟 上限まであと ${formatPoints(actualEarned)}pt 獲得しました！（残りの問題も練習できるよ）`;
      }
    }

    if (actualEarned > 0) {
      acc.points = Math.round(((acc.points || 0) + actualEarned) * 100) / 100;
      limits.monthlyEarned = Math.round(((limits.monthlyEarned || 0) + actualEarned) * 100) / 100;
      limits.todayEarned = Math.round(((limits.todayEarned || 0) + actualEarned) * 100) / 100;

      if (!acc.pointHistory) acc.pointHistory = [];
      acc.pointHistory.push({
        type: 'earn',
        title: `✍️ 漢字書き取りドリル（${writingCorrectCount}/${total}問せいかい）`,
        amount: actualEarned,
        date: Date.now()
      });

      saveAccounts();
      renderAccountScreen();
    }
  }

  document.getElementById('writing-result-earned-points').textContent = formatPoints(actualEarned);
  const noticeEl = document.getElementById('writing-result-limit-notice');
  if (noticeEl) {
    noticeEl.style.display = limitNotice ? 'block' : 'none';
    noticeEl.textContent = limitNotice;
  }

  // 演出
  if (pct === 100) {
    SoundFx.playFanfare();
    ConfettiFx.launch(80);
    document.getElementById('writing-result-title').textContent = '🌟 満点パーフェクト！';
    document.getElementById('writing-result-subtitle').textContent = 'すごい！かんぺきに漢字が書けたね！';
  } else if (pct >= 70) {
    SoundFx.playFanfare();
    ConfettiFx.launch(40);
    document.getElementById('writing-result-title').textContent = '🎉 よくがんばったね！';
    document.getElementById('writing-result-subtitle').textContent = '手書きでしっかり身についたね！';
  } else {
    document.getElementById('writing-result-title').textContent = '💪 書き取り完了！';
    document.getElementById('writing-result-subtitle').textContent = 'なんども書いておぼえよう！';
  }

  showScreen('screen-writing-result');
}

// =============================================
//  CHARACTER TUTORIAL / GUIDE MODULE (ホウホウ博士)
// =============================================
const CharacterGuide = (() => {
  let currentStep = 0;
  let isSpeaking = false;

  const STEPS = [
    {
      stepTag: 'ステップ 1 / 4',
      title: '🌟 ようこそ！わくわく学習アプリへ！',
      voiceText: 'ようこそ！わくわく学習アプリへ！ぼくはホウホウ博士じゃよ！まずは自分の名前をえらんでスタートしよう！',
      html: `
        <p class="g-lead">ぼくは学習アプリの案内役、<strong>「ホウホウ博士」</strong>じゃよ！🦉✨</p>
        <div class="g-card-item">
          <span class="g-item-icon">👤</span>
          <div class="g-item-text">
            <strong>まずは自分のアカウントをえらぼう！</strong><br>
            カードを押すだけで始められるぞ。右上の歯車ボタン ⚙️ から、<strong>好きな色</strong>や<strong>可愛いアバター写真</strong>に変更できるんじゃ！
          </div>
        </div>
      `
    },
    {
      stepTag: 'ステップ 2 / 4',
      title: '📚 3つの科目にチャレンジ！',
      voiceText: '3つの科目を楽しくマスターしよう！漢字ドリル、算数クエスト、ローマ字タイピングがあるぞ！',
      html: `
        <div class="g-subjects-grid">
          <div class="g-subject-pill kanji">
            <span class="g-pill-icon">🌸</span>
            <div><strong>漢字ドリル</strong><br><small>4択クイズ！満点で花火が上がるぞ！</small></div>
          </div>
          <div class="g-subject-pill math">
            <span class="g-pill-icon">🔢</span>
            <div><strong>算数クエスト</strong><br><small>ノートで計算してテンキー入力！</small></div>
          </div>
          <div class="g-subject-pill typing">
            <span class="g-pill-icon">⌨️</span>
            <div><strong>ローマ字タイピング</strong><br><small>指ガイド付き特訓！「激ムズ」で高得点！</small></div>
          </div>
        </div>
      `
    },
    {
      stepTag: 'ステップ 3 / 4',
      title: '🪙 ポイントをためてご褒美をゲット！',
      voiceText: '正解するとポイントが貯まるぞ！ポイント通帳でほしい本を登録したり、お小遣いや本に交換できるんじゃ！',
      html: `
        <div class="g-card-item">
          <span class="g-item-icon">💰</span>
          <div class="g-item-text">
            <strong>ポイント通帳を見てみよう！</strong><br>
            正解するとポイントがどんどん貯まるぞ！お小遣いに交換したり、<strong>バリューブックス為替ボーナス</strong>で欲しい本を買ってもらおう！
          </div>
        </div>
        <div class="g-card-item">
          <span class="g-item-icon">📖</span>
          <div class="g-item-text">
            <strong>「ほしい本」を登録できる！</strong><br>
            目標の本を登録すると、達成まであと何ポイントかプログレスバーで見えるんじゃ！
          </div>
        </div>
      `
    },
    {
      stepTag: 'ステップ 4 / 4',
      title: '🔥 まちがえても大丈夫！にがて克服！',
      voiceText: '間違えた問題は自動で覚えてくれるぞ！苦手特訓で復習して、キラキラ花火でお祝いしよう！',
      html: `
        <div class="g-card-item">
          <span class="g-item-icon">💡</span>
          <div class="g-item-text">
            <strong>にがてな問題を自動でおぼえるよ！</strong><br>
            まちがえた問題は「にがて」として重点的に出題されるぞ。
          </div>
        </div>
        <div class="g-card-item">
          <span class="g-item-icon">🎉</span>
          <div class="g-item-text">
            <strong>「にがて特訓」で克服！</strong><br>
            リベンジして正解すると「💮 こくふく！」達成！ボーナスポイントとキラキラ星花火が上がるぞ！毎日楽しく学ぼう！
          </div>
        </div>
      `
    }
  ];

  function open() {
    SoundFx.playTap();
    currentStep = 0;
    renderStep();
    const modal = document.getElementById('modal-character-guide');
    if (modal) modal.style.display = 'flex';
  }

  function close() {
    stopVoice();
    SoundFx.playTap();
    const modal = document.getElementById('modal-character-guide');
    if (modal) modal.style.display = 'none';
  }

  function renderStep() {
    stopVoice();
    const step = STEPS[currentStep];
    if (!step) return;

    document.getElementById('guide-step-tag').textContent = step.stepTag;
    document.getElementById('guide-title').textContent = step.title;
    document.getElementById('guide-text-body').innerHTML = step.html;

    // ドット
    document.querySelectorAll('.g-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentStep);
    });

    // まえへボタン
    const prevBtn = document.getElementById('btn-guide-prev');
    if (prevBtn) prevBtn.style.display = currentStep > 0 ? 'inline-block' : 'none';

    // つぎへ / 完了ボタン
    const nextBtn = document.getElementById('btn-guide-next');
    if (nextBtn) {
      if (currentStep === STEPS.length - 1) {
        nextBtn.innerHTML = '🌟 わかった！（はじめる）';
      } else {
        nextBtn.innerHTML = 'つぎへ ▶';
      }
    }
  }

  function next() {
    SoundFx.playTap();
    if (currentStep < STEPS.length - 1) {
      currentStep++;
      renderStep();
    } else {
      ConfettiFx.launch(50);
      close();
    }
  }

  function prev() {
    SoundFx.playTap();
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  }

  function goToStep(idx) {
    if (idx >= 0 && idx < STEPS.length) {
      SoundFx.playTap();
      currentStep = idx;
      renderStep();
    }
  }

  function toggleVoice() {
    if (isSpeaking) {
      stopVoice();
    } else {
      playVoice();
    }
  }

  function playVoice() {
    if (!('speechSynthesis' in window)) {
      alert('お使いの端末は音声読み上げに対応していません。');
      return;
    }
    const step = STEPS[currentStep];
    if (!step) return;

    window.speechSynthesis.cancel();
    const uttr = new SpeechSynthesisUtterance(step.voiceText);
    uttr.lang = 'ja-JP';
    uttr.pitch = 1.25;
    uttr.rate = 0.95;

    const voiceBtn = document.getElementById('btn-guide-voice');
    const voiceText = document.getElementById('guide-voice-text');

    uttr.onstart = () => {
      isSpeaking = true;
      if (voiceBtn) voiceBtn.classList.add('speaking');
      if (voiceText) voiceText.textContent = 'ていし';
    };

    uttr.onend = uttr.onerror = () => {
      isSpeaking = false;
      if (voiceBtn) voiceBtn.classList.remove('speaking');
      if (voiceText) voiceText.textContent = 'こえできく';
    };

    window.speechSynthesis.speak(uttr);
  }

  function stopVoice() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isSpeaking = false;
    const voiceBtn = document.getElementById('btn-guide-voice');
    const voiceText = document.getElementById('guide-voice-text');
    if (voiceBtn) voiceBtn.classList.remove('speaking');
    if (voiceText) voiceText.textContent = 'こえできく';
  }

  return {
    open,
    close,
    next,
    prev,
    goToStep,
    toggleVoice,
  };
})();

// =============================================
//  INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  ConfettiFx.init();
  SoundFx.updateSoundButton();
  const soundToggleBtn = document.getElementById('btn-sound-toggle');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => SoundFx.toggleMute());
  }

  // PWA Service Worker 登録 (iPad / オフライン対応)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  fetchFxRate();
  renderAccountScreen();

  // キャラクターガイドイベント
  const guideOpenAccBtn = document.getElementById('btn-open-guide-account');
  if (guideOpenAccBtn) guideOpenAccBtn.addEventListener('click', () => CharacterGuide.open());

  const guideOpenPortalBtn = document.getElementById('btn-open-guide-portal');
  if (guideOpenPortalBtn) guideOpenPortalBtn.addEventListener('click', () => CharacterGuide.open());

  const guideCloseBtn = document.getElementById('btn-guide-close');
  if (guideCloseBtn) guideCloseBtn.addEventListener('click', () => CharacterGuide.close());

  const guideNextBtn = document.getElementById('btn-guide-next');
  if (guideNextBtn) guideNextBtn.addEventListener('click', () => CharacterGuide.next());

  const guidePrevBtn = document.getElementById('btn-guide-prev');
  if (guidePrevBtn) guidePrevBtn.addEventListener('click', () => CharacterGuide.prev());

  const guideVoiceBtn = document.getElementById('btn-guide-voice');
  if (guideVoiceBtn) guideVoiceBtn.addEventListener('click', () => CharacterGuide.toggleVoice());

  document.querySelectorAll('.g-dot').forEach((dot, idx) => {
    dot.addEventListener('click', () => CharacterGuide.goToStep(idx));
  });

  // 設定画面イベント
  document.getElementById('settings-name').addEventListener('input', updateGradePreview);
  document.getElementById('settings-birthyear').addEventListener('input', updateGradePreview);
  document.getElementById('btn-settings-save').addEventListener('click', saveSettings);
  document.getElementById('btn-settings-delete').addEventListener('click', () => {
    const acc = accounts[settingsAccountId];
    const nameEl = document.getElementById('confirm-delete-name');
    nameEl.textContent = acc && acc.name ? acc.name : 'このアカウント';
    const modal = document.getElementById('modal-confirm-delete');
    modal.style.display = 'flex';
    document.getElementById('btn-confirm-delete-no').focus();
  });

  // 削除確認モーダル — はい
  document.getElementById('btn-confirm-delete-yes').addEventListener('click', () => {
    document.getElementById('modal-confirm-delete').style.display = 'none';
    deleteAccount(settingsAccountId);
  });

  // 削除確認モーダル — やめる（ボタン or 暗幕クリック）
  document.getElementById('btn-confirm-delete-no').addEventListener('click', () => {
    document.getElementById('modal-confirm-delete').style.display = 'none';
  });
  document.getElementById('modal-confirm-delete').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('modal-confirm-delete').style.display = 'none';
    }
  });

  document.getElementById('btn-settings-reset-weak').addEventListener('click', () => {
    resetWeakHistory(settingsAccountId);
  });
  document.getElementById('btn-settings-back').addEventListener('click', () => {
    showScreen('screen-account');
  });

  // ===== カラーパレット =====
  document.querySelectorAll('#color-palette .color-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      settingsThemeColor = btn.dataset.color;
      document.querySelectorAll('#color-palette .color-swatch').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      refreshSettingsAvatarPreview();
    });
  });

  // ===== 絵文字グリッド =====
  document.querySelectorAll('#avatar-emoji-grid .avatar-emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      settingsAvatarEmoji = btn.dataset.emoji;
      settingsAvatarPhoto = null; // 写真をクリア
      document.querySelectorAll('#avatar-emoji-grid .avatar-emoji-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      document.getElementById('btn-avatar-photo-clear').style.display = 'none';
      refreshSettingsAvatarPreview();
    });
  });

  // ===== 写真ファイル選択（Canvas で 200x200 圧縮） =====
  document.getElementById('input-avatar-photo').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        // 正方形に crop (中央)
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 200, 200);
        settingsAvatarPhoto = canvas.toDataURL('image/jpeg', 0.8);
        settingsAvatarEmoji = null; // 絵文字をクリア
        // 絵文字グリッドの選択解除
        document.querySelectorAll('#avatar-emoji-grid .avatar-emoji-btn').forEach(b => b.classList.remove('selected'));
        document.getElementById('btn-avatar-photo-clear').style.display = '';
        refreshSettingsAvatarPreview();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    // input をリセット（同じファイルを再選択できるように）
    e.target.value = '';
  });

  // ===== 写真削除ボタン =====
  document.getElementById('btn-avatar-photo-clear').addEventListener('click', () => {
    settingsAvatarPhoto = null;
    document.getElementById('btn-avatar-photo-clear').style.display = 'none';
    refreshSettingsAvatarPreview();
  });

  // 漢字出題数選択ボタン
  document.querySelectorAll('.mode-btn:not(.math-mode-btn):not(.typing-course-btn)').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn:not(.math-mode-btn):not(.typing-course-btn)').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.dataset.count;
      selectedCount = val === 'all' ? currentQuizData.length : parseInt(val);
    });
  });

  // ポータル画面イベント
  document.getElementById('btn-portal-change-account').addEventListener('click', () => {
    renderAccountScreen();
    showScreen('screen-account');
  });
  document.getElementById('btn-portal-open-wallet').addEventListener('click', () => {
    openWalletScreen(currentAccountId);
  });
  document.getElementById('btn-portal-kanji').addEventListener('click', openKanjiDrill);
  document.getElementById('card-subject-kanji').addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    openKanjiDrill();
  });
  document.getElementById('btn-portal-math').addEventListener('click', openMathStart);
  document.getElementById('card-subject-math').addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    openMathStart();
  });
  document.getElementById('btn-portal-typing').addEventListener('click', openTypingStart);
  document.getElementById('card-subject-typing').addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    openTypingStart();
  });

  // ✍️ 漢字書き取りポータルカード
  const portalWritingBtn = document.getElementById('btn-portal-writing');
  if (portalWritingBtn) portalWritingBtn.addEventListener('click', openWritingStart);
  const cardWriting = document.getElementById('card-subject-writing');
  if (cardWriting) cardWriting.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    openWritingStart();
  });

  // ✍️ 漢字書き取りスタート画面
  const writingStartBack = document.getElementById('btn-writing-start-back');
  if (writingStartBack) writingStartBack.addEventListener('click', renderPortalScreen);

  const writingStartGo = document.getElementById('btn-writing-start-go');
  if (writingStartGo) writingStartGo.addEventListener('click', startWritingQuiz);

  // 問題数セレクター
  document.querySelectorAll('.writing-count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.writing-count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      writingSelectedCount = parseInt(btn.dataset.count) || 5;
    });
  });

  // ✍️ 漢字書き取りクイズ画面
  const writingQuizQuit = document.getElementById('btn-writing-quiz-quit');
  if (writingQuizQuit) writingQuizQuit.addEventListener('click', renderPortalScreen);

  const writingSkipBtn = document.getElementById('btn-writing-skip');
  if (writingSkipBtn) writingSkipBtn.addEventListener('click', skipWritingQuestion);

  // キャンバスツールボタン
  const toolPencil = document.getElementById('btn-tool-pencil');
  if (toolPencil) toolPencil.addEventListener('click', () => WritingCanvas.setTool('pencil'));

  const toolRedPen = document.getElementById('btn-tool-redpen');
  if (toolRedPen) toolRedPen.addEventListener('click', () => WritingCanvas.setTool('redpen'));

  const toolEraser = document.getElementById('btn-tool-eraser');
  if (toolEraser) toolEraser.addEventListener('click', () => WritingCanvas.setTool('eraser'));

  const toolUndo = document.getElementById('btn-tool-undo');
  if (toolUndo) toolUndo.addEventListener('click', () => WritingCanvas.undo());

  const toolClear = document.getElementById('btn-tool-clear');
  if (toolClear) toolClear.addEventListener('click', () => WritingCanvas.clear());

  // 答え合わせ ＆ 採点
  const btnCheckAnswer = document.getElementById('btn-writing-check-answer');
  if (btnCheckAnswer) btnCheckAnswer.addEventListener('click', checkWritingAnswer);

  const toggleOverlay = document.getElementById('check-toggle-overlay');
  if (toggleOverlay) {
    toggleOverlay.addEventListener('change', (e) => {
      const overlay = document.getElementById('writing-sample-overlay');
      if (overlay) overlay.style.display = e.target.checked ? 'flex' : 'none';
    });
  }

  const btnGradeCorrect = document.getElementById('btn-grade-correct');
  if (btnGradeCorrect) btnGradeCorrect.addEventListener('click', () => handleWritingGrading(true));

  const btnGradeRetry = document.getElementById('btn-grade-retry');
  if (btnGradeRetry) btnGradeRetry.addEventListener('click', () => handleWritingGrading(false));

  // ✍️ 漢字書き取り結果画面
  const btnWritingRetry = document.getElementById('btn-writing-result-retry');
  if (btnWritingRetry) btnWritingRetry.addEventListener('click', startWritingQuiz);

  const btnWritingHome = document.getElementById('btn-writing-result-home');
  if (btnWritingHome) btnWritingHome.addEventListener('click', renderPortalScreen);

  // 漢字クイズ画面イベント
  const btnQuizSkip = document.getElementById('btn-quiz-skip');
  if (btnQuizSkip) btnQuizSkip.addEventListener('click', skipQuizQuestion);

  // 漢字スタート画面の戻るボタン（ポータルへ）
  document.getElementById('btn-start-back-portal').addEventListener('click', renderPortalScreen);
  document.getElementById('btn-start').addEventListener('click', () => startQuiz(false));
  document.getElementById('btn-start-weak').addEventListener('click', () => startQuiz(true));
  document.getElementById('btn-open-wallet-start').addEventListener('click', () => {
    openWalletScreen(currentAccountId);
  });
  document.getElementById('btn-open-wallet-result').addEventListener('click', () => {
    openWalletScreen(currentAccountId);
  });

  // 算数クエスト画面イベント
  document.getElementById('btn-math-back-portal').addEventListener('click', renderPortalScreen);
  document.getElementById('btn-math-quit').addEventListener('click', renderPortalScreen);
  document.getElementById('btn-math-home').addEventListener('click', renderPortalScreen);
  document.getElementById('btn-math-retry').addEventListener('click', startMathQuiz);
  document.getElementById('btn-math-start-run').addEventListener('click', startMathQuiz);
  const btnMathSkip = document.getElementById('btn-math-skip');
  if (btnMathSkip) btnMathSkip.addEventListener('click', skipMathQuestion);
  document.getElementById('btn-open-wallet-math').addEventListener('click', () => {
    openWalletScreen(currentAccountId);
  });
  document.getElementById('btn-open-wallet-math-result').addEventListener('click', () => {
    openWalletScreen(currentAccountId);
  });

  // 算数問題数セレクター
  document.querySelectorAll('.math-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.math-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mathSelectedCount = parseInt(btn.dataset.count) || 10;
    });
  });

  // 算数テンキーボタン
  document.querySelectorAll('.math-key-btn[data-key]').forEach(btn => {
    btn.addEventListener('click', () => handleMathKey(btn.dataset.key));
  });
  document.getElementById('btn-math-back').addEventListener('click', handleMathBackspace);
  document.getElementById('btn-math-ac').addEventListener('click', handleMathClear);
  document.getElementById('btn-math-enter').addEventListener('click', submitMathAnswer);

  // ⌨️ タイピング画面イベント
  document.getElementById('btn-typing-back-portal').addEventListener('click', renderPortalScreen);
  document.getElementById('btn-typing-quit').addEventListener('click', renderPortalScreen);
  document.getElementById('btn-typing-home').addEventListener('click', renderPortalScreen);
  document.getElementById('btn-typing-retry').addEventListener('click', startTypingGame);
  document.getElementById('btn-typing-start-run').addEventListener('click', startTypingGame);
  const btnTypingSkip = document.getElementById('btn-typing-skip');
  if (btnTypingSkip) btnTypingSkip.addEventListener('click', skipTypingQuestion);
  document.getElementById('btn-open-wallet-typing').addEventListener('click', () => {
    openWalletScreen(currentAccountId);
  });
  document.getElementById('btn-open-wallet-typing-result').addEventListener('click', () => {
    openWalletScreen(currentAccountId);
  });

  // タイピングワールド選択タブ
  document.querySelectorAll('.world-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTypingWorld(btn.dataset.world);
    });
  });

  // タイピング難易度選択
  document.querySelectorAll('.typing-course-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.typing-course-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      typingSelectedCourse = btn.dataset.course || 'easy';

      // insane 警告表示
      const insaneWarn = document.getElementById('insane-warning');
      if (insaneWarn) {
        insaneWarn.style.display = typingSelectedCourse === 'insane' ? 'block' : 'none';
      }
    });
  });

  // タイピング指ガイド表示トグル
  const guideToggle = document.getElementById('toggle-finger-guide');
  if (guideToggle) {
    guideToggle.addEventListener('change', (e) => {
      typingShowFingerGuide = e.target.checked;
    });
  }

  // 画面キーボードのタッチ・クリック入力
  document.querySelectorAll('.kb-key[data-char]').forEach(btn => {
    btn.addEventListener('click', () => {
      handleTypingInput(btn.dataset.char);
    });
  });

  // 通帳画面
  document.getElementById('btn-wallet-back').addEventListener('click', () => {
    if (currentAccountId !== null) {
      renderPortalScreen();
    } else {
      showScreen('screen-account');
    }
  });

  // ウィッシュリストイベント
  document.getElementById('btn-toggle-add-wishlist').addEventListener('click', () => toggleWishlistForm());
  document.getElementById('btn-save-wishlist-item').addEventListener('click', saveWishlistItem);
  document.getElementById('btn-cancel-wishlist-item').addEventListener('click', () => toggleWishlistForm(false));

  // PIN入力モーダル イベント
  document.querySelectorAll('.pin-key-btn[data-key]').forEach(btn => {
    btn.addEventListener('click', () => {
      handlePinKey(btn.dataset.key);
    });
  });
  document.getElementById('btn-pin-back').addEventListener('click', handlePinBackspace);
  document.getElementById('btn-pin-cancel').addEventListener('click', closeParentPinModal);

  // 通帳画面アクション
  document.getElementById('btn-exchange-books').addEventListener('click', exchangeToBooks);
  document.getElementById('btn-claim-cash').addEventListener('click', claimCash);
  document.getElementById('btn-parent-toggle').addEventListener('click', toggleParentPanel);
  document.getElementById('btn-parent-settle-cash').addEventListener('click', parentSettleCash);
  document.getElementById('btn-parent-settle-book').addEventListener('click', parentSettleBook);
  document.getElementById('btn-parent-add-points').addEventListener('click', parentAddPoints);
  document.getElementById('btn-save-point-config').addEventListener('click', savePointConfig);
  document.getElementById('btn-change-pin').addEventListener('click', changeParentPin);

  // バックアップ・復元イベント
  const btnExport = document.getElementById('btn-export-backup');
  if (btnExport) {
    btnExport.addEventListener('click', exportDataBackup);
  }
  const inputImport = document.getElementById('input-import-backup');
  if (inputImport) {
    inputImport.addEventListener('change', importDataBackup);
  }

  document.getElementById('btn-change-account').addEventListener('click', () => {
    renderAccountScreen();
    showScreen('screen-account');
  });
  document.getElementById('btn-quit').addEventListener('click', () => {
    updateStartScreenWeakBanner();
    if (currentAccountId !== null) {
      renderPortalScreen();
    } else {
      showScreen('screen-account');
    }
  });
  document.getElementById('btn-retry').addEventListener('click', () => startQuiz(isWeakTrainingMode));
  document.getElementById('btn-home').addEventListener('click', () => {
    if (currentAccountId !== null) {
      renderPortalScreen();
    } else {
      renderAccountScreen();
      showScreen('screen-account');
    }
  });
});

