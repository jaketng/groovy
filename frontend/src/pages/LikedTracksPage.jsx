import { useTrack } from "../context/TrackContext.jsx";
import TrackCard from "../components/TrackCard.jsx";
import { Link } from "react-router-dom";
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
        <div className="flex flex-col m-auto pt-20">
          <p className="text-3xl">You have no liked tracks!</p>
          <Link to="/" className="btn btn-link">
            Find New Tracks Here
          </Link>
        </div>
      )}
    </>
  );
};

export default LikedTracksPage;
