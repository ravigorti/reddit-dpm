import { motion } from 'framer-motion';
import { RecapItem } from '@/types/storyPaths';

interface ChapterRecapProps {
  chapterNumber: number;
  chapterTitle: string;
  recapItems: RecapItem[];
  isLastChapter: boolean;
  onNext: () => void;
}

export function ChapterRecap({
  chapterNumber,
  chapterTitle,
  recapItems,
  isLastChapter,
  onNext,
}: ChapterRecapProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FDF6EC]">
      <div className="flex flex-1 flex-col items-center overflow-y-auto px-5 pb-28 pt-10">
        {/* Header */}
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#FF4500]">
          Chapter {chapterNumber}
        </p>
        <h1 className="mt-2 text-center text-2xl font-bold text-[#1A1A2E]">
          {chapterTitle}
        </h1>
        <span className="mt-1 inline-block rounded-full bg-[#1A1A2E]/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#1A1A2E]/60">
          Recap
        </span>

        {/* Timeline */}
        <div className="relative mt-10 w-full max-w-md">
          {/* Dashed vertical line */}
          <div className="absolute left-8 top-0 h-full w-0.5 border-l-2 border-dashed border-[#E8DFD0]" />

          <div className="space-y-8">
            {recapItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative flex items-start gap-4 pl-4"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-[#FF4500]" />
                </div>

                {/* Thumbnail + text */}
                <div className="flex items-start gap-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#2D1B69]/30 to-[#E67E22]/30">
                    <div className="flex h-full w-full items-center justify-center text-2xl opacity-50">
                      📜
                    </div>
                  </div>
                  <p className="pt-1 text-sm leading-relaxed text-[#1A1A2E]/75">
                    {item.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom button */}
      <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-[#FDF6EC] via-[#FDF6EC] to-transparent px-5 pb-6 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full rounded-2xl bg-[#FF4500] py-4 text-base font-bold text-white shadow-lg shadow-[#FF4500]/25 transition-colors hover:bg-[#E63E00]"
        >
          {isLastChapter ? 'FINISH STORY' : 'NEXT CHAPTER'}
        </motion.button>
      </div>
    </div>
  );
}
