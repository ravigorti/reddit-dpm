import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function SmartReaderNudge() {
  const [isVisible, setIsVisible] = useState(false);
  const { setActiveTab } = useApp();

  useEffect(() => {
    const hasBeenShown = localStorage.getItem('nudge_shown_this_session');
    if (hasBeenShown) return;

    const handleScroll = () => {
      // Trigger if passed ~ 1500px of scrolling which implies deep reading of long content
      // Real implementation would track specific DOM nodes, here we approximate deep scroll
      if (window.scrollY > 1500 && !hasBeenShown) {
        setIsVisible(true);
        localStorage.setItem('nudge_shown_this_session', 'true');
        window.removeEventListener('scroll', handleScroll);
        
        // Auto dismiss after 8 seconds
        setTimeout(() => setIsVisible(false), 8000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="fixed bottom-20 left-4 right-4 z-50 md:left-1/2 md:w-[480px] md:-translate-x-1/2"
      >
        <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-white shadow-2xl">
          <BookOpen size={24} className="text-primary flex-shrink-0" />
          <div className="flex-1 cursor-pointer" onClick={() => setActiveTab('reads')}>
            <p className="text-sm font-medium leading-tight">Enjoying this? Try Reader Mode for a cleaner experience →</p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 rounded-full p-1.5 transition-colors hover:bg-slate-800"
          >
            <X size={16} className="text-slate-400" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
