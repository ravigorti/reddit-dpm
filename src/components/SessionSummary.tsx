import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Award } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface SessionSummaryProps {
  title: string;
  timeSpentSeconds: number;
  onTakeBreak: () => void;
  onKeepReading: () => void;
  accuracy?: number; // for story paths
}

export function SessionSummary({ title, timeSpentSeconds, onTakeBreak, onKeepReading, accuracy }: SessionSummaryProps) {
  const [goal, setGoal] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const minutes = Math.max(1, Math.round(timeSpentSeconds / 60));

  useEffect(() => {
    // Add current session time to today's total
    const savedProgress = parseInt(localStorage.getItem('reading_today_minutes') || '0', 10);
    const newProgress = savedProgress + minutes;
    localStorage.setItem('reading_today_minutes', newProgress.toString());
    setProgress(newProgress);

    const savedGoal = localStorage.getItem('reading_goal_minutes');
    if (savedGoal) {
      setGoal(parseInt(savedGoal, 10));
    }
  }, [minutes]);

  const isComplete = goal !== null && progress >= goal;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDF6EC] dark:bg-card px-6">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
        className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-orange-500 shadow-inner"
      >
        <Check size={48} strokeWidth={3} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-slate-900 dark:text-foreground"
      >
        Nice read.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-2 text-center text-sm text-slate-600 dark:text-muted-foreground max-w-[280px]"
      >
        You finished <span className="font-semibold text-slate-900 dark:text-foreground">{title}</span>
      </motion.p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex gap-4 w-full max-w-xs"
      >
        <div className="flex flex-1 flex-col items-center rounded-2xl bg-white dark:bg-muted p-4 shadow-sm border border-slate-100 dark:border-border">
          <Clock size={24} className="mb-2 text-blue-500" />
          <span className="text-xl font-bold text-slate-900 dark:text-foreground">{minutes}m</span>
          <span className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-muted-foreground uppercase tracking-wider">Time</span>
        </div>
        {accuracy !== undefined && (
          <div className="flex flex-1 flex-col items-center rounded-2xl bg-white dark:bg-muted p-4 shadow-sm border border-slate-100 dark:border-border">
            <Award size={24} className="mb-2 text-green-500" />
            <span className="text-xl font-bold text-slate-900 dark:text-foreground">{accuracy}%</span>
            <span className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-muted-foreground uppercase tracking-wider">Quiz</span>
          </div>
        )}
      </motion.div>

      {/* Daily Goal Progress */}
      {goal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 w-full max-w-xs flex items-center justify-between rounded-2xl bg-white dark:bg-muted p-4 shadow-sm border border-slate-100 dark:border-border"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12">
              <svg className="h-12 w-12 -rotate-90 transform">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100 dark:text-background" />
                <circle
                  cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent"
                  strokeDasharray={2 * Math.PI * 20}
                  strokeDashoffset={isComplete ? 0 : (2 * Math.PI * 20) * (1 - Math.min(progress, goal) / goal)}
                  className="text-[#00B894] transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-foreground">{progress} / {goal} min today</span>
              <span className="text-xs font-medium text-[#00B894]">{isComplete ? "Goal reached! 🎉" : "Daily reading goal"}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 flex w-full max-w-xs flex-col gap-3"
      >
        <button
          onClick={onTakeBreak}
          className="w-full rounded-full bg-slate-900 dark:bg-foreground py-4 text-sm font-bold text-white dark:text-background transition-colors hover:bg-slate-800"
        >
          Take a break
        </button>
        <button
          onClick={onKeepReading}
          className="w-full rounded-full bg-orange-100 dark:bg-orange-500/20 py-4 text-sm font-bold text-orange-600 dark:text-orange-400 transition-colors hover:bg-orange-200"
        >
          Keep reading
        </button>
      </motion.div>
    </div>
  );
}
