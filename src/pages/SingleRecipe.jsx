import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import API from "../api/axios";

const SingleRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const token = localStorage.getItem("token");
const [isFollowing, setIsFollowing] = useState(null);
const loggedInUserId = JSON.parse(localStorage.getItem("user"))?.id;

  const fetchRecipe = async () => {
    try {
      const res = await API.get(`/recipes/${id}`);
      setRecipe(res.data);
    } catch (err) {
      console.error("Failed to fetch recipe", err);
    }
  };

  useEffect(() => {
  console.log("Logged in user ID:", loggedInUserId);
  console.log("Recipe createdBy:", recipe?.createdBy?._id);
  console.log("Show follow button?", recipe?.createdBy?._id !== loggedInUserId);
}, [recipe, loggedInUserId]);

  useEffect(() => {
  if (recipe && recipe.createdBy && loggedInUserId) {
    if (recipe.createdBy._id !== loggedInUserId) {
      checkIfFollowing();
    }
  }
}, [recipe?.createdBy?._id, loggedInUserId]);


const checkIfFollowing = async (createdById) => {
  try {
    const res = await API.get("/users/following", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const followedIds = res.data.map((u) => u._id);
    setIsFollowing(followedIds.includes(createdById));
  } catch (err) {
    console.error("Error checking following:", err);
  }
};


const handleFollowToggle = async () => {
  try {
    const endpoint = isFollowing
      ? `/users/unfollow/${recipe.createdBy._id}`
      : `/users/follow/${recipe.createdBy._id}`;

    const res = await API.post(endpoint, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(res.data); 
    setIsFollowing(!isFollowing);
  } catch (err) {
    console.error("Failed to toggle follow:", err.response?.data || err.message);
    alert(err.response?.data?.msg || "Follow/unfollow failed.");
  }
};

  const handleAddComment = async () => {
  if (!comment.trim()) return;

  try {
    await API.post(
      `/recipes/${id}/comment`,
      { text:comment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setComment(""); 
    fetchRecipe();
  } catch (err) {
    console.error("Failed to add comment", err.response?.data || err.message);
    alert("Comment failed. Make sure you're logged in.");
  }
};


const handleAddFavorite = async () => {
  try {
    await API.post(`/users/${id}/favorite`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Added to favorites!");
  } catch (err) {
    console.error("Favorite error:", err.response?.data || err.message);
    alert("Failed to add to favorites.");
  }
};

 const handleAddRating = async () => {
  const numericRating = Number(rating);
  if (numericRating < 1 || numericRating > 5) return alert("Select rating 1 to 5");

  try {
    await API.post(
      `/recipes/${id}/rate`,
      { rating: numericRating }, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setRating(0); 
    fetchRecipe(); 
  } catch (err) {
    console.error("Failed to rate", err.response?.data || err.message);
    alert("Rating failed. Make sure you're logged in.");
  }
};

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div className="text-center mt-10">Loading recipe...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
      <p className="text-gray-500">By {recipe.createdBy?.name}{token && recipe.createdBy && recipe.createdBy._id !== loggedInUserId && (
  <button
    onClick={handleFollowToggle}
    className={`ml-2 px-3 py-1 rounded text-white ${
      isFollowing ? "bg-red-500" : "bg-green-600"
    }`}
  >
    {isFollowing ? "Unfollow" : "Follow"}
  </button>
)}</p>
      


      {recipe.photo && (
        <img src={recipe.photo} alt={recipe.title} className="w-full mt-4 rounded" />
      )}

     {recipe.video ? (
  <div className="my-4">
    <ReactPlayer url={recipe.video} width="100%" controls />
    <p className="mt-2 text-sm text-blue-600">
      <a href={recipe.video} target="_blank" rel="noopener noreferrer">
         Click here to play
      </a>
    </p>
  </div>
) : (
  <p className="italic text-gray-500 mt-2">No video tutorial provided.</p>
)}

      <p className="mt-2 text-gray-600">
        <strong>Cuisine:</strong> {recipe.cuisine} | <strong>Diet:</strong> {recipe.diet}
      </p>
      <p className="text-gray-600">
        <strong>Cooking Time:</strong> {recipe.cookingTime} mins |{" "}
        <strong>Servings:</strong> {recipe.serving}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold">Ingredients:</h3>
        <ul className="list-disc pl-5">
          {recipe.ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Steps:</h3>
        <ol className="list-decimal pl-5">
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      

      
      <div className="mt-6">
        <h3 className="font-semibold mb-1">Average Rating:</h3>
        <p>⭐ {recipe.averageRating?.toFixed(1) || "No ratings yet"}</p>

        {token && (
          <div className="mt-2">
            <label className="mr-2">Your Rating (1–5):</label>
            <input type="number"  min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)}
              className="border px-2 py-1 w-20 rounded mr-2" />
              <button onClick={handleAddRating} className="bg-blue-500 text-white px-4 py-1 rounded">
              Submit Rating
            </button>
          </div>
        )}
      </div>
    
      <div className="mt-6">

        <h3 className="font-semibold mb-2">Comments</h3>

        {recipe.comments?.length === 0 && <p>No comments yet.</p>}

        {recipe.comments?.map((c, i) => (
          <div key={i} className=" pt-2 mt-2">
            <p className="font-semibold">{c.user?.name || "Anonymous"}</p>
            <p>{c.text}</p>
          </div>
        ))}

        {token && (
          <div className="mt-4">
            <textarea  value={comment}  onChange={(e) => setComment(e.target.value)}  rows="3"
              className="w-full border p-2 rounded" placeholder="Add your comment..." ></textarea>
            <button  onClick={handleAddComment} className="mt-2 bg-green-600 text-white px-4 py-2 rounded" >
              Submit Comment
            </button>            
            
            {token && (
            <button onClick={handleAddFavorite} className="bg-pink-400 text-white px-4 py-2 rounded mt-2 ml-96">
                ❤️ Add to Favorites
                </button>
              )}
          </div>

          
        )}
      </div>
    </div>
  );
};

export default SingleRecipe;