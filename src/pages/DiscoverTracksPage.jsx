import TrackInput from "../components/TrackInput";
import { tracks as mockData } from "../utils/mockData.js";
import TrackCard from "../components/TrackCard.jsx";
import { useState, useRef, useEffect } from "react";
import { useTrack } from "../context/TrackContext.jsx";

const DiscoverTracks = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState(mockData);
  const { addLikedTrack, state } = useTrack();
  const likedTracks = state.likedTracks.map((track) => track.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack ? currentTrack.preview_url : "";
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  const handleLike = () => {
    if (currentTrack && !likedTracks.includes(currentTrack.id)) {
      currentTrack.isInLikedTracks = true;
      addLikedTrack(currentTrack);
    } else {
      alert("Track already liked");
    }
    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    setIsPlaying(true);
  };

  const handlePass = () => {
    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <h1>Discover Tracks</h1>
      <TrackInput />
      {currentTrack ? (
        <>
          <TrackCard track={currentTrack} />
          <audio ref={audioRef} />
          <button onClick={handleLike}>LIKE</button>
          <button onClick={handlePass}>PASS</button>
          <button onClick={togglePlayPause}>
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>
        </>
      ) : (
        <p>No more tracks!</p>
      )}
    </>
  );
};

export default DiscoverTracks;
