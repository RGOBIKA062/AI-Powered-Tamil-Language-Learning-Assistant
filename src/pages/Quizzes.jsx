import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, ChevronRight } from "lucide-react";

const quizzes = [
  { id: 1, title: "Tamil Alphabet Quiz", description: "Test your knowledge of Tamil letters.", questions: 10 },
  { id: 2, title: "Vocabulary Challenge", description: "Match Tamil words with their meanings.", questions: 15 },
  { id: 3, title: "Conversation Quiz", description: "Choose the correct response in real-life scenarios.", questions: 12 },
];

export default function QuizzesGames() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3">
          <Zap className="h-8 w-8 text-success" /> Quizzes & Games
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Test your Tamil skills with fun quizzes and interactive games.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <CheckCircle className="h-8 w-8 text-warning" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-success transition-colors">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{quiz.description}</p>
                  <span className="text-xs text-muted-foreground">{quiz.questions} questions</span>
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
