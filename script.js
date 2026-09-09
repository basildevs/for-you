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
  const totalChapters = 13; // 0 to 12
  let audioContext = null;
  let isAudioPlaying = false;
  let bgmInterval = null;

  // Real Audio Player with MP3 files
  let audioPlayer = null;
  const musicTracks = [
    { name: "Canon in D Major", path: CONFIG.music.filePath || "assets/audio/canon_in_d.mp3" }
  ];
  let currentTrackIdx = 0;

  function initMusicPlayer() {
    if (!audioPlayer) {
      audioPlayer = new Audio();
      audioPlayer.src = musicTracks[currentTrackIdx].path;
      audioPlayer.loop = true;
      audioPlayer.volume = 0.65;
      audioPlayer.preload = 'auto';
    }
    const badge = document.getElementById('track-name-badge');
    if (badge) badge.textContent = musicTracks[currentTrackIdx].name;
  }

  // Initialize Audio Context on user interaction
  function initAudio() {
    if (!audioContext) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContextClass();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    initMusicPlayer();
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

        setTimeout(() => {
          this.pop();
          playSynthTone(180, 'triangle', 0.4, 0.25);
        }, 260);
      } catch (e) {}
    },
    blow() {
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
    },
    lockClick() {
      try {
        initAudio();
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioContext.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();
        osc.stop(audioContext.currentTime + 0.1);
      } catch (e) {}
    },
    splash() {
      try {
        initAudio();
        const bufferSize = audioContext.sampleRate * 0.5;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = audioContext.createBufferSource();
        noise.buffer = buffer;
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);
        noise.start();
      } catch (e) {}
    },
    heartbeat() {
      try {
        initAudio();
        [0, 0.12].forEach((offset, idx) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(idx === 0 ? 80 : 65, audioContext.currentTime + offset);
          osc.frequency.exponentialRampToValueAtTime(30, audioContext.currentTime + offset + 0.16);
          gain.gain.setValueAtTime(0.35, audioContext.currentTime + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + offset + 0.16);
          osc.connect(gain);
          gain.connect(audioContext.destination);
          osc.start(audioContext.currentTime + offset);
          osc.stop(audioContext.currentTime + offset + 0.16);
        });
      } catch (e) {}
    },
    sparkCatch() {
      try {
        initAudio();
        [880, 1108, 1318].forEach((f, i) => {
          setTimeout(() => playSynthTone(f, 'sine', 0.25, 0.09), i * 40);
        });
      } catch (e) {}
    }
  };

  // Romantic Music Player (MP3 + Synth fallback)
  function startRomanticBGM() {
    initAudio();
    isAudioPlaying = true;
    updateAudioHUD();

    if (audioPlayer) {
      audioPlayer.play().catch(err => {
        console.warn('MP3 play restricted, starting synth BGM', err);
        startRomanticSynthBGM();
      });
    } else {
      startRomanticSynthBGM();
    }
  }

  function pauseRomanticBGM() {
    isAudioPlaying = false;
    if (audioPlayer) {
      audioPlayer.pause();
    }
    pauseRomanticSynthBGM();
    updateAudioHUD();
  }

  function switchMusicTrack() {
    initAudio();
    currentTrackIdx = (currentTrackIdx + 1) % musicTracks.length;
    const track = musicTracks[currentTrackIdx];
    const badge = document.getElementById('track-name-badge');
    if (badge) badge.textContent = track.name;
    
    if (audioPlayer) {
      const wasPlaying = isAudioPlaying;
      audioPlayer.src = track.path;
      if (wasPlaying) {
        audioPlayer.play().catch(() => {});
      }
    }
    SoundFX.chime();
  }

  // Romantic Synthesizer Backup
  function startRomanticSynthBGM() {
    if (bgmInterval) return;
    const melodySeq = [
      { note: 523.25, dur: 0.8 }, { note: 659.25, dur: 0.8 }, { note: 783.99, dur: 0.8 }, { note: 659.25, dur: 0.8 },
      { note: 587.33, dur: 0.8 }, { note: 739.99, dur: 0.8 }, { note: 880.00, dur: 0.8 }, { note: 739.99, dur: 0.8 },
      { note: 440.00, dur: 0.8 }, { note: 523.25, dur: 0.8 }, { note: 659.25, dur: 0.8 }, { note: 523.25, dur: 0.8 },
      { note: 698.46, dur: 1.2 }, { note: 659.25, dur: 0.6 }, { note: 587.33, dur: 0.6 }, { note: 523.25, dur: 1.6 }
    ];
    let noteIdx = 0;
    bgmInterval = setInterval(() => {
      if (!isAudioPlaying) return;
      const m = melodySeq[noteIdx];
      playSynthTone(m.note, 'sine', m.dur, 0.08);
      if (noteIdx % 4 === 0) playSynthTone(m.note / 2, 'triangle', 1.4, 0.06);
      noteIdx = (noteIdx + 1) % melodySeq.length;
    }, 600);
  }

  function pauseRomanticSynthBGM() {
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
  }

  function updateAudioHUD() {
    const wave = document.getElementById('audio-wave');
    const label = document.getElementById('audio-label');
    if (isAudioPlaying) {
      if (wave) wave.classList.remove('paused');
      if (label) label.textContent = 'Music: On';
    } else {
      if (wave) wave.classList.add('paused');
      if (label) label.textContent = 'Music: Off';
    }
  }

  const audioToggleBtn = document.getElementById('audio-toggle');
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      initAudio();
      if (isAudioPlaying) {
        pauseRomanticBGM();
      } else {
        startRomanticBGM();
      }
    });
  }

  const switchTrackBtn = document.getElementById('audio-switch-track');
  if (switchTrackBtn) {
    switchTrackBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchMusicTrack();
    });
  }

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
      startRomanticBGM();

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
        initCatchGame();
        break;
      case 4:
        initLoveLock();
        break;
      case 5:
        initTriviaChapter();
        break;
      case 6:
        initScratchCards();
        break;
      case 7:
        initMemoryChapter();
        break;
      case 8:
        initFingerprintScanner();
        break;
      case 9:
        initLanternsChapter();
        break;
      case 10:
        initCakeChapter();
        break;
      case 11:
        initLetterChapter();
        break;
      case 12:
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
  const totalNodes = 10;

  function initConstellationChapter() {
    connectedNodes = [];
    const svg = document.getElementById('constellation-svg');
    if (svg) svg.innerHTML = '';
    const statusText = document.getElementById('constellation-status');
    if (statusText) statusText.textContent = "Tap star 1 to draw 'B' (Basil)...";
    const heart = document.getElementById('constellation-heart');
    if (heart) {
      heart.className = "absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-rose-500/30 text-2xl font-bold transition-all duration-700 pointer-events-none select-none";
    }
    const nextBtn = document.getElementById('btn-next-chapter-1');
    if (nextBtn) nextBtn.classList.add('opacity-50', 'pointer-events-none');

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
      playSynthTone(280 + idx * 55, 'sine', 0.3, 0.15);
      triggerHaptic([25]);

      const nodeEl = document.querySelector(`.star-node[data-idx="${idx}"]`);
      if (nodeEl) nodeEl.classList.add('connected');

      // Draw line between consecutive nodes, but skip drawing across from node 6 (end of B) to node 7 (start of N)
      if (connectedNodes.length > 1 && idx !== 7) {
        const prevIdx = connectedNodes[connectedNodes.length - 2];
        const prevEl = document.querySelector(`.star-node[data-idx="${prevIdx}"]`);
        if (prevEl && nodeEl) {
          const p1 = getNodeCenter(prevEl);
          const p2 = getNodeCenter(nodeEl);
          drawConstellationLine(p1.x, p1.y, p2.x, p2.y);
        }
      }

      const statusText = document.getElementById('constellation-status');
      const heart = document.getElementById('constellation-heart');

      if (idx === 6) {
        // Letter 'B' completed!
        SoundFX.chime();
        if (heart) {
          heart.className = "absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-rose-500 text-3xl font-bold transition-all duration-700 pointer-events-none select-none scale-125 drop-shadow-[0_0_12px_rgba(244,63,94,0.9)] animate-pulse";
        }
        if (statusText) statusText.textContent = "✨ 'B' connected! Now tap star 7 for 'N'...";
      } else if (connectedNodes.length === totalNodes) {
        // Complete!
        if (statusText) statusText.textContent = "🌟 Task 1 Complete! B ❤️ N Celestial Link Sealed!";
        SoundFX.chime();
        SoundFX.harpGliss();
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        const nextBtn = document.getElementById('btn-next-chapter-1');
        if (nextBtn) nextBtn.classList.remove('opacity-50', 'pointer-events-none');
      } else if (idx < 6) {
        if (statusText) statusText.textContent = `Drawing 'B'... Tap star ${idx + 1}`;
      } else {
        if (statusText) statusText.textContent = `Drawing 'N'... Tap star ${idx + 1}`;
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
  // CHAPTER 3: TASK 3 - CATCH LOVE SPARKS MINI-GAME
  // ---------------------------------------------------------
  let catchGameScore = 0;
  const catchTarget = 12;
  let catchSparksInterval = null;
  let isCatchGameActive = false;
  let basketX = 140;

  function initCatchGame() {
    catchGameScore = 0;
    isCatchGameActive = true;
    const arena = document.getElementById('catch-arena');
    const basket = document.getElementById('catch-basket');
    const sparksLayer = document.getElementById('catch-sparks-layer');
    const scoreText = document.getElementById('catch-score-text');
    const bar = document.getElementById('catch-progress-bar');
    const percent = document.getElementById('catch-percent');
    const status = document.getElementById('catch-status');
    const nextBtn = document.getElementById('btn-next-chapter-3');

    sparksLayer.innerHTML = '';
    scoreText.textContent = `Sparks: 0 / ${catchTarget}`;
    bar.style.width = '0%';
    percent.textContent = '0%';
    status.textContent = 'Slide the basket left and right!';
    nextBtn.classList.add('hidden');

    basketX = (arena.clientWidth || 280) / 2;
    basket.style.left = `${basketX}px`;

    function moveBasket(clientX) {
      const rect = arena.getBoundingClientRect();
      const x = clientX - rect.left;
      basketX = Math.max(34, Math.min(rect.width - 34, x));
      basket.style.left = `${basketX}px`;
    }

    arena.onpointerdown = (e) => {
      moveBasket(e.clientX);
      arena.onpointermove = (ev) => moveBasket(ev.clientX);
    };
    window.onpointerup = () => {
      arena.onpointermove = null;
    };

    if (catchSparksInterval) clearInterval(catchSparksInterval);
    catchSparksInterval = setInterval(() => {
      if (!isCatchGameActive || catchGameScore >= catchTarget) return;
      spawnFallingSpark(arena, sparksLayer, basket);
    }, 650);
  }

  function spawnFallingSpark(arena, layer, basket) {
    const spark = document.createElement('div');
    spark.className = 'falling-spark';
    const items = ['💖', '🌹', '✨', '💌', '💍', '🥰', '🌸'];
    spark.textContent = items[Math.floor(Math.random() * items.length)];

    const arenaW = arena.clientWidth || 280;
    const startX = Math.random() * (arenaW - 60) + 30;
    let posY = -25;
    spark.style.left = `${startX}px`;
    spark.style.top = `${posY}px`;
    layer.appendChild(spark);

    const speed = Math.random() * 1.8 + 2.4;
    let animId = null;

    function drop() {
      if (!isCatchGameActive) {
        spark.remove();
        return;
      }
      posY += speed;
      spark.style.top = `${posY}px`;

      const arenaH = arena.clientHeight || 250;
      if (posY >= arenaH - 60 && posY <= arenaH - 15) {
        if (Math.abs(startX - basketX) < 40) {
          cancelAnimationFrame(animId);
          spark.remove();
          onSparkCaught(startX, arenaH - 50);
          return;
        }
      }

      if (posY > arenaH + 10) {
        cancelAnimationFrame(animId);
        spark.remove();
      } else {
        animId = requestAnimationFrame(drop);
      }
    }
    animId = requestAnimationFrame(drop);
  }

  function onSparkCaught(x, y) {
    if (catchGameScore >= catchTarget) return;
    catchGameScore++;
    SoundFX.sparkCatch();
    triggerHaptic([20]);

    const arena = document.getElementById('catch-arena');
    const pop = document.createElement('div');
    pop.className = 'spark-popup-text';
    const compliments = ['+1 Tight Hug! 💕', '+1 Sweet Kiss! 💋', '+1 Kunjuti Smile! ✨', '+1 Forever Love! 💖', '+1 Soulmate Spark! 🌟'];
    pop.textContent = compliments[Math.floor(Math.random() * compliments.length)];
    pop.style.left = `${x - 20}px`;
    pop.style.top = `${y - 15}px`;
    arena.appendChild(pop);
    setTimeout(() => pop.remove(), 800);

    const scoreText = document.getElementById('catch-score-text');
    const bar = document.getElementById('catch-progress-bar');
    const percent = document.getElementById('catch-percent');
    const pct = Math.round((catchGameScore / catchTarget) * 100);
    scoreText.textContent = `Sparks: ${catchGameScore} / ${catchTarget}`;
    bar.style.width = `${pct}%`;
    percent.textContent = `${pct}%`;

    if (catchGameScore >= catchTarget) {
      isCatchGameActive = false;
      if (catchSparksInterval) clearInterval(catchSparksInterval);
      SoundFX.chime();
      SoundFX.harpGliss();
      confetti({ particleCount: 75, spread: 85, origin: { y: 0.6 } });

      document.getElementById('catch-status').textContent = "🎉 Love Meter 100% Charged! You have Kunjutan's whole heart!";
      document.getElementById('btn-next-chapter-3').classList.remove('hidden');
    }
  }

  document.getElementById('btn-next-chapter-3').addEventListener('click', () => {
    goToChapter(4);
  });

  // ---------------------------------------------------------
  // CHAPTER 4: TASK 4 - PARIS LOVE LOCK BRIDGE
  // ---------------------------------------------------------
  let isLockLocked = false;
  let isKeyThrown = false;

  function initLoveLock() {
    isLockLocked = false;
    isKeyThrown = false;
    const shackle = document.getElementById('padlock-shackle');
    const key = document.getElementById('golden-key');
    const keyContainer = document.getElementById('key-container');
    const keyHint = document.getElementById('key-hint');
    const statusMsg = document.getElementById('lock-status-msg');
    const btnThrow = document.getElementById('btn-throw-key');
    const nextBtn = document.getElementById('btn-next-chapter-4');

    shackle.classList.remove('locked');
    key.classList.remove('hidden');
    keyContainer.classList.remove('hidden');
    keyHint.textContent = 'Tap golden key to lock!';
    statusMsg.textContent = 'Insert the golden key...';
    btnThrow.classList.add('hidden');
    nextBtn.classList.add('hidden');

    key.onclick = () => {
      if (isLockLocked) return;
      isLockLocked = true;
      SoundFX.lockClick();
      SoundFX.chime();
      triggerHaptic([40, 60]);

      shackle.classList.add('locked');
      keyContainer.classList.add('hidden');
      statusMsg.textContent = '🔒 Locked! Now throw the key into the River of Eternity!';
      btnThrow.classList.remove('hidden');

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#fbbf24', '#f59e0b', '#fef08a']
      });
    };

    btnThrow.onclick = () => {
      if (isKeyThrown) return;
      isKeyThrown = true;
      SoundFX.splash();
      triggerHaptic([30, 40, 50]);

      btnThrow.classList.add('hidden');
      statusMsg.innerHTML = '🌊 Key thrown! <span class="text-amber-300 font-bold">Locked for All Eternity!</span> ✨';

      const fx = document.getElementById('river-splash-fx');
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const ripple = document.createElement('div');
          ripple.className = 'splash-ripple';
          ripple.style.left = '50%';
          ripple.style.top = '75%';
          fx.appendChild(ripple);
          setTimeout(() => ripple.remove(), 1200);
        }, i * 200);
      }

      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.7 }
      });

      setTimeout(() => {
        nextBtn.classList.remove('hidden');
      }, 700);
    };
  }

  document.getElementById('btn-next-chapter-4').addEventListener('click', () => {
    goToChapter(5);
  });

  // ---------------------------------------------------------
  // CHAPTER 5: TASK 5 - RELATIONSHIP Q&A TRIVIA
  // ---------------------------------------------------------
  let currentTriviaIdx = 0;

  function initTriviaChapter() {
    currentTriviaIdx = 0;
    renderCurrentTrivia();
  }

  function renderCurrentTrivia() {
    const container = document.getElementById('trivia-container');
    const statusText = document.getElementById('trivia-status');
    const nextBtn = document.getElementById('btn-next-chapter-5');
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
            statusText.textContent = "✨ Task 5 Complete! Secret Love Coupons Unlocked!";
            nextBtn.classList.remove('opacity-50', 'pointer-events-none');
          }
        }, 2200);
      };
    });
  }

  document.getElementById('btn-next-chapter-5').addEventListener('click', () => {
    goToChapter(6);
  });

  // ---------------------------------------------------------
  // CHAPTER 6: TASK 6 - SCRATCH 5 SECRET LOVE COUPONS
  // ---------------------------------------------------------
  let activeCouponIdx = 0;
  const scratchedCoupons = [false, false, false, false, false];

  function initScratchCards() {
    activeCouponIdx = 0;
    renderCouponTabs();
    loadCouponCard(0);
  }

  function renderCouponTabs() {
    const tabs = document.querySelectorAll('.coupon-tab-btn');
    tabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === activeCouponIdx);
      tab.onclick = () => {
        SoundFX.pop();
        activeCouponIdx = idx;
        tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
        loadCouponCard(idx);
      };
    });
  }

  function loadCouponCard(idx) {
    const card = CONFIG.coupons.cards[idx];
    document.getElementById('coupon-voucher-year').textContent = card.title;
    document.getElementById('coupon-voucher-reward').textContent = card.reward;
    document.getElementById('coupon-voucher-note').textContent = card.note;
    document.getElementById('coupon-voucher-code').textContent = card.code;

    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 280;
    canvas.height = 190;

    if (scratchedCoupons[idx]) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      document.getElementById('coupon-scratch-status').textContent = '✨ Coupon Unlocked!';
      return;
    }

    document.getElementById('coupon-scratch-status').textContent = 'Rub off gold glitter to reveal...';

    // Draw shimmering rose-gold foil
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#f59e0b');
    grad.addColorStop(0.3, '#fef08a');
    grad.addColorStop(0.7, '#fb7185');
    grad.addColorStop(1, '#d97706');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 120; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#451a03';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch With Love ✨', canvas.width / 2, canvas.height / 2 - 5);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#831843';
    ctx.fillText('Rub to reveal private coupon', canvas.width / 2, canvas.height / 2 + 15);

    let isScratching = false;
    let scratchCheckTimer = null;

    function scratch(e) {
      if (!isScratching || scratchedCoupons[idx]) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = (clientX - rect.left) * (canvas.width / rect.width);
      const y = (clientY - rect.top) * (canvas.height / rect.height);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      if (!scratchCheckTimer) {
        scratchCheckTimer = setTimeout(() => {
          checkScratchPercent(canvas, ctx, idx);
          scratchCheckTimer = null;
        }, 120);
      }
    }

    canvas.onpointerdown = (e) => {
      isScratching = true;
      SoundFX.pop();
      scratch(e);
    };
    window.onpointermove = (e) => scratch(e);
    window.onpointerup = () => { isScratching = false; };
  }

  function checkScratchPercent(canvas, ctx, idx) {
    if (scratchedCoupons[idx]) return;
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let clearPixels = 0;
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) clearPixels++;
      }
      const totalSampled = data.length / 16;
      const pct = clearPixels / totalSampled;

      if (pct > 0.38) {
        scratchedCoupons[idx] = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        SoundFX.chime();
        triggerHaptic([30, 40]);
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });

        document.getElementById('coupon-scratch-status').textContent = '✨ Coupon Unlocked!';
        const count = scratchedCoupons.filter(Boolean).length;
        document.getElementById('coupon-scratched-count').textContent = `Unlocked: ${count} / 5`;

        if (count >= 3) {
          const nextBtn = document.getElementById('btn-next-chapter-6');
          nextBtn.classList.remove('opacity-50', 'pointer-events-none');
        }
      }
    } catch (e) {}
  }

  document.getElementById('btn-next-chapter-6').addEventListener('click', () => {
    goToChapter(7);
  });

  // ---------------------------------------------------------
  // CHAPTER 7: TASK 7 - 5-YEAR MEMORY VAULT (25 PHOTOS)
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

      card.onclick = () => {
        currentPhotoInYearIdx = pIdx;
        updatePolaroidDisplay();
        SoundFX.pop();
      };

      carousel.appendChild(card);
    });

    currentPhotoInYearIdx = 0;
    updatePolaroidDisplay();

    let startX = 0;
    carousel.ontouchstart = (e) => { startX = e.touches[0].clientX; };
    carousel.ontouchend = (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) showPrevPhoto();
        else showNextPhoto();
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
  document.getElementById('btn-next-chapter-7').addEventListener('click', () => {
    goToChapter(8);
  });

  // ---------------------------------------------------------
  // CHAPTER 8: TASK 8 - BIOMETRIC HEARTBEAT SCANNER
  // ---------------------------------------------------------
  let scanProgress = 0;
  let scanTimer = null;
  let heartbeatLoop = null;
  let isScanComplete = false;

  function initFingerprintScanner() {
    scanProgress = 0;
    isScanComplete = false;
    const pad = document.getElementById('thumbprint-pad');
    const laser = document.getElementById('scan-laser');
    const percent = document.getElementById('scanner-percent');
    const status = document.getElementById('scanner-status');
    const card = document.getElementById('diagnosis-card');
    const nextBtn = document.getElementById('btn-next-chapter-8');

    percent.textContent = '0%';
    status.textContent = 'Press & hold thumb above';
    card.classList.add('hidden');
    nextBtn.classList.add('hidden');
    laser.classList.add('hidden');
    pad.classList.remove('scanning');

    function startScan(e) {
      if (e) e.preventDefault();
      if (isScanComplete) return;
      pad.classList.add('scanning');
      laser.classList.remove('hidden');
      status.textContent = 'Measuring heartbeat frequency...';
      triggerHaptic([30]);
      SoundFX.heartbeat();

      heartbeatLoop = setInterval(() => {
        SoundFX.heartbeat();
        triggerHaptic([20, 20]);
      }, 500);

      scanTimer = setInterval(() => {
        scanProgress += 2.5;
        if (scanProgress < 100) {
          percent.textContent = `${Math.floor(scanProgress)}%`;
        } else if (scanProgress < 150) {
          percent.textContent = `${Math.floor(scanProgress * 10)}%`;
          status.textContent = '⚡ OVERFLOW! Resonance critical...';
        } else {
          clearInterval(scanTimer);
          clearInterval(heartbeatLoop);
          isScanComplete = true;
          laser.classList.add('hidden');
          pad.classList.remove('scanning');

          percent.textContent = '1,000,000%';
          status.textContent = '💖 VERIFIED: INFINITE LOVE!';
          card.classList.remove('hidden');
          nextBtn.classList.remove('hidden');

          SoundFX.chime();
          SoundFX.harpGliss();
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.5 }
          });
        }
      }, 45);
    }

    function cancelScan() {
      if (isScanComplete) return;
      if (scanTimer) clearInterval(scanTimer);
      if (heartbeatLoop) clearInterval(heartbeatLoop);
      laser.classList.add('hidden');
      pad.classList.remove('scanning');
      scanProgress = 0;
      percent.textContent = '0%';
      status.textContent = 'Don\'t let go! Hold firmly ❤️';
    }

    pad.onpointerdown = startScan;
    pad.onpointerup = cancelScan;
    pad.onpointercancel = cancelScan;
    pad.onpointerleave = cancelScan;
  }

  document.getElementById('btn-next-chapter-8').addEventListener('click', () => {
    goToChapter(9);
  });

  // ---------------------------------------------------------
  // CHAPTER 9: TASK 9 - 5 LANTERNS OF 5 YEARS
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

  document.getElementById('btn-next-chapter-9').addEventListener('click', () => {
    goToChapter(10);
  });

  // ---------------------------------------------------------
  // CHAPTER 10: TASK 10 - ANNIVERSARY CAKE & 5 CANDLES
  // ---------------------------------------------------------
  let candlesBlown = false;

  function initCakeChapter() {
    candlesBlown = false;
    document.querySelectorAll('.candle-flame').forEach(f => f.classList.remove('blown'));
    const statusText = document.getElementById('cake-status');
    statusText.textContent = CONFIG.cake.flamesText;
    document.getElementById('btn-blow-candles').classList.remove('hidden');
    document.getElementById('btn-next-chapter-10').classList.add('hidden');
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
      document.getElementById('btn-next-chapter-10').classList.remove('hidden');
    }, 400);
  });

  document.getElementById('btn-next-chapter-10').addEventListener('click', () => {
    goToChapter(11);
  });

  // ---------------------------------------------------------
  // CHAPTER 11: TASK 11 - WAX-SEALED 5-YEAR LETTER
  // ---------------------------------------------------------
  function initLetterChapter() {
    const envelope = document.getElementById('envelope-box');
    const letter = document.getElementById('letter-content');
    const waxSeal = document.getElementById('wax-seal-btn');

    envelope.classList.remove('envelope-opened');
    letter.classList.remove('visible');

    const dateEl = document.getElementById('letter-date');
    if (dateEl && CONFIG.letter.date) {
      dateEl.textContent = CONFIG.letter.date;
    }
    let cleanHeader = (CONFIG.letter.header || "My Dearest Kunjuti,").replace(/\s*\([^\)]*nandini[^\)]*\)/gi, '').trim();
    document.getElementById('letter-header').textContent = cleanHeader;
    const bodyBox = document.getElementById('letter-body');
    bodyBox.innerHTML = '';
    CONFIG.letter.paragraphs.forEach(p => {
      const pEl = document.createElement('p');
      pEl.textContent = p;
      bodyBox.appendChild(pEl);
    });

    const sigBox = document.getElementById('letter-sig');
    if (sigBox && CONFIG.letter.closing && CONFIG.letter.signature) {
      sigBox.innerHTML = `${CONFIG.letter.closing}<br/><span class="font-bold text-rose-800">${CONFIG.letter.signature}</span>`;
    }

    waxSeal.onclick = () => {
      SoundFX.pop();
      SoundFX.harpGliss();
      triggerHaptic([30, 40, 60]);

      envelope.classList.add('envelope-opened');
      letter.classList.add('visible');
      const stage = document.getElementById('envelope-stage');
      if (stage) stage.classList.add('opened');

      confetti({
        particleCount: 55,
        spread: 75,
        origin: { y: 0.5 }
      });
    };
  }

  document.getElementById('btn-next-chapter-11').addEventListener('click', () => {
    goToChapter(12);
  });

  // ---------------------------------------------------------
  // CHAPTER 12: GRAND FINALE & FOREVER PROMISE
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
  if (loveBtn) {
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
  }

  function spawnFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'ambient-heart';
    heart.textContent = ['💖', '✨', '🌸', '❤️', '🥰', '💍'][Math.floor(Math.random() * 6)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }

  window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button') || e.target.closest('.keypad-btn') || e.target.closest('#scratch-canvas') || e.target.closest('#catch-arena') || e.target.closest('#thumbprint-pad') || e.target.closest('.star-node')) {
      return;
    }
    if (currentChapter === 12) {
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
