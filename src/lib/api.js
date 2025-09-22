// Mock vocabulary data for demo purposes
export const mockVocabulary = [
  {
    id: 'v1',
    word: 'hello',
    tamil: 'வணக்கம்',
    transliteration: 'vaṇakkam',
    translation: 'hello, greetings',
    partOfSpeech: 'interjection',
    difficulty: 1,
    examples: [
      {
        sentence: 'Hello, how are you?',
        tamil: 'வணக்கம், எப்படி இருக்கிறீர்கள்?',
        translation: 'Vanakkam, eppadi irukkirirgal?',
      },
    ],
  },
  {
    id: 'v2',
    word: 'thank you',
    tamil: 'நன்றி',
    transliteration: 'nanri',
    translation: 'thank you',
    partOfSpeech: 'interjection',
    difficulty: 1,
    examples: [
      {
        sentence: 'Thank you very much',
        tamil: 'மிக்க நன்றி',
        translation: 'Mikka nanri',
      },
    ],
  },
  // Add more vocabulary as needed
];
// Mock lessons data for demo purposes
export const mockLessons = [
  {
    id: 'l1',
    title: 'Tamil Alphabet Basics',
    titleTamil: 'தமிழ் எழுத்துக்கள் அடிப்படை',
    description: 'Learn the Tamil alphabet, vowels, and consonants.',
    level: 'beginner',
    duration: 15,
    category: 'alphabet',
    objectives: [
      'Recognize Tamil letters',
      'Write basic characters',
      'Pronounce vowels and consonants',
    ],
    content: [],
    vocabulary: [],
    exercises: [],
    xpReward: 50,
    order: 1,
  },
  {
    id: 'l2',
    title: 'Numbers in Tamil',
    titleTamil: 'தமிழில் எண்கள்',
    description: 'Count, read, and write numbers in Tamil.',
    level: 'beginner',
    duration: 10,
    category: 'numbers',
    objectives: [
      'Count from 1 to 20 in Tamil',
      'Recognize Tamil numerals',
      'Use numbers in basic contexts',
    ],
    content: [],
    vocabulary: [],
    exercises: [],
    xpReward: 30,
    order: 2,
  },
  {
    id: 'l3',
    title: 'Simple Greetings',
    titleTamil: 'வணக்கங்கள்',
    description: 'Common greetings and polite phrases.',
    level: 'beginner',
    duration: 8,
    category: 'conversation',
    objectives: [
      'Say hello and goodbye',
      'Use polite expressions',
      'Respond to greetings',
    ],
    content: [],
    vocabulary: [],
    exercises: [],
    xpReward: 20,
    order: 3,
  },
  // Add more lessons as needed
];
// API Client for TamilBuddy
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiClient {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }
    const response = await fetch(url, {
      ...options,
      headers,
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  }
}
export const api = new ApiClient();

export async function callGroqAPI(endpoint, payload) {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Groq API error');
  return response.json();
}
