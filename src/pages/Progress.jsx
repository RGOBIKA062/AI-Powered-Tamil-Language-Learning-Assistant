import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  TrendingUp,
  Target,
  Clock,
  Award,
  Star,
  Calendar,
  BarChart,
} from "lucide-react";

export default function ProgressPage() {
  const stats = {
    totalXP: 1250,
    level: 5,
    nextLevelXP: 2000,
    streak: 7,
    lessonsCompleted: 23,
    practiceTime: 450, // minutes
    accuracy: 88,
    wordsLearned: 145,
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-4">Your Progress</h1>
          <p className="text-lg text-muted-foreground">
            Track your Tamil learning journey
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="h-5 w-5 text-primary" />
              <Badge>Level {stats.level}</Badge>
            </div>
            <div className="text-2xl font-bold mb-2">{stats.totalXP} XP</div>
            <Progress value={(stats.totalXP / stats.nextLevelXP) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {stats.nextLevelXP - stats.totalXP} XP to next level
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">🔥</span>
            </div>
            <div className="text-2xl font-bold">{stats.streak} Days</div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-accent" />
              <Badge variant="outline">{stats.accuracy}%</Badge>
            </div>
            <div className="text-2xl font-bold">{stats.lessonsCompleted}</div>
            <p className="text-sm text-muted-foreground">Lessons Completed</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <div className="text-2xl font-bold">{Math.round(stats.practiceTime / 60)}h</div>
            <p className="text-sm text-muted-foreground">Practice Time</p>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-display font-semibold mb-6">Recent Achievements</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="font-semibold">First Steps</h3>
                <p className="text-sm text-muted-foreground">Complete your first lesson</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="text-3xl">🔥</div>
              <div>
                <h3 className="font-semibold">Week Warrior</h3>
                <p className="text-sm text-muted-foreground">7 day streak achieved</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg opacity-50">
              <div className="text-3xl">🏆</div>
              <div>
                <h3 className="font-semibold">Tamil Master</h3>
                <p className="text-sm text-muted-foreground">Reach level 10</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Stats */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Skills Breakdown
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Speaking</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Writing</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Reading</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Listening</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              Study Calendar
            </h3>
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-warning mx-auto mb-4" />
              <p className="text-muted-foreground">
                You've studied for 7 consecutive days!
              </p>
              <div className="mt-4 flex justify-center gap-1">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="h-8 w-8 rounded bg-success/20 flex items-center justify-center">
                    <Star className="h-4 w-4 fill-success text-success" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}