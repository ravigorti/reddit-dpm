import { useState } from 'react';
import { Post } from './Post';
import { NormalPostView } from './NormalPostView';
import { PromotedPost } from './PromotedPost';
import { Search, Bell } from 'lucide-react';
import { samplePosts } from '@/data/samplePosts';
import { SmartReaderNudge } from './SmartReaderNudge';
import { Post as PostType } from '@/types/reddit';

export function HomeFeed() {
  const [viewingPost, setViewingPost] = useState<PostType | null>(null);

  // Build a mixed feed: reads posts + normal posts interleaved
  const readsPostsForFeed = samplePosts.filter(p => p.isReadsPost).slice(0, 3);
  const normalPosts = samplePosts.filter(p => !p.isReadsPost);
  
  // Mix them: reads, normal, reads, normal, promoted ad, normal, reads...
  const feedPosts: PostType[] = [
    readsPostsForFeed[0],   // Whistlers (reads)
    normalPosts[0],          // TIL octopus (normal)
    normalPosts[1],          // Life hack (normal)
    readsPostsForFeed[1],   // French Revolution (reads)
    normalPosts[2],          // Dragon cloud (normal)
    readsPostsForFeed[2],   // AskReddit intelligence (reads)
    normalPosts[3],          // Charging station (normal)
  ].filter(Boolean);

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

      {/* Feed with mixed posts and ad */}
      <div className="divide-y divide-border">
        {feedPosts.slice(0, 3).map(post => (
          <Post key={post.id} post={post} onNormalPostClick={setViewingPost} />
        ))}
        
        {/* Promoted Ad */}
        <PromotedPost
          company="Skillshare"
          tagline="Unlock your creativity with thousands of classes"
          description="Join millions of creatives learning design, illustration, photography, and more. Get 40% off your first year of Premium membership."
          ctaText="Start Free Trial"
          imageEmoji="🎨"
        />
        
        {feedPosts.slice(3).map(post => (
          <Post key={post.id} post={post} onNormalPostClick={setViewingPost} />
        ))}
      </div>

      {/* Normal Post expanded view */}
      {viewingPost && (
        <NormalPostView
          post={viewingPost}
          isOpen={true}
          onClose={() => setViewingPost(null)}
        />
      )}
    </div>
  );
}
