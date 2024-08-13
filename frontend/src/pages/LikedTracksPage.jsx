import React, { useEffect, useState } from "react";
import { useTrack } from "../context/TrackContext";
import { Link } from "react-router-dom";
import { getPlaylistUrlIfNotEmpty } from "../services/spotifyService"; // Import the service

const LikedTracksPage = () => {
  const {
    state: { likedTracks },
  } = useTrack();

  const [playlistUrl, setPlaylistUrl] = useState(null);
  const [isPlaylistEmpty, setIsPlaylistEmpty] = useState(true);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true); // Start loading

      const url = await getPlaylistUrlIfNotEmpty();
      if (url) {
        setPlaylistUrl(url);
        setIsPlaylistEmpty(false);
      } else {
        setIsPlaylistEmpty(true);
      }

      setLoading(false); // Stop loading
    };

    fetchPlaylist();
  }, []);

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center w-[100svw] h-[calc(100svh-96px)]"
        style={{ backgroundColor: "#242424" }}
      >
        <p className="text-xl text-white m-auto">Loading...</p>{" "}
        {/* Loading indicator */}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-center w-[100svw] h-[calc(100svh-96px)]"
      style={{ backgroundColor: "#242424" }}
    >
      {!isPlaylistEmpty ? (
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
            <p className="m-auto">Loading playlist...</p>
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
