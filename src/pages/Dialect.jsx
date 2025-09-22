import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Globe, ChevronRight } from "lucide-react";

const dialects = [
  {
    id: "chennai",
    name: "Chennai Tamil",
    description: "Urban dialect spoken in Chennai city.",
    examples: [
      { tamil: "என்ன மச்சி, எப்படி இருக்க?", transliteration: "Enna machi, eppadi irukka?", translation: "Hey bro, how are you?" },
      { tamil: "சொல்லு டா", transliteration: "Sollu da", translation: "Tell me, dude" },
    ],
  },
  {
    id: "madurai",
    name: "Madurai Tamil",
    description: "Southern dialect with unique slang.",
    examples: [
      { tamil: "எங்கப்பா போற", transliteration: "Engappa pora", translation: "Where are you going, man?" },
      { tamil: "அப்பாடி சாமி", transliteration: "Appadi saami", translation: "Oh my god!" },
    ],
  },
  {
    id: "kongu",
    name: "Kongu Tamil",
    description: "Western region dialect, spoken in Coimbatore, Erode.",
    examples: [
      { tamil: "என்னடா பண்ணுற", transliteration: "Ennada pannura", translation: "What are you doing?" },
      { tamil: "போடா", transliteration: "Poda", translation: "Go away" },
    ],
  },
];

export default function Dialect() {
  const [selected, setSelected] = useState(dialects[0].id);
  const current = dialects.find(d => d.id === selected);

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-display font-bold mb-6 flex items-center gap-3">
        <Globe className="h-8 w-8 text-primary" /> Tamil Dialect Mode
        <Badge variant="outline" className="ml-2">Beta</Badge>
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explore regional Tamil dialects and see how everyday phrases change across the state.
      </p>
      <div className="flex gap-4 mb-8">
        {dialects.map(d => (
          <Button
            key={d.id}
            variant={selected === d.id ? "gradient" : "outline"}
            onClick={() => setSelected(d.id)}
            className="font-semibold"
          >
            {d.name}
          </Button>
        ))}
      </div>
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" /> {current.name}
        </h2>
        <p className="mb-4 text-muted-foreground">{current.description}</p>
        <div className="space-y-4">
          {current.examples.map((ex, i) => (
            <div key={i} className="p-4 rounded-lg bg-muted/40">
              <div className="text-xl tamil-text font-bold mb-1">{ex.tamil}</div>
              <div className="text-sm text-muted-foreground mb-1">{ex.transliteration}</div>
              <div className="font-medium">{ex.translation}</div>
            </div>
          ))}
        </div>
      </Card>
      <div className="mt-8 text-right">
        <Button variant="hero" size="lg">
          Try in Conversation Simulator <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}