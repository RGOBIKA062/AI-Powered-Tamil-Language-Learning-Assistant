import { useState } from "react";
import Layout from "@/components/Layout";
import HandwritingCanvas from "@/components/HandwritingCanvas";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PenTool,
  BookOpen,
  Award,
  Target,
  TrendingUp,
  ChevronRight,
  Play,
  RotateCcw,
  CheckCircle,
  Star,
  Zap,
  Info,
  ArrowRight,
  Grid3x3,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Handwriting() {
  const [selectedCategory, setSelectedCategory] = useState("vowels");
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  const tamilVowels = [
    { char: "அ", transliteration: "a", name: "a (short)" },
    { char: "ஆ", transliteration: "ā", name: "aa (long)" },
    { char: "இ", transliteration: "i", name: "i (short)" },
    { char: "ஈ", transliteration: "ī", name: "ii (long)" },
    { char: "உ", transliteration: "u", name: "u (short)" },
    { char: "ஊ", transliteration: "ū", name: "uu (long)" },
    { char: "எ", transliteration: "e", name: "e (short)" },
    { char: "ஏ", transliteration: "ē", name: "ee (long)" },
    { char: "ஐ", transliteration: "ai", name: "ai" },
    { char: "ஒ", transliteration: "o", name: "o (short)" },
    { char: "ஓ", transliteration: "ō", name: "oo (long)" },
    { char: "ஔ", transliteration: "au", name: "au" },
  ];

  const tamilConsonants = [
    { char: "க", transliteration: "ka", name: "ka" },
    { char: "ங", transliteration: "ṅa", name: "nga" },
    { char: "ச", transliteration: "ca", name: "cha" },
    { char: "ஞ", transliteration: "ña", name: "nya" },
    { char: "ட", transliteration: "ṭa", name: "ta (retroflex)" },
    { char: "ண", transliteration: "ṇa", name: "na (retroflex)" },
  ];

  const currentCharacters = selectedCategory === "vowels" ? tamilVowels : tamilConsonants;
  const currentCharacter = currentCharacters[currentCharacterIndex];

  const writingStats = {
    charactersLearned: 15,
    accuracyRate: 88,
    practiceStreak: 5,
    totalStrokes: 234,
  };

  const lessons = [
    {
      id: 1,
      title: "Basic Vowels (உயிர் எழுத்து)",
      description: "Learn the 12 Tamil vowels",
      progress: 75,
      characters: 12,
      icon: "அ",
    },
    {
      id: 2,
      title: "Consonants (மெய் எழுத்து)",
      description: "Master the 18 Tamil consonants",
      progress: 40,
      characters: 18,
      icon: "க",
    },
    {
      id: 3,
      title: "Combined Letters",
      description: "Vowel-consonant combinations",
      progress: 20,
      characters: 216,
      icon: "கா",
    },
    {
      id: 4,
      title: "Special Characters",
      description: "Grantha letters and symbols",
      progress: 0,
      characters: 6,
      icon: "ஃ",
    },
  ];

  const handleCharacterSubmit = (imageData) => {
    console.log("Character submitted:", imageData);
    // Here you would send to backend for analysis
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-secondary-glow">
              <PenTool className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">Tamil Writing Practice</h1>
              <p className="text-lg text-muted-foreground">
                Learn to write Tamil script with guided stroke practice
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <Badge variant="outline">Progress</Badge>
            </div>
            <div className="text-2xl font-bold">{writingStats.charactersLearned}</div>
            <p className="text-sm text-muted-foreground">Characters Learned</p>
            <Progress value={60} className="mt-2 h-2" />
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-secondary" />
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                Accuracy
              </Badge>
            </div>
            <div className="text-2xl font-bold">{writingStats.accuracyRate}%</div>
            <p className="text-sm text-muted-foreground">Average Accuracy</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">🔥</span>
            </div>
            <div className="text-2xl font-bold">{writingStats.practiceStreak}</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-5 w-5 text-warning" />
              <Badge variant="outline">Total</Badge>
            </div>
            <div className="text-2xl font-bold">{writingStats.totalStrokes}</div>
            <p className="text-sm text-muted-foreground">Strokes Practiced</p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Writing Canvas */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-display font-semibold">
                  Practice: {currentCharacter.name}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentCharacterIndex(Math.max(0, currentCharacterIndex - 1))}
                    disabled={currentCharacterIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentCharacterIndex(Math.min(currentCharacters.length - 1, currentCharacterIndex + 1))}
                    disabled={currentCharacterIndex === currentCharacters.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>

              {/* Character Selector Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="vowels">Vowels (உயிர்)</TabsTrigger>
                  <TabsTrigger value="consonants">Consonants (மெய்)</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Character Info */}
              <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Character</p>
                    <p className="text-5xl tamil-text font-bold">{currentCharacter.char}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Transliteration</p>
                    <p className="text-2xl font-semibold">{currentCharacter.transliteration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Name</p>
                    <p className="text-xl">{currentCharacter.name}</p>
                  </div>
                </div>
              </Card>

              {/* Canvas */}
              <HandwritingCanvas
                targetCharacter={currentCharacter.char}
                onSubmit={handleCharacterSubmit}
                showGuide={true}
              />
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Character Grid */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Grid3x3 className="h-5 w-5 text-primary" />
                Quick Select
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {currentCharacters.map((char, index) => (
                  <Button
                    key={char.char}
                    variant={currentCharacterIndex === index ? "default" : "outline"}
                    className="h-12 text-xl tamil-text font-bold"
                    onClick={() => setCurrentCharacterIndex(index)}
                  >
                    {char.char}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Writing Tips */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-secondary" />
                Writing Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <span>Start from the top-left corner</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <span>Follow the stroke order guides</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <span>Keep consistent stroke width</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <span>Practice each character 5-10 times</span>
                </li>
              </ul>
            </Card>

            {/* Progress Tracker */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-warning" />
                Today's Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Characters Practiced</span>
                  <Badge>8/12</Badge>
                </div>
                <Progress value={67} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time Spent</span>
                  <span className="font-medium">15 min</span>
                </div>
              </div>
              <Button variant="gradient" className="w-full mt-4">
                <Zap className="mr-2 h-4 w-4" />
                Complete Session
              </Button>
            </Card>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold">Writing Lessons</h2>
            <Button variant="ghost">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl tamil-text font-bold bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-3">
                    {lesson.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {lesson.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">
                        {lesson.characters} characters
                      </span>
                      <Badge variant={lesson.progress > 0 ? "default" : "outline"}>
                        {lesson.progress}% Complete
                      </Badge>
                    </div>
                    <Progress value={lesson.progress} className="h-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-secondary/5 to-warning/5 border-secondary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-display font-bold mb-2">
                Master Tamil Script
              </h3>
              <p className="text-muted-foreground mb-4">
                Complete all 247 characters to unlock the Writing Master achievement
              </p>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  500 XP Reward
                </span>
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Certificate
                </span>
              </div>
            </div>
            <Button variant="gradient" size="lg">
              Start Full Course
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}