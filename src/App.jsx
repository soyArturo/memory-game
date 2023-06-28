import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import ResolveScreen from "./screens/ResolveScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StartScreen/>} />
        <Route path="/game" element={<GameScreen/>} />
        <Route path="/resolve" element={<ResolveScreen/>} />
      </Routes>
    </Router>
  );
};

export default App;
