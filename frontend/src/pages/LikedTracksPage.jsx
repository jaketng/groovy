import { useTrack } from "../context/TrackContext.jsx";
import TrackCard from "../components/TrackCard.jsx";
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
        // Iterate from the last index to the first
        [...Array(likedTracks.length).keys()].reverse().map((index) => {
          const track = likedTracks[index];
          return (
            <div key={track.id}>
              <TrackCard
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
                track={track}
              />
              <button onClick={() => handleRemove(track.id)}>REMOVE</button>
            </div>
          );
        })
      ) : (
        <p>No liked tracks!</p>
      )}
    </>
  );
};

export default LikedTracksPage;
