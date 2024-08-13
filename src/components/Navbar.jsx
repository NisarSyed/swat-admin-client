import { Link } from "react-router-dom";
import { Home, Briefcase, Users, MapPinned, Droplets } from "lucide-react";

function Navbar() {
  const isLoggedIn = false;

  const menuItems = [
    { label: "Home", link: "/dashboard", icon: Home },
    { label: "Projects", link: "/projects", icon: Briefcase },
    { label: "Drives", link: "/drives", icon: Droplets },
    { label: "Events", link: "/events", icon: MapPinned },
    { label: "Users", link: "/users", icon: Users },
  ];

  return (
    <>
      <header className="bg-blue-950 text-white">
        <nav className="container mx-auto px-6 py-3">
          <ul className="flex justify-between items-center">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className="flex items-center mr-4">
                  <item.icon className="w-6 h-6" />
                  <span className="ml-2">{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              {isLoggedIn ? (
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Log out
                </button>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg">
                  <Link to="/login">Log in</Link>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
