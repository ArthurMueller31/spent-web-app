import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainScreen from "./components/MainScreen";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
