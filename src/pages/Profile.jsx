import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import { Link } from "react-router-dom";



const Profile = () => {
  const [status, setStatus] = useState("");
  const { user, token, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    profilePic: "",
  }); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
        
      } catch (err) {
        console.error("Fetch profile error:", err.response?.data?.msg);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  await axios.put("/users/profile", formData,{
          headers: { Authorization: `Bearer ${token}` },
        });
  setStatus("Profile updated successfully!");
  
setFormData({
  name: "",
  email: "",
  bio: "",
  profilePic: "",
});

} catch (err) {
  console.error("Update error:", err.response?.data || err.message || err);
  setStatus("Failed to update profile.");
}
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link to="/" className="text-green-600 hover:underline inline-block mb-4">
  ← Back to Home</Link>
      <h2 className="text-2xl font-semibold mb-4">👤 My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name"
          className="w-full p-2 border rounded"/>

        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="email"
          className="w-full p-2 border rounded" />

        <input type="text" name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"
          className="w-full p-2 border rounded" />

        <input type="text" name="profilePic" value={formData.profilePic} onChange={handleChange}
          placeholder="Profile Pic URL" className="w-full p-2 border rounded" />

         {status && <p className="text-blue-600">{status}</p>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Profile
        </button>
        
      </form>
    </div>
  );
};

export default Profile;