import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { SavedStory } from '@/types/reddit';

interface StoryCardProps {
  story: SavedStory;
  onClick: () => void;
}

export function StoryCard({ story, onClick }: StoryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full overflow-hidden rounded-xl bg-card text-left transition-shadow hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-muted to-muted-foreground/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">📖</span>
        </div>
        
        {/* Progress badge */}
        <div className="absolute bottom-2 left-2">
          <span className={`rounded-md px-2 py-1 text-xs font-semibold ${
            story.readProgress === 0 
              ? 'bg-muted/90 text-foreground' 
              : 'bg-primary text-primary-foreground'
          }`}>
            {story.readProgress === 0 ? '0% Read' : `${Math.round(story.readProgress)}% Read`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold leading-tight">
          {story.title}
        </h3>
        <p className="mb-2 text-xs text-muted-foreground">
          {story.subreddit} • {story.author}
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock size={12} />
          <span>{story.estimatedReadTime}</span>
        </div>
      </div>

      {/* Progress bar at bottom */}
      {story.readProgress > 0 && (
        <div className="h-1 w-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${story.readProgress}%` }}
            className="h-full bg-primary"
          />
        </div>
      )}
    </motion.button>
  );
}
