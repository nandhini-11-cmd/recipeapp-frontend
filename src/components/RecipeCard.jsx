import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 hover:shadow-xl transition">
      <img src={recipe.photo} alt={recipe.title} className="w-full h-40 object-cover rounded"/>
      <h3 className="text-lg font-semibold mt-2">{recipe.title}</h3>
      <p className="text-gray-500 text-sm">Cuisine: {recipe.cuisine}</p>
      <p className="text-sm">By: {recipe.createdBy?.name}</p>
      <Link to={`/recipes/${recipe._id}`} className="text-blue-600 mt-2 inline-block">
        View Recipe →
      </Link>
    </div>
  );
};

export default RecipeCard;