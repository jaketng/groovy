import TrackInput from "../components/TrackInput";
import TrackCard from "../components/TrackCard.jsx";
import { useEffect, useState } from "react";
import { useTrack } from "../context/TrackContext.jsx";
import { useLocation } from "react-router-dom";

const DiscoverTracks = () => {
  const location = useLocation();
  const recommendedTracks = location.state?.recommendedTracks || [];
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [tracks, setTracks] = useState(recommendedTracks);
  const [currentTrack, setCurrentTrack] = useState(null);
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
    const filteredTracks = recommendedTracks.filter(
      (track) => !likedTracks.includes(track.id)
    );
    setTracks(filteredTracks);
  }, [recommendedTracks, likedTracks]);

  const handleLike = () => {
    if (currentTrack && !likedTracks.includes(currentTrack.id)) {
      addLikedTrack(currentTrack);
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("Track already liked");
    }
  };

  const handlePass = () => {
    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
  };

  const handleGoBack = () => {
    if (currentTrackIndex === 0) {
      alert("Can't go further back");
    } else {
      setCurrentTrackIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <>
      <h1>Discover Tracks</h1>
      <TrackInput />
      {currentTrack ? (
        <>
          {console.log(currentTrackIndex)}
          {console.log(tracks)}
          <TrackCard track={currentTrack} currentTrack={currentTrack} />
          <button onClick={handlePass}>PASS</button>
          <button onClick={handleLike}>LIKE</button>
          {currentTrackIndex > 0 && (
            <button onClick={handleGoBack}>GO BACK</button>
          )}
        </>
      ) : (
        <>
          <p>No more tracks!</p>
          {currentTrackIndex > 0 && (
            <button onClick={handleGoBack}>GO BACK</button>
          )}
        </>
      )}
    </>
  );
};

export default DiscoverTracks;
