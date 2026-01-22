import { Post } from './Post';
import { Search, Bell } from 'lucide-react';
import { Post as PostType } from '@/types/reddit';

const samplePost: PostType = {
  id: 'whistlers-1',
  subreddit: 'r/nosleep',
  author: 'u/forest_watcher',
  title: 'The Whistlers in the Woods (Part 1) - I never should have taken that night shift at the ranger station',
  content: `It started three weeks ago, on my first night shift at the Blackwood Ranger Station. The station sits at the edge of a 50,000-acre forest preserve, miles from the nearest town. My supervisor, Dale, had warned me about the isolation.

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

[UPDATE COMING SOON]`,
  upvotes: 15234,
  comments: 892,
  timeAgo: '5h',
};

export function HomeFeed() {
  return (
    <div className="min-h-screen bg-background pb-20">
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

      {/* Feed */}
      <div className="divide-y divide-border">
        <Post post={samplePost} />
      </div>
    </div>
  );
}
