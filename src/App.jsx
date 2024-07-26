import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Register  from "./pages/Register";
import ProjectForm from "./components/ProjectForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectForm />} />
        <Route path="/drives" element={<h1>Drives</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
