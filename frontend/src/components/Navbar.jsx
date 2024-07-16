import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row">
      <button
        className="flex items-center btn btn-ghost text-lg"
        onClick={() => navigate("/discover-tracks")}
      >
        Discover Tracks
      </button>
      <button
        className="flex items-center btn btn-ghost text-lg"
        onClick={() => navigate("/liked-tracks")}
      >
        Liked Tracks
      </button>
    </div>
  );
};

export default Navigation;
