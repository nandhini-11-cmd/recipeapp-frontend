import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AllRecipes from "./pages/AllRecipes";
import SingleRecipe from "./pages/SingleRecipe";
import CreateRecipe from "./pages/CreateRecipe";
import MyRecipes from "./pages/MyRecipes";
import Favorites from "./pages/Favorites";
import MealPlanner from "./pages/MealPlanner";
import Following from "./pages/Following";
import ShoppingList from "./pages/ShoppingList";
import EditRecipe from "./pages/EditRecipe";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recipes" element={<AllRecipes />} />
        <Route path="/recipes/:id" element={<SingleRecipe />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/following" element={<Following />} />
        <Route path="/shopping-list" element={<ShoppingList />} />
      </Routes>
    </>
  );
}

export default App;