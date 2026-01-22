import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Heart, Plus, FolderPlus } from 'lucide-react';
import { toast } from 'sonner';

interface SaveBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collection: string) => void;
}

const collections = [
  { id: 'read-later', name: 'Read Later', icon: Clock },
  { id: 'favorites', name: 'Favorites', icon: Heart },
];

export function SaveBottomSheet({ isOpen, onClose, onSave }: SaveBottomSheetProps) {
  const handleSave = (collectionName: string) => {
    onSave(collectionName);
    onClose();
    toast.success(`Saved to ${collectionName}`, {
      duration: 2000,
      className: 'bg-card text-foreground border-border',
    });
  };

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
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-card"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="h-1 w-10 rounded-full bg-muted" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-4">
              <h2 className="text-lg font-semibold">Save to Collection</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 transition-colors hover:bg-muted"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Collections */}
            <div className="space-y-1 px-4 pb-4">
              {collections.map((collection) => {
                const Icon = collection.icon;
                return (
                  <button
                    key={collection.id}
                    onClick={() => handleSave(collection.name)}
                    className="flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-muted"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Icon size={20} className="text-foreground" />
                    </div>
                    <span className="font-medium">{collection.name}</span>
                  </button>
                );
              })}

              {/* New Collection */}
              <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-muted">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground">
                  <Plus size={20} className="text-muted-foreground" />
                </div>
                <span className="font-medium text-muted-foreground">New Collection</span>
              </button>
            </div>

            {/* Safe area padding */}
            <div className="h-8" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
