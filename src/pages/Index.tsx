import { AppProvider, useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { HomeFeed } from '@/components/HomeFeed';
import { ReadsLibrary } from '@/components/ReadsLibrary';
import { ReaderView } from '@/components/ReaderView';
import { PlaceholderView } from '@/components/PlaceholderView';
import { AnimatePresence, motion } from 'framer-motion';

function AppContent() {
  const { activeTab, currentStoryId } = useApp();

  // If viewing a story, show reader
  if (currentStoryId) {
    return <ReaderView />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === 'home' && <HomeFeed />}
          {activeTab === 'communities' && <PlaceholderView type="communities" />}
          {activeTab === 'reads' && <ReadsLibrary />}
          {activeTab === 'chat' && <PlaceholderView type="chat" />}
        </motion.div>
      </AnimatePresence>
      
      <BottomNav />
    </div>
  );
}

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
