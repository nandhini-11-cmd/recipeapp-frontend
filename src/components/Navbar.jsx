import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-red-400 via-yellow-300 to-orange-400 shadow-md p-4">
      <div className="flex items-center justify-between relative">
        {/* Logo (centered absolutely) */}
        <Link
          to="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-3xl font-bold text-gray-800 animate-bounce mt-2 md:mt-8"
        >
          🍲 YummyHub
        </Link>

        {/* Hamburger button (right side, only mobile) */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden text-gray-800 text-2xl focus:outline-none ml-auto"
        >
          {showMenu ? "✖" : "☰"}
        </button>
      </div>

      {/* Menu items */}
      <div
        className={`${
          showMenu ? "flex" : "hidden"
        } flex-col mt-4 space-y-2 md:mt-6 md:flex md:flex-row md:space-y-2  md:space-x-6 md:justify-center md:items-center text-gray-800 font-semibold`}
      >
        {user ? (
          <>
            <span className="text-xl font-bold">Hi, {user.name}👋</span>
            <Link to="/recipes">All Recipes</Link>
            <Link to="/create">Add Recipe</Link>
            <Link to="/my-recipes">My Recipes</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/meal-planner">Meal Planner</Link>
            <Link to="/shopping-list">Shopping List</Link>
            <Link to="/following">Following</Link>
            <Link to="/profile">Update Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center md:space-x-150 w-full md:justify-center text-center md:text-left">
            <p className="text-xl md:text-2xl font-bold text-green-700 whitespace-nowrap mb-2 md:mb-0">
              Cook! Share! and Enjoy!
            </p>
            <div className="flex justify-center md:justify-start space-x-3 text-xl ">
              <Link to="/register" className="text-blue-600 font-bold">
                Sign Up
              </Link>
              <span className="text-gray-500">|</span>
              <Link to="/login" className="text-blue-600 font-bold ">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;