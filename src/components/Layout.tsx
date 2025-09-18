import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Mic,
  PenTool,
  Users,
  Trophy,
  Settings,
  Menu,
  X,
  Sparkles,
  Brain,
  Target,
  Flame,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Learn", href: "/", icon: BookOpen },
    { name: "Practice", href: "/practice", icon: Brain },
    { name: "Voice", href: "/voice", icon: Mic },
    { name: "Writing", href: "/handwriting", icon: PenTool },
    { name: "Community", href: "/community", icon: Users },
    { name: "Progress", href: "/progress", icon: Trophy },
  ];

  const userStats = {
    streak: 7,
    xp: 1250,
    level: 5,
    nextLevelXp: 2000,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-lg opacity-70"></div>
                <div className="relative bg-gradient-to-r from-primary to-accent rounded-lg p-2">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="font-display text-xl font-bold gradient-text">
                TamilBuddy
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-smooth",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Stats */}
            <div className="hidden md:flex items-center gap-4">
              {/* Streak */}
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-secondary" />
                <span className="font-semibold">{userStats.streak}</span>
              </div>

              {/* XP Progress */}
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Level {userStats.level}
                  </span>
                  <Progress
                    value={(userStats.xp / userStats.nextLevelXp) * 100}
                    className="h-2 w-20"
                  />
                </div>
              </div>

              {/* Settings */}
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t bg-card p-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile User Stats */}
            <div className="mt-4 pt-4 border-t flex items-center justify-around">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-secondary" />
                <span className="font-semibold">{userStats.streak} day</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="font-semibold">
                  {userStats.xp} XP
                </span>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}