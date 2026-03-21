import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    id: 'tour-reads-nav',
    title: 'Welcome to Reads! 📖',
    body: 'Your personal reading sanctuary. Distraction-free stories, picked for you.',
    button: 'Next →',
    placement: 'top',
  },
  {
    id: 'tour-story-paths',
    title: 'Try a Story Path ✨',
    body: '5-minute visual stories about history, science, and culture. With quizzes and dramatic music!',
    button: 'Next →',
    placement: 'bottom',
  },
  {
    id: 'tour-trending-first',
    title: 'Tap any story for Reader Mode 🎯',
    body: 'Clean, focused reading. No ads, no clutter. Your progress saves automatically.',
    button: 'Got it! ✓',
    placement: 'bottom',
  },
];

export function ReadsIntroWalkthrough() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    // Only show if haven't completed
    const hasCompleted = localStorage.getItem('ftue_reads_completed');
    if (!hasCompleted) {
      // Small delay to let UI render
      const t = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(t);
    }
  }, []);

  const updateRect = useCallback(() => {
    if (!isVisible) return;
    const step = STEPS[currentStep];
    const el = document.getElementById(step.id);
    if (el) {
      setRect(el.getBoundingClientRect());
    } else {
      // Elements might take a bit to render or be off-screen. Wait and retry.
      setTimeout(() => {
        const retryEl = document.getElementById(step.id);
        if (retryEl) setRect(retryEl.getBoundingClientRect());
      }, 200);
    }
  }, [currentStep, isVisible]);

  useEffect(() => {
    // Update rect when step changes or window resizes
    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [updateRect]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      dismiss();
    }
  };

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ftue_reads_completed', 'true');
  };

  if (!isVisible || !rect) return null;

  const step = STEPS[currentStep];

  // Calculate tooltip position safely within viewport
  const padding = 16;
  const tooltipHeight = 160;
  let top = rect.bottom + 16;

  if (step.placement === 'top') {
    top = rect.top - 16 - tooltipHeight;
  }

  // Clamp top to keep tooltip on-screen
  top = Math.max(padding, Math.min(window.innerHeight - tooltipHeight - padding, top));

  // Try to center, but keep inside viewport bounds
  let left = rect.left + rect.width / 2;
  const halfWidth = 140; // 280px width / 2
  const minLeft = halfWidth + padding;
  const maxLeft = window.innerWidth - halfWidth - padding;
  left = Math.max(minLeft, Math.min(maxLeft, left));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] overflow-hidden pointer-events-auto" onClick={dismiss}>
        {/* Spotlight Hole using Box Shadow */}
        <div style={{
          position: 'absolute',
          top: rect.top - 8,
          left: Math.max(0, rect.left - 8),
          width: Math.min(window.innerWidth - Math.max(0, rect.left - 8), rect.width + 16),
          height: rect.height + 16,
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)',
          borderRadius: '12px',
          pointerEvents: 'none',
          transition: 'all 0.3s ease-in-out'
        }} />

        {/* Tooltip Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute w-[280px] -translate-x-1/2 rounded-xl bg-[#1A1A2E] p-4 text-white shadow-xl"
          style={{
            top,
            left,
            transition: 'top 0.3s ease-in-out, left 0.3s ease-in-out'
          }}
        >
          {/* Arrow pointing at target */}
          <div
            className="absolute h-4 w-4 rotate-45 bg-[#1A1A2E]"
            style={{
              [step.placement === 'top' ? 'bottom' : 'top']: -6,
              left: '50%',
              marginLeft: -8
            }}
          />

          <div className="relative z-10">
            <h3 className="mb-2 font-bold leading-tight">{step.title}</h3>
            <p className="mb-4 text-sm text-slate-300 leading-relaxed">{step.body}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {STEPS.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentStep ? 'w-4 bg-white' : 'w-1.5 bg-white/30'}`} />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#1A1A2E] hover:bg-slate-200 transition-colors"
              >
                {step.button}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
