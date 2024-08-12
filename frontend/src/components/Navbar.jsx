import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-neutral fixed bottom-0 left-0 w-[100svw] h-24 flex">
      <button
        className={`w-1/3 h-full rounded-none btn btn-ghost text-xl ${
          location.pathname === "/profile" ? "font-bold" : "bg-neutral-focus"
        }`}
        onClick={() => navigate("/profile")}
      >
        Profile
      </button>
      <button
        className={`w-1/3 h-full rounded-none btn btn-ghost text-xl ${
          location.pathname === "/discover-tracks"
            ? "font-bold"
            : "bg-neutral-focus"
        }`}
        onClick={() => navigate("/discover-tracks")}
      >
        Discover Tracks
      </button>
      <button
        className={`w-1/3 h-full rounded-none btn btn-ghost text-xl ${
          location.pathname === "/liked-tracks"
            ? "font-bold"
            : "bg-neutral-focus"
        }`}
        onClick={() => navigate("/liked-tracks")}
      >
        Liked Tracks
      </button>
      \
    </div>
  );
};

export default Navigation;
