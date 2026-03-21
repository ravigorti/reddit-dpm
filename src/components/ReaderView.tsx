import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, Settings, Clock, ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useApp } from '@/context/AppContext';
import { AuthorProfileSheet } from './AuthorProfileSheet';
import { SaveBottomSheet } from './SaveBottomSheet';
import { SessionSummary } from './SessionSummary';
import { samplePosts } from '@/data/samplePosts';

export function ReaderView() {
  const progress = useReadingProgress();
  const { savedStories, updateStoryProgress, setCurrentStoryId, currentStoryId, setActiveTab, addSavedStory, toggleCollection } = useApp();
  const progressRef = useRef(progress);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSaveSheetOpen, setIsSaveSheetOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [votes, setVotes] = useState(0);
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setSessionSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const savedStory = savedStories.find((s) => s.id === currentStoryId);
  const fullStory = samplePosts.find((p) => p.id === currentStoryId);

  useEffect(() => {
    if (fullStory) {
      setVotes(fullStory.upvotes);
      
      const initProgress = savedStories.find((s) => s.id === currentStoryId)?.readProgress || 0;
      if (initProgress > 0 && initProgress < 100) {
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const target = (initProgress / 100) * scrollHeight;
          window.scrollTo({ top: target, behavior: 'instant' });
        }, 50);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [currentStoryId, fullStory?.upvotes]);

  // Update progress ref robustly to prevent 0-resets on layout jumps
  useEffect(() => {
    if (showSummary) {
      progressRef.current = 100;
      return;
    }
    progressRef.current = progress;
  }, [progress, showSummary]);

  // Save progress on exit
  const handleBack = () => {
    if (progress >= 95) {
      if (!showSummary) {
        setShowSummary(true);
      }
      return;
    }
    doExit();
  };

  const doExit = () => {
    if (currentStoryId) {
      updateStoryProgress(currentStoryId, progressRef.current);
    }
    setCurrentStoryId(null);
    window.scrollTo(0, 0);
  };

  const handleTakeBreak = () => {
    doExit();
    setActiveTab('home');
  };

  const handleKeepReading = () => {
    if (fullStory?.nextPartId) {
      const nextPost = samplePosts.find(p => p.id === fullStory.nextPartId);
      if (nextPost) {
        // Save current as 100% since they finished it
        updateStoryProgress(currentStoryId!, 100);
        
        // Setup next part
        addSavedStory({
          id: nextPost.id,
          title: nextPost.title,
          subreddit: nextPost.subreddit,
          author: nextPost.author,
          timeAgo: nextPost.timeAgo,
          estimatedReadTime: '15 min read',
        });
        setCurrentStoryId(nextPost.id);
        
        // Reset states to read new part
        setShowSummary(false);
        setSessionSeconds(0);
        window.scrollTo(0, 0);
        return;
      }
    }
    doExit();
    setActiveTab('reads');
  };

  if (!savedStory || !fullStory) return null;

  const isSavedForLater = savedStories.some(s => s.id === currentStoryId && s.collections?.includes('Read Later'));

  const handleSaveCollection = (collection: string) => {
    toggleCollection(fullStory.id, collection, {
      id: fullStory.id,
      title: fullStory.title,
      subreddit: fullStory.subreddit,
      author: fullStory.author,
      timeAgo: fullStory.timeAgo,
      estimatedReadTime: '15 min read', // fallback
    });
  };

  if (showSummary) {
    return (
      <SessionSummary
        title={fullStory.title}
        timeSpentSeconds={sessionSeconds}
        onTakeBreak={handleTakeBreak}
        onKeepReading={handleKeepReading}
        hasNextPart={!!fullStory.nextPartId}
        nextPartLabel={fullStory.partNumber ? `Continue to Part ${fullStory.partNumber + 1}` : 'Continue to next part'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar - fixed at very top */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 bg-muted"
      >
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Header */}
      <header className="sticky top-1 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-full p-2 transition-colors hover:bg-muted"
          >
            <ArrowLeft size={22} />
          </button>
          
          <div className="flex items-center gap-1">
            <div className="mr-2 flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-muted dark:text-muted-foreground border border-slate-200 dark:border-border">
              <Clock size={12} className={sessionSeconds > 0 ? 'animate-pulse text-orange-500' : ''} />
              <span>
                {Math.floor(sessionSeconds / 60)}:{(sessionSeconds % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <button className="rounded-full p-2 transition-colors hover:bg-muted">
              <Settings size={20} className="text-muted-foreground" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-muted">
              <Share2 size={22} className="text-foreground" />
            </button>
            <button onClick={() => setIsSaveSheetOpen(true)} className="rounded-full p-2 transition-colors hover:bg-muted">
              <Bookmark size={22} className={isSavedForLater ? 'fill-primary text-primary' : 'text-foreground'} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-2xl px-5 py-8">
        {/* Meta */}
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold text-primary">{fullStory.subreddit}</p>
          <h1 className="mb-4 font-reading text-2xl font-bold leading-tight">
            {fullStory.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${fullStory.author === 'u/midnight_historian' ? 'from-amber-500 to-orange-700' : 'from-primary to-orange-600'} text-sm font-bold text-white`}>
              {fullStory.author === 'u/midnight_historian' ? 'MH' : fullStory.author === 'u/forest_watcher' ? 'FW' : 'AU'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsProfileOpen(true)}
                  className="font-medium text-left hover:underline"
                >
                  {fullStory.author}
                </button>
                {fullStory.featured && (
                  <div className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] font-semibold text-orange-700 dark:bg-orange-500/20 dark:text-orange-400">
                    <span className="text-[8px]">⭐</span> Featured in Reads
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{fullStory.timeAgo} • {savedStory.estimatedReadTime || '15 min read'}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-border" />

        {/* Story content */}
        <div className="font-reading text-lg leading-relaxed text-foreground/90 [&>p]:mb-6">
          {fullStory.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
          
          {fullStory.partNumber && (
             <p className="text-center text-muted-foreground italic mt-12">— End of Part {fullStory.partNumber} —</p>
          )}
        </div>

        {/* Upvotes */}
        <div className="mt-8 flex items-center justify-between border-y border-border py-4">
          <div className="flex items-center rounded-full bg-muted">
            <button
              onClick={() => {
                if (voteState === 'up') { setVoteState(null); setVotes(fullStory.upvotes); }
                else { setVoteState('up'); setVotes(fullStory.upvotes + 1); }
              }}
              className="flex items-center gap-1 rounded-l-full px-4 py-2 transition-colors hover:bg-muted-foreground/20"
            >
              <ArrowBigUp size={24} className={voteState === 'up' ? 'fill-primary text-primary' : 'text-muted-foreground'} />
            </button>
            <span className={`text-base font-bold ${voteState === 'up' ? 'text-primary' : voteState === 'down' ? 'text-reddit-downvote' : ''}`}>
              {votes >= 1000 ? `${(votes / 1000).toFixed(1)}k` : votes}
            </span>
            <button
              onClick={() => {
                if (voteState === 'down') { setVoteState(null); setVotes(fullStory.upvotes); }
                else { setVoteState('down'); setVotes(fullStory.upvotes - 1); }
              }}
              className="flex items-center gap-1 rounded-r-full px-4 py-2 transition-colors hover:bg-muted-foreground/20"
            >
              <ArrowBigDown size={24} className={voteState === 'down' ? 'fill-reddit-downvote text-reddit-downvote' : 'text-muted-foreground'} />
            </button>
          </div>
        </div>

        {/* Inline Premium Ad */}
        <div className="my-8 overflow-hidden rounded-2xl border border-border/60 bg-[#FDFBF7] shadow-sm dark:bg-[#1A1A1E]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Sponsored</span>
            <span className="text-[10px] font-medium text-muted-foreground/80">Skillshare · Promoted</span>
          </div>
          
          {/* Image Placeholder */}
          <div className="aspect-[21/9] w-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
          
          {/* Content */}
          <div className="p-4 sm:p-5">
            <h3 className="mb-1.5 text-lg font-bold text-slate-900 dark:text-slate-100">
              Unlock your creativity with thousands of classes
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Join millions of creatives learning design, illustration, photography, and more.
            </p>
            
            <button className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
              Learn More
            </button>
          </div>
        </div>

        {/* Next Part Button */}
        {fullStory.nextPartId && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => {
                const nextPost = samplePosts.find(p => p.id === fullStory.nextPartId);
                if (nextPost) {
                  updateStoryProgress(currentStoryId!, progressRef.current);
                  addSavedStory({
                    id: nextPost.id,
                    title: nextPost.title,
                    subreddit: nextPost.subreddit,
                    author: nextPost.author,
                    timeAgo: nextPost.timeAgo,
                    estimatedReadTime: '15 min read',
                  });
                  setCurrentStoryId(nextPost.id);
                }
              }}
              className="w-full max-w-sm rounded-full bg-primary px-6 py-4 text-center font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Continue to Part {(fullStory.partNumber || 1) + 1}
            </button>
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-32" />
      </article>

      <AuthorProfileSheet
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        authorUsername={fullStory.author}
      />

      <SaveBottomSheet
        isOpen={isSaveSheetOpen}
        onClose={() => setIsSaveSheetOpen(false)}
        onSave={handleSaveCollection}
      />
    </div>
  );
}
