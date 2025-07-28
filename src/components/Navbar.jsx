import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-orange-500 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold animate-bounce">🍽️ YummyHub</Link>

      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/recipes">All-Recipes</Link>
            <Link to="/create">Add-Recipe</Link>
            <Link to="/my-recipes">My-Recipes</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/meal-planner">Meal-Planner</Link>
            <Link to="/shopping-list">Shopping-List</Link>
            <Link to="/following">Following</Link>
            <Link to="/profile">Update-Profile</Link>
            <span className="font-bold text-green-800">Hi, {user.name}!</span>
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
              Logout
            </button>
            </>) : (
              <>
               <span className=" text-xl font-bold">New user - </span>
               <Link to="/register" className="text-blue-500 text-xl  underline font-bold">Register</Link>
               <span className=" text-blue-500 text-xl  font-bold"> | </span>
               <Link to="/login" className="text-blue-500 text-xl  underline font-bold">Login</Link>
               </>
               )}
           </div>
         </nav>
        );
    };

export default Navbar;