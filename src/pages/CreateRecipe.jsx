import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState(1);
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleIngredientChange = (i, value) => {
    const updated = [...ingredients];
    updated[i] = value;
    setIngredients(updated);
  };

  const handleStepChange = (i, value) => {
    const updated = [...steps];
    updated[i] = value;
    setSteps(updated);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSubmitting(true);

    const recipeData = {
      title,
      ingredients,
      steps,
      cookingTime,
      servings,
      photo,
      video,
      cuisine,
      diet,
    };

    try {
      await API.post("/recipes", recipeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setStatus("Failed to create recipe.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <Link to="/recipes" className="text-green-600 hover:underline inline-block mb-4">
        ← Back to All recipes</Link>
      <h2 className="text-2xl font-bold mb-4">Create a New Recipe</h2>
           

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded"/>
        </div>

        <div>
          <label>Ingredients</label>
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={ing} onChange={(e) => handleIngredientChange(i, e.target.value)}
                className="flex-1 border px-3 py-2 rounded"/>
                   <button type="button" onClick={() =>setIngredients((prev) => prev.filter((_, idx) => idx !== i))}
                className="bg-gray-500 text-white px-2 rounded">
                -
              </button>

              <button type="button" onClick={() =>setIngredients((prev) => [  ...prev.slice(0, i + 1),"", ...prev.slice(i + 1),])}
                className="bg-gray-500 text-white px-2 rounded">
                +
              </button>
            </div>
          ))}
        </div>

        <div>
          <label>Steps</label>
          {steps.map((step, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input value={step} onChange={(e) => handleStepChange(i, e.target.value)} className="flex-1 border px-3 py-2 rounded"/>
              <button type="button" onClick={() =>setSteps((prev) => prev.filter((_, idx) => idx !== i))}
                className="bg-gray-500 text-white px-2 rounded">
                -
              </button>
              <button type="button" onClick={() =>setSteps((prev) => [...prev.slice(0, i + 1), "", ...prev.slice(i + 1),])}
                className="bg-gray-500 text-white px-2 rounded">
                +
              </button>
            </div>
          ))}
        </div>

        <div>
          <label>Cooking Time (in minutes)</label>
          <input type="number" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)}
            className="w-full border px-3 py-2 rounded"/>
        </div>

        <div>
          <label>Servings</label>
          <input type="number" value={servings} onChange={(e) => setServings(e.target.value)}
            className="w-full border px-3 py-2 rounded"/>
        </div>

        <div>
          <label>Photo URL</label>
          <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)}
            className="w-full border px-3 py-2 rounded"/>
        </div>

        <div>
          <label>Video URL (YouTube embed link)</label>
          <input type="text" value={video} onChange={(e) => setVideo(e.target.value)}
            className="w-full border px-3 py-2 rounded"/>
        </div>

        <div>
          <label>Cuisine</label>
          <input type="text"  value={cuisine} onChange={(e) => setCuisine(e.target.value)}
            className="w-full border px-3 py-2 rounded"/>
        </div>

        <div>
          <label>Diet</label>
          <select value={diet} onChange={(e) => setDiet(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="">Select diet</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        {status && <p className="text-red-500">{status}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {submitting ? "Submitting..." : "Create Recipe"}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
