import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy, BookOpen, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  id: string;
  title: string;
  titleTamil: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number;
  xpReward: number;
  progress?: number;
  locked?: boolean;
  imageUrl?: string;
}

export default function LessonCard({
  id,
  title,
  titleTamil,
  description,
  level,
  duration,
  xpReward,
  progress = 0,
  locked = false,
  imageUrl,
}: LessonCardProps) {
  const levelColors = {
    beginner: "bg-success/10 text-success border-success/20",
    intermediate: "bg-warning/10 text-warning border-warning/20",
    advanced: "bg-destructive/10 text-destructive border-destructive/20",
  };

  const levelGradients = {
    beginner: "from-success/20 to-success/5",
    intermediate: "from-warning/20 to-warning/5",
    advanced: "from-destructive/20 to-destructive/5",
  };

  return (
    <Link to={locked ? "#" : `/lesson/${id}`} className={cn(locked && "cursor-not-allowed")}>
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:shadow-xl hover:scale-[1.02]",
          locked && "opacity-60"
        )}
      >
        {/* Background Gradient */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity",
            levelGradients[level]
          )}
        />

        {/* Lock Overlay */}
        {locked && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
        )}

        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold mb-1 line-clamp-1">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground tamil-text line-clamp-1">
                {titleTamil}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn("ml-2", levelColors[level])}
            >
              {level}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-secondary" />
              <span className="font-semibold text-secondary">{xpReward} XP</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>{progress}% done</span>
            </div>
          </div>

          {/* Progress Bar */}
          {progress > 0 && (
            <Progress value={progress} className="mt-4 h-2" />
          )}
        </div>

        {/* Hover Effect Glow */}
        <div className="absolute -bottom-2 -right-2 h-20 w-20 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </Card>
    </Link>
  );
}