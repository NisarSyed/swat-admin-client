import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import Drives from "./pages/Drives";
import Events from "./pages/Events";
import Account from "./pages/Account";
import ContactForm from "./pages/Contact";
import User from "./pages/Users";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/drives" element={<Drives />} />
        <Route path="/events" element={<Events />} />
        <Route path="/accounts" element={<Account />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
