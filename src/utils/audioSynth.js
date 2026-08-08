// Web Audio API Synthesizer for Birthday Wishes & Interactive Sound Effects

class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.isPlayingSong = false;
    this.activeNodes = [];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && this.isPlayingSong) {
      this.stopSong();
    }
    return this.muted;
  }

  // Play a simple synth tone
  playTone(freq, type = 'sine', duration = 0.3, volume = 0.2, delay = 0) {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    setTimeout(() => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
        this.activeNodes.push(osc);
      } catch (e) {
        console.error('Audio play tone error', e);
      }
    }, delay * 1000);
  }

  // Play Happy Birthday Chiptune / Music Box Melody
  playHappyBirthday(onComplete) {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    this.stopSong();
    this.isPlayingSong = true;

    // Notes mapping in Hz (Happy Birthday key of C)
    const N = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
    };

    const notes = [
      { note: N.C4, dur: 0.3, pause: 0.4 },
      { note: N.C4, dur: 0.2, pause: 0.3 },
      { note: N.D4, dur: 0.5, pause: 0.6 },
      { note: N.C4, dur: 0.5, pause: 0.6 },
      { note: N.F4, dur: 0.5, pause: 0.6 },
      { note: N.E4, dur: 0.9, pause: 1.1 },

      { note: N.C4, dur: 0.3, pause: 0.4 },
      { note: N.C4, dur: 0.2, pause: 0.3 },
      { note: N.D4, dur: 0.5, pause: 0.6 },
      { note: N.C4, dur: 0.5, pause: 0.6 },
      { note: N.G4, dur: 0.5, pause: 0.6 },
      { note: N.F4, dur: 0.9, pause: 1.1 },

      { note: N.C4, dur: 0.3, pause: 0.4 },
      { note: N.C4, dur: 0.2, pause: 0.3 },
      { note: N.C5, dur: 0.5, pause: 0.6 },
      { note: N.A4, dur: 0.5, pause: 0.6 },
      { note: N.F4, dur: 0.5, pause: 0.6 },
      { note: N.E4, dur: 0.5, pause: 0.6 },
      { note: N.D4, dur: 0.9, pause: 1.1 },

      { note: N.A5, dur: 0.3, pause: 0.4 },
      { note: N.A5, dur: 0.2, pause: 0.3 },
      { note: N.A4, dur: 0.5, pause: 0.6 },
      { note: N.F4, dur: 0.5, pause: 0.6 },
      { note: N.G4, dur: 0.5, pause: 0.6 },
      { note: N.F4, dur: 1.2, pause: 1.4 },
    ];

    let timeAcc = 0;
    notes.forEach(({ note, dur, pause }) => {
      this.playTone(note, 'triangle', dur, 0.25, timeAcc);
      // Accompaniment harmony tone (soft warm sine)
      this.playTone(note / 2, 'sine', dur * 1.2, 0.1, timeAcc);
      timeAcc += pause;
    });

    setTimeout(() => {
      this.isPlayingSong = false;
      if (onComplete) onComplete();
    }, timeAcc * 1000);
  }

  stopSong() {
    this.activeNodes.forEach(node => {
      try { node.stop(); } catch (e) {}
    });
    this.activeNodes = [];
    this.isPlayingSong = false;
  }

  // SFX: Candle Blowout (Whoosh + Magic Sparkle)
  playCandleBlowout() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    // Air whoosh (white noise burst)
    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {}

    // Magic sparkle arpeggio
    const sparkles = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    sparkles.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.2, 0.15, 0.1 + idx * 0.06);
    });
  }

  // SFX: Confetti Pop
  playConfettiPop() {
    if (this.muted) return;
    this.playTone(300, 'square', 0.08, 0.3, 0);
    this.playTone(600, 'sine', 0.15, 0.25, 0.04);
    this.playTone(900, 'triangle', 0.2, 0.2, 0.08);
  }

  // SFX: Mascot Cheer / Bounce
  playMascotCheer() {
    if (this.muted) return;
    this.playTone(440, 'sine', 0.1, 0.2, 0);
    this.playTone(554.37, 'sine', 0.1, 0.2, 0.08);
    this.playTone(659.25, 'sine', 0.25, 0.25, 0.16);
  }
}

export const soundManager = new SoundManager();
