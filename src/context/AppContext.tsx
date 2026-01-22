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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [savedStories, setSavedStories] = useState<SavedStory[]>([
    {
      id: '1',
      title: 'The Whistlers in the Woods (Part 1)',
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
