import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link} from "react-router-dom";

const ShoppingList = () => {
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");

  const fetchShoppingList = async () => {
    try {
      const res = await API.get("/mealplans/shopping-list", {
        headers: { Authorization: `Bearer ${token}` },
      });

    
      setList(res.data.shoppingList);
    } catch (err) {
      console.error("Failed to fetch shopping list", err);
    }
  };

  useEffect(() => {
    fetchShoppingList();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <Link to="/recipes" className="text-green-600 hover:underline inline-block mb-4">
        ← Back to All recipes</Link>
      <h2 className="text-2xl font-bold mb-4">🛒 Shopping List</h2>

      {list.length === 0 ? (
        <p>No shopping list found. Add some recipes to your meal plan first!</p>
      ) : (
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {list.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingList;