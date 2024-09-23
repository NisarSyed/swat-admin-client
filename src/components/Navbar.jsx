import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Briefcase,
  Users,
  MapPinned,
  Droplets,
  Banknote,
  Menu,
  X,
  ContactIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    // window.location.reload();
  };

  if (!isLoggedIn) {
    return null;
  }

  const menuItems = [
    { label: "Home", link: "/dashboard", icon: Home },
    { label: "Projects", link: "/projects", icon: Briefcase },
    { label: "Drives", link: "/drives", icon: Droplets },
    { label: "Events", link: "/events", icon: MapPinned },
    { label: "Users", link: "/users", icon: Users },
    { label: "Accounts", link: "/accounts", icon: Banknote },
    { label: "Contact", link: "/contact", icon: ContactIcon },
  ];

  return (
    <header disabled={!authToken} className="bg-blue-950 text-white">
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            SWAT
          </Link>
          <div className="hidden md:flex">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="flex items-center mx-4 hover:text-blue-300 transition-colors duration-200"
              >
                <item.icon className="w-5 h-5 mr-1" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="hidden md:block">
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Log out
            </button>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mt-3 md:hidden">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="flex items-center py-2 hover:text-blue-300 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="mt-3">
              <button
                onClick={handleLogout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Log out
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
