import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { storyPaths } from '@/data/storyPaths';
import { StoryPathCard } from './StoryPathCard';
import { getAllStoryProgress } from '@/hooks/useStoryPathProgress';
import { useState, useEffect } from 'react';
import { StoryPathProgress } from '@/types/storyPaths';

interface StoryPathsCarouselProps {
  onStorySelect: (storyId: string) => void;
}

export function StoryPathsCarousel({ onStorySelect }: StoryPathsCarouselProps) {
  const [allProgress, setAllProgress] = useState<Record<string, StoryPathProgress>>({});

  useEffect(() => {
    setAllProgress(getAllStoryProgress());
  }, []);

  return (
    <section id="tour-story-paths" className="py-4">
      {/* Header */}
      <div className="mb-1 flex items-center justify-between px-4">
        <div>
          <h2 className="text-lg font-bold">Story Paths</h2>
          <p className="text-xs text-muted-foreground">Learn history in 5 minutes</p>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-primary">
          See All <ChevronRight size={16} />
        </button>
      </div>

      {/* Scrollable row */}
      <div className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {storyPaths.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StoryPathCard
              story={story}
              progress={allProgress[story.id]}
              onClick={() => onStorySelect(story.id)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
