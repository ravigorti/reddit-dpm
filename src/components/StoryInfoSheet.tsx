import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Clock, Sparkles, MapPin } from 'lucide-react';
import { Post as PostType } from '@/types/reddit';
import { leaderboardAuthors } from '@/data/authors';

interface StoryInfoSheetProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostType;
}

export function StoryInfoSheet({ isOpen, onClose, post }: StoryInfoSheetProps) {
  const author = leaderboardAuthors.find(a => a.username === post.author);
  const avatarGradient = author?.avatarGradient || 'from-primary to-orange-600';
  const initials = author?.initials || post.author.replace('u/', '').slice(0, 2).toUpperCase();

  const formatNumber = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

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
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[20px] bg-card shadow-2xl md:left-1/2 md:right-auto md:w-full md:max-w-[480px] md:-translate-x-1/2"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-muted" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3">
              <h2 className="text-lg font-semibold">Story Info</h2>
              <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-muted">
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            <div className="px-5 pb-6">
              {/* Author row with views + hours right next to the name */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 mb-5 dark:bg-muted">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${avatarGradient} text-sm font-bold text-white`}>
                  {initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-foreground">{post.author}</p>
                  <div className="mt-1 flex items-center gap-3">
                    {post.views !== undefined && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#00B894]">
                        <Eye size={14} />
                        {formatNumber(post.views)} views
                      </span>
                    )}
                    {post.hoursSpent !== undefined && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#00B894]">
                        <Clock size={14} />
                        {formatNumber(post.hoursSpent)} hrs spent
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Why this story */}
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Why did we show you this?</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold leading-tight">Related to your interests</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">Because you recently read stories in {post.subreddit}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-0.5 rounded-full bg-blue-500/10 p-2 text-blue-500">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold leading-tight">Trending locally</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">Because it's currently trending in your area</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-0.5 rounded-full bg-green-500/10 p-2 text-green-500">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold leading-tight">Fits your schedule</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">Because it matches your preferred 15 min read time</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="mt-6 w-full rounded-full bg-primary py-3.5 font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Got it
              </button>
            </div>

            <div className="h-4" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
