export interface Paragraph {
  text: string;
  style: 'normal' | 'faded';
}

export interface Scene {
  id: string;
  title: string;
  image: string;
  paragraphs: Paragraph[];
  boldTerms: string[];
}

export interface Quiz {
  title: string;
  contextText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface RecapItem {
  image: string;
  summary: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  scenes: Scene[];
  quiz: Quiz;
  recap: RecapItem[];
}

export interface StoryPath {
  id: string;
  title: string;
  subtitle: string;
  era: string;
  category: string;
  synopsis: string;
  heroImage: string;
  cardGradient: string;
  totalChapters: number;
  estimatedMinutes: number;
  bgmTrack: string;
  chapters: Chapter[];
}

export interface StoryPathProgress {
  storyId: string;
  currentChapterIndex: number;
  currentSceneIndex: number;
  heartsRemaining: number;
  quizAnswers: { chapterIndex: number; selectedIndex: number; correct: boolean }[];
  completed: boolean;
  startedAt: number;
  timeSpentSeconds: number;
}

export type StoryPathViewState =
  | 'landing'
  | 'scene'
  | 'quiz'
  | 'recap'
  | 'complete';
