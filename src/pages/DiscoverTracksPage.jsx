import TrackInput from "../components/TrackInput";
import { tracks } from "../utils/mockData.js";
import TrackCard from "../components/TrackCard.jsx";
import { useState, useEffect } from "react";
import { useTrack } from "../context/TrackContext.jsx";

const DiscoverTracks = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const { addLikedTrack } = useTrack();

  useEffect(() => {
    tracks.forEach((track) => {
      track.isInLikedTracks = false;
    });
  }, []);

  const currentTrack = tracks[currentTrackIndex];

  const handleLike = () => {
    if (currentTrack && !currentTrack.isInLikedTracks) {
      currentTrack.isInLikedTracks = true;
      addLikedTrack(currentTrack);
    } else {
      alert("Track already liked");
    }
    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
  };

  const handlePass = () => {
    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      <h1>Discover Tracks</h1>
      <TrackInput />
      {currentTrack ? (
        <TrackCard
          track={currentTrack}
          handleLike={handleLike}
          handlePass={handlePass}
        />
      ) : (
        <p>No more tracks!</p>
      )}
    </>
  );
};

export default DiscoverTracks;
