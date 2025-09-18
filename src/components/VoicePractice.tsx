import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  MicOff,
  Volume2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { AudioRecorder, AudioPlayer, scorePronunciation } from "@/lib/audio";
import { cn } from "@/lib/utils";

interface VoicePracticeProps {
  text: string;
  tamil: string;
  transliteration: string;
  audioUrl?: string;
}

export default function VoicePractice({
  text,
  tamil,
  transliteration,
  audioUrl,
}: VoicePracticeProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [score, setScore] = useState<any>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const recorderRef = useRef<AudioRecorder>(new AudioRecorder());
  const playerRef = useRef<AudioPlayer>(new AudioPlayer());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startRecording = async () => {
    try {
      await recorderRef.current.startRecording();
      setIsRecording(true);
      setScore(null);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      const blob = await recorderRef.current.stopRecording();
      setAudioBlob(blob);
      setIsRecording(false);
      setIsProcessing(true);

      // Score pronunciation
      const result = await scorePronunciation(blob, tamil, "ta");
      setScore(result);
      setIsProcessing(false);
    } catch (error) {
      console.error("Failed to stop recording:", error);
      setIsProcessing(false);
    }
  };

  const playReference = async () => {
    if (audioUrl) {
      await playerRef.current.play(audioUrl);
    }
  };

  const playRecording = async () => {
    if (audioBlob) {
      await playerRef.current.play(audioBlob);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-warning";
    if (score >= 70) return "text-secondary";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) {
      return <CheckCircle className="h-5 w-5 text-success" />;
    }
    return <XCircle className="h-5 w-5 text-destructive" />;
  };

  useEffect(() => {
    // Initialize audio visualizer when canvas is ready
    if (canvasRef.current && isRecording) {
      // Visualizer would be initialized here
    }
  }, [isRecording]);

  return (
    <Card className="p-6">
      {/* Text Display */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold tamil-text mb-2">{tamil}</h3>
        <p className="text-lg text-muted-foreground mb-1">{transliteration}</p>
        <p className="text-sm">{text}</p>
      </div>

      {/* Audio Visualizer */}
      {isRecording && (
        <div className="mb-6">
          <canvas
            ref={canvasRef}
            className="w-full h-24 bg-muted rounded-lg"
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Play Reference */}
        {audioUrl && (
          <Button
            variant="outline"
            onClick={playReference}
            className="w-full"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            Play Reference Audio
          </Button>
        )}

        {/* Record Button */}
        <Button
          variant={isRecording ? "destructive" : "gradient"}
          size="lg"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : isRecording ? (
            <>
              <MicOff className="mr-2 h-5 w-5" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="mr-2 h-5 w-5" />
              Start Recording
            </>
          )}
        </Button>

        {/* Play Recording */}
        {audioBlob && !isRecording && (
          <Button
            variant="outline"
            onClick={playRecording}
            className="w-full"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            Play Your Recording
          </Button>
        )}

        {/* Try Again */}
        {score && (
          <Button
            variant="ghost"
            onClick={() => {
              setScore(null);
              setAudioBlob(null);
            }}
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>

      {/* Score Display */}
      {score && (
        <div className="space-y-4">
          {/* Overall Score */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              {getScoreIcon(score.overall)}
              <div>
                <p className="font-semibold">Overall Score</p>
                <p className="text-sm text-muted-foreground">
                  {score.feedback}
                </p>
              </div>
            </div>
            <span
              className={cn(
                "text-3xl font-bold",
                getScoreColor(score.overall)
              )}
            >
              {score.overall}%
            </span>
          </div>

          {/* Detailed Scores */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
              <p className={cn("text-xl font-bold", getScoreColor(score.accuracy))}>
                {score.accuracy}%
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Fluency</p>
              <p className={cn("text-xl font-bold", getScoreColor(score.fluency))}>
                {score.fluency}%
              </p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Complete</p>
              <p className={cn("text-xl font-bold", getScoreColor(score.completeness))}>
                {score.completeness}%
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <Progress value={score.overall} className="h-3" />
        </div>
      )}
    </Card>
  );
}