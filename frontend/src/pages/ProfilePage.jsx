import React from "react";
import { logout } from "../services/spotifyService.js";

export const ProfilePage = () => {
  return (
    <div>
      <button
        className="btn bg-spotify hover:bg-spotify-accent text-black"
        onClick={logout}
      >
        Log out
      </button>
    </div>
  );
};
