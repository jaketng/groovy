import { useTrack } from "../context/TrackContext.jsx";
import TrackCard from "../components/TrackCard.jsx";
import AudioControls from "../components/AudioControls.jsx";

const LikedTracksPage = () => {
  const { state, removeLikedTrack } = useTrack();
  const likedTracks = state.likedTracks || [];

  const handleRemove = (trackId) => {
    removeLikedTrack(trackId);
  };

  return (
    <>
      <h1>Liked Tracks</h1>
      {likedTracks.length > 0 ? (
        likedTracks.map((track) => (
          <div key={track.id}>
            <TrackCard track={track} />
            <button onClick={() => handleRemove(track.id)}>REMOVE</button>
            <AudioControls currentTrack={track} />
          </div>
        ))
      ) : (
        <p>No liked tracks!</p>
      )}
    </>
  );
};

export default LikedTracksPage;
