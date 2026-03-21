import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { leaderboardAuthors } from '@/data/authors';
import { AuthorAnalyticsSheet } from '@/components/AuthorAnalyticsSheet';

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [genreFilter, setGenreFilter] = useState('All Genres');
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  // Filters (static data for now, but we simulate it)
  const filteredAuthors = leaderboardAuthors.filter(a => genreFilter === 'All Genres' || a.genre === genreFilter);
  // We don't resort them because they are hardcoded ranks, or we just re-rank them for the genre
  const displayAuthors = genreFilter === 'All Genres' 
    ? filteredAuthors 
    : filteredAuthors.map((a, idx) => ({ ...a, rank: idx + 1 }));

  const formatReaders = (num: number) => {
    return (num / 1000).toFixed(1) + 'K';
  };

  return (
    <div className="min-h-screen bg-[#0F0F13] text-white pb-24 md:mx-auto md:max-w-[640px] md:relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0F0F13]/95 backdrop-blur border-b border-border/10 pb-4">
        <div className="flex items-center gap-3 px-4 py-4">
          <button onClick={() => navigate(-1)} className="rounded-full p-2.5 transition-colors hover:bg-white/10">
            <ArrowLeft size={22} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            <h1 className="text-xl font-bold tracking-tight">Top Writers</h1>
          </div>
        </div>
        
        <div className="px-5 mb-4">
          <p className="text-sm text-slate-400 leading-relaxed">
            Ranked by readers who actually finished their stories — not clicks, not karma.
          </p>
        </div>

        {/* Time Tabs */}
        <div className="px-4 mb-4">
          <div className="flex rounded-lg bg-white/5 p-1">
            {['This Week', 'This Month', 'All Time'].map(tab => (
              <button
                key={tab}
                onClick={() => setTimeFilter(tab)}
                className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
                  timeFilter === tab ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Genre Pills */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide">
          {['All Genres', 'Horror', 'Mystery', 'Sci-Fi', 'True Crime', 'History'].map(genre => (
            <button
              key={genre}
              onClick={() => setGenreFilter(genre)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                genreFilter === genre
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </header>

      {/* List */}
      <div className="p-4 space-y-3">
        {displayAuthors.map((author, index) => {
          const isGold = index === 0;
          const isSilver = index === 1;
          const isBronze = index === 2;
          
          let cardClasses = 'relative rounded-2xl p-4 transition-transform active:scale-[0.98] border ';
          let rankColor = 'text-slate-500';
          let borderOverlay = null;

          if (isGold) {
            cardClasses += 'bg-gradient-to-br from-[#FFD700]/10 to-transparent border-[#FFD700]/30 py-5 ';
            rankColor = 'text-[#FFD700]';
            borderOverlay = <div className="absolute inset-0 rounded-2xl border-2 border-[#FFD700]/10 pointer-events-none" />;
          } else if (isSilver) {
            cardClasses += 'bg-white/[0.03] border-[#C0C0C0]/20 ';
            rankColor = 'text-[#C0C0C0]';
          } else if (isBronze) {
            cardClasses += 'bg-white/[0.02] border-[#CD7F32]/20 ';
            rankColor = 'text-[#CD7F32]';
          } else {
            cardClasses += 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04] ';
          }

          return (
            <motion.div
              key={author.username}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedAuthor(author.username)}
              className={cardClasses + " cursor-pointer flex items-center gap-4"}
            >
              {borderOverlay}
              
              {/* Rank */}
              <div className={`w-6 text-center text-lg font-bold font-mono ${rankColor}`}>
                #{author.rank}
              </div>

              {/* Avatar */}
              <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${author.avatarGradient} text-sm font-bold shadow-inner text-white`}>
                {author.initials}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="font-bold truncate text-base">{author.username}</h3>
                  <div className="flex-shrink-0 flex items-center justify-center h-4 w-4 bg-orange-500/20 text-orange-500 rounded-full" title="Featured in Reads">
                    <span className="text-[8px]">⭐</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 font-semibold text-[#00B894]">
                    <span className="text-[14px]">👁</span> {formatReaders(author.readers)} <span className="text-slate-400 font-normal">readers</span>
                  </div>
                  <div className="text-slate-600">•</div>
                  <div className="flex items-center gap-1 text-slate-300">
                    <CheckCircle2 size={12} className="text-[#00B894]" /> {author.completionRate}%
                  </div>
                  <div className="text-slate-600">•</div>
                  <div className="flex items-center gap-1 text-slate-300">
                    <span className="text-[12px]">📚</span> {author.storiesFeatured}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sticky User Rank */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F0F13]/95 backdrop-blur border-t border-white/10 p-4 md:absolute md:top-auto md:w-full max-w-[640px] mx-auto hidden sm:block md:flex">
        <div className="flex w-full items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white mb-0.5">Your Rank: #47</div>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-[#00B894]">2.1K <span className="text-slate-400 font-normal">readers</span></span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">72% <span className="text-slate-500">done</span></span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">1 <span className="text-slate-500">story</span></span>
            </div>
          </div>
          <button 
            onClick={() => setSelectedAuthor('u/your_username')}
            className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold transition-colors hover:bg-white/20"
          >
            View Stats
          </button>
        </div>
      </div>
      
      {/* Mobile Sticky User Rank - distinct class to ensure layout without hidden side effects */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F0F13]/95 backdrop-blur border-t border-white/10 p-4">
        <div className="flex w-full items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white mb-0.5">Your Rank: #47</div>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-[#00B894]">2.1K <span className="text-slate-400 font-normal">readers</span></span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">72% <span className="text-slate-500">done</span></span>
            </div>
          </div>
          <button 
            onClick={() => setSelectedAuthor('u/your_username')}
            className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold transition-colors hover:bg-white/20"
          >
            Stats
          </button>
        </div>
      </div>

      <AuthorAnalyticsSheet
        isOpen={selectedAuthor !== null}
        onClose={() => setSelectedAuthor(null)}
        authorUsername={selectedAuthor || ''}
      />
    </div>
  );
}
