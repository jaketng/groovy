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
    ? `https://open.spotify.com/embed/playlist/${dailyPlaylistId}?utm_source=generator&theme=0`
    : null;

  return (
    <div
      className="flex flex-col justify-center w-[100svw] h-[calc(100svh-96px)]"
      style={{ backgroundColor: "#242424" }}
    >
      {playlistUrl ? (
        <div className="playlist-container w-full h-full neutral flex justify-center items-center box-border">
          {playlistUrl ? (
            <iframe
              className="w-full h-full"
              style={{ borderRadius: "15px" }}
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
          <p className="text-3xl text-white">You have no liked tracks!</p>
          <Link to="/discover-tracks" className="btn btn-link text-white">
            Find New Tracks Here
          </Link>
        </div>
      )}
    </div>
  );
};

export default LikedTracksPage;
