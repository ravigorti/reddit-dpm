import { useState } from 'react';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post as PostType } from '@/types/reddit';
import { SaveBottomSheet } from './SaveBottomSheet';
import { useApp } from '@/context/AppContext';

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [votes, setVotes] = useState(post.upvotes);
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const { addSavedStory } = useApp();

  const handleVote = (direction: 'up' | 'down') => {
    if (voteState === direction) {
      setVoteState(null);
      setVotes(post.upvotes);
    } else {
      setVoteState(direction);
      setVotes(post.upvotes + (direction === 'up' ? 1 : -1));
    }
  };

  const handleSave = (collection: string) => {
    setIsSaved(true);
    if (collection === 'Read Later') {
      addSavedStory({
        id: post.id,
        title: post.title,
        subreddit: post.subreddit,
        author: post.author,
        timeAgo: post.timeAgo,
        estimatedReadTime: '15 min read',
      });
    }
  };

  return (
    <>
      <article className="border-b border-border bg-card">
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-orange-600" />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{post.subreddit}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
            </div>
            <span className="text-xs text-muted-foreground">{post.author}</span>
          </div>
          <button className="rounded-full p-2 transition-colors hover:bg-muted">
            <MoreHorizontal size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-3">
          <h2 className="mb-2 text-base font-semibold leading-tight">{post.title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4">
            {post.content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 px-3 pb-3">
          {/* Vote buttons */}
          <div className="flex items-center rounded-full bg-muted">
            <button
              onClick={() => handleVote('up')}
              className="flex items-center gap-1 rounded-l-full px-3 py-1.5 transition-colors hover:bg-muted-foreground/20"
            >
              <ArrowBigUp
                size={22}
                className={voteState === 'up' ? 'fill-primary text-primary' : 'text-muted-foreground'}
              />
            </button>
            <span className={`text-sm font-medium ${voteState === 'up' ? 'text-primary' : voteState === 'down' ? 'text-reddit-downvote' : ''}`}>
              {votes >= 1000 ? `${(votes / 1000).toFixed(1)}k` : votes}
            </span>
            <button
              onClick={() => handleVote('down')}
              className="flex items-center gap-1 rounded-r-full px-3 py-1.5 transition-colors hover:bg-muted-foreground/20"
            >
              <ArrowBigDown
                size={22}
                className={voteState === 'down' ? 'fill-reddit-downvote text-reddit-downvote' : 'text-muted-foreground'}
              />
            </button>
          </div>

          {/* Comments */}
          <button className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 transition-colors hover:bg-muted-foreground/20">
            <MessageSquare size={18} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{post.comments}</span>
          </button>

          {/* Share */}
          <button className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 transition-colors hover:bg-muted-foreground/20">
            <Share2 size={18} className="text-muted-foreground" />
          </button>

          {/* Save */}
          <button
            onClick={() => setIsSheetOpen(true)}
            className="ml-auto flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 transition-colors hover:bg-muted-foreground/20"
          >
            <Bookmark
              size={18}
              className={isSaved ? 'fill-primary text-primary' : 'text-muted-foreground'}
            />
          </button>
        </div>
      </article>

      <SaveBottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
