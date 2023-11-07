import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes and Route
import CarDetail from "./CarDetail";
import Login from "./Login";

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
