import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TabType, SavedStory } from '@/types/reddit';

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  savedStories: SavedStory[];
  addSavedStory: (story: Omit<SavedStory, 'readProgress'>) => void;
  updateStoryProgress: (storyId: string, progress: number) => void;
  currentStoryId: string | null;
  setCurrentStoryId: (id: string | null) => void;
  activeStoryPathId: string | null;
  setActiveStoryPathId: (id: string | null) => void;
  toggleCollection: (storyId: string, collection: string, storyData?: Omit<SavedStory, 'readProgress'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [activeStoryPathId, setActiveStoryPathId] = useState<string | null>(null);
  const [savedStories, setSavedStories] = useState<SavedStory[]>([
    {
      id: 'whistlers-1',
      title: 'The Whistlers in the Woods',
      subreddit: 'r/nosleep',
      author: 'u/forest_watcher',
      readProgress: 0,
      timeAgo: '2h ago',
      estimatedReadTime: '15 min read',
    },
  ]);

  const addSavedStory = (story: Omit<SavedStory, 'readProgress'>) => {
    setSavedStories((prev) => {
      const exists = prev.find((s) => s.id === story.id);
      if (exists) return prev;
      return [...prev, { ...story, readProgress: 0 }];
    });
  };

  const updateStoryProgress = (storyId: string, progress: number) => {
    setSavedStories((prev) =>
      prev.map((story) =>
        story.id === storyId ? { ...story, readProgress: progress } : story
      )
    );
  };

  const toggleCollection = (storyId: string, collectionName: string, storyData?: Omit<SavedStory, 'readProgress'>) => {
    setSavedStories((prev) => {
      const existing = prev.find((s) => s.id === storyId);
      if (existing) {
        const collections = existing.collections || [];
        const has = collections.includes(collectionName);
        return prev.map((s) => 
          s.id === storyId ? { ...s, collections: has ? collections.filter(c => c !== collectionName) : [...collections, collectionName] } : s
        );
      } else if (storyData) {
        return [...prev, { ...storyData, readProgress: 0, collections: [collectionName] }];
      }
      return prev;
    });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        savedStories,
        addSavedStory,
        updateStoryProgress,
        currentStoryId,
        setCurrentStoryId,
        activeStoryPathId,
        setActiveStoryPathId,
        toggleCollection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
