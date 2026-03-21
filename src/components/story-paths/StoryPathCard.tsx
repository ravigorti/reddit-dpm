import { motion } from 'framer-motion';
import { StoryPath } from '@/types/storyPaths';
import { StoryPathProgress } from '@/types/storyPaths';

interface StoryPathCardProps {
  story: StoryPath;
  progress?: StoryPathProgress;
  onClick: () => void;
}

export function StoryPathCard({ story, progress, onClick }: StoryPathCardProps) {
  const isCompleted = progress?.completed ?? false;
  const isInProgress =
    !isCompleted &&
    progress &&
    (progress.currentChapterIndex > 0 || progress.currentSceneIndex > 0);

  // Calculate progress percentage
  const totalScenes = story.chapters.reduce((acc, ch) => acc + ch.scenes.length, 0);
  const completedScenes = progress
    ? story.chapters
      .slice(0, progress.currentChapterIndex)
      .reduce((acc, ch) => acc + ch.scenes.length, 0) +
    (progress.currentSceneIndex || 0)
    : 0;
  const progressPercent = totalScenes > 0 ? (completedScenes / totalScenes) * 100 : 0;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group flex-shrink-0 text-left"
    >
      <div
        className="relative h-[200px] w-[280px] overflow-hidden rounded-2xl md:w-[320px]"
        style={{ background: story.cardGradient }}
      >
        {/* Image / Placeholder area */}
        {story.heroImage ? (
          <img src={story.heroImage} alt={story.title} className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-overlay" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="text-6xl">🏛️</span>
          </div>
        )}

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
          {/* Era tag */}
          <span className="mb-1 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            {story.era} · {story.category}
          </span>

          <h3 className="text-base font-bold text-white">{story.title}</h3>
          <p className="text-xs text-white/70">{story.subtitle}</p>

          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-white/60">
            <span>{story.totalChapters} chapters</span>
            <span>·</span>
            <span>{story.estimatedMinutes} min</span>
          </div>
        </div>

        {/* Progress bar (in-progress only) */}
        {isInProgress && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full bg-green-400"
            />
          </div>
        )}

        {/* Completed badge */}
        {isCompleted && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-green-500/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Completed
          </div>
        )}
      </div>
    </motion.button>
  );
}
