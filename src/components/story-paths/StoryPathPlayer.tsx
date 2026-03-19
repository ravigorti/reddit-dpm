import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { storyPaths } from '@/data/storyPaths';
import { StoryPathViewState } from '@/types/storyPaths';
import { useStoryPathProgress } from '@/hooks/useStoryPathProgress';
import { useAmbientAudio } from '@/hooks/useAmbientAudio';
import { useNarration } from '@/hooks/useNarration';
import { StoryLandingPage } from './StoryLandingPage';
import { SceneView } from './SceneView';
import { QuizView } from './QuizView';
import { ChapterRecap } from './ChapterRecap';
import { SessionSummary } from '../SessionSummary';
import { Clock } from 'lucide-react';

interface StoryPathPlayerProps {
  storyId: string;
  onExit: () => void;
}

export function StoryPathPlayer({ storyId, onExit }: StoryPathPlayerProps) {
  const story = useMemo(
    () => storyPaths.find((s) => s.id === storyId),
    [storyId]
  );

  const audioMood = story?.category.includes('INDIA') ? 'indian' as const
    : story?.category.includes('ROME') ? 'ancient' as const
    : 'colonial' as const;
  const { isMuted, toggleMute, startAudio, stopAudio, duckVolume, restoreVolume } = useAmbientAudio(audioMood);

  // Narration hook — pass BGM duck/restore as callbacks
  const {
    narrationState,
    toggleNarration,
    speak,
    stopSpeaking,
  } = useNarration(duckVolume, restoreVolume);

  const {
    progress,
    updateProgress,
    resetProgress,
    isInProgress,
    quizAccuracy,
  } = useStoryPathProgress(storyId);

  const [viewState, setViewState] = useState<StoryPathViewState>('landing');
  const [currentChapterIdx, setCurrentChapterIdx] = useState(
    progress.currentChapterIndex
  );
  const [currentSceneIdx, setCurrentSceneIdx] = useState(
    progress.currentSceneIndex
  );
  const [hearts, setHearts] = useState(progress.heartsRemaining);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  const startTimeRef = useRef<number>(Date.now());
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Global session timer for the UI
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (viewState !== 'landing' && viewState !== 'complete') {
      timer = setInterval(() => setSessionSeconds((s) => s + 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [viewState]);

  // Compute total scenes for global progress
  const totalScenes = useMemo(
    () => (story ? story.chapters.reduce((acc, ch) => acc + ch.scenes.length, 0) : 0),
    [story]
  );

  const sceneGlobalIndex = useMemo(() => {
    if (!story) return 0;
    let count = 0;
    for (let i = 0; i < currentChapterIdx; i++) {
      count += story.chapters[i].scenes.length;
    }
    return count + currentSceneIdx;
  }, [story, currentChapterIdx, currentSceneIdx]);

  // Clear auto-advance timer on unmount or scene change
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
      }
    };
  }, [currentChapterIdx, currentSceneIdx]);

  // Guard: story not found
  if (!story) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDF6EC]">
        <p className="text-[#1A1A2E]">Story not found.</p>
      </div>
    );
  }

  const chapter = story.chapters[currentChapterIdx];
  const scene = chapter?.scenes[currentSceneIdx];
  const isLastChapter = currentChapterIdx === story.chapters.length - 1;
  const isLastSceneOfChapter = currentSceneIdx === chapter.scenes.length - 1;

  // Save progress helper
  const persistProgress = (chIdx: number, scIdx: number) => {
    const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
    updateProgress({
      currentChapterIndex: chIdx,
      currentSceneIndex: scIdx,
      heartsRemaining: hearts,
      timeSpentSeconds: progress.timeSpentSeconds + elapsed,
    });
    startTimeRef.current = Date.now();
  };

  // Build full narration text from scene paragraphs
  const getSceneNarrationText = (sceneObj: typeof scene) => {
    if (!sceneObj) return '';
    return sceneObj.paragraphs.map((p) => p.text).join(' ');
  };

  // ─── Auto-narrate when scene changes ───
  const narrateCurrentScene = () => {
    if (!narrationState.narrationEnabled || !scene) return;

    const text = getSceneNarrationText(scene);
    if (!text) return;

    // Small delay so the scene renders first
    setTimeout(() => {
      speak(text, () => {
        // onEnd callback: auto-advance after 1.5s pause
        if (isLastSceneOfChapter) {
          // Don't auto-advance to quiz — let user tap GO TO QUIZ
          return;
        }
        autoAdvanceTimerRef.current = setTimeout(() => {
          handleSceneContinue();
        }, 1500);
      });
    }, 500);
  };

  // ─── Handlers ───

  const handleStart = () => {
    if (progress.completed) {
      resetProgress();
      setCurrentChapterIdx(0);
      setCurrentSceneIdx(0);
      setHearts(3);
    }
    startTimeRef.current = Date.now();
    setViewState('scene');
    startAudio();

    // Initialize speech on user tap (required for mobile)
    if (narrationState.narrationEnabled && narrationState.speechAvailable) {
      const silence = new SpeechSynthesisUtterance('');
      silence.volume = 0;
      window.speechSynthesis?.speak(silence);
    }
  };

  // Start narration when scene view is active
  useEffect(() => {
    if (viewState === 'scene' && scene) {
      // Clear any pending auto-advance
      if (autoAdvanceTimerRef.current) {
        clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = null;
      }
      narrateCurrentScene();
    }
    // We only want this to fire on scene/chapter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewState, currentChapterIdx, currentSceneIdx, narrationState.narrationEnabled]);

  const handleSceneContinue = () => {
    // Stop current narration & clear auto-advance
    stopSpeaking();
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    if (isLastSceneOfChapter) {
      setViewState('quiz');
    } else {
      const nextScene = currentSceneIdx + 1;
      setCurrentSceneIdx(nextScene);
      persistProgress(currentChapterIdx, nextScene);
    }
  };

  const handleSceneBack = () => {
    stopSpeaking();
    if (autoAdvanceTimerRef.current) {
      clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }

    if (currentSceneIdx > 0) {
      setCurrentSceneIdx(currentSceneIdx - 1);
    } else if (currentChapterIdx > 0) {
      const prevChapter = story.chapters[currentChapterIdx - 1];
      setCurrentChapterIdx(currentChapterIdx - 1);
      setCurrentSceneIdx(prevChapter.scenes.length - 1);
    } else {
      setViewState('landing');
      stopAudio();
    }
  };

  const handleQuizAnswer = (selectedIndex: number, isCorrect: boolean) => {
    if (!isCorrect) {
      setHearts((h) => Math.max(0, h - 1));
    }
    updateProgress({
      quizAnswers: [
        ...progress.quizAnswers,
        { chapterIndex: currentChapterIdx, selectedIndex, correct: isCorrect },
      ],
      heartsRemaining: isCorrect ? hearts : Math.max(0, hearts - 1),
    });
  };

  const handleQuizContinue = () => {
    stopSpeaking();
    setViewState('recap');
  };

  const handleRecapNext = () => {
    if (isLastChapter) {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      updateProgress({
        completed: true,
        timeSpentSeconds: progress.timeSpentSeconds + elapsed,
        currentChapterIndex: currentChapterIdx,
        currentSceneIndex: currentSceneIdx,
      });
      setViewState('complete');
      stopAudio();
      stopSpeaking();
    } else {
      const nextChapter = currentChapterIdx + 1;
      setCurrentChapterIdx(nextChapter);
      setCurrentSceneIdx(0);
      persistProgress(nextChapter, 0);
      setViewState('scene');
    }
  };

  const handleExit = () => {
    persistProgress(currentChapterIdx, currentSceneIdx);
    stopAudio();
    stopSpeaking();
    onExit();
  };

  const handleBackToReads = () => {
    stopAudio();
    stopSpeaking();
    onExit();
  };

  return (
    <>
      {viewState !== 'landing' && viewState !== 'complete' && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-[#1A1A2E] shadow-sm border border-slate-200/50 pointer-events-none">
          <Clock size={12} className={sessionSeconds > 0 ? 'animate-pulse text-[#FF4500]' : 'text-[#FF4500]'} />
          <span>
            {Math.floor(sessionSeconds / 60)}:{(sessionSeconds % 60).toString().padStart(2, '0')}
          </span>
        </div>
      )}
      <AnimatePresence mode="wait">
        {viewState === 'landing' && (
        <StoryLandingPage
          key="landing"
          story={story}
          progress={progress}
          isInProgress={isInProgress}
          onStart={handleStart}
          onClose={handleExit}
        />
      )}

      {viewState === 'scene' && scene && (
        <SceneView
          key={`scene-${scene.id}`}
          story={story}
          chapter={chapter}
          scene={scene}
          sceneGlobalIndex={sceneGlobalIndex}
          totalScenes={totalScenes}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onContinue={handleSceneContinue}
          onBack={handleSceneBack}
          onExit={handleExit}
          isLastSceneOfChapter={isLastSceneOfChapter}
          narrationState={narrationState}
          onToggleNarration={toggleNarration}
        />
      )}

      {viewState === 'quiz' && (
        <QuizView
          key={`quiz-${chapter.id}`}
          quiz={chapter.quiz}
          chapterNumber={chapter.number}
          heartsRemaining={hearts}
          onAnswer={handleQuizAnswer}
          onContinue={handleQuizContinue}
          narrationState={narrationState}
          speak={speak}
          stopSpeaking={stopSpeaking}
        />
      )}

      {viewState === 'recap' && (
        <ChapterRecap
          key={`recap-${chapter.id}`}
          chapterNumber={chapter.number}
          chapterTitle={chapter.title}
          recapItems={chapter.recap}
          isLastChapter={isLastChapter}
          onNext={handleRecapNext}
        />
      )}

      {viewState === 'complete' && (
        <SessionSummary
          key="complete"
          title={story.title}
          timeSpentSeconds={progress.timeSpentSeconds}
          accuracy={quizAccuracy}
          onTakeBreak={handleExit}
          onKeepReading={handleBackToReads}
        />
      )}
    </AnimatePresence>
    </>
  );
}
