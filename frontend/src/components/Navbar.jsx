// src/components/Navigation.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ProfileIcon,
  SearchIcon,
  LikedTracksIcon,
} from "../assets/ComponentIcons";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bg-neutral fixed bottom-0 left-0 w-[100svw] h-24 flex">
      <button
        className={`w-1/3 h-full flex flex-col items-center justify-center rounded-none btn btn-ghost ${
          location.pathname === "/profile" ? "font-bold" : "bg-neutral-focus"
        }`}
        onClick={() => navigate("/profile")}
      >
        <ProfileIcon />
      </button>
      <button
        className={`w-1/3 h-full flex flex-col items-center justify-center rounded-none btn btn-ghost ${
          location.pathname === "/discover-tracks"
            ? "font-bold"
            : "bg-neutral-focus"
        }`}
        onClick={() => navigate("/discover-tracks")}
      >
        <SearchIcon />
      </button>
      <button
        className={`w-1/3 h-full flex flex-col items-center justify-center rounded-none btn btn-ghost ${
          location.pathname === "/liked-tracks"
            ? "font-bold"
            : "bg-neutral-focus"
        }`}
        onClick={() => navigate("/liked-tracks")}
      >
        <LikedTracksIcon />
      </button>
    </div>
  );
};

export default Navigation;
