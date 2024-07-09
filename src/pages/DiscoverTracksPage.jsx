import TrackInput from "../components/TrackInput";
import { tracks as mockData } from "../utils/mockData.js";
import TrackCard from "../components/TrackCard.jsx";
import { useEffect, useState } from "react";
import { useTrack } from "../context/TrackContext.jsx";
import AudioControls from "../components/AudioControls.jsx";

const DiscoverTracks = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState(mockData);
  const [currentTrack, setCurrentTrack] = useState([]);
  const { addLikedTrack, state } = useTrack();
  const likedTracks = state.likedTracks.map((track) => track.id);

  useEffect(() => {
    if (tracks.length > 0) {
      setCurrentTrack(tracks[currentTrackIndex]);
    } else {
      setCurrentTrack(null);
    }
  }, [currentTrackIndex, tracks]);

  useEffect(() => {
    const filteredTracks = mockData.filter(
      (track) =>
        !state.likedTracks.some((likedTrack) => likedTrack.id === track.id)
    );
    setTracks(filteredTracks);
  }, []);

  const handleLike = () => {
    if (currentTrack && !likedTracks.includes(currentTrack.id)) {
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
      {currentTrack && tracks ? (
        <>
          {console.log(currentTrackIndex)}
          {console.log(tracks)}
          <TrackCard track={currentTrack} />
          <button onClick={handlePass}>PASS</button>
          <button onClick={handleLike}>LIKE</button>
          <AudioControls currentTrack={currentTrack} track={currentTrack} />
        </>
      ) : (
        <p>No more tracks!</p>
      )}
    </>
  );
};

export default DiscoverTracks;
