import { Link } from "react-router-dom";
import foodImg from "../assets/food.jpg";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
      <img
        src={foodImg}
        alt="Delicious Food"
        className="w-1/2 max-w-xl object-cover rounded-lg shadow-md mb-6"
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        🍽️ Welcome to the Recipe Sharing App!
      </h1>

      <p className="text-gray-600 text-lg text-center max-w-2xl mb-4">
        Discover delicious recipes, share your own creations, plan meals, generate shopping lists,
        and manage your food journey — all in one place!
      </p>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 max-w-4xl text-center text-gray-700 my-6">
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <strong>User Features:</strong>
          <br />
          Register, Login, Update Profile, Follow other user, View My Recipes
        </div>
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <strong>Recipe Sharing:</strong>
          <br />
          Add, Browse, Favorite, Rate & Comment on Recipes
        </div>
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <strong>Meal Planning:</strong>
          <br />
          Plan weekly meals and save them
        </div>
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <strong>Shopping List:</strong>
          <br />
          Auto-generate shopping items from your Meal plan
        </div>
      </div>

     
    </div>
  );
};

export default Home;