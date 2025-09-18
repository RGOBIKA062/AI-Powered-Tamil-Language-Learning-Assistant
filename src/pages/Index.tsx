import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import LessonCard from "@/components/LessonCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockLessons, mockVocabulary } from "@/lib/api";
import { 
  Trophy, 
  Target, 
  Sparkles, 
  BookOpen,
  TrendingUp,
  Star,
  ChevronRight,
  Flame,
  Brain,
  Mic,
  PenTool,
  Users,
  Zap,
  Award,
  Clock,
  Heart,
  Globe,
  Headphones,
  MessageCircle,
  Play,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedLevel, setSelectedLevel] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredLessons = selectedLevel === "all" 
    ? mockLessons 
    : mockLessons.filter(lesson => lesson.level === selectedLevel);

  const dailyGoal = { current: 2, target: 5 };
  const weeklyProgress = { current: 65, target: 100 };

  const features = [
    {
      icon: Mic,
      title: "Voice Practice",
      description: "AI-powered pronunciation scoring",
      color: "from-primary to-primary-dark",
      link: "/voice"
    },
    {
      icon: PenTool,
      title: "Handwriting",
      description: "Learn Tamil script stroke by stroke",
      color: "from-secondary to-secondary-glow",
      link: "/handwriting"
    },
    {
      icon: Brain,
      title: "Smart Practice",
      description: "Adaptive learning with spaced repetition",
      color: "from-accent to-accent-glow",
      link: "/practice"
    },
    {
      icon: Users,
      title: "Community",
      description: "Learn together with native speakers",
      color: "from-success to-success/80",
      link: "/community"
    }
  ];

  const achievements = [
    { name: "First Steps", icon: "🎯", progress: 100, xp: 50 },
    { name: "Vocab Master", icon: "📚", progress: 65, xp: 100 },
    { name: "Conversation Pro", icon: "💬", progress: 30, xp: 200 },
    { name: "Writing Expert", icon: "✍️", progress: 45, xp: 150 }
  ];

  return (
    <Layout>
      <div className="relative min-h-screen">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-blob" />
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-40 left-1/2 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-blob animation-delay-4000" />
        </div>

        {/* Hero Section with Parallax Effect */}
        <div className={cn(
          "relative mb-16 overflow-hidden rounded-3xl",
          "bg-gradient-to-br from-primary via-primary-glow to-accent",
          "transform transition-all duration-1000",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
            {/* Animated Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-white/5 animate-pulse" />
            </div>
            
            <div className="relative z-10 p-12 text-white">
            {/* Welcome Message with Animation */}
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                <span className="text-white/90 font-medium">வணக்கம் - Vaṇakkam</span>
              </div>
              <h1 className="mb-4 text-6xl font-display font-bold leading-tight">
                Master Tamil with
                <span className="block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  AI-Powered Learning
                </span>
              </h1>
              <p className="text-xl opacity-90 max-w-2xl">
                Join thousands learning Tamil through interactive lessons, voice practice, and personalized AI tutoring
              </p>
            </div>
            
            {/* Stats Grid with Glassmorphism */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card className="glass-card backdrop-blur-xl bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <Target className="h-6 w-6 text-white/80" />
                  <Badge className="bg-white/20 text-white border-white/30">Daily</Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {dailyGoal.current}/{dailyGoal.target}
                </div>
                <p className="text-white/80 text-sm">Lessons Today</p>
                <Progress 
                  value={(dailyGoal.current / dailyGoal.target) * 100} 
                  className="mt-3 h-2 bg-white/20"
                />
              </Card>

              <Card className="glass-card backdrop-blur-xl bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <Flame className="h-6 w-6 text-white/80" />
                  <Badge className="bg-white/20 text-white border-white/30">🔥</Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  7 Days
                </div>
                <p className="text-white/80 text-sm">Current Streak</p>
                <div className="mt-3 flex gap-1">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="h-2 flex-1 rounded-full bg-white/40" />
                  ))}
                </div>
              </Card>

              <Card className="glass-card backdrop-blur-xl bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <Trophy className="h-6 w-6 text-white/80" />
                  <Badge className="bg-white/20 text-white border-white/30">XP</Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  1,250
                </div>
                <p className="text-white/80 text-sm">Total Points</p>
                <Progress 
                  value={65} 
                  className="mt-3 h-2 bg-white/20"
                />
              </Card>

              <Card className="glass-card backdrop-blur-xl bg-white/10 border-white/20 p-6 hover:bg-white/15 transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <Award className="h-6 w-6 text-white/80" />
                  <Badge className="bg-white/20 text-white border-white/30">Level</Badge>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  5
                </div>
                <p className="text-white/80 text-sm">Current Level</p>
                <div className="mt-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-white text-white" />
                  ))}
                </div>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Play className="mr-2 h-5 w-5" />
                Continue Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="glass"
                className="shadow-xl hover:shadow-2xl"
              >
                <Headphones className="mr-2 h-5 w-5" />
                Practice Speaking
              </Button>
            </div>
          </div>

          {/* Floating Animation Elements */}
          <div className="absolute top-10 right-10 animate-float">
            <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="absolute bottom-10 left-10 animate-float animation-delay-2000">
            <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        {/* Feature Cards with Hover Effects */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-display font-bold mb-4 gradient-text">
              Learn Tamil Your Way
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from multiple learning modes designed to match your style and pace
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  to={feature.link}
                  className="group"
                >
                  <Card className={cn(
                    "relative overflow-hidden h-full",
                    "transition-all duration-300 hover:scale-105 hover:shadow-2xl",
                    "animate-slide-up"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity",
                      feature.color
                    )} />
                    <div className="relative p-6">
                      <div className={cn(
                        "inline-flex p-3 rounded-xl mb-4",
                        "bg-gradient-to-br",
                        feature.color
                      )}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground group-hover:text-white/90 transition-colors">
                        {feature.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary group-hover:text-white transition-colors">
                        <span className="text-sm font-medium">Start Learning</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold">Recent Achievements</h2>
            <Button variant="ghost">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, index) => (
              <Card 
                key={achievement.name}
                className="p-6 hover:shadow-lg transition-all hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{achievement.name}</h4>
                    <p className="text-sm text-muted-foreground">+{achievement.xp} XP</p>
                  </div>
                </div>
                <Progress value={achievement.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {achievement.progress}% Complete
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Lessons Section with Enhanced Design */}
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Your Learning Path</h2>
              <p className="text-muted-foreground">Personalized lessons based on your progress</p>
            </div>
            <Button variant="outline" size="lg">
              <Globe className="mr-2 h-4 w-4" />
              Explore All Lessons
            </Button>
          </div>

          {/* Level Filter Tabs */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid w-full max-w-lg grid-cols-4 p-1 bg-muted">
              <TabsTrigger 
                value="all" 
                onClick={() => setSelectedLevel("all")}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Levels
              </TabsTrigger>
              <TabsTrigger 
                value="beginner" 
                onClick={() => setSelectedLevel("beginner")}
                className="data-[state=active]:bg-success data-[state=active]:text-success-foreground"
              >
                Beginner
              </TabsTrigger>
              <TabsTrigger 
                value="intermediate" 
                onClick={() => setSelectedLevel("intermediate")}
                className="data-[state=active]:bg-warning data-[state=active]:text-warning-foreground"
              >
                Intermediate
              </TabsTrigger>
              <TabsTrigger 
                value="advanced" 
                onClick={() => setSelectedLevel("advanced")}
                className="data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
              >
                Advanced
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Lesson Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <LessonCard
                  {...lesson}
                  progress={index === 0 ? 60 : index === 1 ? 30 : 0}
                  locked={index > 2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Vocabulary Review */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">Quick Vocabulary Review</h3>
                <p className="text-muted-foreground">Test your knowledge with today's words</p>
              </div>
              <Button variant="gradient" size="lg">
                <Zap className="mr-2 h-5 w-5" />
                Start Review
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {mockVocabulary.slice(0, 3).map((word) => (
                <Card key={word.id} className="p-4 hover:shadow-md transition-all">
                  <div className="tamil-text text-2xl font-bold mb-2">{word.tamil}</div>
                  <div className="text-sm text-muted-foreground mb-1">{word.transliteration}</div>
                  <div className="font-medium">{word.translation}</div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-display font-bold mb-4">
            Ready to become fluent in Tamil?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of learners and get personalized guidance from AI tutors and native speakers
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="xl" variant="hero">
              <CheckCircle className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button size="xl" variant="outline">
              <MessageCircle className="mr-2 h-5 w-5" />
              Talk to a Tutor
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
