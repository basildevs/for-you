/**
 * ==========================================================
 * 5-YEAR RELATIONSHIP ANNIVERSARY CELEBRATION ENGINE
 * FOR NANDINI (KUNJUTI) FROM BASIL (KUNJUTAN)
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------
  // 1. STATE & AUDIO ENGINE
  // ---------------------------------------------------------
  let currentChapter = 0;
  const totalChapters = 9; // 0 to 8
  let audioContext = null;
  let isAudioPlaying = false;
  let bgmInterval = null;

  // Initialize Audio Context on user interaction
  function initAudio() {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContextClass();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  // Play a synthesized musical tone
  function playSynthTone(freq, type = 'sine', duration = 0.5, gainVal = 0.15) {
    try {
      initAudio();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      
      gain.gain.setValueAtTime(gainVal, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.warn('Audio play failed:', e);
    }
  }

  // Sound FX presets
  const SoundFX = {
    pop() {
      try {
        initAudio();
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();
        osc.stop(audioContext.currentTime + 0.12);
      } catch (e) {}
    },
    chime() {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        setTimeout(() => playSynthTone(freq, 'sine', 0.8, 0.12), idx * 100);
      });
    },
    harpGliss() {
      const notes = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77, 1108.73];
      notes.forEach((note, i) => {
        setTimeout(() => playSynthTone(note, 'triangle', 0.6, 0.09), i * 70);
      });
    },
    firework() {
      try {
        initAudio();
        // Whistle up
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.25);
        gain.gain.setValueAtTime(0.15, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();
        osc.stop(audioContext.currentTime + 0.25);

        // Boom pop
        setTimeout(() => {
          this.pop();
          playSynthTone(180, 'triangle', 0.4, 0.25);
        }, 260);
      } catch (e) {}
    },
    blow() {
      // White noise / breath effect
      try {
        initAudio();
        const bufferSize = audioContext.sampleRate * 0.4;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = audioContext.createBufferSource();
        noise.buffer = buffer;
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);
        filter.frequency.linearRampToValueAtTime(100, audioContext.currentTime + 0.4);
        
        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.2, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);
        noise.start();
      } catch (e) {}
    }
  };

  // Romantic Synthesizer Lullaby Engine
  function startRomanticBGM() {
    if (bgmInterval) return;
    isAudioPlaying = true;
    updateAudioHUD();

    // Sweet chords sequence: C - G - Am - F
    const melodySeq = [
      { note: 523.25, dur: 0.8 }, // C5
      { note: 659.25, dur: 0.8 }, // E5
      { note: 783.99, dur: 0.8 }, // G5
      { note: 659.25, dur: 0.8 }, // E5
      { note: 587.33, dur: 0.8 }, // D5
      { note: 739.99, dur: 0.8 }, // F#5
      { note: 880.00, dur: 0.8 }, // A5
      { note: 739.99, dur: 0.8 }, // F#5
      { note: 440.00, dur: 0.8 }, // A4
      { note: 523.25, dur: 0.8 }, // C5
      { note: 659.25, dur: 0.8 }, // E5
      { note: 523.25, dur: 0.8 }, // C5
      { note: 698.46, dur: 1.2 }, // F5
      { note: 659.25, dur: 0.6 }, // E5
      { note: 587.33, dur: 0.6 }, // D5
      { note: 523.25, dur: 1.6 }  // C5
    ];

    let noteIdx = 0;
    bgmInterval = setInterval(() => {
      if (!isAudioPlaying) return;
      const m = melodySeq[noteIdx];
      playSynthTone(m.note, 'sine', m.dur, 0.08);
      // Soft bass accompaniment
      if (noteIdx % 4 === 0) {
        playSynthTone(m.note / 2, 'triangle', 1.4, 0.06);
      }
      noteIdx = (noteIdx + 1) % melodySeq.length;
    }, 600);
  }

  function pauseRomanticBGM() {
    isAudioPlaying = false;
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
    updateAudioHUD();
  }

  function updateAudioHUD() {
    const wave = document.getElementById('audio-wave');
    const label = document.getElementById('audio-label');
    if (isAudioPlaying) {
      wave.classList.remove('paused');
      label.textContent = 'Music: On';
    } else {
      wave.classList.add('paused');
      label.textContent = 'Music: Off';
    }
  }

  document.getElementById('audio-toggle').addEventListener('click', () => {
    initAudio();
    if (isAudioPlaying) {
      pauseRomanticBGM();
    } else {
      startRomanticBGM();
    }
  });

  // Haptic feedback for mobile devices
  function triggerHaptic(pattern = [15, 30, 15]) {
    if (navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {}
    }
  }

  // ---------------------------------------------------------
  // 2. BACKGROUND STARRY SKY CANVAS
  // ---------------------------------------------------------
  const spaceCanvas = document.getElementById('space-canvas');
  const spaceCtx = spaceCanvas.getContext('2d');
  let stars = [];
  let shootingStars = [];

  function resizeSpaceCanvas() {
    spaceCanvas.width = window.innerWidth;
    spaceCanvas.height = window.innerHeight;
    initStars();
  }
  window.addEventListener('resize', resizeSpaceCanvas);

  function initStars() {
    stars = [];
    const count = Math.floor((spaceCanvas.width * spaceCanvas.height) / 3500);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * spaceCanvas.width,
        y: Math.random() * spaceCanvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.015 + 0.005,
        color: ['#ffffff', '#fed7aa', '#fbcfe8', '#ddd6fe'][Math.floor(Math.random() * 4)]
      });
    }
  }

  function addShootingStar() {
    shootingStars.push({
      x: Math.random() * spaceCanvas.width * 0.8,
      y: Math.random() * spaceCanvas.height * 0.4,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 10 + 12,
      angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
      alpha: 1,
      decay: 0.02
    });
  }
  setInterval(() => {
    if (Math.random() < 0.6) addShootingStar();
  }, 2500);

  function drawSpace() {
    spaceCtx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    // Subtle Aurora Gradient
    const grad = spaceCtx.createRadialGradient(
      spaceCanvas.width * 0.5, spaceCanvas.height * 0.4, 20,
      spaceCanvas.width * 0.5, spaceCanvas.height * 0.4, spaceCanvas.width * 0.8
    );
    grad.addColorStop(0, 'rgba(126, 34, 206, 0.12)');
    grad.addColorStop(0.5, 'rgba(219, 39, 119, 0.08)');
    grad.addColorStop(1, 'rgba(7, 3, 14, 0)');
    spaceCtx.fillStyle = grad;
    spaceCtx.fillRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    // Stars
    stars.forEach(star => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;
      spaceCtx.save();
      spaceCtx.beginPath();
      spaceCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      spaceCtx.fillStyle = star.color;
      spaceCtx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
      spaceCtx.shadowBlur = 4;
      spaceCtx.shadowColor = star.color;
      spaceCtx.fill();
      spaceCtx.restore();
    });

    // Shooting Stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        shootingStars.splice(i, 1);
        continue;
      }

      spaceCtx.save();
      spaceCtx.strokeStyle = `rgba(254, 240, 138, ${s.alpha})`;
      spaceCtx.lineWidth = 2;
      spaceCtx.beginPath();
      spaceCtx.moveTo(s.x, s.y);
      spaceCtx.lineTo(
        s.x - Math.cos(s.angle) * s.length,
        s.y - Math.sin(s.angle) * s.length
      );
      spaceCtx.stroke();
      spaceCtx.restore();
    }

    requestAnimationFrame(drawSpace);
  }
  resizeSpaceCanvas();
  drawSpace();

  // ---------------------------------------------------------
  // 0. PASSCODE LOCK SCREEN CONTROLLER
  // ---------------------------------------------------------
  let enteredPin = "";
  const correctPasscode = CONFIG.security ? CONFIG.security.passcode : "511303";
  const pinDots = document.querySelectorAll('.pin-dot');
  const lockStatus = document.getElementById('lock-status');
  const lockScreen = document.getElementById('lock-screen');
  const hiddenInput = document.getElementById('passcode-input');

  function updatePinDisplay() {
    pinDots.forEach((dot, idx) => {
      dot.classList.toggle('filled', idx < enteredPin.length);
    });
  }

  function handleKeyPress(val) {
    initAudio();
    if (val === 'clear') {
      SoundFX.pop();
      enteredPin = enteredPin.slice(0, -1);
      lockStatus.textContent = "";
      updatePinDisplay();
      return;
    }

    if (val === 'enter') {
      verifyPasscode();
      return;
    }

    if (enteredPin.length < 6 && /^[0-9]$/.test(val)) {
      SoundFX.pop();
      playSynthTone(400 + enteredPin.length * 60, 'sine', 0.15, 0.12);
      triggerHaptic([15]);
      enteredPin += val;
      updatePinDisplay();

      if (enteredPin.length === 6) {
        setTimeout(verifyPasscode, 150);
      }
    }
  }

  function verifyPasscode() {
    if (enteredPin === correctPasscode) {
      // SUCCESS!
      SoundFX.chime();
      SoundFX.harpGliss();
      triggerHaptic([40, 60, 100]);

      lockStatus.textContent = "✨ Passcode Accepted! Unlocking... ✨";
      lockStatus.className = "text-xs text-emerald-400 h-5 font-bold transition-all";

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 }
      });

      setTimeout(() => {
        lockScreen.classList.remove('active');
        const dots = document.getElementById('chapter-dots');
        if (dots) dots.classList.add('visible');
        goToChapter(0);
      }, 700);
    } else {
      // WRONG CODE
      SoundFX.pop();
      triggerHaptic([50, 50, 50]);
      lockStatus.textContent = "Incorrect passcode. Try again ❤️";
      lockStatus.className = "text-xs text-rose-400 h-5 font-bold transition-all";

      const card = lockScreen.querySelector('.glass-card');
      card.classList.add('shake-anim');
      setTimeout(() => card.classList.remove('shake-anim'), 500);

      setTimeout(() => {
        enteredPin = "";
        updatePinDisplay();
      }, 600);
    }
  }

  // Keypad click listeners
  document.querySelectorAll('.keypad-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleKeyPress(btn.dataset.key);
    });
  });

  // Physical / Mobile keyboard typing support
  window.addEventListener('keydown', (e) => {
    if (lockScreen.classList.contains('active')) {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleKeyPress('clear');
      } else if (e.key === 'Enter') {
        handleKeyPress('enter');
      }
    }
  });

  // ---------------------------------------------------------
  // 3. CHAPTER NAVIGATION & PROGRESS DOTS
  // ---------------------------------------------------------
  const dotsContainer = document.getElementById('chapter-dots');
  for (let i = 0; i < totalChapters; i++) {
    const dot = document.createElement('div');
    dot.className = `progress-dot ${i === 0 ? 'active' : ''}`;
    dot.id = `dot-${i}`;
    dotsContainer.appendChild(dot);
  }

  function goToChapter(chapterIndex) {
    if (chapterIndex < 0 || chapterIndex >= totalChapters) return;

    // Fade out current chapter
    const currentSection = document.getElementById(`chapter-${currentChapter}`);
    if (currentSection) {
      currentSection.classList.remove('active');
    }

    // Update Progress Dot
    document.querySelectorAll('.progress-dot').forEach((d, idx) => {
      d.classList.toggle('active', idx === chapterIndex);
    });

    currentChapter = chapterIndex;

    // Fade in new chapter
    setTimeout(() => {
      const nextSection = document.getElementById(`chapter-${currentChapter}`);
      if (nextSection) {
        nextSection.classList.add('active');
      }
      onChapterEnter(currentChapter);
    }, 300);
  }

  function onChapterEnter(idx) {
    triggerHaptic([20]);
    switch (idx) {
      case 1:
        initConstellationChapter();
        break;
      case 2:
        initCupidChapter();
        break;
      case 3:
        initTriviaChapter();
        break;
      case 4:
        initMemoryChapter();
        break;
      case 5:
        initLanternsChapter();
        break;
      case 6:
        initCakeChapter();
        break;
      case 7:
        initLetterChapter();
        break;
      case 8:
        initGrandFinale();
        break;
    }
  }

  // ---------------------------------------------------------
  // CHAPTER 0: PROLOGUE
  // ---------------------------------------------------------
  document.getElementById('btn-start-surprise').addEventListener('click', () => {
    initAudio();
    startRomanticBGM();
    SoundFX.chime();
    goToChapter(1);
  });

  // ---------------------------------------------------------
  // CHAPTER 1: TASK 1 - STARLIGHT DESTINY
  // ---------------------------------------------------------
  let connectedNodes = [];
  const totalNodes = 4;

  function initConstellationChapter() {
    connectedNodes = [];
    const svg = document.getElementById('constellation-svg');
    svg.innerHTML = '';
    const statusText = document.getElementById('constellation-status');
    statusText.textContent = "Tap star 1 to begin...";
    const nextBtn = document.getElementById('btn-next-chapter-1');
    nextBtn.classList.add('opacity-50', 'pointer-events-none');

    document.querySelectorAll('.star-node').forEach(node => {
      node.classList.remove('connected');
      node.onclick = () => handleStarClick(parseInt(node.dataset.idx, 10));
    });
  }

  function handleStarClick(idx) {
    const nextExpected = connectedNodes.length + 1;
    if (idx === nextExpected) {
      connectedNodes.push(idx);
      SoundFX.pop();
      playSynthTone(320 + idx * 120, 'sine', 0.3, 0.15);
      triggerHaptic([25]);

      const nodeEl = document.querySelector(`.star-node[data-idx="${idx}"]`);
      nodeEl.classList.add('connected');

      if (connectedNodes.length > 1) {
        const prevIdx = connectedNodes[connectedNodes.length - 2];
        const prevEl = document.querySelector(`.star-node[data-idx="${prevIdx}"]`);
        const p1 = getNodeCenter(prevEl);
        const p2 = getNodeCenter(nodeEl);
        drawConstellationLine(p1.x, p1.y, p2.x, p2.y);
      }

      const statusText = document.getElementById('constellation-status');
      if (connectedNodes.length === totalNodes) {
        statusText.textContent = "🌟 Task 1 Complete! Our 5-Year Starlight Destiny is Sealed!";
        SoundFX.chime();
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
        const nextBtn = document.getElementById('btn-next-chapter-1');
        nextBtn.classList.remove('opacity-50', 'pointer-events-none');
      } else {
        statusText.textContent = `Tap star ${connectedNodes.length + 1}...`;
      }
    }
  }

  function getNodeCenter(el) {
    const board = document.getElementById('constellation-board').getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left - board.left + rect.width / 2,
      y: rect.top - board.top + rect.height / 2
    };
  }

  function drawConstellationLine(x1, y1, x2, y2) {
    const svg = document.getElementById('constellation-svg');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#ff4b8b');
    line.setAttribute('stroke-width', '3.5');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('filter', 'drop-shadow(0 0 8px #ff4b8b)');
    svg.appendChild(line);
  }

  document.getElementById('btn-next-chapter-1').addEventListener('click', () => {
    goToChapter(2);
  });

  // ---------------------------------------------------------
  // CHAPTER 2: TASK 2 - CUPID'S BOW & ARROW
  // ---------------------------------------------------------
  let isDraggingBow = false;
  let dragStartY = 0;
  let currentPull = 0;

  function initCupidChapter() {
    const bowControl = document.getElementById('bow-control');
    const arrowGraphic = document.getElementById('arrow-graphic');
    const bowstring = document.getElementById('bowstring');
    const nextBtn = document.getElementById('btn-next-chapter-2');
    nextBtn.classList.add('hidden');
    bowControl.classList.remove('hidden');

    function onStart(e) {
      isDraggingBow = true;
      dragStartY = (e.touches ? e.touches[0].clientY : e.clientY);
      SoundFX.pop();
    }

    function onMove(e) {
      if (!isDraggingBow) return;
      const clientY = (e.touches ? e.touches[0].clientY : e.clientY);
      const diff = Math.max(0, Math.min(80, clientY - dragStartY));
      currentPull = diff;

      bowstring.setAttribute('d', `M 20 50 Q 70 ${50 + currentPull} 120 50`);
      arrowGraphic.setAttribute('transform', `translate(0, ${currentPull})`);
    }

    function onEnd() {
      if (!isDraggingBow) return;
      isDraggingBow = false;

      if (currentPull > 35) {
        shootArrow();
      } else {
        bowstring.setAttribute('d', 'M 20 50 Q 70 50 120 50');
        arrowGraphic.setAttribute('transform', 'translate(0, 0)');
      }
      currentPull = 0;
    }

    bowControl.onmousedown = onStart;
    window.onmousemove = onMove;
    window.onmouseup = onEnd;

    bowControl.ontouchstart = onStart;
    window.ontouchmove = onMove;
    window.ontouchend = onEnd;
  }

  function shootArrow() {
    const bowControl = document.getElementById('bow-control');
    const heart = document.getElementById('target-heart');
    const nextBtn = document.getElementById('btn-next-chapter-2');
    const arrowGraphic = document.getElementById('arrow-graphic');

    arrowGraphic.style.transition = 'transform 0.18s ease-in';
    arrowGraphic.setAttribute('transform', 'translate(0, -320px)');
    SoundFX.firework();

    setTimeout(() => {
      heart.style.transform = 'scale(1.65)';
      heart.style.filter = 'drop-shadow(0 0 45px #ff2a6d)';
      SoundFX.harpGliss();
      triggerHaptic([50, 50, 100]);

      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.35 },
        colors: ['#ff4b8b', '#fb7185', '#f43f5e', '#fef08a']
      });

      bowControl.classList.add('hidden');
      nextBtn.classList.remove('hidden');
    }, 200);
  }

  document.getElementById('btn-next-chapter-2').addEventListener('click', () => {
    goToChapter(3);
  });

  // ---------------------------------------------------------
  // CHAPTER 3: TASK 3 - RELATIONSHIP Q&A TRIVIA
  // ---------------------------------------------------------
  let currentTriviaIdx = 0;

  function initTriviaChapter() {
    currentTriviaIdx = 0;
    renderCurrentTrivia();
  }

  function renderCurrentTrivia() {
    const container = document.getElementById('trivia-container');
    const statusText = document.getElementById('trivia-status');
    const nextBtn = document.getElementById('btn-next-chapter-3');
    const q = CONFIG.trivia.questions[currentTriviaIdx];

    statusText.textContent = `Question ${currentTriviaIdx + 1} of ${CONFIG.trivia.questions.length}`;

    let optionsHtml = '';
    q.options.forEach((opt, optIdx) => {
      optionsHtml += `
        <button class="trivia-option-btn" data-opt="${optIdx}">
          <span>${opt}</span>
          <span class="opt-check hidden">💖</span>
        </button>
      `;
    });

    container.innerHTML = `
      <div class="trivia-question-card">
        <h4 class="text-sm font-bold text-white mb-3">${q.question}</h4>
        <div class="space-y-2">
          ${optionsHtml}
        </div>
        <div class="trivia-reveal-box hidden" id="trivia-reveal">
          <p class="text-xs text-pink-200 font-semibold mb-1" id="reveal-note"></p>
          <p class="love-quote-ribbon text-sm italic" id="reveal-quote"></p>
        </div>
      </div>
    `;

    container.querySelectorAll('.trivia-option-btn').forEach(btn => {
      btn.onclick = () => {
        SoundFX.chime();
        triggerHaptic([30]);
        btn.classList.add('selected-correct');
        btn.querySelector('.opt-check').classList.remove('hidden');

        container.querySelectorAll('.trivia-option-btn').forEach(b => b.style.pointerEvents = 'none');

        const revealBox = document.getElementById('trivia-reveal');
        document.getElementById('reveal-note').textContent = q.revealNote;
        document.getElementById('reveal-quote').textContent = `"${q.quote}"`;
        revealBox.classList.remove('hidden');

        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.6 }
        });

        setTimeout(() => {
          if (currentTriviaIdx < CONFIG.trivia.questions.length - 1) {
            currentTriviaIdx++;
            renderCurrentTrivia();
          } else {
            statusText.textContent = "✨ Task 3 Complete! 5-Year Memory Vault Unlocked!";
            nextBtn.classList.remove('opacity-50', 'pointer-events-none');
          }
        }, 2200);
      };
    });
  }

  document.getElementById('btn-next-chapter-3').addEventListener('click', () => {
    goToChapter(4);
  });

  // ---------------------------------------------------------
  // CHAPTER 4: TASK 4 - 5-YEAR MEMORY VAULT (25 PHOTOS)
  // ---------------------------------------------------------
  let activeYearIndex = 0;
  let currentPhotoInYearIdx = 0;

  function initMemoryChapter() {
    renderYearTabs();
    loadYearMemories(0);
  }

  function renderYearTabs() {
    const tabsContainer = document.getElementById('year-tabs');
    tabsContainer.innerHTML = '';
    CONFIG.yearsData.forEach((yd, idx) => {
      const btn = document.createElement('button');
      btn.className = `year-tab-btn ${idx === activeYearIndex ? 'active' : ''}`;
      btn.dataset.year = yd.yearNum;
      btn.textContent = `Year ${yd.yearNum}`;
      btn.onclick = () => {
        SoundFX.pop();
        triggerHaptic([15]);
        activeYearIndex = idx;
        document.querySelectorAll('.year-tab-btn').forEach((b, i) => {
          b.classList.toggle('active', i === idx);
        });
        loadYearMemories(idx);
      };
      tabsContainer.appendChild(btn);
    });
  }

  function loadYearMemories(yearIdx) {
    const yd = CONFIG.yearsData[yearIdx];
    document.getElementById('current-year-title').textContent = `${yd.yearLabel} • ${yd.title}`;
    document.getElementById('current-year-desc').textContent = yd.theme;

    const carousel = document.getElementById('polaroid-carousel');
    carousel.querySelectorAll('.polaroid-card').forEach(c => c.remove());

    yd.photos.forEach((photo, pIdx) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.id = `memory-card-${pIdx}`;
      card.innerHTML = `
        <div class="tape"></div>
        <div class="polaroid-img-box">
          <img src="${photo.src}" alt="${photo.caption}" loading="lazy"/>
        </div>
      `;
      carousel.appendChild(card);
    });

    currentPhotoInYearIdx = 0;
    updatePolaroidDisplay();

    let touchStartX = 0;
    carousel.ontouchstart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    carousel.ontouchend = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartX;
      if (diff > 40) {
        showPrevPhoto();
      } else if (diff < -40) {
        showNextPhoto();
      }
    };
  }

  function updatePolaroidDisplay() {
    const yd = CONFIG.yearsData[activeYearIndex];
    const total = yd.photos.length;
    document.getElementById('memory-counter').textContent = `Photo ${currentPhotoInYearIdx + 1} / ${total} • Year ${yd.yearNum}`;

    yd.photos.forEach((_, idx) => {
      const card = document.getElementById(`memory-card-${idx}`);
      if (!card) return;
      const offset = idx - currentPhotoInYearIdx;
      if (offset === 0) {
        card.style.transform = 'translateZ(50px) rotate(0deg)';
        card.style.opacity = '1';
        card.style.zIndex = '10';
        card.style.pointerEvents = 'auto';
      } else if (offset === 1 || (currentPhotoInYearIdx === total - 1 && idx === 0)) {
        card.style.transform = 'translateX(60px) translateZ(-40px) rotate(6deg)';
        card.style.opacity = '0.35';
        card.style.zIndex = '5';
        card.style.pointerEvents = 'none';
      } else if (offset === -1 || (currentPhotoInYearIdx === 0 && idx === total - 1)) {
        card.style.transform = 'translateX(-60px) translateZ(-40px) rotate(-6deg)';
        card.style.opacity = '0.35';
        card.style.zIndex = '5';
        card.style.pointerEvents = 'none';
      } else {
        card.style.transform = 'translateZ(-100px)';
        card.style.opacity = '0';
        card.style.zIndex = '1';
        card.style.pointerEvents = 'none';
      }
    });
  }

  function showNextPhoto() {
    SoundFX.pop();
    triggerHaptic([15]);
    const total = CONFIG.yearsData[activeYearIndex].photos.length;
    currentPhotoInYearIdx = (currentPhotoInYearIdx + 1) % total;
    updatePolaroidDisplay();
  }

  function showPrevPhoto() {
    SoundFX.pop();
    triggerHaptic([15]);
    const total = CONFIG.yearsData[activeYearIndex].photos.length;
    currentPhotoInYearIdx = (currentPhotoInYearIdx - 1 + total) % total;
    updatePolaroidDisplay();
  }

  document.getElementById('btn-next-memory').addEventListener('click', showNextPhoto);
  document.getElementById('btn-prev-memory').addEventListener('click', showPrevPhoto);
  document.getElementById('btn-next-chapter-4').addEventListener('click', () => {
    goToChapter(5);
  });

  // ---------------------------------------------------------
  // CHAPTER 5: TASK 5 - 5 LANTERNS OF 5 YEARS
  // ---------------------------------------------------------
  function initLanternsChapter() {
    const sky = document.getElementById('lanterns-container');
    const box = document.getElementById('lanterns-reasons-container');
    sky.innerHTML = '';
    box.innerHTML = '';

    CONFIG.lanterns.forEach((item) => {
      const lantern = document.createElement('div');
      lantern.className = 'lantern-item';
      lantern.innerHTML = `
        <span class="text-[9px]">Yr</span>
        <span>${item.year}</span>
      `;

      lantern.onclick = () => {
        if (lantern.classList.contains('released')) return;
        lantern.classList.add('released');
        SoundFX.chime();
        triggerHaptic([30]);

        revealLanternCard(item);

        confetti({
          particleCount: 30,
          spread: 55,
          origin: { y: 0.3 }
        });
      };

      sky.appendChild(lantern);
    });
  }

  function revealLanternCard(item) {
    const box = document.getElementById('lanterns-reasons-container');
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `
      <div class="flex items-center gap-2 mb-1">
        <span class="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">Year ${item.year}</span>
        <h4 class="text-xs font-bold text-white">${item.title}</h4>
      </div>
      <p class="text-xs text-slate-200">${item.text}</p>
    `;
    box.prepend(card);
    setTimeout(() => card.classList.add('revealed'), 50);
  }

  document.getElementById('btn-next-chapter-5').addEventListener('click', () => {
    goToChapter(6);
  });

  // ---------------------------------------------------------
  // CHAPTER 6: TASK 6 - ANNIVERSARY CAKE & 5 CANDLES
  // ---------------------------------------------------------
  let candlesBlown = false;

  function initCakeChapter() {
    candlesBlown = false;
    document.querySelectorAll('.candle-flame').forEach(f => f.classList.remove('blown'));
    const statusText = document.getElementById('cake-status');
    statusText.textContent = CONFIG.cake.flamesText;
    document.getElementById('btn-blow-candles').classList.remove('hidden');
    document.getElementById('btn-next-chapter-6').classList.add('hidden');
  }

  document.getElementById('btn-blow-candles').addEventListener('click', () => {
    if (candlesBlown) return;
    candlesBlown = true;
    SoundFX.blow();
    triggerHaptic([40, 60, 40]);

    document.querySelectorAll('.candle-flame').forEach(f => f.classList.add('blown'));

    const statusText = document.getElementById('cake-status');
    statusText.textContent = CONFIG.cake.blownText;

    setTimeout(() => {
      SoundFX.harpGliss();
      confetti({
        particleCount: 110,
        spread: 100,
        origin: { y: 0.6 }
      });
      document.getElementById('btn-blow-candles').classList.add('hidden');
      document.getElementById('btn-next-chapter-6').classList.remove('hidden');
    }, 400);
  });

  document.getElementById('btn-next-chapter-6').addEventListener('click', () => {
    goToChapter(7);
  });

  // ---------------------------------------------------------
  // CHAPTER 7: TASK 7 - WAX-SEALED 5-YEAR LETTER
  // ---------------------------------------------------------
  function initLetterChapter() {
    const envelope = document.getElementById('envelope-box');
    const letter = document.getElementById('letter-content');
    const waxSeal = document.getElementById('wax-seal-btn');

    envelope.classList.remove('envelope-opened');
    letter.classList.remove('visible');

    document.getElementById('letter-header').textContent = CONFIG.letter.header;
    const bodyBox = document.getElementById('letter-body');
    bodyBox.innerHTML = '';
    CONFIG.letter.paragraphs.forEach(p => {
      const pEl = document.createElement('p');
      pEl.textContent = p;
      bodyBox.appendChild(pEl);
    });

    waxSeal.onclick = () => {
      SoundFX.pop();
      SoundFX.harpGliss();
      triggerHaptic([30, 40, 60]);

      envelope.classList.add('envelope-opened');
      letter.classList.add('visible');

      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.5 }
      });
    };
  }

  document.getElementById('btn-next-chapter-7').addEventListener('click', () => {
    goToChapter(8);
  });

  // ---------------------------------------------------------
  // CHAPTER 8: GRAND FINALE & FOREVER PROMISE
  // ---------------------------------------------------------
  function initGrandFinale() {
    SoundFX.harpGliss();
    triggerHaptic([50, 100, 150]);

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 90,
          spread: 100,
          origin: { x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.5 + 0.2 }
        });
        SoundFX.firework();
      }, i * 380);
    }
  }

  document.getElementById('btn-yes-forever').addEventListener('click', () => {
    SoundFX.firework();
    SoundFX.harpGliss();
    triggerHaptic([60, 100, 200]);

    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.5 }
    });

    const btn = document.getElementById('btn-yes-forever');
    btn.innerHTML = `<span>💍 Forever &amp; Ever Kunjutan! ❤️</span>`;
  });

  document.getElementById('btn-fireworks-burst').addEventListener('click', () => {
    SoundFX.firework();
    triggerHaptic([40, 80]);
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 }
    });
  });

  document.getElementById('btn-replay-all').addEventListener('click', () => {
    goToChapter(0);
  });

  // ---------------------------------------------------------
  // FLOATING LOVE BURST BUTTON & SCREEN TAP FIREWORKS
  // ---------------------------------------------------------
  const loveBtn = document.getElementById('btn-love-burst');
  loveBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    SoundFX.pop();
    triggerHaptic([20]);
    spawnFloatingHeart(window.innerWidth - 60, window.innerHeight - 80);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: 0.9, y: 0.9 }
    });
  });

  function spawnFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = ['💖', '✨', '🌸', '❤️', '🥰', '💍'][Math.floor(Math.random() * 6)];
    heart.style.position = 'fixed';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${Math.random() * 16 + 22}px`;
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    heart.style.transition = 'all 1.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    heart.style.transform = 'translate(-50%, -50%) scale(0.5)';
    heart.style.opacity = '1';

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      const offsetX = (Math.random() - 0.5) * 120;
      const offsetY = -(Math.random() * 180 + 120);
      heart.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(1.4)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1800);
  }

  window.addEventListener('pointerdown', (e) => {
    if (currentChapter === 8) {
      SoundFX.firework();
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
      });
    }
    spawnFloatingHeart(e.clientX, e.clientY);
  });
});
