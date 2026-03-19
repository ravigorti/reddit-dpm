import { ArrowLeft, Volume2, VolumeX, X, Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Scene, Chapter, StoryPath } from '@/types/storyPaths';
import { useMemo } from 'react';
import { NarrationState } from '@/hooks/useNarration';

interface SceneViewProps {
  story: StoryPath;
  chapter: Chapter;
  scene: Scene;
  sceneGlobalIndex: number;
  totalScenes: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onContinue: () => void;
  onBack: () => void;
  onExit: () => void;
  isLastSceneOfChapter: boolean;
  // Narration props
  narrationState: NarrationState;
  onToggleNarration: () => void;
}

/**
 * Apply bold formatting to matching terms.
 */

function applyBoldTerms(text: string, terms: string[]): React.ReactNode[] {
  if (!terms.length) return [text];

  // Build a regex that matches any of the bold terms (case-insensitive)
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const isBold = terms.some(
      (t) => t.toLowerCase() === part.toLowerCase()
    );
    return isBold ? (
      <strong key={i} className="font-bold text-[#1A1A2E]">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    );
  });
}

export function SceneView({
  story,
  chapter,
  scene,
  sceneGlobalIndex,
  totalScenes,
  isMuted,
  onToggleMute,
  onContinue,
  onBack,
  onExit,
  isLastSceneOfChapter,
  narrationState,
  onToggleNarration,
}: SceneViewProps) {
  const progressPercent = useMemo(
    () => ((sceneGlobalIndex + 1) / totalScenes) * 100,
    [sceneGlobalIndex, totalScenes]
  );



  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FDF6EC]">
      {/* Top progress bar */}
      <div className="h-1 w-full bg-[#E8DFD0]">
        <motion.div
          className="h-full bg-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Top nav */}
      <div className="flex items-center justify-between px-3 py-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A2E]/70 transition-colors hover:bg-[#1A1A2E]/10"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-1">
          {/* Narration toggle */}
          {narrationState.speechAvailable && (
            <button
              onClick={onToggleNarration}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#1A1A2E]/10 ${
                narrationState.narrationEnabled
                  ? 'text-[#FF4500]'
                  : 'text-[#1A1A2E]/40'
              }`}
              title={narrationState.narrationEnabled ? 'Narration ON' : 'Narration OFF'}
            >
              {narrationState.narrationEnabled ? <Mic size={18} /> : <MicOff size={18} />}
            </button>
          )}
          {/* BGM mute toggle */}
          <button
            onClick={onToggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A2E]/70 transition-colors hover:bg-[#1A1A2E]/10"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <button
            onClick={onExit}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A2E]/70 transition-colors hover:bg-[#1A1A2E]/10"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Scene illustration — animated */}
      <div className="relative flex-1 overflow-hidden" style={{ maxHeight: '45%' }}>
        <motion.div
          key={scene.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="h-full w-full"
            style={{ background: story.cardGradient, opacity: 0.15 }}
          />
        </motion.div>
      </div>

      {/* Text card — lower section */}
      <motion.div
        key={scene.id + '-text'}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-1 flex-col overflow-y-auto px-5 pb-24 pt-2"
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#FF4500]">
          Chapter {chapter.number}
        </p>
        <h2 className="mt-1 text-xl font-bold text-[#1A1A2E]">{scene.title}</h2>

        {/* Narration active indicator */}
        {narrationState.isNarrating && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF4500]" />
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#FF4500] [animation-delay:150ms]" />
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF4500] [animation-delay:300ms]" />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#FF4500]/60">
              Narrating
            </span>
          </div>
        )}

        <div className="mt-4 space-y-4">
          {scene.paragraphs.map((para, i) => (
            <p
              key={i}
              className={`text-[15px] leading-[1.7] transition-opacity duration-300 ${
                para.style === 'faded'
                  ? 'text-[#1A1A2E]/50'
                  : 'text-[#1A1A2E]/85'
              }`}
            >
              {applyBoldTerms(para.text, scene.boldTerms)}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Bottom CONTINUE button — fixed */}
      <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-[#FDF6EC] via-[#FDF6EC] to-transparent px-5 pb-6 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="w-full rounded-2xl bg-[#FF4500] py-4 text-base font-bold text-white shadow-lg shadow-[#FF4500]/25 transition-colors hover:bg-[#E63E00]"
        >
          {isLastSceneOfChapter ? 'GO TO QUIZ' : 'CONTINUE'}
        </motion.button>
      </div>
    </div>
  );
}
