import { Post } from './Post';
import { PromotedPost } from './PromotedPost';
import { Search, Bell } from 'lucide-react';
import { samplePosts } from '@/data/samplePosts';
import { SmartReaderNudge } from './SmartReaderNudge';

export function HomeFeed() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <SmartReaderNudge />

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-orange-600" />
          <span className="text-xl font-bold tracking-tight">reddit</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-full p-2 transition-colors hover:bg-muted">
            <Search size={22} className="text-foreground" />
          </button>
          <button className="rounded-full p-2 transition-colors hover:bg-muted">
            <Bell size={22} className="text-foreground" />
          </button>
        </div>
      </header>

      {/* Sort tabs */}
      <div className="flex items-center gap-3 overflow-x-auto border-b border-border px-4 py-2 scrollbar-hide">
        {['Best', 'Hot', 'New', 'Top', 'Rising'].map((tab, i) => (
          <button
            key={tab}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              i === 0
                ? 'bg-foreground text-background'
                : 'bg-muted text-muted-foreground hover:bg-muted-foreground/20'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Feed with posts and ad */}
      <div className="divide-y divide-border">
        {/* Post 1 - NoSleep */}
        <Post post={samplePosts[0]} />
        
        {/* Post 2 - AskReddit */}
        <Post post={samplePosts[1]} />
        
        {/* Promoted Ad (between Post 2 and Post 3) */}
        <PromotedPost
          company="Skillshare"
          tagline="Unlock your creativity with thousands of classes"
          description="Join millions of creatives learning design, illustration, photography, and more. Get 40% off your first year of Premium membership."
          ctaText="Start Free Trial"
          imageEmoji="🎨"
        />
        
        {/* Post 3 - Technology */}
        <Post post={samplePosts[2]} />
        
        {/* Post 4 - Showerthoughts */}
        <Post post={samplePosts[3]} />
        
        {/* Post 5 - NoSleep 2 */}
        <Post post={samplePosts[4]} />
      </div>
    </div>
  );
}
