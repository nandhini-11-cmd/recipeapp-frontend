import { Link } from "react-router-dom";
import foodImg from "../assets/food.jpg";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-green-100 via-white to-yellow-100  px-6 py-12 gap-8">
      
      {/* Left Side - Image */}
      <div className="flex-1 flex justify-center">
        <img
          src={foodImg}
          alt="Delicious Food"
          className="w-full max-w-md object-cover rounded-2xl shadow-lg "
        />
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          🍽️ Welcome to the Recipe Sharing App!
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mb-6">
          Discover delicious recipes, share your own creations, plan meals, generate shopping lists,
          and manage your food journey — all in one place!
        </p>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 max-w-2xl text-gray-700">
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
    </div>
  );
};

export default Home;