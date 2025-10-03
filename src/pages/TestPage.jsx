// src/pages/TestPage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GameCard from "../components/GameCard";
import speakImg from "../assets/speak.png";
import memoryImg from "../assets/memory.jfif";
import cardsImg from "../assets/cards.jfif";


const TestPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Page Header */}
      <main className="flex flex-col items-center justify-center flex-grow py-12 px-4 md:px-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-900 text-center">
          Select a Game to Start
        </h1>

        {/* Game Cards */}
        <div className="flex flex-wrap gap-8 justify-center">
          <GameCard
            title="Speech Analysis"
            description="Analyze your speech for memory and clarity."
            image={speakImg}
            route="/speech-game"
          />
          <GameCard
            title="Memory Game"
            description="Test your memory with fun interactive exercises."
            image={memoryImg}
            route="/memory-game"
          />
          <GameCard
            title="Cue Card Game"
            description="Improve attention and recall with cue cards."
            image={cardsImg}
            route="/cue-card-game"
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TestPage;
