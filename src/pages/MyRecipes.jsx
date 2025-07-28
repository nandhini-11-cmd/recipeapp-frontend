import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchMyRecipes = async () => {
    try {
      const res = await API.get("/recipes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const myRecipes = res.data.filter(
        (recipe) => recipe.createdBy._id === user.id
      );

      setRecipes(myRecipes);
    } catch (err) {
      console.error("Error loading your recipes", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await API.delete(`/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyRecipes(); 
    } catch (err) {
      console.error("Failed to delete recipe", err);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <Link to="/recipes" className="text-green-600 hover:underline inline-block mb-4">
        ← Back to All recipes</Link>
      <h2 className="text-3xl font-bold mb-4">👩‍🍳 My Recipes</h2>
      {recipes.length === 0 ? (
        <p>You haven’t added any recipes yet.</p>
      ) : (
        <div className="grid gap-4">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <p className="text-gray-600 mb-2">
                Cooking Time: {recipe.cookingTime} mins | Servings: {recipe.servings}
              </p>
              <div className="flex gap-3">
                <Link to={`/edit-recipe/${recipe._id}`} className="text-blue-600 underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(recipe._id)} className="text-red-600 underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;