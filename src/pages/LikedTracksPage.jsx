import { useTrack } from "../context/TrackContext.jsx";
import TrackCard from "../components/TrackCard.jsx";
import AudioControls from "../components/AudioControls.jsx";
import { useState } from "react";

const LikedTracksPage = () => {
  const { state, removeLikedTrack } = useTrack();
  const likedTracks = state.likedTracks || [];
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleRemove = (trackId) => {
    removeLikedTrack(trackId);
    if (currentTrack?.id === trackId) {
      setCurrentTrack(null);
    }
  };

  return (
    <>
      <h1>Liked Tracks</h1>
      {likedTracks.length > 0 ? (
        likedTracks.map((track) => (
          <div key={track.id}>
            <TrackCard
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              track={track}
            />
            <button onClick={() => handleRemove(track.id)}>REMOVE</button>
          </div>
        ))
      ) : (
        <p>No liked tracks!</p>
      )}
    </>
  );
};

export default LikedTracksPage;
