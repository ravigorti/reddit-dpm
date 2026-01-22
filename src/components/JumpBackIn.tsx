import { Play, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { SavedStory } from '@/types/reddit';
import { useApp } from '@/context/AppContext';

interface JumpBackInProps {
  stories: SavedStory[];
}

export function JumpBackIn({ stories }: JumpBackInProps) {
  const { setCurrentStoryId } = useApp();

  if (stories.length === 0) return null;

  const inProgressStories = stories.filter(s => s.readProgress > 0 && s.readProgress < 100);
  const notStartedStories = stories.filter(s => s.readProgress === 0);
  
  const displayStories = [...inProgressStories, ...notStartedStories].slice(0, 3);

  if (displayStories.length === 0) return null;

  return (
    <section className="px-4 py-4">
      <h2 className="mb-3 text-lg font-bold">Jump Back In</h2>
      
      <div className="space-y-3">
        {displayStories.map((story, index) => (
          <motion.button
            key={story.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setCurrentStoryId(story.id)}
            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-xl bg-card p-3 text-left transition-colors hover:bg-muted"
          >
            {/* Thumbnail */}
            <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-orange-600/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">📖</span>
              </div>
              
              {/* Play overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <Play size={16} className="ml-0.5 fill-background text-background" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="mb-0.5 text-xs font-medium text-primary">{story.subreddit}</p>
              <h3 className="mb-1 truncate text-sm font-semibold">{story.title}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{story.author}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock size={10} />
                  <span>{story.estimatedReadTime}</span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${story.readProgress}%` }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {story.readProgress === 0 ? 'Not started' : `${Math.round(story.readProgress)}% complete`}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
