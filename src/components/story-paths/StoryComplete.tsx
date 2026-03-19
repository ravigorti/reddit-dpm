import { motion } from 'framer-motion';
import { StoryPath } from '@/types/storyPaths';

interface StoryCompleteProps {
  story: StoryPath;
  chaptersCompleted: number;
  quizAccuracy: number;
  timeSpentSeconds: number;
  onBackToReads: () => void;
}

export function StoryComplete({
  story,
  chaptersCompleted,
  quizAccuracy,
  timeSpentSeconds,
  onBackToReads,
}: StoryCompleteProps) {
  const minutes = Math.max(1, Math.round(timeSpentSeconds / 60));

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDF6EC] px-6">
      {/* Celebration animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="mb-2 text-7xl"
      >
        🎉
      </motion.div>

      {/* Confetti-like dots */}
      <div className="relative mb-6">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              x: Math.cos((i * 30 * Math.PI) / 180) * 60,
              y: Math.sin((i * 30 * Math.PI) / 180) * 60,
            }}
            transition={{ duration: 1.2, delay: 0.2 + i * 0.05, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
            style={{
              backgroundColor: ['#FF4500', '#E67E22', '#2D1B69', '#27AE60', '#3498DB'][
                i % 5
              ],
            }}
          />
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-[#1A1A2E]"
      >
        Story Complete!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2 text-center text-sm text-[#1A1A2E]/60"
      >
        You finished <span className="font-semibold">{story.title}</span>
      </motion.p>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 grid w-full max-w-xs grid-cols-3 gap-4"
      >
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm">
          <span className="text-2xl font-bold text-[#FF4500]">{chaptersCompleted}</span>
          <span className="mt-1 text-[11px] text-[#1A1A2E]/50">Chapters</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm">
          <span className="text-2xl font-bold text-[#27AE60]">{quizAccuracy}%</span>
          <span className="mt-1 text-[11px] text-[#1A1A2E]/50">Accuracy</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-sm">
          <span className="text-2xl font-bold text-[#3498DB]">{minutes}</span>
          <span className="mt-1 text-[11px] text-[#1A1A2E]/50">Minutes</span>
        </div>
      </motion.div>

      {/* Back to Reads button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBackToReads}
        className="mt-10 w-full max-w-xs rounded-2xl bg-[#FF4500] py-4 text-base font-bold text-white shadow-lg shadow-[#FF4500]/25 transition-colors hover:bg-[#E63E00]"
      >
        Back to Reads
      </motion.button>
    </div>
  );
}
