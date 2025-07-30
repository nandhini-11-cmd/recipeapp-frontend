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
    <nav className="bg-orange-500 text-white p-4 ">
       <div className="flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold ml-14 md:ml-140">🍽️ YummyHub</Link>
     <button onClick={() => setShowMenu(!showMenu)} className="md:hidden text-blue-600 font-bold text-sm  ">
          {showMenu ? '\u2716' : '\u2630'}
        </button>
      </div>      
     <div
       className={`mt-4 ${showMenu ? "flex" : "hidden"} flex-col items-start space-y-2 md:space-y-0 md:flex md:flex-row md:items-center md:justify-between md:space-x-4 text-s md:text-m font-bold`}>
        {user ? ( <>
          <span className=" font-bold text-green-800">Hi, {user.name} Welcome!</span>
            <Link to="/recipes">All-Recipes</Link>
            <Link to="/create">Add-Recipe</Link>
            <Link to="/my-recipes">My-Recipes</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/meal-planner">Meal-Planner</Link>
            <Link to="/shopping-list">Shopping-List</Link>
            <Link to="/following">Following</Link>
            <Link to="/profile">Update-Profile</Link>            
            <button onClick={handleLogout} className="bg-red-600 px-3 py-1 ml-4 rounded hover:bg-red-700">
              Logout
            </button>
            </>) : (
              <div className="flex flex-col md:flex-row md:justify-between items-center w-full space-y-2 md:space-y-0">
             <p className="text-xl md:text-2xl  font-bold text-green-700 whitespace-nowrap">
              Share! Cook! and Enjoy!</p>
           <div className="flex flex-row text-xl md:text-xl items-center space-x-2">    
          <Link to="/register" className="text-blue-500  font-bold">SignUp</Link>
          <span className="text-blue-500 font-bold">|</span>  
          <Link to="/login" className="text-blue-500  font-bold">Login</Link>
          </div>
          </div>
         )}
           </div>          
         </nav>
        );
    };

export default Navbar;