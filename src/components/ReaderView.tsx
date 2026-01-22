import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, Settings } from 'lucide-react';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import { useApp } from '@/context/AppContext';

export function ReaderView() {
  const progress = useReadingProgress();
  const { savedStories, updateStoryProgress, setCurrentStoryId, currentStoryId } = useApp();
  const progressRef = useRef(progress);

  const story = savedStories.find((s) => s.id === currentStoryId);

  // Update progress ref
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Save progress on exit
  const handleBack = () => {
    if (currentStoryId) {
      updateStoryProgress(currentStoryId, progressRef.current);
    }
    setCurrentStoryId(null);
    window.scrollTo(0, 0);
  };

  if (!story) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar - fixed at very top */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 bg-muted"
      >
        <motion.div
          className="h-full bg-primary"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Header */}
      <header className="sticky top-1 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-full p-2 transition-colors hover:bg-muted"
          >
            <ArrowLeft size={22} />
          </button>
          
          <div className="flex items-center gap-1">
            <button className="rounded-full p-2 transition-colors hover:bg-muted">
              <Settings size={20} className="text-muted-foreground" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-muted">
              <Share2 size={20} className="text-muted-foreground" />
            </button>
            <button className="rounded-full p-2 transition-colors hover:bg-muted">
              <Bookmark size={20} className="fill-primary text-primary" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-2xl px-5 py-8">
        {/* Meta */}
        <div className="mb-6">
          <p className="mb-2 text-sm text-primary">{story.subreddit}</p>
          <h1 className="mb-4 font-reading text-2xl font-bold leading-tight">
            {story.title.replace(' (Part 1)', '').replace(' - I never should have taken that night shift at the ranger station', '')}
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-orange-600" />
            <div>
              <p className="font-medium">{story.author}</p>
              <p className="text-sm text-muted-foreground">{story.timeAgo} • {story.estimatedReadTime}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8 h-px bg-border" />

        {/* Story content */}
        <div className="font-reading text-lg leading-relaxed text-foreground/90 [&>p]:mb-6">
          <p>It started three weeks ago, on my first night shift at the Blackwood Ranger Station. The station sits at the edge of a 50,000-acre forest preserve, miles from the nearest town. My supervisor, Dale, had warned me about the isolation.</p>

          <p>"Most folks can't handle the silence," he'd said, handing me the keys. "But you'll get used to it. Just don't go wandering after dark."</p>

          <p>I thought he was being dramatic. I was wrong.</p>

          <p>The first night was quiet—eerily so. No crickets, no owls, no wind through the pines. Just that heavy, pressing silence that makes your ears ring. Around 2 AM, I was halfway through a thermos of coffee when I heard it: a low, melodic whistle drifting through the trees.</p>

          <p>Three notes. Ascending. Like someone calling a dog.</p>

          <p>I stepped onto the porch, flashlight in hand. The beam cut through the darkness, illuminating nothing but endless rows of pine trees. The whistling had stopped.</p>

          <p>"Hello?" My voice seemed to die the moment it left my lips, swallowed by the forest.</p>

          <p>Nothing.</p>

          <p>I went back inside and locked the door. Probably just a bird, I told myself. Some nocturnal species I didn't recognize.</p>

          <p>But birds don't whistle in perfect musical intervals.</p>

          <p>The second night, it happened again. Same time. Same three notes. But this time, when I looked out the window, I saw something that made my blood freeze. About fifty yards from the station, at the edge of the tree line, stood a figure.</p>

          <p>Tall. Impossibly tall. At least seven feet, maybe more. Its proportions were wrong—arms too long, legs bent at strange angles. And it was pale, so pale it seemed to glow in the moonlight.</p>

          <p>It was whistling.</p>

          <p>I grabbed the emergency radio, hands shaking. "Base, this is Station Seven. I've got a... a person outside. Requesting backup."</p>

          <p>Static. Then Dale's voice: "Station Seven, repeat your message?"</p>

          <p>I looked back at the window.</p>

          <p>The figure was gone.</p>

          <p>"Never mind," I said. "Must have been a deer."</p>

          <p>But deer don't whistle. And deer don't leave footprints with only three toes.</p>

          <p>I found those prints the next morning, pressed deep into the mud around the station. They circled the building twice before disappearing back into the forest. Each print was nearly a foot long, with deep gouges where the toes—if that's what they were—had dug into the earth.</p>

          <p>I should have quit right then. Should have driven back to town and never looked back. But something kept me there. Curiosity, maybe. Or something worse.</p>

          <p>That third night, I set up a trail camera facing the tree line. I sat in the dark, watching, waiting. At 2 AM, the whistle came again. Three notes. Ascending.</p>

          <p>But this time, it wasn't alone.</p>

          <p>From somewhere deeper in the forest, another whistle answered. Same three notes. Then another. And another. Soon the night was filled with them, a chorus of whistles echoing through the trees. Dozens of them. Maybe hundreds.</p>

          <p>I didn't sleep that night. I sat with my back against the wall, shotgun across my knees, listening to them call to each other until dawn.</p>

          <p>When I checked the trail camera footage the next morning, my hands wouldn't stop shaking. The camera had captured something at 2:17 AM. The image was grainy, distorted by motion blur. But I could make out enough.</p>

          <p>Six figures standing at the tree line. All of them tall, pale, wrong. All of them looking directly at the camera.</p>

          <p>All of them smiling.</p>

          <p>The next few days blurred together. I reported the footprints to Dale, showed him photos. He went pale but said nothing, just told me to "keep my head down and do my job." That night, I noticed something new: scratch marks on the outside of my cabin door. Long, vertical gouges in the wood, exactly at eye level.</p>

          <p>They hadn't been there that morning.</p>

          <p>I started keeping a journal. Not for evidence—by then, I knew no one would believe me—but for myself. To prove I wasn't losing my mind. I documented everything: the whistles (always at 2 AM, always three notes), the footprints (getting closer each night), the scratches (multiplying on every surface they could reach).</p>

          <p>On night seven, they knocked.</p>

          <p>Three knocks. Slow. Deliberate. On the back door of the ranger station—the one that faces nothing but miles of unbroken forest.</p>

          <p>I didn't answer. I didn't even breathe.</p>

          <p>They knocked again. And again. And again. For three hours straight, those same three knocks repeated at exact one-minute intervals. I timed them. I counted them. I pressed my hands over my ears and screamed into a pillow, but still, those knocks continued.</p>

          <p>Then, at exactly 5 AM, they stopped.</p>

          <p>When dawn broke, I opened the back door with the shotgun raised. Nothing. No prints. No scratches. Just the forest, silent and still, as if the entire night had been a fever dream.</p>

          <p>But on the doorframe, carved into the wood with surgical precision, were three words:</p>

          <p><strong>WE HEAR YOU</strong></p>

          <p>I'm writing this from the ranger station. It's 1:45 AM. In fifteen minutes, they'll start whistling again. I've barricaded the doors. I've loaded the shotgun. I've said every prayer I can remember from a childhood spent in Sunday school.</p>

          <p>But something is different tonight. The silence is heavier. The darkness outside seems thicker. And for the first time, I can hear something new beneath the whistle.</p>

          <p>Footsteps. Hundreds of them. Getting closer.</p>

          <p>They're not just watching anymore.</p>

          <p className="text-center text-muted-foreground italic mt-12">— End of Part 1 —</p>
        </div>

        {/* Bottom spacing */}
        <div className="h-32" />
      </article>
    </div>
  );
}
