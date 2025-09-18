// API Client for TamilBuddy

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
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

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(response.token);
    return response;
  }

  async register(data: { email: string; password: string; name: string }) {
    const response = await this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setToken(response.token);
    return response;
  }

  async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.clearToken();
  }

  // Lesson endpoints
  async getLessons(params?: { level?: string; category?: string }) {
    const queryString = new URLSearchParams(params as any).toString();
    return this.request(`/lessons${queryString ? `?${queryString}` : ''}`);
  }

  async getLesson(id: string) {
    return this.request(`/lessons/${id}`);
  }

  async completeLesson(id: string, results: any) {
    return this.request(`/lessons/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify(results),
    });
  }

  // Voice processing
  async processVoice(audioBlob: Blob, type: 'stt' | 'pronunciation') {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('type', type);

    return fetch(`${API_BASE_URL}/voice/process`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
      body: formData,
    }).then(res => res.json());
  }

  // Text-to-speech
  async synthesizeSpeech(text: string, lang: 'ta' | 'en' = 'ta') {
    const response = await fetch(`${API_BASE_URL}/voice/tts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify({ text, lang }),
    });
    
    return response.blob();
  }

  // Handwriting recognition
  async recognizeHandwriting(imageData: string) {
    return this.request('/handwriting/recognize', {
      method: 'POST',
      body: JSON.stringify({ image: imageData }),
    });
  }

  // OCR
  async processOCR(imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);

    return fetch(`${API_BASE_URL}/ocr/process`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
      body: formData,
    }).then(res => res.json());
  }

  // Flashcards
  async getFlashcards(deckId?: string) {
    return this.request(`/flashcards${deckId ? `?deck=${deckId}` : ''}`);
  }

  async reviewFlashcard(id: string, quality: number) {
    return this.request(`/flashcards/${id}/review`, {
      method: 'POST',
      body: JSON.stringify({ quality }),
    });
  }

  // Community
  async getCommunityPosts(params?: { category?: string; search?: string }) {
    const queryString = new URLSearchParams(params as any).toString();
    return this.request(`/community/posts${queryString ? `?${queryString}` : ''}`);
  }

  async createPost(data: any) {
    return this.request('/community/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Tutors
  async getTutors(filters?: any) {
    const queryString = new URLSearchParams(filters).toString();
    return this.request(`/tutors${queryString ? `?${queryString}` : ''}`);
  }

  async bookTutor(tutorId: string, slot: any) {
    return this.request(`/tutors/${tutorId}/book`, {
      method: 'POST',
      body: JSON.stringify(slot),
    });
  }

  // Analytics
  async getProgress() {
    return this.request('/analytics/progress');
  }

  async getStats() {
    return this.request('/analytics/stats');
  }
}

export const api = new ApiClient();

// Mock data for development
export const mockLessons = [
  {
    id: '1',
    title: 'Tamil Alphabet - Vowels',
    titleTamil: 'தமிழ் எழுத்துக்கள் - உயிர் எழுத்துக்கள்',
    description: 'Learn the 12 Tamil vowels (uyir ezhuthukal) with pronunciation and writing practice',
    level: 'beginner' as const,
    duration: 30,
    category: 'alphabet' as const,
    xpReward: 100,
    order: 1,
    imageUrl: '/lesson-vowels.jpg',
    objectives: [
      'Recognize all 12 Tamil vowels',
      'Pronounce each vowel correctly',
      'Write basic vowel characters',
    ],
    content: [],
    vocabulary: [],
    exercises: [],
  },
  {
    id: '2',
    title: 'Basic Greetings',
    titleTamil: 'அடிப்படை வாழ்த்துக்கள்',
    description: 'Master essential Tamil greetings and polite expressions',
    level: 'beginner' as const,
    duration: 25,
    category: 'conversation' as const,
    xpReward: 80,
    order: 2,
    imageUrl: '/lesson-greetings.jpg',
    objectives: [
      'Say hello and goodbye in Tamil',
      'Use appropriate formal and informal greetings',
      'Introduce yourself',
    ],
    content: [],
    vocabulary: [],
    exercises: [],
  },
  {
    id: '3',
    title: 'Numbers 1-20',
    titleTamil: 'எண்கள் 1-20',
    description: 'Count from 1 to 20 in Tamil and practice number recognition',
    level: 'beginner' as const,
    duration: 20,
    category: 'vocabulary' as const,
    xpReward: 60,
    order: 3,
    imageUrl: '/lesson-numbers.jpg',
    objectives: [
      'Count from 1 to 20 in Tamil',
      'Recognize Tamil numerals',
      'Use numbers in basic contexts',
    ],
    content: [],
    vocabulary: [],
    exercises: [],
  },
];

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
];