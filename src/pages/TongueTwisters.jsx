
import React, { useState } from "react";

// Subcomponent placeholders
const TimerCircle = ({ timeLeft, isActive }) => (
  <div style={{ position: "relative", width: 120, height: 120 }}>
    {/* TODO: Animated SVG circle */}
    <svg width="120" height="120">
      <circle
        cx="60"
        cy="60"
        r="54"
        stroke="#FF6F00"
        strokeWidth="8"
        fill="none"
        opacity="0.3"
      />
      {/* Progress circle will be animated later */}
    </svg>
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 32,
      fontWeight: "bold",
      color: "#fff"
    }}>{timeLeft}</div>
  </div>
);

const MicrophoneRecorder = () => (
  <button
    style={{
      background: "#FF6F00",
      border: "none",
      borderRadius: "50%",
      width: 56,
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 28,
      color: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      cursor: "pointer"
    }}
    aria-label="Record"
  >
    🎤
  </button>
);

const Leaderboard = ({ scores }) => (
  <div style={{ marginTop: 32, background: "rgba(0,0,0,0.5)", borderRadius: 12, padding: 16 }}>
    <h3 style={{ color: "#FF6F00", fontWeight: "bold", fontSize: 20, marginBottom: 8 }}>🏆 Top 5 Attempts</h3>
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {scores.map((entry, idx) => (
        <li key={idx} style={{ color: "#fff", marginBottom: 6 }}>
          <span style={{ fontWeight: "bold" }}>{entry.name}</span> — {entry.score} ({entry.date})
        </li>
      ))}
    </ul>
  </div>
);

const ResultPopup = ({ result, onClose }) => (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    transition: "opacity 0.4s"
  }}>
    <div style={{ background: "#222", borderRadius: 16, padding: 32, textAlign: "center", color: "#fff", minWidth: 320 }}>
      <div style={{ fontSize: 32 }}>{result.emoji}</div>
      <div style={{ fontSize: 22, fontWeight: "bold", margin: "16px 0" }}>{result.message}</div>
      <button onClick={onClose} style={{ marginTop: 16, background: "#FF6F00", color: "#fff", border: "none", borderRadius: 8, padding: "8px 24px", fontWeight: "bold", fontSize: 16 }}>Close</button>
    </div>
  </div>
);


import { useEffect } from "react";


// Use a local Tamil tongue twister (no API)
const LOCAL_TAMIL_TWISTER = "தந்தை தந்தது தந்தைமொழி";

function TamilTongueTwisterChallenge() {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState([]);
  const [twister, setTwister] = useState(LOCAL_TAMIL_TWISTER);

  // Load scores from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tamil_twister_scores");
    if (saved) setScores(JSON.parse(saved));
  }, []);

  // No API: always use local twister
  useEffect(() => {
    setTwister(LOCAL_TAMIL_TWISTER);
  }, [showResult]);

  // Timer logic
  useEffect(() => {
    if (!started || timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [started, timeLeft]);

  // End challenge when timer hits 0
  useEffect(() => {
    if (started && timeLeft === 0) {
      // Mock speech input for demo
      // Replace with real speech recognition later
      const mockSpeech = window.mockSpeech || ""; // Set window.mockSpeech for testing
      let emoji = "🤔";
      let message = "Do better! Try again!";
      if (!mockSpeech || mockSpeech.trim() === "") {
        emoji = "❓";
        message = "Speak something!";
      } else if (mockSpeech.trim() === twister) {
        emoji = "🔥";
        message = "Yeah, keep going! Super Fast!";
      } else {
        emoji = "🤔";
        message = "Do better! Try again!";
      }
      setShowResult(true);
      setResult({ emoji, message });
      setStarted(false);
    }
  }, [started, timeLeft, twister]);

  // Gradient background and centered layout
  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #000000 0%, #FF6F00 100%)",
      fontFamily: "Noto Sans Tamil, Latha, Arial, sans-serif",
      transition: "background 0.5s"
    }}>
      <div style={{
        background: "rgba(0,0,0,0.7)",
        borderRadius: 20,
        padding: 32,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        textAlign: "center",
        maxWidth: 480,
        width: "100%"
      }}>
        <div style={{ fontSize: 36, fontWeight: "bold", color: "#fff", marginBottom: 16, letterSpacing: 1 }}>
          {twister}
        </div>
        <TimerCircle timeLeft={timeLeft} isActive={started} />
        <div style={{ margin: "24px 0" }}>
          <MicrophoneRecorder />
        </div>
        <button
          onClick={() => { setStarted(true); setTimeLeft(10); }}
          disabled={started}
          style={{
            background: started ? "#888" : "#FF6F00",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 32px",
            fontWeight: "bold",
            fontSize: 18,
            cursor: started ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            transition: "background 0.3s"
          }}
        >
          Start Challenge
        </button>
      </div>
      <Leaderboard scores={scores.slice(0, 5)} />
      {showResult && <ResultPopup result={result} onClose={() => setShowResult(false)} />}
    </div>
  );
}

export default TamilTongueTwisterChallenge;