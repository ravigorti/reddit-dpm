import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { StoryPath, StoryPathProgress } from '@/types/storyPaths';

interface StoryLandingPageProps {
  story: StoryPath;
  progress: StoryPathProgress;
  isInProgress: boolean;
  onStart: () => void;
  onClose: () => void;
}

export function StoryLandingPage({
  story,
  progress,
  isInProgress,
  onStart,
  onClose,
}: StoryLandingPageProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative flex h-full w-full flex-col overflow-hidden bg-[#FDF6EC] sm:h-auto sm:max-h-[90vh] sm:max-w-[600px] sm:rounded-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <X size={20} />
        </button>

        {/* Hero image area */}
        <div
          className="relative h-[55%] min-h-[280px] flex-shrink-0 sm:h-[320px]"
          style={{ background: story.cardGradient }}
        >
          {story.heroImage ? (
            <img src={story.heroImage} alt={story.title} className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-overlay" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <span className="text-8xl">🏛️</span>
            </div>
          )}
          {/* Text overlay at bottom of hero */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#FDF6EC] to-transparent pb-0 pt-16" />
        </div>

        {/* Story info */}
        <div className="-mt-6 flex flex-1 flex-col px-6 pb-6">
          {/* Era tag */}
          <span className="mb-2 inline-block w-fit rounded-full bg-[#1A1A2E]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1A1A2E]/70">
            {story.era} · {story.category}
          </span>

          <h1 className="text-2xl font-bold text-[#1A1A2E]">{story.title}</h1>
          <p className="mt-0.5 text-sm font-medium text-[#1A1A2E]/60">
            {story.subtitle}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-[#1A1A2E]/80">
            {story.synopsis}
          </p>

          <div className="mt-3 flex items-center gap-3 text-xs text-[#1A1A2E]/50">
            <span>{story.totalChapters} chapters</span>
            <span>·</span>
            <span>{story.estimatedMinutes} min</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Start / Resume button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="mt-6 w-full rounded-2xl bg-[#FF4500] py-4 text-base font-bold text-white shadow-lg shadow-[#FF4500]/25 transition-colors hover:bg-[#E63E00]"
          >
            {isInProgress
              ? `RESUME — Chapter ${progress.currentChapterIndex + 1}`
              : progress.completed
                ? 'REPLAY STORY'
                : 'START STORY'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
