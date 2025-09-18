// Core type definitions for TamilBuddy

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'learner' | 'tutor' | 'admin';
  avatar?: string;
  preferredLanguage: 'en' | 'ta';
  level: 'beginner' | 'intermediate' | 'advanced';
  streak: number;
  xp: number;
  achievements: Achievement[];
  createdAt: Date;
  lastActive: Date;
}

export interface Lesson {
  id: string;
  title: string;
  titleTamil: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  category: LessonCategory;
  objectives: string[];
  content: LessonContent[];
  vocabulary: Vocabulary[];
  exercises: Exercise[];
  audioUrl?: string;
  imageUrl?: string;
  xpReward: number;
  order: number;
  prerequisites?: string[]; // lesson IDs
}

export type LessonCategory = 
  | 'alphabet'
  | 'pronunciation'
  | 'vocabulary'
  | 'grammar'
  | 'conversation'
  | 'culture'
  | 'writing'
  | 'reading';

export interface LessonContent {
  id: string;
  type: 'text' | 'audio' | 'video' | 'image' | 'interactive';
  content: string;
  tamil?: string;
  transliteration?: string;
  translation?: string;
  audioUrl?: string;
  imageUrl?: string;
  notes?: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  tamil: string;
  transliteration: string;
  translation: string;
  partOfSpeech: string;
  audioUrl?: string;
  examples: VocabularyExample[];
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface VocabularyExample {
  sentence: string;
  tamil: string;
  translation: string;
  audioUrl?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  questionTamil?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  hints?: string[];
  points: number;
  timeLimit?: number; // seconds
}

export type ExerciseType = 
  | 'multiple-choice'
  | 'fill-blank'
  | 'translation'
  | 'pronunciation'
  | 'handwriting'
  | 'matching'
  | 'ordering'
  | 'speaking';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface PronunciationScore {
  overall: number;
  accuracy: number;
  fluency: number;
  completeness: number;
  phonemes: PhonemeScore[];
  feedback: string;
}

export interface PhonemeScore {
  phoneme: string;
  score: number;
  expected: string;
  actual: string;
}

export interface HandwritingAnalysis {
  character: string;
  score: number;
  strokes: StrokeAnalysis[];
  feedback: string;
  suggestedCorrections: string[];
}

export interface StrokeAnalysis {
  order: number;
  accuracy: number;
  direction: 'correct' | 'incorrect';
  speed: 'too-fast' | 'too-slow' | 'good';
}

export interface Tutor {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  languages: string[];
  specializations: string[];
  rating: number;
  hourlyRate: number;
  availability: TutorAvailability[];
  reviews: Review[];
  certifications: Certification[];
}

export interface TutorAvailability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  timezone: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  verified: boolean;
}

export interface StudySession {
  id: string;
  userId: string;
  lessonId?: string;
  type: 'lesson' | 'practice' | 'tutor' | 'review';
  startTime: Date;
  endTime?: Date;
  xpEarned: number;
  exercises: ExerciseResult[];
  notes?: string;
}

export interface ExerciseResult {
  exerciseId: string;
  correct: boolean;
  userAnswer: string | string[];
  timeSpent: number;
  hintsUsed: number;
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  frontAudio?: string;
  backAudio?: string;
  image?: string;
  difficulty: number;
  nextReview: Date;
  interval: number;
  easeFactor: number;
  reviews: number;
  lapses: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  tamil?: string;
  category: 'question' | 'tip' | 'resource' | 'discussion';
  tags: string[];
  likes: number;
  replies: Reply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Reply {
  id: string;
  userId: string;
  userName: string;
  content: string;
  likes: number;
  createdAt: Date;
}