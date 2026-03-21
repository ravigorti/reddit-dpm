import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PremiumAdProps {
  onDismiss: () => void;
}

export function PremiumAd({ onDismiss }: PremiumAdProps) {
  useEffect(() => {
    // Auto-dismiss after 8 seconds
    const timer = setTimeout(onDismiss, 8000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-[600px] animate-in fade-in duration-700">
        {/* The Ad Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-border/60 bg-[#FDFBF7] shadow-sm dark:bg-[#1A1A1E]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/30 px-4 py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Sponsored</span>
            <span className="text-[10px] font-medium text-muted-foreground/80">Skillshare · Promoted</span>
          </div>
          
          {/* Image Placeholder */}
          <div className="aspect-video w-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500" />
          
          {/* Content */}
          <div className="p-5 sm:p-6">
            <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-100">
              Unlock your creativity with thousands of classes
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Join millions of creatives learning design, illustration, photography, and more.
            </p>
            
            <button 
              onClick={onDismiss}
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Footer Rationale */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-8 max-w-sm text-center text-[11px] leading-relaxed text-muted-foreground/80 italic font-reading"
        >
          "You'll see one ad per reading session — placed here because your attention matters more than your impressions."
        </motion.p>

        {/* Skip Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-6 flex justify-center"
        >
          <button 
            onClick={onDismiss}
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
          >
            Skip to summary
          </button>
        </motion.div>
      </div>
    </div>
  );
}
