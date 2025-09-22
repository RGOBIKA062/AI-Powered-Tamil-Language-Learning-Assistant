import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Zap, Award, Clock, ChevronRight } from "lucide-react";

const challenges = [
  { id: 1, title: "One-Minute Vocabulary", description: "Recall as many Tamil words as you can in 60 seconds.", xp: 50 },
  { id: 2, title: "Speed Greetings", description: "Say 10 greetings in Tamil before time runs out.", xp: 40 },
  { id: 3, title: "Quick Numbers", description: "Count from 1 to 20 in Tamil in under a minute.", xp: 30 },
];

export default function Challenges() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3">
          <Flame className="h-8 w-8 text-destructive" /> Daily Challenges
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Practice with new challenges every day. Beat the timer and earn XP!
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-warning" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-destructive transition-colors">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                  <Badge variant="outline" className="mr-2">{challenge.xp} XP</Badge>
                </div>
                <Button variant="gradient" size="sm" className="ml-auto">
                  Start <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}