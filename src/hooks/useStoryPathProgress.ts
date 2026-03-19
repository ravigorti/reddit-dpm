import { useState, useCallback, useEffect } from 'react';
import { StoryPathProgress } from '@/types/storyPaths';

const STORAGE_KEY_PREFIX = 'storyProgress:';

function loadProgress(storyId: string): StoryPathProgress | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${storyId}`);
    if (raw) return JSON.parse(raw) as StoryPathProgress;
  } catch {
    // ignore corrupted data
  }
  return null;
}

function saveProgress(progress: StoryPathProgress) {
  try {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${progress.storyId}`,
      JSON.stringify(progress)
    );
  } catch {
    // storage full or unavailable
  }
}

export function useStoryPathProgress(storyId: string) {
  const [progress, setProgress] = useState<StoryPathProgress>(() => {
    const saved = loadProgress(storyId);
    if (saved) return saved;
    return {
      storyId,
      currentChapterIndex: 0,
      currentSceneIndex: 0,
      heartsRemaining: 3,
      quizAnswers: [],
      completed: false,
      startedAt: Date.now(),
      timeSpentSeconds: 0,
    };
  });

  // Persist whenever progress changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const updateProgress = useCallback(
    (updates: Partial<StoryPathProgress>) => {
      setProgress((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const resetProgress = useCallback(() => {
    const fresh: StoryPathProgress = {
      storyId,
      currentChapterIndex: 0,
      currentSceneIndex: 0,
      heartsRemaining: 3,
      quizAnswers: [],
      completed: false,
      startedAt: Date.now(),
      timeSpentSeconds: 0,
    };
    setProgress(fresh);
  }, [storyId]);

  const isInProgress =
    !progress.completed &&
    (progress.currentChapterIndex > 0 || progress.currentSceneIndex > 0);

  const quizAccuracy = progress.quizAnswers.length
    ? Math.round(
        (progress.quizAnswers.filter((a) => a.correct).length /
          progress.quizAnswers.length) *
          100
      )
    : 0;

  return {
    progress,
    updateProgress,
    resetProgress,
    isInProgress,
    quizAccuracy,
  };
}

/** Get progress for all stories (used by carousel to show badges/progress bars) */
export function getAllStoryProgress(): Record<string, StoryPathProgress> {
  const result: Record<string, StoryPathProgress> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
        const raw = localStorage.getItem(key);
        if (raw) {
          const p = JSON.parse(raw) as StoryPathProgress;
          result[p.storyId] = p;
        }
      }
    }
  } catch {
    // ignore
  }
  return result;
}
