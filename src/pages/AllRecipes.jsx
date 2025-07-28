import { useEffect, useState } from "react";
import axios from "../api/axios";
import RecipeCard from "../components/RecipeCard";

const AllRecipes = () => {

  const [recipes, setRecipes] = useState([]);

  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");  

  const [selectedDiet, setSelectedDiet] = useState("All");

  const dietOptions = ["All", "Vegetarian", "Non-Vegetarian"];


  useEffect(() => {
    const fetchRecipes = async () => {
      try 
      {
        const res = await axios.get("/recipes");

        setRecipes(res.data);

        setFilteredRecipes(res.data);

      } catch (err)
       {
        console.error("Error fetching recipes:", err.response?.data?.msg);
      }
    };
    fetchRecipes();
  }, []);


  useEffect(() =>
     {
    let results = recipes;

    if (searchTerm.trim())
       {
        const lowerSearch = searchTerm.toLowerCase();
        results = results.filter((recipe) =>
        recipe.title.toLowerCase().includes(lowerSearch) ||
        recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(lowerSearch)
    )
  );
}
    

    if (selectedDiet !== "All") 
      {
        results = results.filter(
        (recipe) =>recipe.diet && recipe.diet.toLowerCase() === selectedDiet.toLowerCase()
      );
    }

    setFilteredRecipes(results);
  }, [searchTerm,selectedDiet, recipes]); 
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">🍛 All Recipes</h2>

        <div className="mb-6 flex flex-col md:flex-row gap-4 flex-wrap">
        
        <input type="text" placeholder="Search recipes . . ." value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} className="border
           border-gray-300 rounded px-4 py-2 w-full md:w-1/3"/>    

          <select value={selectedDiet}  onChange={(e) => setSelectedDiet(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/4" >
          {dietOptions.map((diet) => (<option key={diet} value={diet}>
          {diet}
            </option>
          ))}
        </select>
      </div>

     
      <div className="grid md:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p className="text-gray-500">No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;