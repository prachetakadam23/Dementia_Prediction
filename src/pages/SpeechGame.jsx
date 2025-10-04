// src/pages/SpeechGame.jsx
import { useState, useContext, useEffect } from "react";
import { ScoreContext } from "../context/ScoreContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "../i18n/LanguageContext";

const SpeechGame = () => {
  const { updateScore } = useContext(ScoreContext);
  const navigate = useNavigate();

  const [transcript, setTranscript] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [finished, setFinished] = useState(false);

  const { t, lang } = useTranslation();
  let recognition;

  useEffect(() => {
    // initialize recognition when component mounts
    if ("webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      // map app language to speech recognition locale
      const localeMap = { en: 'en-US', hi: 'hi-IN', mr: 'mr-IN' };
      recognition.lang = localeMap[lang] || 'en-US';

      recognition.onresult = (event) => {
        setTranscript(event.results[0][0].transcript);
        setSpeaking(false);
        setFinished(true);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setSpeaking(false);
      };
    } else {
      alert(t('speech.unsupported') || 'Your browser does not support speech recognition.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleStartSpeaking = () => {
    setTranscript("");
    setSpeaking(true);
    setFinished(false);
    recognition.start();
  };

  const handleFinish = () => {
    const words = transcript.split(" ").filter(Boolean).length;
    const speechScore = Math.min(words * 5, 100);
    updateScore("speechScore", speechScore);
    navigate("/memory");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex flex-col items-center flex-grow py-20 px-4 md:px-20">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center">
          {t('speech.title') || 'Speech Test - Tell About Yourself'}
        </h1>
        <p className="text-gray-600 mb-10 text-center max-w-xl">
          {t('speech.instructions') || 'Speak clearly when prompted. The test will analyze your words for memory and clarity.'}
        </p>

        {/* Microphone Card */}
        <div className="flex flex-col items-center mb-8">
          <div className={`w-40 h-40 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
            speaking ? "bg-red-500 animate-pulse" : "bg-red-600"
          }`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v12m0 0a3 3 0 003-3H9a3 3 0 003 3zm0 0v8m-4-4h8" />
            </svg>
          </div>
          <span className="mt-4 text-gray-700 font-medium">
            {speaking ? (t('speech.listening') || 'Listening...') : (t('speech.click_to_speak') || 'Click to speak')}
          </span>
        </div>

        {/* Start Speaking Button */}
        <button
          onClick={handleStartSpeaking}
          disabled={speaking}
          className="bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition duration-300 transform hover:scale-105 shadow-lg mb-6"
        >
          {speaking ? (t('speech.listening') || 'Listening...') : (t('speech.start_recording') || 'Start Speaking')}
        </button>

        {/* Transcript Display */}
        {transcript && (
          <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg relative">
            <div className="absolute -top-3 left-6 w-6 h-6 bg-white rounded-full shadow-md"></div>
            <div className="absolute -top-3 right-6 w-6 h-6 bg-white rounded-full shadow-md"></div>
            <p className="text-gray-800 text-lg font-medium">
              <strong>{t('speech.you_said') || 'You said:'}</strong> {transcript}
            </p>
          </div>
        )}

        {/* Finish Button */}
        {finished && (
          <button
            onClick={handleFinish}
            className="mt-8 bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Finish & Go to Memory Game
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SpeechGame;
