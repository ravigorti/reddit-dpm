import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MapPin, Clock } from 'lucide-react';

interface WhyThisStorySheetProps {
  isOpen: boolean;
  onClose: () => void;
  subreddit: string;
}

export function WhyThisStorySheet({ isOpen, onClose, subreddit }: WhyThisStorySheetProps) {
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
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-card md:left-1/2 md:w-[480px] md:-translate-x-1/2"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-muted" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-4">
              <h2 className="text-lg font-semibold">Why did we show you this?</h2>
              <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-muted">
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Content list */}
            <div className="space-y-4 px-5 pb-6">
              <div className="flex gap-4 items-start">
                <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="font-semibold leading-tight">Related to your interests</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">Because you recently read stories in {subreddit}</p>
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
