import { useEffect, useState } from "react";
import API from "../api/axios";

const Following = () => {
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchFollowing = async () => {
    try {
      const res = await API.get("/users/following", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFollowing(res.data);
    } catch (err) {
      setError("Failed to load followed users.");
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await API.post(
       `/users/unfollow/${userId}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchFollowing(); 
    } catch (err) {
      alert("Unfollow failed.");
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, []);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6">Following 👥</h2>
      {following.length === 0 ? (
        <p>You are not following anyone yet.</p>
      ) : (
        <div className="grid gap-4">
          {following.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 border rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.profilePic || "https://via.placeholder.com/50"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.bio}</p>
                </div>
              </div>
              <button
                onClick={() => handleUnfollow(user._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Unfollow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Following;