import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  TrendingUp,
  Award,
  Search,
  Filter,
  Plus,
  ThumbsUp,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Globe,
  Calendar,
  MapPin,
  Star,
  ChevronRight,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Community() {
  const [selectedTab, setSelectedTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");

  const discussions = [
    {
      id: 1,
      title: "Tips for mastering retroflex consonants",
      author: "Priya Kumar",
      avatar: "PK",
      category: "pronunciation",
      content: "I've been struggling with the retroflex consonants (ட, ண, ள). Any tips on how to position the tongue correctly?",
      likes: 24,
      replies: 12,
      views: 156,
      time: "2 hours ago",
      tags: ["pronunciation", "consonants", "beginner"],
      pinned: true,
    },
    {
      id: 2,
      title: "Daily conversation practice group",
      author: "Raj Sharma",
      avatar: "RS",
      category: "practice",
      content: "Looking for partners to practice daily conversations. We meet online every evening at 7 PM IST.",
      likes: 45,
      replies: 28,
      views: 342,
      time: "5 hours ago",
      tags: ["practice", "conversation", "group"],
    },
    {
      id: 3,
      title: "Tamil movie recommendations for learners",
      author: "Maya Chen",
      avatar: "MC",
      category: "resources",
      content: "Here's my list of Tamil movies with simple dialogues perfect for beginners...",
      likes: 67,
      replies: 34,
      views: 512,
      time: "1 day ago",
      tags: ["movies", "resources", "culture"],
    },
    {
      id: 4,
      title: "Understanding Tamil honorifics",
      author: "Dr. Anand",
      avatar: "DA",
      category: "grammar",
      content: "A comprehensive guide to using respectful forms in Tamil (நீங்கள் vs நீ)",
      likes: 89,
      replies: 15,
      views: 678,
      time: "2 days ago",
      tags: ["grammar", "culture", "intermediate"],
      verified: true,
    },
  ];

  const events = [
    {
      id: 1,
      title: "Tamil Language Exchange Meetup",
      date: "Dec 28, 2024",
      time: "3:00 PM",
      location: "Online",
      attendees: 45,
      type: "virtual",
    },
    {
      id: 2,
      title: "Beginner's Workshop: Tamil Script",
      date: "Dec 30, 2024",
      time: "5:00 PM",
      location: "Chennai Cultural Center",
      attendees: 23,
      type: "in-person",
    },
    {
      id: 3,
      title: "Tamil Poetry Reading Session",
      date: "Jan 2, 2025",
      time: "7:00 PM",
      location: "Online",
      attendees: 67,
      type: "virtual",
    },
  ];

  const tutors = [
    {
      id: 1,
      name: "Lakshmi Venkat",
      avatar: "LV",
      rating: 4.9,
      reviews: 127,
      specialties: ["Conversation", "Business Tamil"],
      rate: "$25/hour",
      available: true,
      verified: true,
    },
    {
      id: 2,
      name: "Karthik Subramanian",
      avatar: "KS",
      rating: 4.8,
      reviews: 89,
      specialties: ["Grammar", "Writing"],
      rate: "$20/hour",
      available: true,
    },
    {
      id: 3,
      name: "Deepa Krishnan",
      avatar: "DK",
      rating: 5.0,
      reviews: 203,
      specialties: ["Pronunciation", "Cultural Context"],
      rate: "$30/hour",
      available: false,
      verified: true,
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Arjun P", xp: 2340, streak: 45, avatar: "AP" },
    { rank: 2, name: "Sarah L", xp: 2120, streak: 32, avatar: "SL" },
    { rank: 3, name: "Wei Zhang", xp: 1980, streak: 28, avatar: "WZ" },
    { rank: 4, name: "You", xp: 1250, streak: 7, avatar: "ME", isUser: true },
    { rank: 5, name: "Nina R", xp: 1100, streak: 15, avatar: "NR" },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-success to-success/80">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">Community</h1>
              <p className="text-lg text-muted-foreground">
                Connect with fellow Tamil learners and native speakers
              </p>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-primary" />
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-sm text-muted-foreground">Community Members</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <MessageCircle className="h-5 w-5 text-secondary" />
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div className="text-2xl font-bold">342</div>
            <p className="text-sm text-muted-foreground">Active Discussions</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-5 w-5 text-accent" />
              <Badge className="bg-accent/10 text-accent border-accent/20">New</Badge>
            </div>
            <div className="text-2xl font-bold">28</div>
            <p className="text-sm text-muted-foreground">Native Tutors</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium">This Week</span>
            </div>
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Upcoming Events</p>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full max-w-lg grid-cols-4 mb-8">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="tutors">Tutors</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="gradient">
                <Plus className="mr-2 h-4 w-4" />
                New Discussion
              </Button>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default" className="cursor-pointer">All Topics</Badge>
              <Badge variant="outline" className="cursor-pointer">
                <HelpCircle className="mr-1 h-3 w-3" />
                Questions
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                <Lightbulb className="mr-1 h-3 w-3" />
                Tips
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                <BookOpen className="mr-1 h-3 w-3" />
                Resources
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                <Globe className="mr-1 h-3 w-3" />
                Culture
              </Badge>
            </div>

            {/* Discussion List */}
            <div className="space-y-4">
              {discussions.map((post) => (
                <Card
                  key={post.id}
                  className={cn(
                    "p-6 hover:shadow-lg transition-all cursor-pointer",
                    post.pinned && "border-primary/50 bg-primary/5"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>{post.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                            {post.pinned && "📌 "}{post.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="font-medium">{post.author}</span>
                            {post.verified && <Badge variant="outline" className="text-xs">Verified</Badge>}
                            <span>•</span>
                            <span>{post.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-3 line-clamp-2">
                        {post.content}
                      </p>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          {post.replies} replies
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <div className="flex gap-2 ml-auto">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Hash className="mr-0.5 h-2.5 w-2.5" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <Card key={event.id} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant={event.type === "virtual" ? "default" : "secondary"}>
                      {event.type === "virtual" ? "Online" : "In-Person"}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3">{event.title}</h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  
                  <Button variant="gradient" className="w-full">
                    Register Now
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-display font-bold mb-2">
                  Host Your Own Event
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Organize study groups, conversation circles, or cultural events for the community
                </p>
                <Button variant="hero" size="lg">
                  Create Event
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tutors" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tutors.map((tutor) => (
                <Card key={tutor.id} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{tutor.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold flex items-center gap-1">
                          {tutor.name}
                          {tutor.verified && <Badge variant="outline" className="ml-1 text-xs">✓</Badge>}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-warning text-warning" />
                          <span className="text-sm font-medium">{tutor.rating}</span>
                          <span className="text-sm text-muted-foreground">({tutor.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {tutor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">{tutor.rate}</span>
                      <Badge variant={tutor.available ? "success" : "secondary"}>
                        {tutor.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="gradient" size="sm" disabled={!tutor.available}>
                      Book Session
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Weekly Leaderboard</h3>
              <div className="space-y-4">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg transition-all",
                      user.isUser && "bg-primary/5 border border-primary/20",
                      user.rank <= 3 && !user.isUser && "bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "text-2xl font-bold w-8 text-center",
                      user.rank === 1 && "text-warning",
                      user.rank === 2 && "text-muted-foreground",
                      user.rank === 3 && "text-orange-600"
                    )}>
                      {user.rank === 1 && "🥇"}
                      {user.rank === 2 && "🥈"}
                      {user.rank === 3 && "🥉"}
                      {user.rank > 3 && user.rank}
                    </div>
                    
                    <Avatar>
                      <AvatarFallback>{user.avatar}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <p className="font-semibold">
                        {user.name}
                        {user.isUser && <Badge className="ml-2" variant="outline">You</Badge>}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{user.xp} XP</span>
                        <span>🔥 {user.streak} days</span>
                      </div>
                    </div>
                    
                    {user.rank <= 3 && (
                      <Badge variant="default">
                        Top {user.rank}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Your Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Global Rank</span>
                    <span className="font-semibold">#142</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Week</span>
                    <span className="font-semibold">+250 XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Streak</span>
                    <span className="font-semibold">15 days</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Achievements</h3>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🏆</div>
                    <p className="text-xs">Champion</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <p className="text-xs">Speed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <p className="text-xs">Accuracy</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">📚</div>
                    <p className="text-xs">Scholar</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}