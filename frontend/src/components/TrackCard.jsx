import AudioControls from "./AudioControls";

const TrackCard = ({ track, currentTrack, setCurrentTrack }) => {
  const artistNames = track.artists.map((artist) => artist.name).join(", ");
  return (
    <>
      <h2>{track.name}</h2>
      <h4>{artistNames}</h4>
      <AudioControls
        track={track}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />
    </>
  );
};

export default TrackCard;
