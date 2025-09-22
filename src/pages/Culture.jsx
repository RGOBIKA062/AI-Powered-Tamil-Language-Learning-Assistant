import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Sparkles, Globe } from "lucide-react";

const insights = [
  { id: 1, title: "Tamil Festivals", description: "Learn about Pongal, Deepavali, and other major celebrations." },
  { id: 2, title: "Traditional Foods", description: "Explore classic Tamil dishes and their cultural significance." },
  { id: 3, title: "Famous Tamil Authors", description: "Discover the legends of Tamil literature." },
];

export default function CulturalInsights() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3">
          <Globe className="h-8 w-8 text-warning" /> Cultural Insights
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn about Tamil culture, festivals, food, and literature to enrich your language journey.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {insights.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <Sparkles className="h-8 w-8 text-accent" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-warning transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
