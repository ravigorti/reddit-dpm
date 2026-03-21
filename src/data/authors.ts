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
  sampleStories?: { title: string; views: number; hoursSpent: number }[];
}

export const leaderboardAuthors: AuthorStats[] = [
  { rank: 1, username: 'u/forest_watcher', readers: 45200, completionRate: 82, storiesFeatured: 7, genre: 'Horror', avatarGradient: 'from-emerald-500 to-teal-700', initials: 'FW', timeEarned: 847, avgTimePerReader: 14, sampleStories: [{ title: 'The Whistlers in the Woods (Part 1)', views: 12400, hoursSpent: 310 }, { title: 'The Whistlers in the Woods (Part 2)', views: 4100, hoursSpent: 102 }, { title: 'The Stairs in the Woods', views: 12400, hoursSpent: 248 }] },
  { rank: 2, username: 'u/midnight_historian', readers: 38700, completionRate: 88, storiesFeatured: 5, genre: 'History', avatarGradient: 'from-amber-500 to-orange-700', initials: 'MH', timeEarned: 1240, avgTimePerReader: 19, sampleStories: [{ title: 'How bread sparked the French Revolution', views: 38700, hoursSpent: 1240 }, { title: 'The Fall of Constantinople', views: 21300, hoursSpent: 640 }] },
  { rank: 3, username: 'u/the_last_archivist', readers: 31400, completionRate: 79, storiesFeatured: 6, genre: 'Mystery', avatarGradient: 'from-purple-500 to-indigo-700', initials: 'TL', timeEarned: 1050, avgTimePerReader: 20, sampleStories: [{ title: 'The Vanishing Case Files', views: 15200, hoursSpent: 380 }, { title: 'Cipher of the Lost Library', views: 9800, hoursSpent: 294 }] },
  { rank: 4, username: 'u/curious_mind_42', readers: 28100, completionRate: 71, storiesFeatured: 4, genre: 'Sci-Fi', avatarGradient: 'from-blue-500 to-cyan-700', initials: 'CM', timeEarned: 312, avgTimePerReader: 11, sampleStories: [{ title: 'Subtle Signs of Intelligence', views: 8200, hoursSpent: 312 }, { title: 'The Paradox of Overthinking', views: 5400, hoursSpent: 162 }] },
  { rank: 5, username: 'u/campfire_tales', readers: 24800, completionRate: 85, storiesFeatured: 8, genre: 'Horror', avatarGradient: 'from-red-500 to-orange-700', initials: 'CT', timeEarned: 580, avgTimePerReader: 14, sampleStories: [{ title: 'The Thing by the Lake', views: 11200, hoursSpent: 224 }, { title: 'Don\'t Follow the Lights', views: 8900, hoursSpent: 178 }] },
  { rank: 6, username: 'u/deep_thread_diver', readers: 21300, completionRate: 76, storiesFeatured: 3, genre: 'True Crime', avatarGradient: 'from-slate-500 to-slate-800', initials: 'DT', timeEarned: 410, avgTimePerReader: 12, sampleStories: [{ title: 'The Cold Case Reopened', views: 10500, hoursSpent: 210 }] },
  { rank: 7, username: 'u/quantum_narratives', readers: 18900, completionRate: 73, storiesFeatured: 5, genre: 'Sci-Fi', avatarGradient: 'from-fuchsia-500 to-purple-700', initials: 'QN', timeEarned: 395, avgTimePerReader: 13, sampleStories: [{ title: 'Entangled Realities', views: 9200, hoursSpent: 184 }] },
  { rank: 8, username: 'u/old_soul_stories', readers: 16200, completionRate: 91, storiesFeatured: 2, genre: 'History', avatarGradient: 'from-yellow-600 to-amber-800', initials: 'OS', timeEarned: 620, avgTimePerReader: 23, sampleStories: [{ title: 'Letters from the Trenches', views: 8100, hoursSpent: 324 }] },
  { rank: 9, username: 'u/urban_myth_collector', readers: 14700, completionRate: 68, storiesFeatured: 4, genre: 'Horror', avatarGradient: 'from-rose-500 to-red-700', initials: 'UM', timeEarned: 240, avgTimePerReader: 10, sampleStories: [{ title: 'The Elevator Game', views: 7400, hoursSpent: 148 }] },
  { rank: 10, username: 'u/silent_observer_99', readers: 12100, completionRate: 77, storiesFeatured: 3, genre: 'Mystery', avatarGradient: 'from-gray-400 to-gray-600', initials: 'SO', timeEarned: 310, avgTimePerReader: 15, sampleStories: [{ title: 'The Watcher Next Door', views: 6100, hoursSpent: 183 }] },
];

