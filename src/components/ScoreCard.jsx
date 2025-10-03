// src/components/ScoreCard.jsx
import React from "react";

/**
 * ScoreCard Component
 * 
 * Props:
 * - title: string (Game name or "Final Score")
 * - score: number (Score of the game or risk score)
 * - maxScore: number (Maximum possible score)
 * - description: string (Optional explanation or message)
 * - type: string ("game" or "final") for different styling
 */
const ScoreCard = ({ title, score, maxScore = 100, description, type = "game" }) => {
  // Calculate percentage for visual progress
  const percentage = ((score / maxScore) * 100).toFixed(0);

  return (
    <div
      className={`w-80 p-5 rounded-lg shadow-lg ${
        type === "final" ? "bg-red-50 border border-red-400" : "bg-white"
      }`}
    >
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>

      {/* Score Display */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-700 font-medium">Score:</span>
        <span className="text-gray-900 font-bold">{score} / {maxScore}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden mb-3">
        <div
          className={`h-4 rounded-full ${
            type === "final" ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {/* Optional Description */}
      {description && (
        <p className="text-gray-600 text-sm">{description}</p>
      )}
    </div>
  );
};

export default ScoreCard;
