import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Clock, ArrowUpCircle, BookOpen, TrendingUp } from 'lucide-react';
import { leaderboardAuthors } from '@/data/authors';

interface AuthorProfileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  authorUsername: string;
}

export function AuthorProfileSheet({ isOpen, onClose, authorUsername }: AuthorProfileSheetProps) {
  const author = leaderboardAuthors.find(a => a.username === authorUsername);

  const data = author || {
    username: authorUsername,
    avatarGradient: 'from-primary to-orange-600',
    initials: authorUsername.replace('u/', '').slice(0, 2).toUpperCase(),
    genre: 'General',
    readers: 1200,
    completionRate: 50,
    storiesFeatured: 1,
    timeEarned: 150,
    avgTimePerReader: 12,
    sampleStories: [],
    rank: 0,
  };

  const formatNumber = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  const circumference = 2 * Math.PI * 20;
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
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-[20px] bg-white text-slate-900 shadow-2xl md:left-1/2 md:right-auto md:w-full md:max-w-[480px] md:-translate-x-1/2"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            {/* Close */}
            <div className="absolute right-4 top-4">
              <button onClick={onClose} className="rounded-full p-2 hover:bg-slate-100">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="px-6 pb-8 mt-1">
              {/* Profile Header */}
              <div className="flex flex-col items-center mb-6">
                <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${data.avatarGradient} text-2xl font-bold text-white shadow-lg`}>
                  {data.initials}
                </div>
                <h2 className="mt-3 text-xl font-bold text-slate-900">{data.username}</h2>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {data.genre}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                    <span className="text-[10px]">⭐</span> Featured Writer
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="mb-6 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center rounded-xl bg-slate-50 p-3 text-center">
                  <Eye size={18} className="mb-1 text-[#00B894]" />
                  <span className="text-lg font-bold text-slate-900">{formatNumber(data.readers)}</span>
                  <span className="text-[10px] text-slate-500">Total Readers</span>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-slate-50 p-3 text-center">
                  <Clock size={18} className="mb-1 text-[#00B894]" />
                  <span className="text-lg font-bold text-slate-900">{data.timeEarned}h</span>
                  <span className="text-[10px] text-slate-500">Time Earned</span>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-slate-50 p-3 text-center">
                  <ArrowUpCircle size={18} className="mb-1 text-orange-500" />
                  <span className="text-lg font-bold text-slate-900">{formatNumber(Math.floor(data.readers * 0.25))}</span>
                  <span className="text-[10px] text-slate-500">Upvotes</span>
                </div>
              </div>

              {/* Completion Rate + Featured */}
              <div className="mb-6 flex gap-3">
                <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 p-4">
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <svg className="h-12 w-12 -rotate-90 transform">
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-200" />
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="transparent"
                        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                        className="text-[#00B894] transition-all duration-1000 ease-out" strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
                      {data.completionRate}%
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700">Completion</span>
                    <p className="text-[10px] text-slate-500">finish rate</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-orange-50/50 p-4 text-center border border-orange-100/50">
                  <BookOpen size={18} className="mb-1 text-orange-500" />
                  <span className="text-sm font-bold text-slate-900">{data.storiesFeatured} stories</span>
                  <span className="text-[10px] text-slate-500">featured in Reads</span>
                </div>
              </div>

              {/* Avg time */}
              <div className="mb-6 rounded-xl bg-slate-900 p-4 text-center shadow-inner">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock size={16} className="text-[#00B894]" />
                  <span className="text-sm font-bold text-white">Avg {data.avgTimePerReader} min per reader</span>
                </div>
                <span className="text-xs text-slate-400">Average time a reader spends per story</span>
              </div>

              {/* Sample Stories */}
              {data.sampleStories && data.sampleStories.length > 0 && (
                <div className="mb-4">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <TrendingUp size={16} className="text-slate-400" />
                    Stories by {data.username}
                  </h3>
                  <div className="space-y-2">
                    {data.sampleStories.map((story, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50">
                        <div className="flex-1 mr-3">
                          <p className="text-sm font-medium text-slate-800 line-clamp-1">{story.title}</p>
                          <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <Eye size={12} className="text-[#00B894]" />
                              {formatNumber(story.views)} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={12} className="text-[#00B894]" />
                              {story.hoursSpent}h spent
                            </span>
                          </div>
                        </div>
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted-foreground/20 text-lg">
                          📖
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
