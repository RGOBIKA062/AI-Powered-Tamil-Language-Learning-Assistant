import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MessageCircle, ChevronRight } from "lucide-react";

const aiTutorFeatures = [
  { id: 1, title: "Instant Feedback", description: "Get real-time corrections and suggestions." },
  { id: 2, title: "Personalized Practice", description: "AI adapts to your strengths and weaknesses." },
  { id: 3, title: "24/7 Availability", description: "Practice anytime, anywhere." },
];

export default function AITutor() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-primary" /> AI Tutor
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Get instant help and feedback from your AI-powered Tamil tutor.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {aiTutorFeatures.map((feature) => (
            <Card key={feature.id} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <MessageCircle className="h-8 w-8 text-accent" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                </div>
                <Button variant="gradient" size="sm" className="ml-auto">
                  Chat <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Badge variant="outline" className="text-lg">Powered by Groq AI</Badge>
        </div>
      </div>
    </Layout>
  );
}
