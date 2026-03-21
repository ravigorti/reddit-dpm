export interface Post {
  id: string;
  subreddit: string;
  author: string;
  title: string;
  content: string;
  upvotes: number;
  comments: number;
  timeAgo: string;
  isSaved?: boolean;
  readersCount?: number;
  featured?: boolean;
  nextPartId?: string;
  partNumber?: number;
}

export interface Collection {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface SavedStory {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  readProgress: number;
  timeAgo: string;
  estimatedReadTime: string;
}

export type TabType = 'home' | 'communities' | 'reads' | 'chat';
