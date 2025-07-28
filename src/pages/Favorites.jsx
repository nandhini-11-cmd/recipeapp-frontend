import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFavorites = async () => {
    try {
      const res = await API.get("/users/favorite", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFavorites(res.data);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <Link to="/recipes" className="text-green-600 hover:underline inline-block mb-4">
        ← Back to All recipes</Link>
      <h2 className="text-2xl font-bold mb-6">❤️ Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>You haven’t added any recipes to favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((recipe) => (
            <Link
              to={`/recipes/${recipe._id}`}
              key={recipe._id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              <p className="text-sm text-gray-600">
                {recipe.cuisine} • {recipe.diet}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;