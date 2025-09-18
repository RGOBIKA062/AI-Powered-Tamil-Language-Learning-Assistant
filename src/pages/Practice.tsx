import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockVocabulary } from "@/lib/api";
import { SpacedRepetitionSystem, ReviewQuality } from "@/lib/spaced-repetition";
import {
  Brain,
  Clock,
  Target,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Eye,
  EyeOff,
  Zap,
  Award,
  BarChart,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Practice() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    correct: 0,
    incorrect: 0,
    time: 0,
  });
  const [selectedMode, setSelectedMode] = useState<"flashcards" | "quiz" | "match">("flashcards");

  // Mock flashcard data
  const mockCards = mockVocabulary.map((vocab, index) => ({
    id: vocab.id,
    front: vocab.tamil,
    back: vocab.translation,
    transliteration: vocab.transliteration,
    nextReview: new Date(),
    interval: 1,
    easeFactor: 2.5,
    reviews: index % 3,
    lapses: 0,
  }));

  const currentCard = mockCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / mockCards.length) * 100;

  const handleReview = (quality: ReviewQuality) => {
    // Update stats
    setSessionStats(prev => ({
      ...prev,
      reviewed: prev.reviewed + 1,
      correct: quality >= ReviewQuality.Good ? prev.correct + 1 : prev.correct,
      incorrect: quality === ReviewQuality.Again ? prev.incorrect + 1 : prev.incorrect,
    }));

    // Move to next card
    if (currentCardIndex < mockCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const studyModes = [
    {
      id: "flashcards",
      name: "Flashcards",
      icon: Brain,
      description: "Classic spaced repetition",
      color: "from-primary to-primary-dark",
    },
    {
      id: "quiz",
      name: "Quick Quiz",
      icon: Zap,
      description: "Test your knowledge",
      color: "from-secondary to-secondary-glow",
    },
    {
      id: "match",
      name: "Match Game",
      icon: Target,
      description: "Match Tamil with English",
      color: "from-accent to-accent-glow",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-4">Practice Session</h1>
          <p className="text-lg text-muted-foreground">
            Strengthen your Tamil vocabulary with smart practice modes
          </p>
        </div>

        {/* Study Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BarChart className="h-5 w-5 text-primary" />
              <Badge variant="outline">Today</Badge>
            </div>
            <div className="text-2xl font-bold">{sessionStats.reviewed}</div>
            <p className="text-sm text-muted-foreground">Cards Reviewed</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-success">
                {sessionStats.correct > 0 
                  ? Math.round((sessionStats.correct / sessionStats.reviewed) * 100) 
                  : 0}%
              </span>
            </div>
            <div className="text-2xl font-bold">{sessionStats.correct}</div>
            <p className="text-sm text-muted-foreground">Correct</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">Streak</Badge>
            </div>
            <div className="text-2xl font-bold">7</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium">+50 XP</span>
            </div>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </Card>
        </div>

        {/* Study Mode Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-semibold mb-4">Choose Your Practice Mode</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {studyModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <Card
                  key={mode.id}
                  className={cn(
                    "p-6 cursor-pointer transition-all hover:shadow-lg",
                    selectedMode === mode.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedMode(mode.id as any)}
                >
                  <div className={cn(
                    "inline-flex p-3 rounded-xl mb-4",
                    "bg-gradient-to-br",
                    mode.color
                  )}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{mode.name}</h3>
                  <p className="text-sm text-muted-foreground">{mode.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Main Practice Area */}
        <Tabs value={selectedMode} className="mb-8">
          <TabsContent value="flashcards" className="mt-0">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Flashcard Area */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Card {currentCardIndex + 1} of {mockCards.length}
                      </span>
                      <span className="text-sm font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Flashcard */}
                  <div className="mb-8">
                    <div
                      className={cn(
                        "relative min-h-[300px] flex flex-col items-center justify-center p-8",
                        "bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl",
                        "transition-all duration-500 transform cursor-pointer",
                        showAnswer ? "rotate-y-180" : ""
                      )}
                      onClick={() => setShowAnswer(!showAnswer)}
                    >
                      {!showAnswer ? (
                        <div className="text-center">
                          <p className="text-5xl font-bold tamil-text mb-4">
                            {currentCard.front}
                          </p>
                          <p className="text-xl text-muted-foreground">
                            {currentCard.transliteration}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Play audio
                            }}
                          >
                            <Volume2 className="h-4 w-4 mr-2" />
                            Play Audio
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-3xl font-semibold mb-4">
                            {currentCard.back}
                          </p>
                          <Badge variant="outline" className="text-base">
                            {currentCard.transliteration}
                          </Badge>
                        </div>
                      )}

                      {/* Flip Indicator */}
                      <div className="absolute bottom-4 right-4">
                        <RefreshCw className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (currentCardIndex > 0) {
                          setCurrentCardIndex(prev => prev - 1);
                          setShowAnswer(false);
                        }
                      }}
                      disabled={currentCardIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    {showAnswer ? (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleReview(ReviewQuality.Again)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Again
                        </Button>
                        <Button
                          variant="outline"
                          className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                          onClick={() => handleReview(ReviewQuality.Hard)}
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Hard
                        </Button>
                        <Button
                          variant="outline"
                          className="border-success text-success hover:bg-success hover:text-success-foreground"
                          onClick={() => handleReview(ReviewQuality.Good)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Good
                        </Button>
                        <Button
                          variant="gradient"
                          onClick={() => handleReview(ReviewQuality.Easy)}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Easy
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="hero"
                        onClick={() => setShowAnswer(true)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Show Answer
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      onClick={() => {
                        if (currentCardIndex < mockCards.length - 1) {
                          setCurrentCardIndex(prev => prev + 1);
                          setShowAnswer(false);
                        }
                      }}
                      disabled={currentCardIndex === mockCards.length - 1}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Study Tips */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Study Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Try to recall before revealing the answer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Say the word out loud for better retention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Review difficult cards more frequently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Take breaks every 20-30 minutes</span>
                    </li>
                  </ul>
                </Card>

                {/* Session Summary */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-secondary" />
                    Session Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cards Due</span>
                      <Badge>{mockCards.length}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">New Cards</span>
                      <Badge variant="outline">5</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Review Cards</span>
                      <Badge variant="outline">{mockCards.length - 5}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Time</span>
                      <span className="text-sm font-medium">15 min</span>
                    </div>
                  </div>
                </Card>

                {/* Upcoming Reviews */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Upcoming Reviews
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                      <span className="text-sm">Today</span>
                      <Badge variant="default">{mockCards.length} cards</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <span className="text-sm text-muted-foreground">Tomorrow</span>
                      <span className="text-sm">12 cards</span>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <span className="text-sm text-muted-foreground">This Week</span>
                      <span className="text-sm">45 cards</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="mt-0">
            <Card className="p-8">
              <div className="text-center py-12">
                <Zap className="h-16 w-16 text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Quick Quiz Mode</h3>
                <p className="text-muted-foreground mb-6">
                  Test your knowledge with multiple choice questions
                </p>
                <Button variant="gradient" size="lg">
                  Start Quiz
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="match" className="mt-0">
            <Card className="p-8">
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Match Game</h3>
                <p className="text-muted-foreground mb-6">
                  Match Tamil words with their English translations
                </p>
                <Button variant="gradient" size="lg">
                  Start Game
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}