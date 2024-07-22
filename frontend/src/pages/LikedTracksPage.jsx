import React from "react";
import { useTrack } from "../context/TrackContext";
import { Link } from "react-router-dom";

const LikedTracksPage = () => {
  const {
    state: { likedTracks },
  } = useTrack();

  // Retrieve the daily playlist ID from local storage
  const dailyPlaylistId = window.localStorage.getItem("dailyPlaylistId");

  // Construct the playlist URL if the daily playlist ID is available
  const playlistUrl = dailyPlaylistId
    ? `https://open.spotify.com/embed/playlist/${dailyPlaylistId}?utm_source=generator`
    : null;

  return (
    <div className="flex flex-col justify-center">
      {likedTracks.length > 0 ? (
        <div
          className="playlist-container w-full neutral flex justify-center items-center box-border"
          style={{ height: "calc(100vh - 80px)" }}
        >
          {playlistUrl ? (
            <iframe
              className="w-2/3 h-full"
              style={{ borderRadius: "12px" }}
              src={playlistUrl}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          ) : (
            <p>Loading playlist...</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col m-auto pt-20">
          <p className="text-3xl">You have no liked tracks!</p>
          <Link to="/" className="btn btn-link">
            Find New Tracks Here
          </Link>
        </div>
      )}
    </div>
  );
};

export default LikedTracksPage;
