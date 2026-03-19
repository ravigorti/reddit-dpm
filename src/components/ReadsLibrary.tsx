import { Search, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { JumpBackIn } from './JumpBackIn';
import { HorizontalCarousel } from './HorizontalCarousel';
import { StoryPathsCarousel } from './story-paths/StoryPathsCarousel';
import { carouselData } from '@/data/samplePosts';
import { ReadsIntroWalkthrough } from './ReadsIntroWalkthrough';
import { DailyReadingGoal } from './DailyReadingGoal';

export function ReadsLibrary() {
  const { savedStories, setActiveStoryPathId } = useApp();

  return (
    <div className="min-h-screen bg-background pb-20">
      <ReadsIntroWalkthrough />
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-2xl font-bold">Reads</h1>
          <div className="flex items-center gap-2">
            <button className="rounded-full p-2 transition-colors hover:bg-muted">
              <Search size={22} className="text-foreground" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-muted">
              <User size={22} className="text-foreground" />
            </button>
          </div>
        </div>
        
        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 scrollbar-hide">
          {['All', 'Horror', 'Mystery', 'Sci-Fi', 'Romance', 'True Crime'].map((category, i) => (
            <button
              key={category}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                i === 0
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Daily Reading Goal */}
      <DailyReadingGoal />

      {/* Jump Back In Section */}
      <JumpBackIn stories={savedStories} />

      {/* Separator */}
      <div className="mx-4 border-t border-border" />

      {/* Story Paths */}
      <StoryPathsCarousel onStorySelect={(id) => setActiveStoryPathId(id)} />

      {/* Separator */}
      <div className="mx-4 border-t border-border" />

      {/* Trending Near You */}
      <HorizontalCarousel 
        title="Trending Near You" 
        items={carouselData.trendingNearYou.map(item => ({
          ...item,
          estimatedReadTime: '12 min read',
        }))} 
      />

      {/* Popular Genres */}
      <HorizontalCarousel 
        title="Popular Genres" 
        items={carouselData.popularGenres}
        showSeeAll={false}
      />

      {/* Top on Reddit */}
      <HorizontalCarousel 
        title="Top on Reddit" 
        items={carouselData.topOnReddit.map(item => ({
          ...item,
          estimatedReadTime: '20 min read',
        }))} 
      />

      {/* Continue Your Collections */}
      <section className="px-4 py-4">
        <h2 className="mb-3 text-lg font-bold">Your Collections</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center justify-center rounded-xl bg-card p-6 transition-colors hover:bg-muted">
            <span className="mb-2 text-3xl">📚</span>
            <span className="text-sm font-medium">Read Later</span>
            <span className="text-xs text-muted-foreground">{savedStories.length} stories</span>
          </button>
          <button className="flex flex-col items-center justify-center rounded-xl bg-card p-6 transition-colors hover:bg-muted">
            <span className="mb-2 text-3xl">❤️</span>
            <span className="text-sm font-medium">Favorites</span>
            <span className="text-xs text-muted-foreground">0 stories</span>
          </button>
        </div>
      </section>
    </div>
  );
}
