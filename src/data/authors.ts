export interface AuthorStats {
  rank: number;
  username: string;
  readers: number;
  completionRate: number;
  storiesFeatured: number;
  genre: string;
  avatarGradient: string;
  initials: string;
  timeEarned: number;
  avgTimePerReader: number;
}

export const leaderboardAuthors: AuthorStats[] = [
  { rank: 1, username: 'u/forest_watcher', readers: 45200, completionRate: 82, storiesFeatured: 7, genre: 'Horror', avatarGradient: 'from-emerald-500 to-teal-700', initials: 'FW', timeEarned: 847, avgTimePerReader: 14 },
  { rank: 2, username: 'u/midnight_historian', readers: 38700, completionRate: 88, storiesFeatured: 5, genre: 'History', avatarGradient: 'from-amber-500 to-orange-700', initials: 'MH', timeEarned: 1240, avgTimePerReader: 19 },
  { rank: 3, username: 'u/the_last_archivist', readers: 31400, completionRate: 79, storiesFeatured: 6, genre: 'Mystery', avatarGradient: 'from-purple-500 to-indigo-700', initials: 'TL', timeEarned: 1050, avgTimePerReader: 20 },
  { rank: 4, username: 'u/curious_mind_42', readers: 28100, completionRate: 71, storiesFeatured: 4, genre: 'Sci-Fi', avatarGradient: 'from-blue-500 to-cyan-700', initials: 'CM', timeEarned: 312, avgTimePerReader: 11 },
  { rank: 5, username: 'u/campfire_tales', readers: 24800, completionRate: 85, storiesFeatured: 8, genre: 'Horror', avatarGradient: 'from-red-500 to-orange-700', initials: 'CT', timeEarned: 580, avgTimePerReader: 14 },
  { rank: 6, username: 'u/deep_thread_diver', readers: 21300, completionRate: 76, storiesFeatured: 3, genre: 'True Crime', avatarGradient: 'from-slate-500 to-slate-800', initials: 'DT', timeEarned: 410, avgTimePerReader: 12 },
  { rank: 7, username: 'u/quantum_narratives', readers: 18900, completionRate: 73, storiesFeatured: 5, genre: 'Sci-Fi', avatarGradient: 'from-fuchsia-500 to-purple-700', initials: 'QN', timeEarned: 395, avgTimePerReader: 13 },
  { rank: 8, username: 'u/old_soul_stories', readers: 16200, completionRate: 91, storiesFeatured: 2, genre: 'History', avatarGradient: 'from-yellow-600 to-amber-800', initials: 'OS', timeEarned: 620, avgTimePerReader: 23 },
  { rank: 9, username: 'u/urban_myth_collector', readers: 14700, completionRate: 68, storiesFeatured: 4, genre: 'Horror', avatarGradient: 'from-rose-500 to-red-700', initials: 'UM', timeEarned: 240, avgTimePerReader: 10 },
  { rank: 10, username: 'u/silent_observer_99', readers: 12100, completionRate: 77, storiesFeatured: 3, genre: 'Mystery', avatarGradient: 'from-gray-400 to-gray-600', initials: 'SO', timeEarned: 310, avgTimePerReader: 15 },
];
