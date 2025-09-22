import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Award, ChevronRight } from "lucide-react";

const scenarios = [
  { id: 1, title: "At the Market", description: "Practice bargaining and shopping conversations.", duration: "10 min" },
  { id: 2, title: "Restaurant Order", description: "Order food and drinks in Tamil.", duration: "8 min" },
  { id: 3, title: "Asking Directions", description: "Navigate and ask for directions.", duration: "12 min" },
];

export default function ConversationSimulator() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3">
          <MessageCircle className="h-8 w-8 text-accent" /> Conversation Simulator
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Practice real-life Tamil conversations with interactive scenarios and instant feedback.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <Award className="h-8 w-8 text-warning" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
                    {scenario.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{scenario.description}</p>
                  <span className="text-xs text-muted-foreground">{scenario.duration}</span>
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
