import { useState } from "react";
import Layout from "@/components/Layout";
import VoicePractice from "@/components/VoicePractice";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mic,
  Volume2,
  Headphones,
  Award,
  Target,
  TrendingUp,
  MessageSquare,
  Play,
  Settings,
  ChevronRight,
  Sparkles,
  BarChart,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Voice() {
  const [selectedTab, setSelectedTab] = useState("pronunciation");
  const [selectedLevel, setSelectedLevel] = useState("beginner");

  const voiceExercises = [
    {
      id: 1,
      title: "Basic Greetings",
      tamil: "வணக்கம்",
      transliteration: "Vaṇakkam",
      translation: "Hello / Greetings",
      difficulty: "beginner",
      completed: true,
      score: 92,
    },
    {
      id: 2,
      title: "Thank You",
      tamil: "நன்றி",
      transliteration: "Nanri",
      translation: "Thank you",
      difficulty: "beginner",
      completed: true,
      score: 88,
    },
    {
      id: 3,
      title: "How are you?",
      tamil: "எப்படி இருக்கிறீர்கள்?",
      transliteration: "Eppaḍi irukkiṟīrkaḷ?",
      translation: "How are you?",
      difficulty: "beginner",
      completed: false,
      score: 0,
    },
    {
      id: 4,
      title: "Good Morning",
      tamil: "காலை வணக்கம்",
      transliteration: "Kālai vaṇakkam",
      translation: "Good morning",
      difficulty: "beginner",
      completed: false,
      score: 0,
    },
  ];

  const conversationScenarios = [
    {
      id: 1,
      title: "At the Market",
      description: "Practice bargaining and shopping conversations",
      duration: "10 min",
      level: "intermediate",
      icon: "🛒",
    },
    {
      id: 2,
      title: "Restaurant Order",
      description: "Order food and drinks in Tamil",
      duration: "8 min",
      level: "beginner",
      icon: "🍛",
    },
    {
      id: 3,
      title: "Asking Directions",
      description: "Navigate and ask for directions",
      duration: "12 min",
      level: "intermediate",
      icon: "🗺️",
    },
    {
      id: 4,
      title: "Meeting Friends",
      description: "Casual conversations with friends",
      duration: "15 min",
      level: "beginner",
      icon: "👥",
    },
  ];

  const pronunciationStats = {
    totalPracticed: 45,
    averageScore: 85,
    streak: 7,
    minutesPracticed: 120,
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-dark">
              <Mic className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">Voice Practice</h1>
              <p className="text-lg text-muted-foreground">
                Master Tamil pronunciation with AI-powered feedback
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-primary" />
              <Badge variant="outline">Score</Badge>
            </div>
            <div className="text-2xl font-bold">{pronunciationStats.averageScore}%</div>
            <p className="text-sm text-muted-foreground">Average Score</p>
            <Progress value={pronunciationStats.averageScore} className="mt-2 h-2" />
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <Headphones className="h-5 w-5 text-secondary" />
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                Practice
              </Badge>
            </div>
            <div className="text-2xl font-bold">{pronunciationStats.totalPracticed}</div>
            <p className="text-sm text-muted-foreground">Words Practiced</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">🔥</span>
            </div>
            <div className="text-2xl font-bold">{pronunciationStats.streak}</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-warning" />
              <Badge variant="outline">Time</Badge>
            </div>
            <div className="text-2xl font-bold">{pronunciationStats.minutesPracticed}</div>
            <p className="text-sm text-muted-foreground">Minutes Practiced</p>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="pronunciation">Pronunciation</TabsTrigger>
            <TabsTrigger value="conversation">Conversation</TabsTrigger>
            <TabsTrigger value="listening">Listening</TabsTrigger>
          </TabsList>

          <TabsContent value="pronunciation" className="space-y-8">
            {/* Current Practice */}
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <VoicePractice
                  text="Hello / Greetings"
                  tamil="வணக்கம்"
                  transliteration="Vaṇakkam"
                  audioUrl="/audio/vanakkam.mp3"
                />
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Tips */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Pronunciation Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Focus on retroflex consonants (ṭ, ḍ, ṇ)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Pay attention to long vs short vowels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Practice aspirated consonants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                      <span>Listen and repeat multiple times</span>
                    </li>
                  </ul>
                </Card>

                {/* Settings */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-secondary" />
                    Voice Settings
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Playback Speed</label>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">0.5x</Button>
                        <Button variant="default" size="sm">1x</Button>
                        <Button variant="outline" size="sm">1.5x</Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Voice Type</label>
                      <div className="flex gap-2 mt-2">
                        <Button variant="default" size="sm">Male</Button>
                        <Button variant="outline" size="sm">Female</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Exercise List */}
            <div>
              <h2 className="text-2xl font-display font-semibold mb-4">
                Today's Exercises
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {voiceExercises.map((exercise) => (
                  <Card
                    key={exercise.id}
                    className={cn(
                      "p-6 hover:shadow-lg transition-all cursor-pointer",
                      exercise.completed && "bg-muted/30"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{exercise.title}</h3>
                        <p className="text-2xl tamil-text font-bold mb-2">
                          {exercise.tamil}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exercise.transliteration}
                        </p>
                      </div>
                      {exercise.completed && (
                        <Badge className="bg-success/10 text-success border-success/20">
                          {exercise.score}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{exercise.difficulty}</Badge>
                      <Button variant="ghost" size="sm">
                        {exercise.completed ? "Review" : "Start"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conversation" className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-semibold">
                  Conversation Scenarios
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant={selectedLevel === "beginner" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel("beginner")}
                  >
                    Beginner
                  </Button>
                  <Button
                    variant={selectedLevel === "intermediate" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel("intermediate")}
                  >
                    Intermediate
                  </Button>
                  <Button
                    variant={selectedLevel === "advanced" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel("advanced")}
                  >
                    Advanced
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {conversationScenarios
                  .filter(s => selectedLevel === "beginner" ? true : s.level === selectedLevel)
                  .map((scenario) => (
                    <Card
                      key={scenario.id}
                      className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{scenario.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {scenario.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {scenario.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {scenario.duration}
                              </span>
                              <Badge variant="outline">{scenario.level}</Badge>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Play className="h-4 w-4 mr-1" />
                              Start
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>

              {/* AI Conversation Partner */}
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-2">
                      AI Conversation Partner
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Practice real conversations with our AI tutor
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Unlimited Practice
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        Instant Feedback
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart className="h-4 w-4" />
                        Track Progress
                      </span>
                    </div>
                  </div>
                  <Button variant="gradient" size="lg">
                    Start Conversation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="listening" className="space-y-8">
            <Card className="p-12">
              <div className="text-center">
                <Volume2 className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Listening Comprehension</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Improve your Tamil listening skills with podcasts, stories, and conversations
                </p>
                <Button variant="gradient" size="lg">
                  <Headphones className="mr-2 h-5 w-5" />
                  Start Listening Practice
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}