import {
  FaChalkboardTeacher,
  FaUsers,
  FaHome,
  FaHandHoldingHeart,
  FaSignOutAlt
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

const NAV_ITEMS = [
  {
    to: "/home/dashboard",
    icon: FaHome,
    label: "Home",
    activeColor: "text-blue-400"
  },
  {
    to: "/home/requested-bookings",
    icon: FaUsers,
    label: "Requested Bookings",
    activeColor: "text-green-400"
  },
  {
    to: "/home/offered-bookings",
    icon: FaHandHoldingHeart,
    label: "Offering Bookings",
    activeColor: "text-purple-400"
  },
  {
    to: "/home/schedule-booking",
    icon: FaChalkboardTeacher,
    label: "Calendar Booking",
    activeColor: "text-blue-400"
  }
];

const SidebarNavLink = ({ to, icon: Icon, label, activeColor }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 transition-colors duration-200 ${
          isActive ? activeColor : "text-gray-400 hover:text-white"
        }`
      }
    >
      <Icon className="text-2xl" />
      <span className="text-xl">{label}</span>
    </NavLink>
  </li>
);

const Home = () => {
  const navigate = useNavigate();
  const { logoutUser } = useContext(AppContext);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden text-white">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 p-6 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-blue-400">
              Skill-Sync
            </h2>
            <button
              onClick={handleLogout}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-full
                transition-colors duration-200"
              title="Logout"
            >
              <FaSignOutAlt className="text-xl" />
            </button>
          </div>

          <ul className="space-y-6">
            {NAV_ITEMS.map((item) => (
              <SidebarNavLink key={item.to} {...item} />
            ))}
          </ul>
        </div>

        <footer className="text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Skill-Sync Avinya</p>
        </footer>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-900 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
