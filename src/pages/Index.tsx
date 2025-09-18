import { useState } from "react";
import Layout from "@/components/Layout";
import LessonCard from "@/components/LessonCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { mockLessons } from "@/lib/api";
import { 
  Trophy, 
  Target, 
  Sparkles, 
  BookOpen,
  TrendingUp,
  Star,
  ChevronRight 
} from "lucide-react";

const Index = () => {
  const [selectedLevel, setSelectedLevel] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");

  const filteredLessons = selectedLevel === "all" 
    ? mockLessons 
    : mockLessons.filter(lesson => lesson.level === selectedLevel);

  const dailyGoal = { current: 2, target: 5 };
  const weeklyProgress = { current: 65, target: 100 };

  return (
    <Layout>
      <div className="kolam-pattern min-h-screen">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-glow to-accent p-8 text-white">
          <div className="relative z-10">
            <h1 className="mb-4 text-5xl font-display font-bold">
              வணக்கம்! Welcome back
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Continue your Tamil learning journey
            </p>
            
            {/* Daily Progress */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="glass-card backdrop-blur-xl bg-white/10 border-white/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Daily Goal</span>
                  <Target className="h-5 w-5 text-white/60" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {dailyGoal.current}/{dailyGoal.target} lessons
                </div>
                <Progress 
                  value={(dailyGoal.current / dailyGoal.target) * 100} 
                  className="h-2 bg-white/20"
                />
              </Card>

              <Card className="glass-card backdrop-blur-xl bg-white/10 border-white/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Weekly XP</span>
                  <Trophy className="h-5 w-5 text-white/60" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {weeklyProgress.current} XP
                </div>
                <Progress 
                  value={(weeklyProgress.current / weeklyProgress.target) * 100} 
                  className="h-2 bg-white/20"
                />
              </Card>

              <Card className="glass-card backdrop-blur-xl bg-white/10 border-white/20 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Streak</span>
                  <TrendingUp className="h-5 w-5 text-white/60" />
                </div>
                <div className="text-2xl font-bold text-white">
                  7 days 🔥
                </div>
                <div className="text-sm text-white/70">Keep it going!</div>
              </Card>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Button variant="hero" size="lg" className="justify-start">
            <Sparkles className="mr-2 h-5 w-5" />
            Continue Learning
          </Button>
          <Button variant="outline" size="lg" className="justify-start">
            <BookOpen className="mr-2 h-5 w-5" />
            Practice Vocabulary
          </Button>
          <Button variant="outline" size="lg" className="justify-start">
            <Star className="mr-2 h-5 w-5" />
            Review Flashcards
          </Button>
          <Button variant="outline" size="lg" className="justify-start">
            <Trophy className="mr-2 h-5 w-5" />
            Take a Quiz
          </Button>
        </div>

        {/* Lessons Section */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-display font-bold">Your Lessons</h2>
            <Button variant="ghost">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Level Filter */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all" onClick={() => setSelectedLevel("all")}>
                All
              </TabsTrigger>
              <TabsTrigger value="beginner" onClick={() => setSelectedLevel("beginner")}>
                Beginner
              </TabsTrigger>
              <TabsTrigger value="intermediate" onClick={() => setSelectedLevel("intermediate")}>
                Intermediate
              </TabsTrigger>
              <TabsTrigger value="advanced" onClick={() => setSelectedLevel("advanced")}>
                Advanced
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Lesson Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                {...lesson}
                progress={index === 0 ? 60 : index === 1 ? 30 : 0}
                locked={index > 2}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
