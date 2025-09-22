
import React from "react";

const WORDS = [
  {
    word: "வணக்கம்",
    transliteration: "Vaṇakkam",
    meaning: "Hello",
    example: "வணக்கம்! நீங்கள் எப்படி இருக்கிறீர்கள்? (Hello! How are you?)"
  },
  {
    word: "நன்றி",
    transliteration: "Naṉṟi",
    meaning: "Thank you",
    example: "உங்களின் உதவிக்கு நன்றி. (Thanks for your help.)"
  },
  {
    word: "தயவு",
    transliteration: "Tayavu",
    meaning: "Please",
    example: "தயவு செய்து தண்ணீர் கொடுக்கவும். (Please give me water.)"
  },
  {
    word: "ஆம்",
    transliteration: "Ām",
    meaning: "Yes",
    example: "நீங்கள் வருவீர்களா? ஆம். (Will you come? Yes.)"
  },
  {
    word: "இல்லை",
    transliteration: "Illai",
    meaning: "No",
    example: "எனக்கு தேநீர் வேண்டாம், இல்லை. (I don’t want tea, no.)"
  },
  {
    word: "தண்ணீர்",
    transliteration: "Taṇṇīr",
    meaning: "Water",
    example: "ஒரு கண்ணாடி தண்ணீர் தருவீர்களா? (Can you give me a glass of water?)"
  },
  {
    word: "சாப்பாடு",
    transliteration: "Sāppāḍu",
    meaning: "Food / Meal",
    example: "சாப்பாடு சாப்பிட்டீர்களா? (Did you eat your meal?)"
  },
  {
    word: "நண்பன்",
    transliteration: "Naṇban",
    meaning: "Friend (male)",
    example: "அவர் என் நல்ல நண்பன். (He is my good friend.)"
  },
  {
    word: "நண்பி",
    transliteration: "Naṇpi",
    meaning: "Friend (female)",
    example: "அவள் என் குழந்தைப் பருவ நண்பி. (She is my childhood friend.)"
  },
  {
    word: "குடும்பம்",
    transliteration: "Kuṭumpam",
    meaning: "Family",
    example: "என் குடும்பம் சென்னை நகரத்தில் இருக்கிறது. (My family lives in Chennai.)"
  },
  // ...add more words from your list as needed...
];

function getWordOfDay() {
  // Use the current date to select a word
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const idx = dayOfYear % WORDS.length;
  return WORDS[idx];
}


import { useState } from "react";

export default function WordOfDay() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const [index, setIndex] = useState(dayOfYear % WORDS.length);
  const wordObj = WORDS[index];

  function handleNext() {
    setIndex((prev) => (prev + 1) % WORDS.length);
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #FF6F00 0%, #fff3e0 100%)",
      fontFamily: "Noto Sans Tamil, Latha, Arial, sans-serif"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        padding: 32,
        maxWidth: 400,
        width: "100%",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: 32, color: "#FF6F00", fontWeight: "bold", marginBottom: 12 }}>இன்றைய தமிழ் சொல்</h2>
        <div style={{ fontSize: 28, fontWeight: "bold", color: "#222", marginBottom: 8 }}>{wordObj.word}</div>
        <div style={{ fontSize: 18, color: "#555", marginBottom: 8 }}>{wordObj.transliteration} – {wordObj.meaning}</div>
        <div style={{ fontSize: 16, color: "#333", marginTop: 16, background: "#fffbe6", borderRadius: 8, padding: 12 }}>
          <span role="img" aria-label="example">👉</span> {wordObj.example}
        </div>
        <button
          onClick={handleNext}
          style={{
            marginTop: 24,
            background: "#FF6F00",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            transition: "background 0.3s"
          }}
        >
          Next Word
        </button>
      </div>
    </div>
  );
}