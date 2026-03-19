import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SavedStory } from '@/types/reddit';
import { useApp } from '@/context/AppContext';

interface CarouselItem {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  thumbnail?: string;
  emoji?: string;
  readProgress?: number;
  estimatedReadTime?: string;
  readersCount?: number;
  featured?: boolean;
}

interface HorizontalCarouselProps {
  title: string;
  items: CarouselItem[];
  showSeeAll?: boolean;
}

export function HorizontalCarousel({ title, items, showSeeAll = true }: HorizontalCarouselProps) {
  const { setCurrentStoryId, addSavedStory } = useApp();

  const handleItemClick = (item: CarouselItem) => {
    // Add to saved stories if not already there
    addSavedStory({
      id: item.id,
      title: item.title,
      subreddit: item.subreddit,
      author: item.author,
      timeAgo: 'Just now',
      estimatedReadTime: item.estimatedReadTime || '10 min read',
    });
    setCurrentStoryId(item.id);
  };

  return (
    <section className="py-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between px-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {showSeeAll && (
          <button className="flex items-center gap-1 text-sm font-medium text-primary">
            See All <ChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Scrollable row */}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            id={title === 'Trending Near You' && index === 0 ? 'tour-trending-first' : undefined}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleItemClick(item)}
            className="group flex-shrink-0"
          >
            <div className="relative h-36 w-28 overflow-hidden rounded-lg bg-gradient-to-br from-muted to-muted-foreground/30 transition-transform group-hover:scale-105">
              {/* Thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl">{item.emoji || '📖'}</span>
              </div>
              
              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-1 right-1">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs shadow-md">
                    ⭐
                  </span>
                </div>
              )}
              
              {/* Subreddit tag */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6">
                <p className="text-[10px] font-medium text-white/80">{item.subreddit}</p>
              </div>
              
              {/* Progress indicator */}
              {item.readProgress !== undefined && item.readProgress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted-foreground/30">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${item.readProgress}%` }}
                  />
                </div>
              )}
            </div>
            <p className="mt-2 w-28 text-left text-xs font-medium leading-tight line-clamp-2">
              {item.title}
            </p>
            {item.readersCount && (
              <p className="mt-1 w-28 text-left text-[10px] font-semibold text-[#00B894] flex items-center gap-0.5">
                👁 {item.readersCount >= 1000 ? `${(item.readersCount / 1000).toFixed(1)}k` : item.readersCount}
              </p>
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
