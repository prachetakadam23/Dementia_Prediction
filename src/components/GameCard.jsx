// src/components/GameCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * GameCard Component
 * 
 * Props:
 * - title: string (Name of the game, e.g., "Speech Analysis")
 * - description: string (Brief explanation of the game)
 * - image: string (Path to an image/icon representing the game)
 * - route: string (Route to navigate when clicked)
 */
const GameCard = ({ title, description, image, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 w-72"
    >
      {/* Game Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover"
        />
      )}

      {/* Game Info */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200">
          Play Now
        </button>
      </div>
    </div>
  );
};

export default GameCard;
