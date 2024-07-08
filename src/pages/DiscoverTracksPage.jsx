import TrackInput from "../components/TrackInput";
import { tracks as mockData } from "../utils/mockData.js";
import TrackCard from "../components/TrackCard.jsx";
import { useState, useEffect } from "react";
import { useTrack } from "../context/TrackContext.jsx";

const DiscoverTracks = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState(mockData);
  const { addLikedTrack, state } = useTrack();
  const likedTracks = state.likedTracks.map((track) => track.id);

  const currentTrack = tracks[currentTrackIndex];

  const handleLike = () => {
    if (currentTrack && !likedTracks.includes(currentTrack.id)) {
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
        <>
          <TrackCard track={currentTrack} />
          <button onClick={handleLike}>LIKE</button>
          <button onClick={handlePass}>PASS</button>
        </>
      ) : (
        <p>No more tracks!</p>
      )}
    </>
  );
};

export default DiscoverTracks;
