import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes and Route
import CarDetail from "./components/CarDetail";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />{" "}
        <Route path="/car-detail" element={<CarDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
