import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowBigUp, ArrowBigDown, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { Post as PostType } from '@/types/reddit';
import { SaveBottomSheet } from './SaveBottomSheet';
import { useApp } from '@/context/AppContext';

interface NormalPostViewProps {
  post: PostType;
  isOpen: boolean;
  onClose: () => void;
}

export function NormalPostView({ post, isOpen, onClose }: NormalPostViewProps) {
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const { savedStories, toggleCollection } = useApp();
  const isSaved = savedStories.some(s => s.id === post.id && s.collections?.includes('Read Later'));
  
  const [votes, setVotes] = useState(post.upvotes);
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);

  const handleVote = (direction: 'up' | 'down') => {
    if (voteState === direction) {
      setVoteState(null);
      setVotes(post.upvotes);
    } else {
      setVoteState(direction);
      setVotes(post.upvotes + (direction === 'up' ? 1 : -1));
    }
  };

  const handleSave = (collection: string) => {
    toggleCollection(post.id, collection, {
      id: post.id,
      title: post.title,
      subreddit: post.subreddit,
      author: post.author,
      timeAgo: post.timeAgo,
      estimatedReadTime: '2 min read',
    });
  };

  return (
    <>
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

            {/* Full Screen View */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] overflow-y-auto bg-background md:mx-auto md:max-w-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur px-4 py-3 flex items-center justify-between">
                 <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-muted">
                    <X size={24} className="text-foreground" />
                 </button>
                 <div className="flex items-center gap-2">
                   <button className="rounded-full p-2 transition-colors hover:bg-muted">
                     <Share2 size={22} className="text-foreground" />
                   </button>
                    <button
                      onClick={() => setIsSaveOpen(true)}
                      className="rounded-full p-2 transition-colors hover:bg-muted"
                    >
                      <Bookmark size={22} className={isSaved ? 'fill-primary text-primary' : 'text-foreground'} />
                    </button>
                 </div>
              </div>

               {/* Post Header */}
              <div className="flex items-center gap-2 px-5 py-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-orange-600" />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">{post.subreddit}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                  </div>
                  <p className="text-sm text-foreground">{post.author}</p>
                </div>
              </div>

              {/* Content */}
              <div className="px-5 pb-4">
                <h2 className="mb-3 text-lg font-bold leading-tight">{post.title}</h2>
                <p className="text-base leading-relaxed text-foreground/90">{post.content}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 px-4 pb-4">
                {/* Votes */}
                <div className="flex items-center rounded-full bg-muted">
                  <button
                    onClick={() => handleVote('up')}
                    className="flex items-center gap-1 rounded-l-full px-3 py-1.5 transition-colors hover:bg-muted-foreground/20"
                  >
                    <ArrowBigUp size={20} className={voteState === 'up' ? 'fill-primary text-primary' : 'text-muted-foreground'} />
                  </button>
                  <span className={`text-sm font-medium ${voteState === 'up' ? 'text-primary' : voteState === 'down' ? 'text-reddit-downvote' : ''}`}>
                    {votes >= 1000 ? `${(votes / 1000).toFixed(1)}k` : votes}
                  </span>
                  <button
                    onClick={() => handleVote('down')}
                    className="flex items-center gap-1 rounded-r-full px-3 py-1.5 transition-colors hover:bg-muted-foreground/20"
                  >
                    <ArrowBigDown size={20} className={voteState === 'down' ? 'fill-reddit-downvote text-reddit-downvote' : 'text-muted-foreground'} />
                  </button>
                </div>

                {/* Comments */}
                <button className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
                  <MessageSquare size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{post.comments}</span>
                </button>
              </div>

              {/* Inline Ad */}
              <div className="mx-4 mb-6 overflow-hidden rounded-2xl border border-border/60 bg-[#FDFBF7] shadow-sm dark:bg-[#1A1A1E]">
                <div className="flex items-center justify-between border-b border-border/30 px-4 py-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Sponsored</span>
                  <span className="text-[10px] font-medium text-muted-foreground/80">Reddit Premium · Promoted</span>
                </div>
                <div className="aspect-[21/9] w-full bg-gradient-to-tr from-orange-500 via-red-500 to-pink-500" />
                <div className="p-4">
                  <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-slate-100">
                    Reddit Premium — Browse ad-free
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Enjoy an ad-free experience, exclusive avatar gear, and r/lounge access.
                  </p>
                  <button className="w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
                    Try Premium
                  </button>
                </div>
              </div>

              {/* Fake comments section */}
              <div className="border-t border-border px-4 py-4 mt-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold">{post.comments} Comments</span>
                  <div className="bg-muted px-3 py-1.5 rounded-full text-xs font-semibold">Best ▾</div>
                </div>
                
                {/* Fake comment input */}
                <div className="flex gap-2 mb-6">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0" />
                    <div className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-muted-foreground">Add a comment...</div>
                </div>
              </div>

              <div className="h-6" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SaveBottomSheet
        isOpen={isSaveOpen}
        onClose={() => setIsSaveOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
