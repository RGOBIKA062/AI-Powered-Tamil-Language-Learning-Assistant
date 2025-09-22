

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { Sparkles, BookOpen, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
// import { fetchTirukkuralData } from "@/lib/groq";
// Only use local data now
import { tirukkuralData } from "@/lib/tirukkural";
export default function Tirukkural() {
  const [kurals, setKurals] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setKurals(tirukkuralData);
    setLoading(false);
    setError(null);
  }, []);

  const totalKurals = kurals.length;
  const kural = kurals[currentIdx] || {};

  const handlePrev = () => setCurrentIdx((idx) => Math.max(0, idx - 1));
  const handleNext = () => setCurrentIdx((idx) => Math.min(totalKurals - 1, idx + 1));

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12">
        {loading ? (
          <div className="text-center py-12 text-lg">Loading all 1330 Kurals...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : totalKurals === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No Kurals found.</div>
        ) : (
          <Card className="shadow-xl border-primary/30">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-7 w-7 text-primary" />
                <CardTitle className="font-display text-3xl">Tamil Tirukkural</CardTitle>
                <Badge variant="outline" className="ml-2">Kural #{kural.number}</Badge>
              </div>
              <CardDescription className="text-lg text-muted-foreground">
                {kural.adhigaram}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-2xl tamil-text font-bold mb-2">{kural.tamil}</div>
                <div className="text-base text-muted-foreground mb-2 italic">{kural.transliteration}</div>
                <div className="text-lg font-medium mb-2">{kural.english}</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-4 flex gap-3 items-start mb-6">
                <Lightbulb className="h-6 w-6 text-warning mt-1" />
                <div>
                  <div className="font-semibold mb-1 text-warning">Real-life Example</div>
                  <div className="mb-1 text-lg tamil-text font-bold">{kural.scenarioTamil}</div>
                  <div className="mb-1 text-base text-muted-foreground italic">{kural.scenarioTransliteration}</div>
                  <div className="text-base font-medium">{kural.scenarioEnglish}</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50"
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                >
                  <ChevronLeft className="h-5 w-5" /> Previous
                </button>
                <span className="text-sm text-muted-foreground">{kural.adhigaram}</span>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 disabled:opacity-50"
                  onClick={handleNext}
                  disabled={currentIdx === totalKurals - 1}
                >
                  Next <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Badge variant="secondary">Inspired by Thiruvalluvar</Badge>
              <Sparkles className="ml-2 h-5 w-5 text-accent" />
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
}

