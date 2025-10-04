// src/pages/CueCardGame.jsx
import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { ScoreContext } from "../context/ScoreContext";
import { useTranslation } from "../i18n/LanguageContext";

const CueCardGame = () => {
  const navigate = useNavigate();
  const { updateScore } = useContext(ScoreContext);

  // Sequence of words for the user to remember (localized)
  const { t, lang } = useTranslation();
  // keep English defaults but read from translations if provided
  const sequence = t('cue.sequence') || ["Apple", "Dog", "Banana", "Chair", "Orange", "Book"];
  const [showSequence, setShowSequence] = useState(true);
  const [userSequence, setUserSequence] = useState([]);
  const [shuffledCards, setShuffledCards] = useState([]);
  const [score, setScore] = useState(0);

  // Show sequence for 5 seconds then hide
  // Reinitialize when language or sequence changes so localized words are shown
  useEffect(() => {
    setShowSequence(true);
    setUserSequence([]);
    setScore(0);
    setShuffledCards([...sequence].sort(() => Math.random() - 0.5));
    const timer = setTimeout(() => setShowSequence(false), 5000);
    return () => clearTimeout(timer);
  }, [lang, sequence]);

  const handleSelect = (word) => {
    if (userSequence.length >= sequence.length) return;
    setUserSequence([...userSequence, word]);
  };

  const handleFinish = () => {
    // Compare userSequence with original sequence
    let tempScore = 0;
    userSequence.forEach((word, idx) => {
      if (word === sequence[idx]) tempScore += Math.floor(100 / sequence.length);
    });
    setScore(tempScore);
    updateScore("cueCardScore", tempScore);
    navigate("/result");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex flex-col items-center flex-grow py-12 px-4 md:px-20">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">
          {t('cue.title') || 'Sequence Recall Game'}
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          {t('cue.instructions') || 'Memorize the sequence of words. You have 5 seconds to view it.'}
        </p>

        {/* Show sequence */}
        {showSequence && (
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {sequence.map((word, idx) => (
              <div
                key={idx}
                className="w-32 h-16 bg-blue-200 rounded-lg flex items-center justify-center font-semibold text-lg"
              >
                {word}
              </div>
            ))}
          </div>
        )}

        {/* User selects sequence */}
        {!showSequence && (
          <>
            <p className="mb-4 text-gray-800 font-semibold">{t('cue.click_order') || 'Click the cards in the correct order:'}</p>
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              {shuffledCards.map((word, idx) => (
                <div
                  key={idx}
                  className={`w-32 h-16 rounded-lg shadow-md flex items-center justify-center cursor-pointer font-semibold text-lg ${
                    userSequence.includes(word) ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:bg-gray-200"
                  }`}
                  onClick={() => handleSelect(word)}
                >
                  {word}
                </div>
              ))}
            </div>

            <div className="mb-4">
              <strong>{t('cue.your_sequence') || 'Your sequence:'}</strong> {userSequence.join(", ")}
            </div>

            {userSequence.length === sequence.length && (
              <button
                onClick={handleFinish}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200"
              >
                {t('cue.finish') || 'Finish Game'}
              </button>
            )}
          </>
        )}

        <p className="mt-6 font-semibold text-gray-800">Score: {score}</p>
      </main>
      <Footer />
    </div>
  );
};

export default CueCardGame;
