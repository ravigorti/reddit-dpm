import { Search, User, Trophy } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { JumpBackIn } from './JumpBackIn';
import { HorizontalCarousel } from './HorizontalCarousel';
import { StoryPathsCarousel } from './story-paths/StoryPathsCarousel';
import { carouselData } from '@/data/samplePosts';
import { ReadsIntroWalkthrough } from './ReadsIntroWalkthrough';
import { DailyReadingGoal } from './DailyReadingGoal';
import { CollectionViewSheet } from './CollectionViewSheet';
import { useState } from 'react';

export function ReadsLibrary() {
  const { savedStories, setActiveStoryPathId } = useApp();
  const navigate = useNavigate();
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const readLaterCount = savedStories.filter(s => s.collections?.includes('Read Later')).length;
  const favoritesCount = savedStories.filter(s => s.collections?.includes('Favorites')).length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <ReadsIntroWalkthrough />
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-2xl font-bold">Reads</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/reads/leaderboard')}
              className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1.5 transition-colors hover:bg-yellow-500/20 border border-yellow-500/20 text-yellow-500"
            >
              <Trophy size={16} />
              <span className="text-xs font-bold">Top Writers</span>
            </button>
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
          <button onClick={() => setActiveCollection('Read Later')} className="flex flex-col items-center justify-center rounded-xl bg-card p-6 transition-colors hover:bg-muted">
            <span className="mb-2 text-3xl">📚</span>
            <span className="text-sm font-medium">Read Later</span>
            <span className="text-xs text-muted-foreground">{readLaterCount} stories</span>
          </button>
          <button onClick={() => setActiveCollection('Favorites')} className="flex flex-col items-center justify-center rounded-xl bg-card p-6 transition-colors hover:bg-muted">
            <span className="mb-2 text-3xl">❤️</span>
            <span className="text-sm font-medium">Favorites</span>
            <span className="text-xs text-muted-foreground">{favoritesCount} stories</span>
          </button>
        </div>
      </section>

      <CollectionViewSheet 
        isOpen={activeCollection !== null}
        onClose={() => setActiveCollection(null)}
        collectionName={activeCollection || ''}
        stories={savedStories.filter(s => s.collections?.includes(activeCollection || ''))}
      />
    </div>
  );
}
