import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Volume2, ChevronRight } from "lucide-react";

const listeningExercises = [
  { id: 1, title: "Tamil Podcast", description: "Listen to a short Tamil podcast and answer questions.", duration: "5 min" },
  { id: 2, title: "Story Time", description: "Hear a Tamil story and recall key details.", duration: "7 min" },
  { id: 3, title: "Conversation Clip", description: "Practice comprehension with real-life dialogues.", duration: "6 min" },
];

export default function ListeningPractice() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3">
          <Headphones className="h-8 w-8 text-primary" /> Listening Practice
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Improve your Tamil listening skills with audio exercises and comprehension questions.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {listeningExercises.map((ex) => (
            <Card key={ex.id} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <Volume2 className="h-8 w-8 text-accent" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                    {ex.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{ex.description}</p>
                  <span className="text-xs text-muted-foreground">{ex.duration}</span>
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
