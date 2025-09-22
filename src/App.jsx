import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Practice from "./pages/Practice";
import Voice from "./pages/Voice";
import Handwriting from "./pages/Handwriting";
import Community from "./pages/Community";
import Progress from "./pages/Progress";
import Dialect from "./pages/Dialect";
import Lessons from "./pages/Lessons";
import Achievements from "./pages/Achievements";
import Vocabulary from "./pages/Vocabulary";
import Listening from "./pages/Listening";
import Conversation from "./pages/Conversation";
import Culture from "./pages/Culture";
import Quizzes from "./pages/Quizzes";
import Tutor from "./pages/Tutor";
import ScriptArt from "./pages/ScriptArt";
import DebateBuddy from "./pages/DebateBuddy";
import CinemaClips from "./pages/CinemaClips";
import WordOfDay from "./pages/WordOfDay";
import ChatBuddy from "./pages/ChatBuddy";
import Flashcards from "./pages/Flashcards";
import Challenges from "./pages/Challenges";
import TongueTwisters from "./pages/TongueTwisters";
import ReverseMode from "./pages/ReverseMode";
import Tirukkural from "./pages/Tirukkural";
import Login from "./pages/Login";
import Streak from "./pages/Streak";
import VoicePractice from "./pages/VoicePractice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/handwriting" element={<Handwriting />} />
          <Route path="/community" element={<Community />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/dialect" element={<Dialect />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/listening" element={<Listening />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/script-art" element={<ScriptArt />} />
          <Route path="/debate-buddy" element={<DebateBuddy />} />
          <Route path="/cinema-clips" element={<CinemaClips />} />
          <Route path="/word-of-day" element={<WordOfDay />} />
          <Route path="/chat-buddy" element={<ChatBuddy />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/tongue-twisters" element={<TongueTwisters />} />
          <Route path="/reverse-mode" element={<ReverseMode />} />
          <Route path="/tirukkural" element={<Tirukkural />} />
          <Route path="/login" element={<Login />} />
          <Route path="/streak" element={<Streak />} />
          <Route path="/voice-practice" element={<VoicePractice />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
