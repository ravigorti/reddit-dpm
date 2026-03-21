import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SavedStory } from '@/types/reddit';
import { JumpBackIn } from './JumpBackIn';

interface CollectionViewSheetProps {
  collectionName: string;
  stories: SavedStory[];
  isOpen: boolean;
  onClose: () => void;
}

export function CollectionViewSheet({ collectionName, stories, isOpen, onClose }: CollectionViewSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[90vh] flex-col rounded-t-2xl bg-background"
          >
            <div className="flex shrink-0 justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-muted" />
            </div>
            
            <div className="flex shrink-0 items-center justify-between border-b border-border/50 px-4 pb-4">
              <h2 className="text-xl font-bold">{collectionName}</h2>
              <button onClick={onClose} className="rounded-full bg-muted p-2">
                <X size={20} className="text-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {stories.length === 0 ? (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  No stories in this collection yet
                </div>
              ) : (
                <JumpBackIn stories={stories} hideHeader limit={null} onStoryClick={onClose} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
