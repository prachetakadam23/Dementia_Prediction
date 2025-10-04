import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ScoreContext } from "../context/ScoreContext";
import { useTranslation } from "../i18n/LanguageContext";

const MemoryGame = () => {
  const navigate = useNavigate();
  const { updateScore } = useContext(ScoreContext);

  const { t, lang } = useTranslation();
  // localized card values (fall back to numbers)
  const cardValues = t('memory.values') || [1, 2, 3, 4];
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    const shuffled = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({ id: index, value, matched: false }));
    setCards(shuffled);
  }, [lang, cardValues]);

  const handleChoice = (card) => {
    if (disabled) return;
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.value === secondCard.value) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, matched: true }
              : c
          )
        );
        setMatches((prev) => prev + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstCard, secondCard]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  const handleFinish = () => {
    const score = Math.round((matches / cardValues.length) * 100);
    updateScore("memoryScore", score);
    navigate("/cue-card");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex flex-col items-center flex-grow py-12 px-4 md:px-20">
        <h1 className="text-4xl font-bold mb-10 text-gray-900 text-center">
          {t('memory.title') || 'Memory Game'}
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          {t('memory.instructions') || 'Match all pairs of numbers.'}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`w-24 h-24 rounded-lg shadow-md flex items-center justify-center text-2xl font-bold cursor-pointer ${
                card.matched || card === firstCard || card === secondCard
                  ? "bg-green-200"
                  : "bg-gray-300"
              }`}
              onClick={() => handleChoice(card)}
            >
        {(card.matched || card === firstCard || card === secondCard) &&
          // If the translation provides strings (like Devanagari digits), show them.
          // Otherwise, if the value looks numeric, format it for the current locale (hi-IN/mr-IN) so Hindi/Marathi show native digits.
          (() => {
            const val = card.value;
            const str = String(val);
            const isNumeric = /^\d+$/.test(str);
            if (!isNumeric) return val;
            // choose locale mapping for language codes used in app
            const locale = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-US';
            try {
              return new Intl.NumberFormat(locale, { useGrouping: false }).format(Number(str));
            } catch (e) {
              return str;
            }
          })()}
            </div>
          ))}
        </div>

        {matches === cardValues.length && (
          <button
            onClick={handleFinish}
            className="mt-10 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Finish Memory Game
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MemoryGame;
