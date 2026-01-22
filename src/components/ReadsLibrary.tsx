import { Clock, Heart, FolderPlus, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { StoryCard } from './StoryCard';

type ViewType = 'collections' | 'read-later';

const collections = [
  { id: 'read-later', name: 'Read Later', icon: Clock, count: 1 },
  { id: 'favorites', name: 'Favorites', icon: Heart, count: 0 },
];

export function ReadsLibrary() {
  const [currentView, setCurrentView] = useState<ViewType>('collections');
  const { savedStories, setCurrentStoryId, setActiveTab } = useApp();

  const handleStoryClick = (storyId: string) => {
    setCurrentStoryId(storyId);
  };

  const handleBack = () => {
    setCurrentView('collections');
  };

  if (currentView === 'read-later') {
    return (
      <div className="min-h-screen bg-background pb-20">
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-card">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={handleBack}
              className="rounded-full p-2 transition-colors hover:bg-muted"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="text-lg font-semibold">Read Later</h1>
          </div>
        </header>

        {/* Stories Grid */}
        <div className="p-4">
          {savedStories.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {savedStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onClick={() => handleStoryClick(story.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Clock size={48} className="mb-4 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium">No stories saved yet</h3>
              <p className="text-sm text-muted-foreground">
                Save long posts to read them later
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <h1 className="text-2xl font-bold">Reads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your saved stories and reading lists
        </p>
      </header>

      {/* Collections */}
      <div className="p-4">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Collections
        </h2>
        <div className="space-y-2">
          {collections.map((collection, index) => {
            const Icon = collection.icon;
            const hasStories = collection.id === 'read-later' && savedStories.length > 0;
            
            return (
              <motion.button
                key={collection.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => collection.id === 'read-later' && setCurrentView('read-later')}
                className="flex w-full items-center gap-4 rounded-xl bg-card p-4 text-left transition-colors hover:bg-muted"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                  hasStories ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <Icon size={24} className={hasStories ? 'text-primary' : 'text-muted-foreground'} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{collection.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {collection.id === 'read-later' ? savedStories.length : collection.count} {collection.count === 1 || savedStories.length === 1 ? 'story' : 'stories'}
                  </p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </motion.button>
            );
          })}

          {/* Add Collection */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex w-full items-center gap-4 rounded-xl border-2 border-dashed border-muted p-4 text-left transition-colors hover:border-muted-foreground hover:bg-muted/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <FolderPlus size={24} className="text-muted-foreground" />
            </div>
            <span className="font-medium text-muted-foreground">Create Collection</span>
          </motion.button>
        </div>
      </div>

      {/* Reading Stats */}
      <div className="px-4 pt-4">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Your Reading
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-card p-4">
            <p className="text-2xl font-bold">{savedStories.length}</p>
            <p className="text-sm text-muted-foreground">Stories saved</p>
          </div>
          <div className="rounded-xl bg-card p-4">
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
