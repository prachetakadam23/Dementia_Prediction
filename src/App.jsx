import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SpeechGame from "./pages/SpeechGame";
import MemoryGame from "./pages/MemoryGame";
import CueCardGame from "./pages/CueCardGame";
import ResultPage from "./pages/ResultPage";
import About from "./pages/About";
import { ScoreProvider } from "./context/ScoreContext";

function App() {
  return (
    <ScoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/speech" element={<SpeechGame />} />
          <Route path="/memory" element={<MemoryGame />} />
          <Route path="/cue-card" element={<CueCardGame />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ScoreProvider>
  );
}

export default App;
