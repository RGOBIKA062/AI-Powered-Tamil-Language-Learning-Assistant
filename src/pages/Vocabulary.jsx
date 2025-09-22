import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockVocabulary } from "@/lib/api";
import { Star, ChevronRight } from "lucide-react";

export default function Vocabulary() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-display font-bold mb-8 flex items-center gap-3">
          <Star className="h-8 w-8 text-accent" /> Vocabulary Builder
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Expand your Tamil vocabulary interactively. Tap a word to see details and practice pronunciation.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {mockVocabulary.map((word) => (
            <Card key={word.id} className="p-6 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="text-3xl tamil-text font-bold bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-3">
                  {word.tamil}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
                    {word.word}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{word.transliteration}</p>
                  <Badge variant="outline" className="mr-2">{word.partOfSpeech}</Badge>
                  <Badge variant="default">{word.difficulty}</Badge>
                </div>
                <Button variant="gradient" size="sm" className="ml-auto">
                  Practice <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
