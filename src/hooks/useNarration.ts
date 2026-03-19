import { useRef, useCallback, useState, useEffect } from 'react';

const NARRATION_KEY = 'storyPaths:narrationEnabled';

/** Check if SpeechSynthesis is available */
function isSpeechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Get best English voice */
function getBestVoice(): SpeechSynthesisVoice | null {
  if (!isSpeechAvailable()) return null;
  const voices = window.speechSynthesis.getVoices();
  // Prefer Google US English, then any English voice
  const preferred = [
    'Google UK English Male',
    'Microsoft Mark',
    'Microsoft George',
    'Microsoft David',
    'Arthur',
    'Daniel',
    'Alex',
    'Google US English Male',
    'Google US English',
  ];
  for (const name of preferred) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) return match;
  }
  // Fallback: any English voice
  return voices.find((v) => v.lang.startsWith('en')) || voices[0] || null;
}

export interface NarrationState {
  isNarrating: boolean;
  currentCharIndex: number;
  narrationEnabled: boolean;
  speechAvailable: boolean;
}

export interface UseNarrationReturn {
  narrationState: NarrationState;
  toggleNarration: () => void;
  speak: (text: string, onEnd?: () => void) => void;
  stopSpeaking: () => void;
  onNarrationStart?: () => void;
  onNarrationEnd?: () => void;
}

export function useNarration(
  onDuck?: () => void,
  onRestore?: () => void
): UseNarrationReturn {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const onEndCallbackRef = useRef<(() => void) | null>(null);

  const [speechAvailable] = useState(() => isSpeechAvailable());

  const [narrationEnabled, setNarrationEnabled] = useState(() => {
    if (!isSpeechAvailable()) return false;
    try {
      return localStorage.getItem(NARRATION_KEY) !== 'false'; // default ON
    } catch {
      return true;
    }
  });

  const [isNarrating, setIsNarrating] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);

  // Ensure voices are loaded (some browsers load async)
  useEffect(() => {
    if (!speechAvailable) return;
    const loadVoices = () => window.speechSynthesis.getVoices();
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [speechAvailable]);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!speechAvailable || !narrationEnabled) {
        // If narration off, still fire onEnd so caller logic doesn't break
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getBestVoice();
      if (voice) utterance.voice = voice;
      utterance.rate = 0.95;
      utterance.pitch = 0.85; // Lower pitch for stronger male voice
      utterance.volume = 1.0;

      utteranceRef.current = utterance;
      onEndCallbackRef.current = onEnd || null;

      // Word boundary tracking
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          setCurrentCharIndex(event.charIndex);
        }
      };

      utterance.onstart = () => {
        setIsNarrating(true);
        setCurrentCharIndex(0);
        onDuck?.();
      };

      utterance.onend = () => {
        setIsNarrating(false);
        setCurrentCharIndex(-1);
        onRestore?.();
        onEndCallbackRef.current?.();
        onEndCallbackRef.current = null;
      };

      utterance.onerror = () => {
        setIsNarrating(false);
        setCurrentCharIndex(-1);
        onRestore?.();
      };

      window.speechSynthesis.speak(utterance);
    },
    [speechAvailable, narrationEnabled, onDuck, onRestore]
  );

  const stopSpeaking = useCallback(() => {
    if (!speechAvailable) return;
    window.speechSynthesis.cancel();
    setIsNarrating(false);
    setCurrentCharIndex(-1);
    onRestore?.();
    onEndCallbackRef.current = null;
  }, [speechAvailable, onRestore]);

  const toggleNarration = useCallback(() => {
    setNarrationEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(NARRATION_KEY, String(next));
      } catch {
        /* ignore */
      }
      // If turning off, stop any current speech
      if (!next) {
        window.speechSynthesis.cancel();
        setIsNarrating(false);
        setCurrentCharIndex(-1);
        onRestore?.();
      }
      return next;
    });
  }, [onRestore]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (speechAvailable) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechAvailable]);

  return {
    narrationState: {
      isNarrating,
      currentCharIndex,
      narrationEnabled,
      speechAvailable,
    },
    toggleNarration,
    speak,
    stopSpeaking,
  };
}
