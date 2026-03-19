import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function DailyReadingGoal() {
  const [goal, setGoal] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const savedGoal = localStorage.getItem('reading_goal_minutes');
    if (savedGoal) {
      setGoal(parseInt(savedGoal, 10));
    }
    const dismissed = localStorage.getItem('reading_goal_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }

    const savedProgress = localStorage.getItem('reading_today_minutes');
    if (savedProgress) {
      setProgress(parseInt(savedProgress, 10));
    }
  }, []);

  const handleSetGoal = (minutes: number) => {
    setGoal(minutes);
    localStorage.setItem('reading_goal_minutes', minutes.toString());
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('reading_goal_dismissed', 'true');
  };

  if (isDismissed && !goal) return null;

  const isComplete = goal !== null && progress >= goal;

  return (
    <div className="mx-4 mb-4 mt-2">
      <AnimatePresence mode="wait">
        {!goal ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl bg-card p-4 border border-border"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">Set a daily reading goal?</h3>
                <p className="text-xs text-muted-foreground mt-1">Read a little every day to build a habit.</p>
              </div>
              <button onClick={handleDismiss} className="text-[10px] font-medium text-muted-foreground hover:underline">
                Maybe later
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              {[10, 15, 20].map((mins) => (
                <button
                  key={mins}
                  onClick={() => handleSetGoal(mins)}
                  className="flex-1 rounded-full bg-muted py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted-foreground/20"
                >
                  {mins} min
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="progress"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex h-[60px] items-center justify-between rounded-xl px-4 border border-border shadow-sm transition-colors ${
              isComplete ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900' : 'bg-card'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Progress Ring */}
              <div className="relative h-10 w-10">
                <svg className="h-10 w-10 -rotate-90 transform">
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-muted" />
                  <circle
                    cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent"
                    strokeDasharray={2 * Math.PI * 16}
                    strokeDashoffset={isComplete ? 0 : (2 * Math.PI * 16) * (1 - progress / goal)}
                    className="text-[#00B894] transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              
              <div className="flex flex-col justify-center">
                {isComplete ? (
                  <span className="text-sm font-bold text-green-700 dark:text-green-400">
                    ✓ You've hit your goal!
                  </span>
                ) : (
                  <>
                    <span className="text-sm font-bold text-foreground leading-tight">{progress} of {goal} min today</span>
                    <span className="text-[10px] text-muted-foreground">Keep it up!</span>
                  </>
                )}
              </div>
            </div>
            
            {isComplete && (
              <span className="text-xs font-bold text-green-700 dark:text-green-400 mr-1">
                Done!
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
