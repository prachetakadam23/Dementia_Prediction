// src/pages/About.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const testsInfo = [
  {
    title: "Speech Test",
    description:
      "This test evaluates your ability to articulate words, memory recall through speech, and sentence formation. You speak naturally, and the system analyzes the number of words, clarity, and coherence to calculate a score.",
    color: "bg-red-100",
  },
  {
    title: "Memory Game",
    description:
      "A card-matching memory game that tests short-term memory, attention, and recall. You flip cards and match pairs. Your score is based on how many matches you find and how quickly you complete the game.",
    color: "bg-yellow-100",
  },
  {
    title: "Cue Card (Sequence Recall) Game",
    description:
      "In this game, you observe a sequence of words shown on cards. After they disappear, you must recreate the order. This evaluates working memory, attention, and sequence recall. Points are awarded for correct positions.",
    color: "bg-green-100",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex flex-col items-center flex-grow py-16 px-4 md:px-20">
        <h1 className="text-5xl font-bold mb-8 text-gray-900 text-center">
          About the Dementia Test
        </h1>
        <p className="text-gray-700 mb-16 text-center max-w-3xl">
          This test suite is designed to help assess cognitive function related to memory,
          attention, and verbal fluency. Completing all three interactive tests provides a
          combined score that can give insights into dementia risk. Early detection is key
          for effective management.
        </p>

        {/* Test Info Cards */}
        <div className="grid md:grid-cols-3 gap-10 w-full">
          {testsInfo.map((test, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl ${test.color}`}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{test.title}</h2>
              <p className="text-gray-700">{test.description}</p>
            </div>
          ))}
        </div>

        {/* Scoring Explanation */}
        <section className="mt-20 w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">How Scores Are Evaluated</h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li>
              <strong>Speech Test:</strong> Scored based on word count, clarity, and fluency.
            </li>
            <li>
              <strong>Memory Game:</strong> Each matched pair increases your score; faster completion gives higher points.
            </li>
            <li>
              <strong>Cue Card Game:</strong> Points awarded for correct positions in the sequence recall test.
            </li>
            <li>
              <strong>Overall Result:</strong> The system calculates an average of all three scores and predicts dementia risk:
              <ul className="list-disc ml-6 mt-2">
                <li>80–100: Low Risk</li>
                <li>50–79: Moderate Risk</li>
                <li>Below 50: High Risk</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Additional Info */}
        <section className="mt-20 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Early Testing Helps</h2>
          <p className="text-gray-700 text-lg mb-6">
            Regular cognitive testing helps identify changes in memory, attention, and verbal
            fluency early. This allows interventions like lifestyle changes, cognitive exercises,
            and medical consultation to slow progression and maintain quality of life.
          </p>
          <p className="text-gray-700 text-lg">
            Remember, this test is **informative** and **not a medical diagnosis**. Always
            consult a healthcare professional for accurate evaluation.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
