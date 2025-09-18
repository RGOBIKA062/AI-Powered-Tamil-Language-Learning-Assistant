// Audio utilities for TamilBuddy

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.cleanup();
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  private cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }
}

export class AudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;

  async play(url: string | Blob): Promise<void> {
    const audioUrl = typeof url === 'string' ? url : URL.createObjectURL(url);
    
    if (this.audio) {
      this.audio.pause();
    }

    this.audio = new Audio(audioUrl);
    await this.audio.play();

    if (typeof url !== 'string') {
      this.audio.onended = () => URL.revokeObjectURL(audioUrl);
    }
  }

  pause() {
    this.audio?.pause();
  }

  resume() {
    this.audio?.play();
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  getCurrentTime(): number {
    return this.audio?.currentTime || 0;
  }

  getDuration(): number {
    return this.audio?.duration || 0;
  }

  // Initialize audio visualization
  async initializeVisualizer(canvas: HTMLCanvasElement): Promise<void> {
    if (!this.audio) return;

    this.audioContext = new AudioContext();
    const source = this.audioContext.createMediaElementSource(this.audio);
    this.analyser = this.audioContext.createAnalyser();
    
    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    
    this.analyser.fftSize = 256;
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const canvasCtx = canvas.getContext('2d')!;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    
    const draw = () => {
      requestAnimationFrame(draw);
      
      this.analyser!.getByteFrequencyData(dataArray);
      
      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
      
      const barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        
        const r = barHeight + (25 * (i / bufferLength));
        const g = 250 * (i / bufferLength);
        const b = 50;
        
        canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
    };
    
    draw();
  }
}

// Speech synthesis utilities
export class SpeechSynthesizer {
  private synthesis = window.speechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.loadVoices();
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  private loadVoices() {
    this.voices = this.synthesis.getVoices();
  }

  getTamilVoices(): SpeechSynthesisVoice[] {
    return this.voices.filter(voice => 
      voice.lang.startsWith('ta') || voice.name.toLowerCase().includes('tamil')
    );
  }

  speak(text: string, lang: 'ta' | 'en' = 'ta', rate = 1.0): Promise<void> {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-US';
      utterance.rate = rate;
      
      // Try to use a Tamil voice if available
      if (lang === 'ta') {
        const tamilVoices = this.getTamilVoices();
        if (tamilVoices.length > 0) {
          utterance.voice = tamilVoices[0];
        }
      }
      
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      
      this.synthesis.speak(utterance);
    });
  }

  pause() {
    this.synthesis.pause();
  }

  resume() {
    this.synthesis.resume();
  }

  cancel() {
    this.synthesis.cancel();
  }
}

// Pronunciation scoring utilities (mock implementation)
export async function scorePronunciation(
  recordedAudio: Blob,
  referenceText: string,
  lang: 'ta' | 'en' = 'ta'
): Promise<{
  overall: number;
  accuracy: number;
  fluency: number;
  completeness: number;
  feedback: string;
}> {
  // In production, this would send to a real pronunciation scoring API
  // For now, return mock scores
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

  const overall = Math.floor(Math.random() * 30) + 70; // 70-100
  const accuracy = Math.floor(Math.random() * 30) + 70;
  const fluency = Math.floor(Math.random() * 30) + 70;
  const completeness = Math.floor(Math.random() * 30) + 70;

  let feedback = '';
  if (overall >= 90) {
    feedback = 'Excellent pronunciation! Keep up the great work.';
  } else if (overall >= 80) {
    feedback = 'Good pronunciation. Try to speak a bit more clearly.';
  } else if (overall >= 70) {
    feedback = 'Nice effort! Practice speaking more slowly and clearly.';
  } else {
    feedback = 'Keep practicing! Focus on individual sounds first.';
  }

  return {
    overall,
    accuracy,
    fluency,
    completeness,
    feedback,
  };
}