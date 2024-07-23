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

// import { useState } from "react";
// import {
//   Home,
//   Briefcase,
//   Users,
//   Phone,
//   MapPinned,
//   Droplets,
// } from "lucide-react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const menuItems = [
//     { icon: Home, text: "Dashboard", badge: null },
//     { icon: Briefcase, text: "Projects", badge: null },
//     { icon: Droplets, text: "Drives", badge: null },
//     { icon: MapPinned, text: "Events", badge: null },
//     { icon: Phone, text: "Contacts", badge: null },
//     { icon: Users, text: "Users", badge: null },
//   ];

//   return (
//     <div
//       className={`bg-gray-800 text-white h-screen ${
//         isOpen ? "w-64" : "w-20"
//       } transition-all duration-300 ease-in-out`}
//     >
//       <div className="flex items-center justify-between p-4 border-b border-gray-700">
//         <div className="flex items-center space-x-2">
//           <img
//             src="/swat.svg"
//             alt="User Avatar"
//             className="w-8 h-8 rounded-full"
//           />
//           <div className={`${isOpen ? "block" : "hidden"}`}>
//             <div className="font-semibold">Super User</div>
//             <div className="text-xs text-green-400">Logged In</div>
//           </div>
//         </div>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="text-gray-400 hover:text-white"
//         >
//           {isOpen ? "◀" : "▶"}
//         </button>
//       </div>

//       <nav className="mt-4">
//         <ul>
//           {menuItems.map((item, index) => (
//             <li
//               key={index}
//               className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
//             >
//               <div className="flex items-center space-x-4">
//                 <item.icon className="w-5 h-5" />
//                 <span className={isOpen ? "block" : "hidden"}>{item.text}</span>
//                 {item.badge && (
//                   <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                     {item.badge}
//                   </span>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
