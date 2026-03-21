import { StoryPath } from '@/types/storyPaths';

export const storyPaths: StoryPath[] = [
  {
    id: 'benjamin-franklin',
    title: 'Benjamin Franklin',
    subtitle: 'The First American',
    era: '1700s',
    category: 'COLONIAL AMERICA',
    synopsis:
      "Benjamin Franklin embodied the spirit of the American Dream before it was a coined phrase. From a young bookworm in colonial Boston to a revolutionary who challenged empires, discover how curiosity and courage built a nation.",
    heroImage: '/picturesMKgandhi/Benjamin-Franklin.png',
    cardGradient: 'linear-gradient(135deg, #2D1B69 0%, #E67E22 100%)',
    totalChapters: 3,
    estimatedMinutes: 5,
    bgmTrack: '/audio/colonial-america.mp3',
    chapters: [
      {
        id: 'ch1-the-prodigy',
        number: 1,
        title: 'The Prodigy',
        scenes: [
          {
            id: 'ch1-s1',
            title: 'Welcome to Colonial Boston',
            image: '/images/story-paths/benjamin-franklin/ch1-s1.webp',
            paragraphs: [
              {
                text: "Boston, circa 1706! See that busy port? Ships bringing goods from England, while local merchants try to make their fortune. The colonies are Britain's supplier of raw materials and a market for British goods.",
                style: 'normal',
              },
              {
                text: "Young Ben's growing up in a bustling neighbourhood near the harbor. His father's candle shop fills the air with the smell of tallow, while ships from across the Atlantic dock just streets away.",
                style: 'faded',
              },
            ],
            boldTerms: ['Boston', '1706'],
          },
          {
            id: 'ch1-s2',
            title: 'The Young Bookworm',
            image: '/images/story-paths/benjamin-franklin/ch1-s2.webp',
            paragraphs: [
              {
                text: "Little Ben's got his nose stuck in a book... again! He's trading his lunch for a chance to read. His father can only afford to send him to school for two years, but that's not stopping our boy!",
                style: 'normal',
              },
              {
                text: "He's reading everything he can get his hands on — even his father's boring religious pamphlets. When you're hungry for knowledge, anything becomes fascinating.",
                style: 'normal',
              },
            ],
            boldTerms: ['trading his lunch for a chance to read'],
          },
          {
            id: 'ch1-s3',
            title: 'The Secret Writer',
            image: '/images/story-paths/benjamin-franklin/ch1-s3.webp',
            paragraphs: [
              {
                text: "He creates the alter ego Silence Dogood to get his writing published in his brother James's newspaper, showing early signs of his wit and creativity.",
                style: 'normal',
              },
              {
                text: "The letters become wildly popular. Nobody suspects the mysterious Mrs. Dogood is actually a 16-year-old apprentice. When James discovers the truth, he's furious.",
                style: 'normal',
              },
            ],
            boldTerms: ['Silence Dogood'],
          },
        ],
        quiz: {
          title: 'A Question of Origins',
          contextText:
            "You've just learned about young Ben's early years. Let's see what stuck!",
          options: ['Philadelphia', 'Boston', 'New York', 'London'],
          correctIndex: 1,
          explanation:
            'Benjamin Franklin was born in Boston in 1706. He later moved to Philadelphia at age 17.',
        },
        recap: [
          {
            image: '/images/story-paths/benjamin-franklin/recap-ch1-1.webp',
            summary:
              "Young Benjamin's passion for reading and writing leads him to teach himself through a unique method",
          },
          {
            image: '/images/story-paths/benjamin-franklin/recap-ch1-2.webp',
            summary:
              'He creates the alter ego Silence Dogood to get his writing published, showing early signs of his wit and creativity',
          },
          {
            image: '/images/story-paths/benjamin-franklin/recap-ch1-3.webp',
            summary:
              'After fleeing to Philadelphia, he begins questioning traditional beliefs, setting the stage for his future as a freethinker',
          },
        ],
      },
      {
        id: 'ch2-the-runaway',
        number: 2,
        title: 'The Runaway',
        scenes: [
          {
            id: 'ch2-s1',
            title: 'Breaking Free',
            image: '/images/story-paths/benjamin-franklin/ch2-s1.webp',
            paragraphs: [
              {
                text: 'At 17, Ben makes the boldest decision of his young life — he breaks his apprenticeship contract with his brother and flees to Philadelphia. He arrives with almost nothing: a few coins and a dream.',
                style: 'normal',
              },
              {
                text: 'Walking through the streets of Philadelphia for the first time, clutching three puffy rolls of bread, he must have looked quite the sight. But this city would become his stage.',
                style: 'faded',
              },
            ],
            boldTerms: ['breaks his apprenticeship', 'Philadelphia'],
          },
          {
            id: 'ch2-s2',
            title: 'A Question of Faith',
            image: '/images/story-paths/benjamin-franklin/ch2-s2.webp',
            paragraphs: [
              {
                text: 'In Philadelphia, young Ben begins questioning the religious orthodoxy he grew up with. He embraces Deism — the belief that reason and observation of the natural world are enough to determine the existence of a Creator.',
                style: 'normal',
              },
              {
                text: 'This was radical thinking in colonial America. For a young man to openly question the church took remarkable courage — or remarkable foolishness. Perhaps both.',
                style: 'normal',
              },
            ],
            boldTerms: ['Deism', 'reason and observation'],
          },
          {
            id: 'ch2-s3',
            title: "The Printer's Rise",
            image: '/images/story-paths/benjamin-franklin/ch2-s3.webp',
            paragraphs: [
              {
                text: "Ben establishes his own printing business and launches Poor Richard's Almanack — a publication filled with wit, weather forecasts, and unforgettable proverbs.",
                style: 'normal',
              },
              {
                text: '"Early to bed and early to rise, makes a man healthy, wealthy, and wise." The Almanack becomes one of the most popular publications in the colonies, making Franklin both famous and financially secure.',
                style: 'normal',
              },
            ],
            boldTerms: ["Poor Richard's Almanack"],
          },
        ],
        quiz: {
          title: 'A Question of Faith',
          contextText:
            "Young Ben's questioning his religious beliefs. How do you think colonial society reacted?",
          options: [
            'They embraced his free thinking',
            'They were shocked and scandalized',
            'They ignored him as just another rebellious youth',
            'They tried to convert him back to traditional beliefs',
          ],
          correctIndex: 1,
          explanation:
            'In colonial America, questioning religious orthodoxy was deeply controversial and could lead to social ostracism.',
        },
        recap: [
          {
            image: '/images/story-paths/benjamin-franklin/recap-ch2-1.webp',
            summary:
              'Ben breaks free from his apprenticeship and arrives in Philadelphia with nothing but ambition',
          },
          {
            image: '/images/story-paths/benjamin-franklin/recap-ch2-2.webp',
            summary:
              'He questions religious orthodoxy and embraces Deism, showing intellectual courage beyond his years',
          },
          {
            image: '/images/story-paths/benjamin-franklin/recap-ch2-3.webp',
            summary:
              "His printing business and Poor Richard's Almanack make him one of the most famous men in the colonies",
          },
        ],
      },
      {
        id: 'ch3-the-revolutionary',
        number: 3,
        title: 'The Revolutionary',
        scenes: [
          {
            id: 'ch3-s1',
            title: 'The Scientist',
            image: '/images/story-paths/benjamin-franklin/ch3-s1.webp',
            paragraphs: [
              {
                text: "Franklin's curiosity extends far beyond printing. His famous kite experiment proves that lightning is electrical, leading to the invention of the lightning rod. He also invents bifocal glasses and the Franklin stove.",
                style: 'normal',
              },
              {
                text: 'He doesn\'t patent any of his inventions. "As we enjoy great advantages from the inventions of others, we should be glad of an opportunity to serve others by any invention of ours."',
                style: 'faded',
              },
            ],
            boldTerms: [
              'kite experiment',
              'lightning rod',
              'bifocal glasses',
              'Franklin stove',
            ],
          },
          {
            id: 'ch3-s2',
            title: 'The Diplomat',
            image: '/images/story-paths/benjamin-franklin/ch3-s2.webp',
            paragraphs: [
              {
                text: "As tensions between the colonies and Britain reach a breaking point, Franklin becomes America's most important diplomat. He's sent to Paris to convince France to support the American Revolution.",
                style: 'normal',
              },
              {
                text: "The French adore him. His wit, his fur cap, his scientific fame — Franklin becomes the most famous American in the world. And he secures the alliance that will win the war.",
                style: 'normal',
              },
            ],
            boldTerms: ['Paris', 'France', 'American Revolution'],
          },
          {
            id: 'ch3-s3',
            title: 'The Legacy',
            image: '/images/story-paths/benjamin-franklin/ch3-s3.webp',
            paragraphs: [
              {
                text: 'Benjamin Franklin is the only Founding Father to sign all four key documents: the Declaration of Independence, the Treaty of Alliance with France, the Treaty of Paris, and the United States Constitution.',
                style: 'normal',
              },
              {
                text: 'From a candle maker\'s son who traded his lunch for books to a man who helped create a nation — Franklin proved that curiosity, courage, and relentless self-improvement can change the world.',
                style: 'normal',
              },
            ],
            boldTerms: [
              'Declaration of Independence',
              'United States Constitution',
            ],
          },
        ],
        quiz: {
          title: 'The Spark',
          contextText:
            "Franklin's legacy spans science, diplomacy, and nation-building. What was unique about his approach to his inventions?",
          options: [
            'He sold them to the British government',
            'He never patented them, believing knowledge should be shared',
            'He kept them secret for military use',
            'He only shared them with other scientists',
          ],
          correctIndex: 1,
          explanation:
            'Franklin refused to patent his inventions, believing they should benefit everyone freely.',
        },
        recap: [
          {
            image: '/images/story-paths/benjamin-franklin/recap-ch3-1.webp',
            summary:
              'His scientific experiments with electricity and practical inventions cement his reputation as a genius',
          },
          {
            image: '/images/story-paths/benjamin-franklin/recap-ch3-2.webp',
            summary:
              "As a diplomat in Paris, he secures France's alliance — the key to winning the Revolutionary War",
          },
          {
            image: '/images/story-paths/benjamin-franklin/recap-ch3-3.webp',
            summary:
              "He signs all four founding documents of America, earning his title as 'The First American'",
          },
        ],
      },
    ],
  },
  {
    id: 'gaius-marius',
    title: 'Gaius Marius',
    subtitle: "The People's General",
    era: '100s BC',
    category: 'ANCIENT ROME',
    synopsis:
      'In the hills of ancient Italy, a young boy discovers seven eagle chicks — an omen that would echo through Roman history. Gaius Marius would rise from humble origins to reshape the Roman army and claim the consulship seven times.',
    heroImage: '/picturesMKgandhi/Gaius-Marius.png',
    cardGradient: 'linear-gradient(135deg, #1A5276 0%, #E74C3C 100%)',
    totalChapters: 2,
    estimatedMinutes: 4,
    bgmTrack: '/audio/ancient-rome.mp3',
    chapters: [
      {
        id: 'ch1-seven-eagles',
        number: 1,
        title: 'The Seven Eagles',
        scenes: [
          {
            id: 'ch1-s1',
            title: 'The Seven Eagles',
            image: '/images/story-paths/gaius-marius/ch1-s1.webp',
            paragraphs: [
              {
                text: "Picture this: Young Marius is out for a walk in the countryside when... BAM! He stumbles upon the coolest thing ever — a nest with seven baby eagles! Now, finding one eagle would be awesome, but seven? That's like winning the ancient Roman lottery!",
                style: 'normal',
              },
              {
                text: 'In those days, people believed the gods sent signs like this. Seven eagles meant seven great honors were in store for this boy from nowhere.',
                style: 'faded',
              },
            ],
            boldTerms: ['seven baby eagles', 'seven great honors'],
          },
          {
            id: 'ch1-s2',
            title: 'The Outsider',
            image: '/images/story-paths/gaius-marius/ch1-s2.webp',
            paragraphs: [
              {
                text: "Marius isn't from Rome's elite. He's a novus homo — a 'new man' with no noble ancestors. In Roman politics, that's like showing up to a black-tie gala in sandals. The aristocrats look down on him.",
                style: 'normal',
              },
              {
                text: "But Marius has something the nobles don't: the loyalty of common soldiers who see themselves in him.",
                style: 'normal',
              },
            ],
            boldTerms: ['novus homo', 'new man'],
          },
        ],
        quiz: {
          title: 'The Omen',
          contextText:
            'Young Marius found a nest of eagle chicks. Why was this significant in ancient Rome?',
          options: [
            'Eagles were considered sacred pets',
            'It was seen as a divine sign of future greatness',
            'It meant he would become a soldier',
            'Eagles were symbols of wealth',
          ],
          correctIndex: 1,
          explanation:
            'Romans believed eagle sightings were omens from the gods. Seven eagles foretold seven consulships.',
        },
        recap: [
          {
            image: '/images/story-paths/gaius-marius/recap-ch1-1.webp',
            summary:
              'Young Marius discovers seven eagle chicks — an omen of seven great honors to come',
          },
          {
            image: '/images/story-paths/gaius-marius/recap-ch1-2.webp',
            summary:
              "As a 'new man' without noble blood, he faces constant resistance from Rome's elite",
          },
        ],
      },
      {
        id: 'ch2-the-peoples-general',
        number: 2,
        title: "The People's General",
        scenes: [
          {
            id: 'ch2-s1',
            title: 'The Army Reborn',
            image: '/images/story-paths/gaius-marius/ch2-s1.webp',
            paragraphs: [
              {
                text: "Marius does something revolutionary: he opens the Roman army to the landless poor. Before him, only property owners could serve. Now, Rome's poorest citizens have a path to glory — and they're fiercely loyal to the general who gave them that chance.",
                style: 'normal',
              },
              {
                text: "This single reform changes Rome forever. The army is no longer loyal to the Republic — it's loyal to its commander.",
                style: 'normal',
              },
            ],
            boldTerms: ['landless poor', 'loyal to its commander'],
          },
          {
            id: 'ch2-s2',
            title: 'Seven Times Consul',
            image: '/images/story-paths/gaius-marius/ch2-s2.webp',
            paragraphs: [
              {
                text: 'Against all odds, Marius is elected consul seven times — fulfilling the prophecy of the seven eagles. He defeats the Jugurthine threat in Africa and saves Rome from the terrifying Cimbri and Teutones invasions from the north.',
                style: 'normal',
              },
              {
                text: 'The boy who found seven eagles has become the most powerful man in Rome. But power, once tasted, is hard to let go. The seeds of civil war have been planted.',
                style: 'faded',
              },
            ],
            boldTerms: ['consul seven times', 'Cimbri and Teutones'],
          },
        ],
        quiz: {
          title: 'The Reform',
          contextText:
            'Marius changed the Roman army forever. What was his key reform?',
          options: [
            'He made the army smaller and more elite',
            'He allowed landless poor citizens to serve',
            'He hired foreign mercenaries',
            'He banned nobles from commanding',
          ],
          correctIndex: 1,
          explanation:
            'By opening military service to the landless poor, Marius created a professional army loyal to its commanders rather than the state.',
        },
        recap: [
          {
            image: '/images/story-paths/gaius-marius/recap-ch2-1.webp',
            summary:
              "His military reforms open the army to the poor, creating Rome's first professional fighting force",
          },
          {
            image: '/images/story-paths/gaius-marius/recap-ch2-2.webp',
            summary:
              'Elected consul seven times, he fulfills the eagle prophecy but plants the seeds of civil war',
          },
        ],
      },
    ],
  },
  {
    id: 'mahatma-gandhi',
    title: 'Mahatma Gandhi',
    subtitle: 'The Quiet Revolution',
    era: '1800s-1900s',
    category: 'MODERN INDIA',
    synopsis:
      "A shy boy from a small coastal town who was too scared to talk to his classmates would one day bring the most powerful empire on Earth to its knees — without throwing a single punch. This is the story of how silence became the loudest weapon in history.",
    heroImage: '/picturesMKgandhi/The-Salt-March.png',
    cardGradient: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)',
    totalChapters: 3,
    estimatedMinutes: 5,
    bgmTrack: '/audio/india-ambient.mp3',
    chapters: [
      {
        id: 'ch1-shy-boy',
        number: 1,
        title: 'The Shy Boy',
        scenes: [
          {
            id: 'ch1-s1',
            title: 'The Boy Who Was Afraid of Everything',
            image: '/picturesMKgandhi/The-Boy-Who-Was-Afraid-of-Everything.png',
            paragraphs: [
              {
                text: "Porbandar, 1869. A tiny coastal town on the western edge of India, where the Arabian Sea crashes against white limestone buildings. Little Mohandas is born into a family of diwan — that's basically the prime minister of a small princely state. Sounds fancy, right? But here's the thing — this kid is painfully, cripplingly shy.",
                style: 'normal',
              },
              {
                text: "School is a nightmare. He's the kid who runs home the second the bell rings so he doesn't have to talk to anyone. He's terrified of the dark. He's terrified of thieves. He's terrified of ghosts. He's terrified of... basically everything. Not exactly the resume of a future revolutionary, is it?",
                style: 'normal',
              },
              {
                text: "But at 18, this frightened boy does something that shocks his entire community — he boards a steamship to England to study law. His caste elders are furious. They literally excommunicate him. His mother makes him swear three vows: no meat, no alcohol, no women. Picture a vegetarian teenager from a tiny Indian town, landing in Victorian London, buying a fancy suit, taking dance lessons, trying to become a proper English gentleman. Spoiler: it doesn't last. But something else begins.",
                style: 'normal',
              },
            ],
            boldTerms: [
              'Porbandar, 1869',
              'painfully, cripplingly shy',
              'runs home the second the bell rings',
              'basically everything',
              'excommunicate him',
              'three vows',
              'Victorian London',
            ],
          },
          {
            id: 'ch1-s2',
            title: 'The Night That Changed Everything',
            image: '/picturesMKgandhi/The-Night-That-Changed-Everything.png',
            paragraphs: [
              {
                text: "1893. Gandhi arrives in South Africa as a young lawyer. He's 23, dressed in a proper English suit, holding a valid first-class ticket. He settles into his seat on a train. Then a white passenger complains. The railway official tells Gandhi to move to third class. Gandhi refuses — he has a first-class ticket.",
                style: 'normal',
              },
              {
                text: "They throw him off the train. At Pietermaritzburg station. In the cold. His luggage tossed onto the platform beside him. He sits on that freezing platform all night, shivering, humiliated — and something fundamental breaks open inside him. He later calls this the most creative moment of his life. Not the most painful. The most creative. Because on that platform, the shy boy who ran from classmates decides he will never run from injustice again.",
                style: 'normal',
              },
            ],
            boldTerms: [
              'throw him off the train',
              'Pietermaritzburg station',
              'something fundamental breaks open',
              'creative',
              'never run from injustice again',
            ],
          },
        ],
        quiz: {
          title: 'The Turning Point',
          contextText:
            'What happened to Gandhi at Pietermaritzburg station in South Africa?',
          options: [
            'He won his first legal case',
            'He was thrown off a train despite holding a valid first-class ticket',
            'He gave his first public speech',
            'He met other Indian activists',
          ],
          correctIndex: 1,
          explanation:
            'In 1893, Gandhi was forcibly removed from a first-class compartment because of his race, despite holding a valid ticket. He sat on the freezing platform all night — and the shy boy vanished forever.',
        },
        recap: [
          {
            image: '/images/story-paths/mahatma-gandhi/recap-ch1-1.webp',
            summary:
              'Born in Porbandar in 1869, young Mohandas is painfully shy, afraid of the dark, and runs home from school every day to avoid talking to anyone',
          },
          {
            image: '/images/story-paths/mahatma-gandhi/recap-ch1-2.webp',
            summary:
              'Thrown off a first-class train in South Africa for being Indian — he sits on the freezing platform all night, and decides he will never run from injustice again',
          },
        ],
      },
      {
        id: 'ch2-weapon-of-truth',
        number: 2,
        title: 'The Weapon of Truth',
        scenes: [
          {
            id: 'ch2-s1',
            title: 'Finding His Voice',
            image: '/picturesMKgandhi/Finding-His-Voice.png',
            paragraphs: [
              {
                text: "Remember the boy who couldn't speak in class? That boy is gone. Gandhi starts organizing the Indian community in South Africa. He calls meetings. He writes petitions. He starts a newspaper. The shy kid who ran home from school is now standing in front of hundreds of people, and they're actually listening.",
                style: 'normal',
              },
              {
                text: "When the South African government forces all Indians to carry registration passes, Gandhi's response is stunning — he organizes thousands to publicly burn their passes in a massive bonfire. The police are baffled. You can't arrest people for setting fire to their own documents?",
                style: 'normal',
              },
              {
                text: 'Gandhi calls this strategy Satyagraha — literally "truth force." The idea is devastatingly simple: when unjust laws exist, you break them openly, accept the punishment, and let the world watch the injustice unfold. It\'s the most dangerous weapon ever invented, because there\'s no defense against someone willing to suffer but never fight back.',
                style: 'normal',
              },
            ],
            boldTerms: [
              'That boy is gone',
              'burn their passes',
              'Satyagraha',
              'truth force',
              'no defense',
            ],
          },
          {
            id: 'ch2-s2',
            title: 'Return to India',
            image: '/picturesMKgandhi/Return-to-India.png',
            paragraphs: [
              {
                text: "1915. Gandhi returns to India after 21 years in South Africa. But he doesn't return as a lawyer in a suit. He returns in simple khadi cloth — hand-spun, hand-woven, deliberately humble. He travels across India by train, third class, for an entire year. Just watching. Listening. Learning what British rule actually looks like for ordinary people.",
                style: 'normal',
              },
              {
                text: "What he sees breaks his heart. Three hundred million Indians, ruled by a few thousand British officials, and nobody thinks freedom is even possible. Farmers taxed into poverty. Weavers put out of work by British factory cloth. An entire civilization made to feel small in its own home. Gandhi sees all of this, and he doesn't get angry. He gets strategic. The spinning wheel becomes his symbol — make your own cloth, refuse to buy British goods, and you starve the Empire of the one thing it actually cares about: money.",
                style: 'normal',
              },
            ],
            boldTerms: [
              'simple khadi cloth',
              'third class',
              'Three hundred million Indians',
              'money',
            ],
          },
        ],
        quiz: {
          title: 'The Strategy',
          contextText:
            'Gandhi invented a revolutionary resistance method in South Africa. What was it called?',
          options: [
            'Peaceful protest',
            'Civil disobedience',
            'Satyagraha — "truth force"',
            'Passive resistance',
          ],
          correctIndex: 2,
          explanation:
            'Satyagraha means "truth force" — break unjust laws openly, accept the punishment, and let the world watch. Gandhi rejected the term "passive resistance" because there was nothing passive about it.',
        },
        recap: [
          {
            image: '/images/story-paths/mahatma-gandhi/recap-ch2-1.webp',
            summary:
              'The shy boy finds his voice — organizes mass pass-burning in South Africa and invents Satyagraha, the most powerful nonviolent weapon in history',
          },
          {
            image: '/images/story-paths/mahatma-gandhi/recap-ch2-2.webp',
            summary:
              'Returns to India in simple khadi cloth, travels third-class for a year, and turns the spinning wheel into a weapon against the British Empire',
          },
        ],
      },
      {
        id: 'ch3-salt-and-freedom',
        number: 3,
        title: 'Salt and Freedom',
        scenes: [
          {
            id: 'ch3-s1',
            title: 'The Salt March',
            image: '/picturesMKgandhi/The-Salt-March.png',
            paragraphs: [
              {
                text: "1930. The British have made it illegal for Indians to make their own salt. Think about that — you can't pick up salt from your own coastline. Gandhi decides this is the perfect law to break. Not a complicated political demand. Not an abstract principle. Just salt. Something every single Indian, rich or poor, Hindu or Muslim, needs every day.",
                style: 'normal',
              },
              {
                text: "He announces he will walk 240 miles to the sea to make salt. The British laugh. Salt? Really? He starts with 78 followers. By the time he reaches the coast at Dandi, thousands are marching behind him. The world's press is watching. He bends down, picks up a handful of natural salt, and the British Empire cracks. Sixty thousand Indians are arrested in the weeks that follow. The jails overflow. The Empire's own machinery chokes on the scale of defiance. And all he did was pick up some salt.",
                style: 'normal',
              },
            ],
            boldTerms: [
              '240 miles',
              'Dandi',
              'picks up a handful of natural salt',
              'British Empire cracks',
            ],
          },
          {
            id: 'ch3-s2',
            title: 'The Legacy of Peace',
            image: '/picturesMKgandhi/The-Legacy-of-Peace.png',
            paragraphs: [
              {
                text: "August 15, 1947. India is free. But Gandhi isn't celebrating in Delhi with the other leaders. He's in Calcutta, fasting, trying to stop Hindu-Muslim violence with the only weapon he ever trusted — his own willingness to suffer. The country he spent his life liberating is being torn in two by Partition, and it's breaking him.",
                style: 'normal',
              },
              {
                text: "Five months later, on January 30, 1948, Gandhi is assassinated — shot by a man who believed he was too kind to Muslims. The shy boy from Porbandar, who was afraid of the dark, who ran home from school every day, who sat shivering on a freezing train platform in South Africa — that boy changed the world without ever throwing a punch. Martin Luther King Jr. would use his methods in America. Nelson Mandela would use them in South Africa. The courage to stand up for what's right and accept the consequences — that's the quiet revolution that's still echoing today.",
                style: 'normal',
              },
            ],
            boldTerms: [
              'August 15, 1947',
              'Partition',
              'shy boy from Porbandar',
              'courage to stand up',
            ],
          },
        ],
        quiz: {
          title: 'The Handful of Salt',
          contextText:
            'Why did Gandhi choose salt for his most famous act of defiance?',
          options: [
            'Salt was the most expensive commodity',
            'The British salt tax affected every single Indian, rich or poor',
            'He owned salt mines that were shut down',
            'Salt was a sacred religious symbol',
          ],
          correctIndex: 1,
          explanation:
            'The salt tax hit every Indian regardless of class, caste, or religion. By choosing salt, Gandhi united the entire nation in one act of defiance. Brilliant strategy from a man the British dismissed as a "half-naked fakir."',
        },
        recap: [
          {
            image: '/images/story-paths/mahatma-gandhi/recap-ch3-1.webp',
            summary:
              "The Salt March — walks 240 miles, picks up a handful of salt, and 60,000 Indians are arrested as the Empire's machinery chokes on defiance",
          },
          {
            image: '/images/story-paths/mahatma-gandhi/recap-ch3-2.webp',
            summary:
              'India wins freedom in 1947. The shy boy from Porbandar changed the world without throwing a punch — and his methods are still echoing from America to South Africa',
          },
        ],
      },
    ],
  },
];