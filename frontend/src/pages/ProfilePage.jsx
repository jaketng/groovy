import React, { useEffect, useState } from "react";
import { getUserData, logout } from "../services/spotifyService.js";

export const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading)
    return (
      <p className="flex flex-col justify-center items-center w-[100svw] h-[calc(100svh-96px)] text-xl">
        Loading...
      </p>
    );

  if (!userData) return <p>Failed to load user data.</p>;

  return (
    <div className=" flex flex-col p-4 justify-center items-center  h-[calc(100svh-96px)]">
      <img
        src={userData.images[0]?.url || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-16 h-16 rounded-full mx-auto"
      />
      <h1 className="text-2xl font-semibold text-center mt-4">
        {userData.display_name}
      </h1>
      <p className="text-center text-gray-600">{userData.email}</p>
      <p className="text-center text-gray-600">
        Followers: {userData.followers.total}
      </p>
      <p className="text-center text-gray-600">Country: {userData.country}</p>
      <p className="text-center text-gray-600">Product: {userData.product}</p>
      <div className="mt-6 text-center">
        <button
          className="btn bg-spotify hover:bg-spotify-accent text-black"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </div>
  );
};
