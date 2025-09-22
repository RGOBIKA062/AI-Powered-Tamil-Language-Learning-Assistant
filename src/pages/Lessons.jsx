import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockLessons } from "@/lib/api";
import { BookOpen, Award, ChevronRight } from "lucide-react";

export default function Lessons() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" /> Tamil Lessons
          <Badge variant="outline" className="ml-2">All Levels</Badge>
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Explore structured lessons for Tamil alphabet, numbers, greetings, and more. Track your progress and unlock achievements.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockLessons.map((lesson) => (
            <Card key={lesson.id} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="text-4xl tamil-text font-bold bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-3">
                  {lesson.titleTamil}
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
                      {lesson.duration} min
                    </span>
                    <Badge variant={lesson.progress > 0 ? "default" : "outline"}>
                      {lesson.level}
                    </Badge>
                  </div>
                  <Progress value={lesson.xpReward / 100 * 100} className="h-2" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium">{lesson.xpReward} XP</span>
                <Button variant="gradient" size="sm" className="ml-auto">
                  Start Lesson <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
