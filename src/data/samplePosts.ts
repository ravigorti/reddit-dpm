import { Post } from '@/types/reddit';

export const whistlersContent = `It started three weeks ago, on my first night shift at the Blackwood Ranger Station. The station sits at the edge of a 50,000-acre forest preserve, miles from the nearest town. My supervisor, Dale, had warned me about the isolation.

"Most folks can't handle the silence," he'd said, handing me the keys. "But you'll get used to it. Just don't go wandering after dark."

I thought he was being dramatic. I was wrong.

The first night was quiet—eerily so. No crickets, no owls, no wind through the pines. Just that heavy, pressing silence that makes your ears ring. Around 2 AM, I was halfway through a thermos of coffee when I heard it: a low, melodic whistle drifting through the trees.

Three notes. Ascending. Like someone calling a dog.

I stepped onto the porch, flashlight in hand. The beam cut through the darkness, illuminating nothing but endless rows of pine trees. The whistling had stopped.

"Hello?" My voice seemed to die the moment it left my lips, swallowed by the forest.

Nothing.

I went back inside and locked the door. Probably just a bird, I told myself. Some nocturnal species I didn't recognize.

But birds don't whistle in perfect musical intervals.

The second night, it happened again. Same time. Same three notes. But this time, when I looked out the window, I saw something that made my blood freeze. About fifty yards from the station, at the edge of the tree line, stood a figure.

Tall. Impossibly tall. At least seven feet, maybe more. Its proportions were wrong—arms too long, legs bent at strange angles. And it was pale, so pale it seemed to glow in the moonlight.

It was whistling.

I grabbed the emergency radio, hands shaking. "Base, this is Station Seven. I've got a... a person outside. Requesting backup."

Static. Then Dale's voice: "Station Seven, repeat your message?"

I looked back at the window.

The figure was gone.

"Never mind," I said. "Must have been a deer."

But deer don't whistle. And deer don't leave footprints with only three toes.

I found those prints the next morning, pressed deep into the mud around the station. They circled the building twice before disappearing back into the forest. Each print was nearly a foot long, with deep gouges where the toes—if that's what they were—had dug into the earth.

I should have quit right then. Should have driven back to town and never looked back. But something kept me there. Curiosity, maybe. Or something worse.

That third night, I set up a trail camera facing the tree line. I sat in the dark, watching, waiting. At 2 AM, the whistle came again. Three notes. Ascending.

But this time, it wasn't alone.

From somewhere deeper in the forest, another whistle answered. Same three notes. Then another. And another. Soon the night was filled with them, a chorus of whistles echoing through the trees. Dozens of them. Maybe hundreds.

I didn't sleep that night. I sat with my back against the wall, shotgun across my knees, listening to them call to each other until dawn.

When I checked the trail camera footage the next morning, my hands wouldn't stop shaking. The camera had captured something at 2:17 AM. The image was grainy, distorted by motion blur. But I could make out enough.

Six figures standing at the tree line. All of them tall, pale, wrong. All of them looking directly at the camera.

All of them smiling.

I'm writing this from the ranger station. It's almost 2 AM. Outside, the forest is silent. Too silent.

But I can hear them starting to whistle.

[UPDATE COMING SOON]`;

export const samplePosts: Post[] = [
  {
    id: 'whistlers-1',
    subreddit: 'r/nosleep',
    author: 'u/forest_watcher',
    title: 'The Whistlers in the Woods - I never should have taken that night shift at the ranger station',
    content: whistlersContent,
    upvotes: 15234,
    comments: 892,
    timeAgo: '5h',
    readersCount: 12400,
    featured: true,
  },
  {
    id: 'askreddit-1',
    subreddit: 'r/AskReddit',
    author: 'u/curious_mind_42',
    title: 'What is a subtle sign of high intelligence?',
    content: 'I\'ve been thinking about this a lot lately. We often associate intelligence with obvious things like academic achievement, but what are some subtle signs that someone might be highly intelligent that most people miss?',
    upvotes: 28400,
    comments: 4521,
    timeAgo: '8h',
    readersCount: 8200,
    featured: true,
  },
  {
    id: 'technology-1',
    subreddit: 'r/technology',
    author: 'u/tech_insider',
    title: 'Apple reportedly working on foldable iPhone, expected to launch in 2026',
    content: 'According to sources familiar with the matter, Apple has been developing a foldable iPhone for years and is finally close to releasing it. The device is expected to feature a 7.5-inch display when unfolded.',
    upvotes: 8932,
    comments: 1243,
    timeAgo: '3h',
    readersCount: 5120,
    featured: false,
  },
  {
    id: 'showerthoughts-1',
    subreddit: 'r/Showerthoughts',
    author: 'u/deep_thinker',
    title: 'Technically, you\'ve survived 100% of your worst days so far',
    content: '',
    upvotes: 42100,
    comments: 876,
    timeAgo: '12h',
  },
  {
    id: 'nosleep-2',
    subreddit: 'r/nosleep',
    author: 'u/midnight_writer',
    title: 'I work the night shift at a hospital. There\'s a patient in room 313 who has been dead for 3 years.',
    content: 'I\'ve been a nurse for fifteen years. I thought I\'d seen it all—until I started working nights at St. Mary\'s General. The first time I saw her chart, I assumed it was a mistake. Patient admitted: March 15, 2021. But that can\'t be right...',
    upvotes: 11200,
    comments: 567,
    timeAgo: '1d',
  },
];

export const carouselData = {
  trendingNearYou: [
    { id: 'trend-1', title: 'The Midnight Train', subreddit: 'r/nosleep', author: 'u/ghost_writer', emoji: '🚂', readersCount: 15400, featured: true },
    { id: 'trend-2', title: 'My Roommate Has Rules', subreddit: 'r/nosleep', author: 'u/scared_tenant', emoji: '🏠', readersCount: 9200, featured: false },
    { id: 'trend-3', title: 'The Stairs in the Woods', subreddit: 'r/nosleep', author: 'u/forest_watcher', emoji: '🌲', readersCount: 12400, featured: true },
    { id: 'trend-4', title: 'I Found My Own Grave', subreddit: 'r/nosleep', author: 'u/lost_soul', emoji: '⚰️', readersCount: 6500, featured: false },
    { id: 'trend-5', title: 'The Radio Station', subreddit: 'r/nosleep', author: 'u/night_dj', emoji: '📻', readersCount: 11100, featured: true },
  ],
  popularGenres: [
    { id: 'genre-1', title: 'Horror', subreddit: 'r/nosleep', author: '', emoji: '👻' },
    { id: 'genre-2', title: 'Mystery', subreddit: 'r/UnresolvedMysteries', author: '', emoji: '🔍' },
    { id: 'genre-3', title: 'True Crime', subreddit: 'r/TrueCrime', author: '', emoji: '🔪' },
    { id: 'genre-4', title: 'Sci-Fi', subreddit: 'r/scifi', author: '', emoji: '🚀' },
    { id: 'genre-5', title: 'Romance', subreddit: 'r/RomanceBooks', author: '', emoji: '💕' },
    { id: 'genre-6', title: 'Fantasy', subreddit: 'r/Fantasy', author: '', emoji: '🐉' },
  ],
  topOnReddit: [
    { id: 'top-1', title: 'The Borrasca Series', subreddit: 'r/nosleep', author: 'u/The_Dalek_Emperor', emoji: '⛰️', readersCount: 145000, featured: true },
    { id: 'top-2', title: 'My Dead Girlfriend', subreddit: 'r/nosleep', author: 'u/bloodstains', emoji: '💀', readersCount: 89000, featured: true },
    { id: 'top-3', title: 'The Left/Right Game', subreddit: 'r/nosleep', author: 'u/NeonTempo', emoji: '🎮', readersCount: 112000, featured: true },
    { id: 'top-4', title: 'Penpal', subreddit: 'r/nosleep', author: 'u/1000Vultures', emoji: '✉️', readersCount: 250000, featured: true },
    { id: 'top-5', title: 'The Patient That Nearly Drove Me Out', subreddit: 'r/nosleep', author: 'u/Dr_Creepen', emoji: '🏥', readersCount: 45000, featured: false },
  ],
};
