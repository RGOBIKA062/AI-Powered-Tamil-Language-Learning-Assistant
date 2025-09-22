// Core type definitions for TamilBuddy
// User object structure
// {
//   id: string,

// }
// Lesson object structure
// {
// Lesson object structure
// {
//   id: string,
//   title: string,
//   titleTamil: string,
//   description: string,
//   level: 'beginner' | 'intermediate' | 'advanced',
//   duration: number, // minutes
//   category: LessonCategory,
//   objectives: string[],
//   content: LessonContent[],
//   vocabulary: Vocabulary[],
//   exercises: Exercise[],
//   audioUrl?: string,
//   imageUrl?: string,
//   xpReward: number,
//   order: number,
//   prerequisites?: string[]; // lesson IDs
// }
// LessonCategory: string
// LessonContent object structure
// {
//   id: string,
//   type: 'text' | 'audio' | 'video' | 'image' | 'interactive',
//   content: string,
//   tamil?: string,
//   transliteration?: string,
//   translation?: string,
//   audioUrl?: string,
//   imageUrl?: string,
//   notes?: string;
// }
// Vocabulary object structure
// {
//   id: string,
//   word: string,
//   tamil: string,
//   transliteration: string,
//   translation: string,
//   partOfSpeech: string,
//   audioUrl?: string,
//   examples: VocabularyExample[],
//   difficulty: 1 | 2 | 3 | 4 | 5;
// }
// VocabularyExample object structure
// {
//   sentence: string,
//   tamil: string,
//   translation: string,
//   audioUrl?: string,
// }
// Exercise object structure
// {
//   id: string,
//   type: ExerciseType,
//   question: string,
//   questionTamil?: string,
//   options?: string[],
//   correctAnswer: string | string[],
//   explanation?: string,
//   hints?: string[],
//   points: number,
//   timeLimit?: number; // seconds
// }
// ExerciseType: string
// Achievement object structure
// {
//   id: string,
//   name: string,
//   description: string,
//   icon: string,
//   xpReward: number,
//   unlockedAt?: Date,
//   progress?: number,
//   maxProgress?: number,
// }
// PronunciationScore object structure
// {
//   overall: number,
//   accuracy: number,
//   fluency: number,
//   completeness: number,
//   phonemes: PhonemeScore[],
//   feedback: string,
// }
// PhonemeScore object structure
// {
//   phoneme: string,
//   score: number,
//   expected: string,
//   actual: string,
// }
// HandwritingAnalysis object structure
// {
//   character: string,
//   score: number,
//   strokes: StrokeAnalysis[],
//   feedback: string,
//   suggestedCorrections: string[],
// }
// StrokeAnalysis object structure
// {
//   order: number,
//   accuracy: number,
//   direction: 'correct' | 'incorrect',
//   speed: 'too-fast' | 'too-slow' | 'good',
// }

// Lesson object structure
// {
//   id: string,
//   title: string,
//   titleTamil: string,
//   description: string,
//   level: 'beginner' | 'intermediate' | 'advanced',
//   duration: number, // minutes
//   category: LessonCategory,
//   objectives: string[],
//   content: LessonContent[],
//   vocabulary: Vocabulary[],
//   exercises: Exercise[],
//   audioUrl?: string,
//   imageUrl?: string,
//   xpReward: number,
//   order: number,
//   prerequisites?: string[] // lesson IDs
// }

// LessonCategory: string

// LessonContent object structure
// {
//   id: string,
//   type: 'text' | 'audio' | 'video' | 'image' | 'interactive',
//   content: string,
//   tamil?: string,
//   transliteration?: string,
//   translation?: string,
//   audioUrl?: string,
//   imageUrl?: string,
//   notes?: string
// }

// Vocabulary object structure
// {
//   id: string,
//   word: string,
//   tamil: string,
//   transliteration: string,
//   translation: string,
//   partOfSpeech: string,
//   audioUrl?: string,
//   examples: VocabularyExample[],
//   difficulty: 1 | 2 | 3 | 4 | 5
// }

// VocabularyExample object structure
// {
//   sentence: string,
//   tamil: string,
//   translation: string,
//   audioUrl?: string
// }

// Exercise object structure
// {
//   id: string,
//   type: ExerciseType,
//   question: string,
//   questionTamil?: string,
//   options?: string[],
//   correctAnswer: string | string[],
//   explanation?: string,
//   hints?: string[],
//   points: number,
//   timeLimit?: number // seconds
// }

// ExerciseType: string

// Achievement object structure
// {
//   id: string,
//   name: string,
//   description: string,
//   icon: string,
//   xpReward: number,
//   unlockedAt?: Date,
//   progress?: number,
//   maxProgress?: number
// }

// PronunciationScore object structure
// {
//   overall: number,
//   accuracy: number,
//   fluency: number,
//   completeness: number,
//   phonemes: PhonemeScore[],
//   feedback: string
// }

// PhonemeScore object structure
// {
//   phoneme: string,
//   score: number,
//   expected: string,
//   actual: string
// }

// HandwritingAnalysis object structure
// {
//   character: string,
//   score: number,
//   strokes: StrokeAnalysis[],
//   feedback: string,
//   suggestedCorrections: string[]
// }

// StrokeAnalysis object structure
// {
//   order: number,
//   accuracy: number,
//   direction: 'correct' | 'incorrect',
//   speed: 'too-fast' | 'too-slow' | 'good'
// }

// Tutor object structure
// {
//   id: string,
//   name: string,
//   bio: string,
//   avatar: string,
//   languages: string[],
//   specializations: string[],
//   rating: number,
//   hourlyRate: number,
//   availability: TutorAvailability[],
//   reviews: Review[],
//   certifications: Certification[]
// }

// TutorAvailability object structure
// {
//   dayOfWeek: number,
//   startTime: string,
//   endTime: string,
//   timezone: string
// }

// Review object structure
// {
//   id: string,
//   userId: string,
//   userName: string,
//   rating: number,
//   comment: string,
//   date: Date
// }

// Certification object structure
// {
//   name: string,
//   issuer: string,
//   year: number,
//   verified: boolean
// }

// StudySession object structure
// {
//   id: string,
//   userId: string,
//   lessonId?: string,
//   type: 'lesson' | 'practice' | 'tutor' | 'review',
//   startTime: Date,
//   endTime?: Date,
//   xpEarned: number,
//   exercises: ExerciseResult[],
//   notes?: string
// }

// ExerciseResult object structure
// {
//   exerciseId: string,
//   correct: boolean,
//   userAnswer: string | string[],
//   timeSpent: number,
//   hintsUsed: number
// }

// FlashCard object structure
// {
//   id: string,
//   front: string,
//   back: string,
//   frontAudio?: string,
//   backAudio?: string,
//   image?: string,
//   difficulty: number,
//   nextReview: Date,
//   interval: number,
//   easeFactor: number,
//   reviews: number,
//   lapses: number
// }

// CommunityPost object structure
// {
//   id: string,
//   userId: string,
//   userName: string,
//   userAvatar?: string,
//   title: string,
//   content: string,
//   tamil?: string,
//   category: 'question' | 'tip' | 'resource' | 'discussion',
//   tags: string[],
//   likes: number,
//   replies: Reply[],
//   createdAt: Date,
//   updatedAt: Date
// }

// Reply object structure
// {
//   id: string,
//   userId: string,
//   userName: string,
//   content: string,
//   likes: number,
//   createdAt: Date
// }