import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Flame, CheckCircle } from "lucide-react";

const achievements = [
  { id: 1, name: "Champion", icon: "🏆", description: "Completed all lessons", xp: 500 },
  { id: 2, name: "Speed", icon: "⚡", description: "Finished a lesson in record time", xp: 200 },
  { id: 3, name: "Accuracy", icon: "🎯", description: "Achieved 100% accuracy in practice", xp: 300 },
  { id: 4, name: "Scholar", icon: "📚", description: "Mastered 100 vocabulary words", xp: 400 },
];

export default function Achievements() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3">
          <Award className="h-8 w-8 text-warning" /> Achievements
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Track your progress and earn badges for your learning milestones.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {achievements.map((ach) => (
            <Card key={ach.id} className="p-6 flex items-center gap-6 hover:shadow-lg transition-all">
              <div className="text-5xl">{ach.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{ach.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{ach.description}</p>
                <Badge variant="outline" className="mr-2">{ach.xp} XP</Badge>
                <Star className="h-4 w-4 text-warning inline" />
              </div>
              <CheckCircle className="h-6 w-6 text-success" />
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
