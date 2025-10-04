// src/pages/ResultPage.jsx
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ScoreContext } from "../context/ScoreContext";
import { useTranslation } from "../i18n/LanguageContext";

const ResultPage = () => {
  const { scores } = useContext(ScoreContext);
  const { t } = useTranslation();
  const [dementiaLevel, setDementiaLevel] = useState("");
  const [overallScore, setOverallScore] = useState(0);

  // Calculate overall score and prediction
  useEffect(() => {
    const totalScore = (scores.speechScore + scores.memoryScore + scores.cueCardScore) / 3;
    setOverallScore(Math.round(totalScore));

    if (totalScore >= 80) setDementiaLevel(t('result.low_risk') || "Low risk of dementia");
    else if (totalScore >= 50) setDementiaLevel(t('result.moderate_risk') || "Moderate risk of dementia");
    else setDementiaLevel(t('result.high_risk') || "High risk of dementia");
  }, [scores]);

  const getColor = (score) => {
    if (score >= 80) return "bg-green-500";
    else if (score >= 50) return "bg-yellow-500";
    else return "bg-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex flex-col items-center flex-grow py-12 px-4 md:px-20">
        <h1 className="text-4xl font-bold mb-10 text-gray-900 text-center">{t('result.title') || 'Test Results'}</h1>

        <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-6">{t('result.scores') || 'Scores'}</h2>

          <div className="mb-4">
            <p className="mb-1 font-medium">{t('result.speech_label') || 'Speech Test'}: {scores.speechScore}/100</p>
            <div className="w-full h-6 bg-gray-300 rounded-full">
              <div className={`${getColor(scores.speechScore)} h-6 rounded-full`} style={{ width: `${scores.speechScore}%` }}></div>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-1 font-medium">{t('result.memory_label') || 'Memory Game'}: {scores.memoryScore}/100</p>
            <div className="w-full h-6 bg-gray-300 rounded-full">
              <div className={`${getColor(scores.memoryScore)} h-6 rounded-full`} style={{ width: `${scores.memoryScore}%` }}></div>
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-1 font-medium">{t('result.cue_label') || 'Cue Card Game'}: {scores.cueCardScore}/100</p>
            <div className="w-full h-6 bg-gray-300 rounded-full">
              <div className={`${getColor(scores.cueCardScore)} h-6 rounded-full`} style={{ width: `${scores.cueCardScore}%` }}></div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-xl font-semibold mb-2">{t('result.overall_score') || 'Overall Score'}: {overallScore}/100</p>
            <p className="text-lg">{dementiaLevel}</p>
          </div>
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200"
        >
          {t('result.retake') || 'Retake Test'}
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default ResultPage;
