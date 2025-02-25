import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const NavLink = ({ to, children }) => (
  <Link to={to}>
    <li className="hover:text-blue-400 inline-block font-semibold text-xl cursor-pointer transition-colors duration-200">
      {children}
    </li>
  </Link>
);

const Navbar = () => {
  const { logoutUser, isLoggedIn } = useContext(AppContext);

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200">
              Skill-Sync
            </h1>
          </Link>

          <ul className="flex items-center gap-8">
            {isLoggedIn ? (
              <>
                <NavLink to="/home/dashboard">Dashboard</NavLink>
                <li
                  onClick={logoutUser}
                  className="hover:text-blue-400 font-semibold text-xl cursor-pointer transition-colors duration-200"
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <NavLink to="/register">Sign Up</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
