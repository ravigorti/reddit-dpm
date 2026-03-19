import { useRef, useCallback, useEffect, useState } from 'react';

const MUTE_KEY = 'storyPaths:muted';

/**
 * Generates ambient cinematic background music using Web Audio API.
 * No external audio files needed — creates atmospheric pads + drones.
 */
export function useAmbientAudio(mood: 'colonial' | 'ancient' | 'indian' = 'colonial') {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const isPlayingRef = useRef(false);

  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Mood-based chord frequencies
  const chordMap = {
    colonial: [196.0, 246.94, 293.66, 392.0],     // G major ambient
    ancient: [174.61, 220.0, 261.63, 349.23],      // F minor ambient
    indian: [146.83, 185.0, 220.0, 293.66],        // D minor ambient (sitar-like)
  };
  const chords = chordMap[mood];

  const startAudio = useCallback(() => {
    if (isPlayingRef.current) return;

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.03, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      // Create a subtle LFO for tremolo
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.03, ctx.currentTime);
      lfo.connect(lfoGain);
      lfo.start();
      lfoRef.current = lfo;

      // Create warm pad oscillators
      const oscs: OscillatorNode[] = [];
      chords.forEach((freq, i) => {
        // Main oscillator — sine wave for warmth
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Slight detuning for richness
        osc.detune.setValueAtTime((i - 1.5) * 4, ctx.currentTime);

        // Per-oscillator gain with fade-in
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0, ctx.currentTime);
        oscGain.gain.linearRampToValueAtTime(
          0.15 / chords.length,
          ctx.currentTime + 2 + i * 0.5
        );

        // Connect LFO modulation
        lfoGain.connect(oscGain.gain);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(ctx.currentTime + i * 0.3);
        oscs.push(osc);

        // Add a harmonics layer (triangle, one octave up, quieter)
        const harmonic = ctx.createOscillator();
        harmonic.type = 'triangle';
        harmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime);
        harmonic.detune.setValueAtTime(i * 3, ctx.currentTime);

        const harmonicGain = ctx.createGain();
        harmonicGain.gain.setValueAtTime(0, ctx.currentTime);
        harmonicGain.gain.linearRampToValueAtTime(
          0.04 / chords.length,
          ctx.currentTime + 3 + i * 0.5
        );

        harmonic.connect(harmonicGain);
        harmonicGain.connect(masterGain);
        harmonic.start(ctx.currentTime + i * 0.5);
        oscs.push(harmonic);
      });

      // Sub bass drone
      const subBass = ctx.createOscillator();
      subBass.type = 'sine';
      subBass.frequency.setValueAtTime(chords[0] / 2, ctx.currentTime);
      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0, ctx.currentTime);
      subGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 3);
      subBass.connect(subGain);
      subGain.connect(masterGain);
      subBass.start();
      oscs.push(subBass);

      oscillatorsRef.current = oscs;
      isPlayingRef.current = true;
    } catch {
      // Web Audio API not available
    }
  }, [isMuted, chords]);

  const stopAudio = useCallback(() => {
    if (!isPlayingRef.current) return;

    try {
      // Fade out before stopping
      if (gainRef.current && audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

        setTimeout(() => {
          oscillatorsRef.current.forEach((osc) => {
            try { osc.stop(); } catch { /* already stopped */ }
          });
          lfoRef.current?.stop();
          audioCtxRef.current?.close();
          oscillatorsRef.current = [];
          audioCtxRef.current = null;
          gainRef.current = null;
          lfoRef.current = null;
          isPlayingRef.current = false;
        }, 600);
      }
    } catch {
      isPlayingRef.current = false;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MUTE_KEY, String(next));
      } catch { /* ignore */ }

      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(
          next ? 0 : 0.03,
          audioCtxRef.current.currentTime + 0.3
        );
      }
      return next;
    });
  }, []);

  /** Duck BGM volume when narration starts (0.03 → 0.005) */
  const duckVolume = useCallback(() => {
    if (gainRef.current && audioCtxRef.current && !isMuted) {
      gainRef.current.gain.linearRampToValueAtTime(
        0.005,
        audioCtxRef.current.currentTime + 0.5
      );
    }
  }, [isMuted]);

  /** Restore BGM volume when narration ends (0.005 → 0.03) */
  const restoreVolume = useCallback(() => {
    if (gainRef.current && audioCtxRef.current && !isMuted) {
      gainRef.current.gain.linearRampToValueAtTime(
        0.03,
        audioCtxRef.current.currentTime + 0.5
      );
    }
  }, [isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isPlayingRef.current) {
        oscillatorsRef.current.forEach((osc) => {
          try { osc.stop(); } catch { /* */ }
        });
        lfoRef.current?.stop();
        audioCtxRef.current?.close();
        isPlayingRef.current = false;
      }
    };
  }, []);

  return { isMuted, toggleMute, startAudio, stopAudio, duckVolume, restoreVolume };
}
