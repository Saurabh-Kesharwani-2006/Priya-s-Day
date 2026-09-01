/**
 * ==========================================================================
 * LUXURY BIRTHDAY SCRAPBOOK INTERACTIVE ENGINE
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initGentleReminder();
  initAmbientCanvas();
  initPinGate();
  initParallaxAndTilt();
  initScrollReveal();
  initScrollytelling();
  initDancingCouple();
  initSpecialMemories();
  initLiveConversationScroll();
  initComplimentNotes();
  initMemoryModal();
  initCakeCandles();
  initEnvelopes();
  initMusicEngine();
  initConstellation();
  initKeepsakeModal();
});

/* ==========================================================================
   0. GENTLE REMINDER SCREEN & MODAL ENGINE
   ========================================================================== */
function initGentleReminder() {
  const reminderScreen = document.getElementById('gentle-reminder-screen');
  const continueBtn = document.getElementById('reminder-continue-btn');
  const vaultContainer = document.getElementById('vault-container');
  const backToReminderBtn = document.getElementById('back-to-reminder-btn');
  const hiddenInput = document.getElementById('hidden-pin-input');

  if (reminderScreen && continueBtn && vaultContainer) {
    continueBtn.addEventListener('click', () => {
      playSweetChime(587.33); // D5 sweet bell
      reminderScreen.classList.add('leaving');

      setTimeout(() => {
        reminderScreen.style.display = 'none';
        vaultContainer.style.display = 'block';
        if (hiddenInput) {
          hiddenInput.focus();
        }
      }, 450);
    });

    if (backToReminderBtn) {
      backToReminderBtn.addEventListener('click', () => {
        playSweetChime(440);
        vaultContainer.style.display = 'none';
        reminderScreen.style.display = 'block';
        reminderScreen.classList.remove('leaving');
      });
    }
  }

  // Modal handler for storybook (main.html)
  const navReminderBtn = document.getElementById('nav-reminder-btn');
  const reminderModal = document.getElementById('reminder-modal');
  const reminderModalBackdrop = document.getElementById('reminder-modal-backdrop');
  const reminderModalCloseBtn = document.getElementById('reminder-modal-close-btn');

  function openReminderModal() {
    if (reminderModal) {
      playSweetChime(523.25);
      reminderModal.classList.add('active');
      reminderModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeReminderModal() {
    if (reminderModal) {
      reminderModal.classList.remove('active');
      reminderModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (navReminderBtn) {
    navReminderBtn.addEventListener('click', openReminderModal);
  }
  if (reminderModalCloseBtn) {
    reminderModalCloseBtn.addEventListener('click', closeReminderModal);
  }
  if (reminderModalBackdrop) {
    reminderModalBackdrop.addEventListener('click', closeReminderModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reminderModal && reminderModal.classList.contains('active')) {
      closeReminderModal();
    }
  });
}

/* ==========================================================================
   1. AMBIENT PARTICLES (FAIRY LIGHTS & DRIFTING ROSE PETALS)
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(35, Math.floor(width / 35));

  for (let i = 0; i < particleCount; i++) {
    const colorOptions = [
      'rgba(255, 215, 120,', // Luminous gold
      'rgba(255, 180, 200,', // Soft blush rose
      'rgba(230, 90, 120,',  // Romantic deep rose
      'rgba(255, 240, 210,', // Warm champagne
    ];

    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.4 + 0.8,
      dx: (Math.random() - 0.5) * 0.4,
      dy: -Math.random() * 0.5 - 0.2,
      alpha: Math.random() * 0.6 + 0.25,
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
      pulse: Math.random() * 0.02 + 0.01,
      sway: Math.random() * 2,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.dx + Math.sin(p.sway) * 0.3;
      p.y += p.dy;
      p.sway += 0.02;
      p.alpha += Math.sin(p.sway) * p.pulse;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const safeAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${safeAlpha})`;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color.includes('215, 120') ? '#ffd56b' : '#ff758c';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. PIN GATE ENGINE (TACTILE KEYPAD & EXACT 0209 MULTIVERSE BLOOM)
   ========================================================================== */
function initPinGate() {
  const digitBoxes = Array.from(document.querySelectorAll('.digit-box'));
  const pinMessage = document.getElementById('pin-message');
  const unlockBtn = document.getElementById('vault-unlock-btn');
  const hintToggle = document.getElementById('hint-toggle');
  const hintBubble = document.getElementById('hint-bubble');
  const hiddenInput = document.getElementById('hidden-pin-input');
  const keyBtns = document.querySelectorAll('.key-btn');
  const vaultCard = document.getElementById('vault-card');

  if (!digitBoxes.length) return;

  let enteredDigits = [];
  const TARGET_PIN = '0209'; // September 2nd

  function updateDisplay() {
    digitBoxes.forEach((box, i) => {
      box.textContent = enteredDigits[i] !== undefined ? enteredDigits[i] : '';
      box.classList.toggle('filled', enteredDigits[i] !== undefined);
      box.classList.toggle('active', i === enteredDigits.length);
      box.classList.remove('error', 'success');
    });

    if (hiddenInput) {
      hiddenInput.value = enteredDigits.join('');
    }
  }

  function handleUnlockSuccess() {
    digitBoxes.forEach((b) => b.classList.add('success'));
    if (pinMessage) {
      pinMessage.textContent = 'you remembered... opening the multiverse ♡';
      pinMessage.className = 'pin-message success';
    }

    if (vaultCard) {
      vaultCard.style.transform = 'scale(1.03)';
      vaultCard.style.boxShadow = '0 30px 90px rgba(224, 169, 109, 0.45)';
    }

    // Trigger Multiverse Warp & Cosmic Bloom Dimension Portal
    triggerMultiverseBloomWarp();
  }

  function handleUnlockError() {
    digitBoxes.forEach((b) => b.classList.add('error'));
    if (pinMessage) {
      pinMessage.textContent = "hmm... that's not your special date, try 02.09 ♡";
      pinMessage.className = 'pin-message error';
    }

    // Play subtle soft thud
    playSweetChime(220);

    setTimeout(() => {
      enteredDigits = [];
      updateDisplay();
    }, 650);
  }

  function checkPin() {
    const code = enteredDigits.join('');
    if (code.length < 4) {
      if (pinMessage) pinMessage.textContent = 'Please enter all 4 digits (MMDD) ♡';
      return;
    }

    if (code === TARGET_PIN) {
      handleUnlockSuccess();
    } else {
      handleUnlockError();
    }
  }

  function pushDigit(d) {
    if (enteredDigits.length < 4) {
      enteredDigits.push(d);
      updateDisplay();
      playSweetChime(440 + enteredDigits.length * 60);

      if (enteredDigits.length === 4) {
        setTimeout(checkPin, 150);
      }
    }
  }

  function popDigit() {
    if (enteredDigits.length > 0) {
      enteredDigits.pop();
      updateDisplay();
      playSweetChime(350);
    }
  }

  function clearAll() {
    enteredDigits = [];
    updateDisplay();
    if (pinMessage) pinMessage.textContent = '';
  }

  // Keypad button clicks
  keyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-key');
      if (key === 'clear') {
        clearAll();
      } else if (key === 'backspace') {
        popDigit();
      } else if (/^[0-9]$/.test(key)) {
        pushDigit(key);
      }
    });
  });

  // Physical keyboard typing
  document.addEventListener('keydown', (e) => {
    if (!digitBoxes.length) return;

    if (/^[0-9]$/.test(e.key)) {
      pushDigit(e.key);
    } else if (e.key === 'Backspace') {
      popDigit();
    } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
      clearAll();
    } else if (e.key === 'Enter') {
      checkPin();
    }
  });

  // Clicking digit boxes focuses input & keeps keyboard active
  digitBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      if (hiddenInput) hiddenInput.focus();
    });
  });

  if (unlockBtn) {
    unlockBtn.addEventListener('click', checkPin);
  }

  if (hintToggle && hintBubble) {
    hintToggle.addEventListener('click', () => {
      hintBubble.classList.toggle('show');
    });
  }

  updateDisplay();
}

/* ==========================================================================
   DREAMY ROMANTIC HEART BLOOM & CELESTIAL TRANSITION ENGINE
   ========================================================================== */
function triggerMultiverseBloomWarp() {
  const canvas = document.getElementById('multiverse-canvas');
  const overlay = document.getElementById('bloom-overlay');

  if (overlay) overlay.classList.add('active');
  if (canvas) canvas.classList.add('active');

  // Flag autoplay so main.html starts the song smoothly
  sessionStorage.setItem('birthdaySongAutoplay', 'true');

  // Synthesize Warm Romantic Celesta Chimes & Heartbeat Pulse
  playRomanticLoveChimes();

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Rose Petals & Golden Stardust Particles
    const petals = [];
    const petalColors = [
      { r: 255, g: 143, b: 171 }, // soft rose
      { r: 255, g: 194, b: 209 }, // blush pink
      { r: 255, g: 105, b: 145 }, // vibrant rose
      { r: 220, g: 47, b: 85 },   // crimson velvet
      { r: 255, g: 215, b: 130 }, // champagne gold
    ];

    for (let i = 0; i < 45; i++) {
      petals.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.8 - h * 0.2,
        size: Math.random() * 12 + 8,
        speedY: Math.random() * 1.8 + 1.2,
        speedX: Math.random() * 1.2 - 0.6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 3,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.03 + 0.015,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    // Twinkling Stardust Sparks
    const sparks = [];
    for (let i = 0; i < 60; i++) {
      sparks.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2.5 + 0.8,
        alpha: Math.random() * 0.8 + 0.2,
        alphaSpeed: Math.random() * 0.04 + 0.02,
        dy: -Math.random() * 0.8 - 0.3,
        dx: (Math.random() - 0.5) * 0.6,
        color: Math.random() > 0.3 ? '#ffd56b' : '#ffffff',
      });
    }

    // Floating Rising Mini Love Hearts
    const risingHearts = [];
    for (let i = 0; i < 18; i++) {
      risingHearts.push({
        x: Math.random() * w,
        y: h + Math.random() * 100,
        size: Math.random() * 18 + 12,
        speedY: Math.random() * 1.4 + 0.8,
        sway: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.6 + 0.3,
        symbol: ['♡', '♥', '✨', '💖', '🌸'][Math.floor(Math.random() * 5)],
      });
    }

    let animationRunning = true;

    function renderRomanticBloom() {
      if (!animationRunning) return;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Twinkling Stardust
      sparks.forEach((s) => {
        s.y += s.dy;
        s.x += s.dx;
        s.alpha += Math.sin(Date.now() * 0.005) * s.alphaSpeed;

        if (s.y < -10) s.y = h + 10;
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;

        const safeAlpha = Math.max(0.15, Math.min(0.95, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = safeAlpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 2. Draw Rising Romantic Hearts
      risingHearts.forEach((rh) => {
        rh.y -= rh.speedY;
        rh.sway += 0.025;
        const currentX = rh.x + Math.sin(rh.sway) * 20;

        if (rh.y < -30) {
          rh.y = h + 20;
          rh.x = Math.random() * w;
        }

        ctx.font = `${rh.size}px serif`;
        ctx.fillStyle = `rgba(255, 215, 230, ${rh.alpha})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff5c8a';
        ctx.fillText(rh.symbol, currentX, rh.y);
      });

      // 3. Draw Swirling Rose Petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.swayAngle += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayAngle) * 1.5;
        p.rotation += p.rotSpeed;

        if (p.y > h + 30) {
          p.y = -20;
          p.x = Math.random() * w;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.6)`;
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(renderRomanticBloom);
    }

    renderRomanticBloom();
  }

  // Smooth cinematic romantic transition to main story
  setTimeout(() => {
    window.location.href = 'main.html?autoplay=true';
  }, 3400);
}

/* Synthesizes warm romantic music-box celesta arpeggios & heartbeat bass */
function playRomanticLoveChimes() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') ctx.resume();

    // 1. Gentle double heartbeat pulse (lub-dub)
    [0, 0.16].forEach((timeOffset) => {
      const heartOsc = ctx.createOscillator();
      const heartGain = ctx.createGain();
      heartOsc.type = 'sine';
      heartOsc.frequency.setValueAtTime(65, ctx.currentTime + timeOffset);
      heartOsc.frequency.exponentialRampToValueAtTime(38, ctx.currentTime + timeOffset + 0.18);

      heartGain.gain.setValueAtTime(0.001, ctx.currentTime + timeOffset);
      heartGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + timeOffset + 0.03);
      heartGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.22);

      heartOsc.connect(heartGain);
      heartGain.connect(ctx.destination);
      heartOsc.start(ctx.currentTime + timeOffset);
      heartOsc.stop(ctx.currentTime + timeOffset + 0.25);
    });

    // 2. Dreamy romantic celesta / music box chime melody
    const melody = [
      { freq: 523.25, time: 0.2 },  // C5
      { freq: 659.25, time: 0.4 },  // E5
      { freq: 783.99, time: 0.6 },  // G5
      { freq: 987.77, time: 0.8 },  // B5
      { freq: 1046.5, time: 1.05 }, // C6
      { freq: 1318.5, time: 1.35 }, // E6
      { freq: 1567.9, time: 1.65 }, // G6
    ];

    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime + note.time);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + note.time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + note.time + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + note.time);
      osc.stop(ctx.currentTime + note.time + 0.9);
    });
  } catch (e) {
    // Graceful fallback
  }
}

/* ==========================================================================
   3. PARALLAX & 3D POLAROID TILT
   ========================================================================== */
function initParallaxAndTilt() {
  const polaroids = document.querySelectorAll('.cover-polaroid, #gate-polaroid');

  window.addEventListener('pointermove', (e) => {
    const xPct = (e.clientX / window.innerWidth) * 100;
    const yPct = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--pointer-x', `${xPct}%`);
    document.documentElement.style.setProperty('--pointer-y', `${yPct}%`);

    polaroids.forEach((card) => {
      const tiltX = (e.clientY / window.innerHeight - 0.5) * -12;
      const tiltY = (e.clientX / window.innerWidth - 0.5) * 14;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
  });

  window.addEventListener('pointerleave', () => {
    polaroids.forEach((card) => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   4. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '120px 0px 120px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // Safety fallback: ensure all panels are visible after short delay
  setTimeout(() => {
    reveals.forEach((el) => el.classList.add('visible'));
  }, 1200);
}

/* ==========================================================================
   4B. SCROLLYTELLING SYSTEM (PROGRESS BAR & STORY CHAPTER TRACKING)
   ========================================================================== */
function initScrollytelling() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const activeChapterText = document.getElementById('active-chapter-text');
  const storyPanels = document.querySelectorAll('.story-panel[data-chapter]');

  if (!progressBar && !storyPanels.length) return;

  function updateScrollytelling() {
    // 1. Scroll Progress Bar Update
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    // 2. Precise Active Story Chapter Detection
    if (storyPanels.length && activeChapterText) {
      const focalLine = window.innerHeight * 0.38; // 38% down viewport is active reading center
      let currentChapter = '';

      storyPanels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        if (rect.top <= focalLine && rect.bottom > focalLine) {
          currentChapter = panel.getAttribute('data-chapter');
        }
      });

      // Boundary fallback: at the very top
      if (!currentChapter && window.scrollY < 200 && storyPanels[0]) {
        currentChapter = storyPanels[0].getAttribute('data-chapter');
      }

      // Boundary fallback: at the very bottom
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 60) {
        currentChapter = storyPanels[storyPanels.length - 1].getAttribute('data-chapter');
      }

      if (currentChapter && activeChapterText.textContent !== currentChapter) {
        activeChapterText.style.opacity = '0';
        activeChapterText.style.transform = 'translateY(-3px)';
        setTimeout(() => {
          activeChapterText.textContent = currentChapter;
          activeChapterText.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
          activeChapterText.style.opacity = '1';
          activeChapterText.style.transform = 'translateY(0)';
        }, 110);
      }
    }
  }

  window.addEventListener('scroll', updateScrollytelling, { passive: true });
  window.addEventListener('resize', updateScrollytelling, { passive: true });
  updateScrollytelling();
}

/* ==========================================================================
   4C. SLOW DANCING COUPLE INTERACTIVE EFFECT
   ========================================================================== */
function initDancingCouple() {
  const couple = document.getElementById('dancing-couple');
  if (!couple) return;

  couple.addEventListener('click', () => {
    const rect = couple.getBoundingClientRect();
    triggerCelebrationConfetti(rect.left + rect.width / 2, rect.top + 20);
    playSweetChime(659.25); // E5

    couple.style.transform = 'scale(1.15)';
    setTimeout(() => {
      couple.style.transform = '';
    }, 300);
  });
}

/* ==========================================================================
   4D. LIVE SCROLLING MEMORY CONVERSATION STREAM (FADE IN/OUT DYNAMICS)
   ========================================================================== */
function initLiveConversationScroll() {
  const chatRows = document.querySelectorAll('[data-chat-bubble]');
  if (!chatRows.length) return;

  let ticking = false;

  function updateChatFadeOnScroll() {
    const windowH = window.innerHeight;

    chatRows.forEach((row) => {
      const rect = row.getBoundingClientRect();
      const rowCenter = rect.top + rect.height / 2;

      // Active in-view zone: between 20% and 85% of screen height
      if (rowCenter <= windowH * 0.88 && rowCenter >= windowH * 0.16) {
        row.classList.add('in-view');
        row.classList.remove('past-view');
      } else if (rowCenter < windowH * 0.16) {
        // Scrolled past upwards: gently fades out
        row.classList.add('past-view');
        row.classList.remove('in-view');
      } else {
        // Not reached yet at bottom
        row.classList.remove('in-view', 'past-view');
      }
    });

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateChatFadeOnScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  // Initial trigger
  updateChatFadeOnScroll();
}

/* ==========================================================================
   5. COMPLIMENT STICKY NOTES ROTATOR
   ========================================================================== */
function initComplimentNotes() {
  const notes = document.querySelectorAll('.note-card');
  if (!notes.length) return;

  const compliments = [
    'The way you hum and sing along to melodies turns simple moments into pure magic ♫',
    'Your voice has a gentle, soothing rhythm that makes the whole world feel peaceful.',
    'You feel music with your whole heart, and that is what makes listening with you so special.',
    'Somewhere between your favorite playlist and your sweet voice is my favorite place to be ♡',
    'Hearing you softly sing your favorite songs is pure, unfiltered peace.',
    'You don\'t just listen to music — you bring life, feelings, and soul into every rhythm ♫',
    'Your smile and your singing voice deserve their own constellation.',
    'You somehow make ordinary days feel like a sweet acoustic love song.',
    'Your playlist taste is impeccable, but hearing you sing along is even better ♡',
    'There is a gentle grace to you that stays with people, just like a timeless melody.',
    'You bring a rare kind of peace to everyone around you.',
    'May this new year be filled with beautiful music, joyful melodies, and endless singing!'
  ];

  notes.forEach((card) => {
    card.addEventListener('click', () => {
      const content = card.querySelector('.note-content');
      if (!content) return;

      const randomText = compliments[Math.floor(Math.random() * compliments.length)];
      content.style.opacity = '0';
      content.style.transform = 'translateY(6px)';

      setTimeout(() => {
        content.textContent = randomText;
        content.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }, 200);

      card.style.transform = `scale(1.04) rotate(${(Math.random() - 0.5) * 4}deg)`;
      setTimeout(() => {
        card.style.transform = '';
      }, 400);
    });
  });
}

/* ==========================================================================
   5B. SPECIAL MEMORIES INTERACTION & HEART REACTIONS
   ========================================================================== */
function initSpecialMemories() {
  const heartBtns = document.querySelectorAll('.memory-heart-btn');
  heartBtns.forEach((btn) => {
    let count = 99;
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent opening the image modal
      count++;
      const counterEl = btn.querySelector('.heart-counter');
      if (counterEl) counterEl.textContent = `${count}+`;

      playSweetChime(783.99); // G5 sweet chime
      btn.style.transform = 'scale(1.25)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 220);

      // Create floating heart effect
      const rect = btn.getBoundingClientRect();
      const heart = document.createElement('div');
      heart.textContent = btn.querySelector('.heart-icon')?.textContent || '💖';
      heart.style.position = 'fixed';
      heart.style.left = `${rect.left + rect.width / 2}px`;
      heart.style.top = `${rect.top}px`;
      heart.style.fontSize = '1.5rem';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '9999';
      heart.style.transition = 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease';
      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -75px) scale(1.4)`;
        heart.style.opacity = '0';
      });

      setTimeout(() => {
        heart.remove();
      }, 900);
    });
  });
}

/* ==========================================================================
   6. MEMORY SCRAPBOOK WALL & LIGHTBOX MODAL
   ========================================================================== */
function initMemoryModal() {
  const items = document.querySelectorAll('.masonry-item, .special-memory-card');
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption-text');
  const closeBtn = document.getElementById('modal-close-btn');
  const backdrop = document.getElementById('modal-backdrop');

  if (!items.length || !modal) return;

  function openModal(imgSrc, captionText) {
    if (modalImg) modalImg.src = imgSrc;
    if (modalCaption) modalCaption.textContent = captionText;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.memory-heart-btn')) return;
      const img = item.querySelector('img');
      const title = item.querySelector('.fig-title');
      const date = item.querySelector('.fig-date');
      const narrative = item.querySelector('.memory-narrative');
      let caption = title ? `${title.textContent} ♡ ${date ? date.textContent : ''}` : '';
      if (narrative) {
        caption += ` — ${narrative.textContent.replace(/^"|"$/g, '').trim()}`;
      }
      if (img) openModal(img.src, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. CREATIVE INTERACTIVE BIRTHDAY CAKE & MAKE A WISH ENGINE
   ========================================================================== */
function initCakeCandles() {
  const cake = document.getElementById('birthday-cake');
  const blowBtn = document.getElementById('blow-candle-btn');
  const blowBtnText = document.getElementById('blow-btn-text');
  const micBtn = document.getElementById('mic-blow-btn');
  const micBtnText = document.getElementById('mic-btn-text');
  const relightBtn = document.getElementById('relight-btn');
  const wishMessage = document.getElementById('wish-message');
  const wishInput = document.getElementById('secret-wish-input');
  const userWishDisplay = document.getElementById('user-wish-display');
  const userWishText = document.getElementById('user-wish-text');
  const ambientGlow = document.getElementById('cake-ambient-glow');
  const breathWind = document.getElementById('breath-wind');
  const candles = Array.from(document.querySelectorAll('.candle'));

  let blownOut = false;
  let micStream = null;
  let micAudioCtx = null;
  let isListeningMic = false;

  function triggerGrandCelebration() {
    blownOut = true;

    // Dim ambient candlelight
    if (ambientGlow) ambientGlow.classList.add('dimmed');

    // Show wish message and user's typed wish
    if (blowBtnText) blowBtnText.textContent = '✨ Wish Sent to the Universe! ✨';
    if (blowBtn) blowBtn.style.opacity = '0.7';

    if (wishInput && wishInput.value.trim()) {
      if (userWishText) userWishText.textContent = wishInput.value.trim();
      if (userWishDisplay) userWishDisplay.style.display = 'block';
    } else {
      if (userWishDisplay) userWishDisplay.style.display = 'none';
    }

    if (wishMessage) wishMessage.classList.add('show');
    if (relightBtn) relightBtn.style.display = 'inline-flex';
    if (micBtn) micBtn.style.display = 'none';

    // Trigger full screen celebration fireworks & confetti
    const rect = cake ? cake.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    triggerCelebrationConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);

    // Play sweet celebratory musical fanfare
    playCelebrationFanfare();

    stopMicListening();
  }

  function blowSingleCandle(candleEl, index = 0) {
    if (candleEl.classList.contains('blown-out')) return;

    candleEl.classList.add('blown-out');
    playSweetChime(523.25 + index * 130);

    const remaining = candles.filter((c) => !c.classList.contains('blown-out'));
    if (remaining.length === 0 && !blownOut) {
      triggerGrandCelebration();
    }
  }

  function blowAllCandles() {
    if (blownOut) return;

    // Trigger visual breeze wave
    if (breathWind) {
      breathWind.classList.remove('active');
      void breathWind.offsetWidth;
      breathWind.classList.add('active');
    }

    // Stagger candle blow out with subtle delay
    candles.forEach((c, idx) => {
      setTimeout(() => {
        c.classList.add('blown-out');
        playSweetChime(523.25 + idx * 100);
      }, idx * 180);
    });

    setTimeout(triggerGrandCelebration, 550);
  }

  function relightCandles() {
    blownOut = false;
    candles.forEach((c) => c.classList.remove('blown-out'));

    if (ambientGlow) ambientGlow.classList.remove('dimmed');
    if (wishMessage) wishMessage.classList.remove('show');
    if (blowBtnText) blowBtnText.textContent = 'Blow Out All Candles';
    if (blowBtn) blowBtn.style.opacity = '1';
    if (relightBtn) relightBtn.style.display = 'none';
    if (micBtn) {
      micBtn.style.display = 'inline-flex';
      if (micBtnText) micBtnText.textContent = 'Blow With Mic';
      micBtn.classList.remove('listening');
    }

    playSweetChime(784); // G5 relight chime
  }

  // 1. Click individual candles
  candles.forEach((c, idx) => {
    c.addEventListener('click', (e) => {
      e.stopPropagation();
      blowSingleCandle(c, idx);
    });
  });

  // 2. Click button to blow all
  if (blowBtn) blowBtn.addEventListener('click', blowAllCandles);

  // 3. Relight button
  if (relightBtn) relightBtn.addEventListener('click', relightCandles);

  // 4. Microphone Breath Detection Engine
  async function toggleMicListening() {
    if (blownOut) return;

    if (isListeningMic) {
      stopMicListening();
      return;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Microphone access is not supported on this browser. You can click the candles to blow them out ♡');
        return;
      }

      if (micBtnText) micBtnText.textContent = '💨 Blow into mic now!';
      if (micBtn) micBtn.classList.add('listening');
      isListeningMic = true;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      micStream = stream;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      micAudioCtx = new AudioContextClass();
      const analyser = micAudioCtx.createAnalyser();
      analyser.fftSize = 256;
      const source = micAudioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function checkAudioBreath() {
        if (!isListeningMic || blownOut) return;

        analyser.getByteFrequencyData(dataArray);

        // Compute average frequency power and low-frequency breath wind
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;

        // Breath / blow detection threshold
        if (avg > 38) {
          blowAllCandles();
          return;
        }

        requestAnimationFrame(checkAudioBreath);
      }

      checkAudioBreath();
    } catch (err) {
      stopMicListening();
      if (micBtnText) micBtnText.textContent = 'Tap Candles to Blow 🕯️';
    }
  }

  function stopMicListening() {
    isListeningMic = false;
    if (micBtn) micBtn.classList.remove('listening');
    if (micBtnText) micBtnText.textContent = 'Blow With Mic';

    if (micStream) {
      micStream.getTracks().forEach((track) => track.stop());
      micStream = null;
    }
    if (micAudioCtx && micAudioCtx.state !== 'closed') {
      try { micAudioCtx.close(); } catch (e) {}
    }
  }

  if (micBtn) micBtn.addEventListener('click', toggleMicListening);
}

/* Play cheerful melodic fanfare when birthday wish is made */
function playCelebrationFanfare() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') ctx.resume();

    const fanfareNotes = [
      { freq: 523.25, time: 0.05 }, // C5
      { freq: 659.25, time: 0.18 }, // E5
      { freq: 783.99, time: 0.30 }, // G5
      { freq: 1046.5, time: 0.45 }, // C6
      { freq: 1318.5, time: 0.65 }, // E6
    ];

    fanfareNotes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.freq, ctx.currentTime + n.time);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime + n.time);
      gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + n.time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + n.time + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + n.time);
      osc.stop(ctx.currentTime + n.time + 0.6);
    });
  } catch (e) {}
}

/* ==========================================================================
   8. WAX-SEALED "OPEN WHEN..." ENVELOPES
   ========================================================================== */
function initEnvelopes() {
  const envelopes = document.querySelectorAll('.envelope');

  envelopes.forEach((env) => {
    env.addEventListener('click', (e) => {
      const wasOpen = env.classList.contains('open');

      // Close all other open envelopes
      envelopes.forEach((item) => {
        if (item !== env) item.classList.remove('open');
      });

      if (!wasOpen) {
        env.classList.add('open');
        playSweetChime(587.33); // D5
      } else {
        env.classList.remove('open');
      }
    });
  });
}

/* ==========================================================================
   9. MUSIC ENGINE & FLOATING VINYL CONTROLLER
   ========================================================================== */
function initMusicEngine() {
  const audio = document.getElementById('birthday-audio');
  const floatingVinyl = document.getElementById('floating-vinyl-player');
  const floatingToggle = document.getElementById('floating-play-toggle');
  const playIcon = document.getElementById('play-icon');
  const navMusicToggle = document.getElementById('nav-music-toggle');
  const navMusicLabel = document.querySelector('.music-label');
  const volumeSlider = document.getElementById('volume-slider');
  const moon = document.getElementById('moon');

  if (!audio) return;

  let fadeInterval = null;
  let userManuallyPaused = false;

  function updateUI(playing) {
    if (floatingVinyl) floatingVinyl.classList.toggle('playing', playing);
    if (navMusicToggle) navMusicToggle.classList.toggle('playing', playing);
    if (playIcon) playIcon.textContent = playing ? '❚❚' : '▶';
    if (navMusicLabel) navMusicLabel.textContent = playing ? 'Pause Music' : 'Play Soundtrack';
  }

  // Native audio event listeners for 100% accurate UI sync
  audio.addEventListener('play', () => updateUI(true));
  audio.addEventListener('pause', () => updateUI(false));
  audio.addEventListener('ended', () => updateUI(false));

  function fadeInMusic(targetVol = 0.75, durationMs = 1800) {
    if (userManuallyPaused) return;
    if (fadeInterval) clearInterval(fadeInterval);
    audio.volume = 0.02;
    audio.play().then(() => {
      let vol = 0.02;
      const step = (targetVol - 0.02) / (durationMs / 50);
      fadeInterval = setInterval(() => {
        if (audio.paused || userManuallyPaused) {
          clearInterval(fadeInterval);
          fadeInterval = null;
          return;
        }
        vol = Math.min(targetVol, vol + step);
        audio.volume = vol;
        if (volumeSlider) volumeSlider.value = vol;
        if (vol >= targetVol) {
          clearInterval(fadeInterval);
          fadeInterval = null;
        }
      }, 50);
    }).catch(() => {
      // Browser autoplay prevented; will start on first user interaction
    });
  }

  function playMusic() {
    userManuallyPaused = false;
    if (fadeInterval) clearInterval(fadeInterval);
    audio.play().catch(() => {});
  }

  function pauseMusic() {
    userManuallyPaused = true;
    if (fadeInterval) clearInterval(fadeInterval);
    audio.pause();
  }

  function toggleMusic(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!audio.paused) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  if (floatingToggle) floatingToggle.addEventListener('click', toggleMusic);
  if (navMusicToggle) navMusicToggle.addEventListener('click', toggleMusic);

  if (moon) {
    moon.addEventListener('click', (e) => {
      toggleMusic(e);
      triggerCelebrationConfetti(window.innerWidth / 2, window.innerHeight * 0.7);
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      if (fadeInterval) clearInterval(fadeInterval);
      audio.volume = parseFloat(e.target.value);
    });
  }

  // Automatic fade-in if redirected from multiverse portal unlock
  const shouldAutoplay =
    sessionStorage.getItem('birthdaySongAutoplay') === 'true' ||
    window.location.search.includes('autoplay=true');

  if (shouldAutoplay) {
    sessionStorage.removeItem('birthdaySongAutoplay');
    fadeInMusic(0.75, 1800);
  }

  // Fallback if browser blocked initial autoplay (ignores clicks on the music player itself)
  const handleFirstUserTouch = (e) => {
    if (userManuallyPaused) return;
    if (e.target && (e.target.closest('#floating-vinyl-player') || e.target.closest('#nav-music-toggle'))) {
      return;
    }
    if (audio.paused && shouldAutoplay) {
      fadeInMusic(0.75, 1500);
    }
  };

  document.addEventListener('click', handleFirstUserTouch, { once: true });
  document.addEventListener('touchstart', handleFirstUserTouch, { once: true });
}

/* ==========================================================================
   10. INTERACTIVE CONSTELLATION BOARD
   ========================================================================== */
function initConstellation() {
  const dragStar = document.getElementById('drag-star');
  const starField = document.getElementById('star-field');
  const glowPath = document.getElementById('constellation-glow-path');
  const word = document.getElementById('constellation-word');

  if (!dragStar || !starField) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  function onPointerDown(e) {
    isDragging = true;
    dragStar.setPointerCapture(e.pointerId);
    const rect = dragStar.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const fieldRect = starField.getBoundingClientRect();
    const x = e.clientX - fieldRect.left - offsetX;
    const y = e.clientY - fieldRect.top - offsetY;

    const boundedX = Math.max(10, Math.min(fieldRect.width - 50, x));
    const boundedY = Math.max(10, Math.min(fieldRect.height - 50, y));

    dragStar.style.left = `${boundedX}px`;
    dragStar.style.top = `${boundedY}px`;

    // Ignite constellation path
    if (glowPath) glowPath.classList.add('ignited');
    if (word) word.classList.add('show');
  }

  function onPointerUp() {
    if (isDragging) {
      isDragging = false;
      if (glowPath) glowPath.classList.add('ignited');
      if (word) word.classList.add('show');
      playSweetChime(880); // A5
    }
  }

  dragStar.addEventListener('pointerdown', onPointerDown);
  dragStar.addEventListener('pointermove', onPointerMove);
  dragStar.addEventListener('pointerup', onPointerUp);
  dragStar.addEventListener('pointercancel', onPointerUp);
}

/* ==========================================================================
   11. KEEPSAKE MODAL
   ========================================================================== */
function initKeepsakeModal() {
  const keepsakeBtn = document.getElementById('save-keepsake-btn');
  const modal = document.getElementById('keepsake-modal');
  const closeBtn = document.getElementById('keepsake-close-btn');
  const backdrop = document.getElementById('keepsake-backdrop');

  if (!keepsakeBtn || !modal) return;

  function openKeepsake() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    triggerCelebrationConfetti(window.innerWidth / 2, window.innerHeight / 2);
  }

  function closeKeepsake() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  keepsakeBtn.addEventListener('click', openKeepsake);
  if (closeBtn) closeBtn.addEventListener('click', closeKeepsake);
  if (backdrop) backdrop.addEventListener('click', closeKeepsake);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeKeepsake();
    }
  });
}

/* ==========================================================================
   12. CELEBRATION CONFETTI & FIREWORKS CANVASES
   ========================================================================== */
function triggerCelebrationConfetti(originX, originY) {
  const canvas = document.getElementById('celebration-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#ffd56b', '#ff6584', '#e63956', '#e5a951', '#ffffff', '#ff9ebb', '#fcd5dc', '#f39c12'];

  for (let i = 0; i < 90; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 9 + 4;
    particles.push({
      x: originX || window.innerWidth / 2,
      y: originY || window.innerHeight / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      alpha: 1,
      gravity: 0.18,
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        active = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    frame++;
    if (active && frame < 180) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

/* ==========================================================================
   13. WEB AUDIO CHIME HELPER (SOFT ELEGANT TONE)
   ========================================================================== */
let audioCtx = null;
function playSweetChime(freq = 523.25) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.65);
  } catch (err) {
    // Graceful silent fallback
  }
}
