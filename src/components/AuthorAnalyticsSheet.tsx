import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpCircle, Eye, Bookmark, TrendingUp } from 'lucide-react';
import { leaderboardAuthors, AuthorStats } from '@/data/authors';

interface AuthorAnalyticsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  authorUsername: string;
}

const defaultData = {
  avatarGradient: 'from-primary to-orange-600',
  initials: 'AU',
  featuredCount: 1,
  saves: '120',
  upvotes: '400',
  readers: '1.2k',
  completionRate: 50,
  readDepth: [
    { label: 'Opened', percent: 100, color: 'bg-green-500' },
    { label: 'Read 25%', percent: 75, color: 'bg-green-500' },
    { label: 'Read 50%', percent: 55, color: 'bg-amber-500' },
    { label: 'Finished', percent: 50, color: 'bg-green-500' },
  ]
};

export function AuthorAnalyticsSheet({ isOpen, onClose, authorUsername }: AuthorAnalyticsSheetProps) {
  const authorMatch = leaderboardAuthors.find(a => a.username === authorUsername);
  
  const data = authorMatch ? {
    avatarGradient: authorMatch.avatarGradient,
    initials: authorMatch.initials,
    featuredCount: authorMatch.storiesFeatured,
    saves: Math.max(100, Math.floor(authorMatch.readers * 0.1)).toLocaleString(),
    upvotes: Math.max(200, Math.floor(authorMatch.readers * 0.25)).toLocaleString(),
    readers: (authorMatch.readers / 1000).toFixed(1) + 'k',
    completionRate: authorMatch.completionRate,
    readDepth: [
      { label: 'Opened', percent: 100, color: 'bg-green-500' },
      { label: 'Read 25%', percent: Math.min(100, authorMatch.completionRate + 15), color: 'bg-green-500' },
      { label: 'Read 50%', percent: Math.min(100, authorMatch.completionRate + 8), color: 'bg-amber-500' },
      { label: 'Finished', percent: authorMatch.completionRate, color: 'bg-green-500' },
    ]
  } : defaultData;

  const circumference = 2 * Math.PI * 24;
  const strokeDashoffset = circumference - (data.completionRate / 100) * circumference;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[20px] bg-white text-slate-900 shadow-2xl md:left-1/2 md:right-auto md:w-full md:max-w-[480px] md:-translate-x-1/2"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            {/* Header & Close */}
            <div className="absolute right-4 top-4">
              <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="px-6 pb-6 mt-2">
              {/* Avatar & Ident */}
              <div className="flex flex-col items-center mb-6">
                <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${data.avatarGradient} text-xl font-bold text-white shadow-sm`}>
                  {data.initials}
                </div>
                <h2 className="mt-3 text-lg font-bold text-slate-900">{authorUsername}</h2>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                  <span className="text-[10px]">⭐</span> Featured in Reads
                </div>
              </div>

              {/* Engagement Stats row */}
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 mb-1">
                    <span className="flex items-center gap-1"><ArrowUpCircle size={16} className="text-orange-500" /> {data.upvotes} upvotes</span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1 text-[#00B894]"><Eye size={16} /> {data.readers} readers</span>
                  </div>
                  <span className="text-xs text-slate-500">people who finished your stories</span>
                </div>
                
                {/* Completion rate ring */}
                <div className="flex flex-col items-center">
                  <div className="relative h-14 w-14">
                    <svg className="h-14 w-14 -rotate-90 transform">
                      <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-200" />
                      <circle
                        cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="text-[#00B894] transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
                      {data.completionRate}%
                    </div>
                  </div>
                  <span className="mt-1 text-[10px] font-medium text-slate-500">finish rate</span>
                </div>
              </div>

              {/* Read Depth Chart */}
              <div className="mb-6 rounded-xl border border-slate-100 p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <TrendingUp size={16} className="text-slate-400" /> Read Depth
                </h3>
                <div className="space-y-3">
                  {data.readDepth.map((bar: any, idx: number) => (
                    <div key={idx} className="flex items-center text-xs">
                      <div className="w-20 font-medium text-slate-600">{bar.label}</div>
                      <div className="flex-1 px-3">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${bar.percent}%` }}
                            transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
                            className={`h-full ${bar.color}`}
                          />
                        </div>
                      </div>
                      <div className="w-8 text-right font-medium text-slate-900">{bar.percent}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges / Extras */}
              <div className="flex justify-between gap-3">
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-orange-50/50 p-3 text-center border border-orange-100/50">
                  <div className="mb-1 text-sm font-bold text-slate-900">{data.featuredCount} stories</div>
                  <div className="text-[10px] font-medium text-slate-500">featured in Reads</div>
                  <div className="mt-2 flex gap-1">
                    {[...Array(data.featuredCount)].map((_, i) => (
                      <div key={i} className="h-6 w-4 rounded-sm bg-gradient-to-br from-orange-200 to-orange-400" />
                    ))}
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-blue-50/50 p-3 text-center border border-blue-100/50">
                  <Bookmark size={20} className="mb-1 text-blue-500" />
                  <div className="text-sm font-bold text-slate-900">{data.saves} saves</div>
                  <div className="text-[10px] font-medium text-slate-500">to Library</div>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
