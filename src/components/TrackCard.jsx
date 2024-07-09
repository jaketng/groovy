import AudioControls from "./AudioControls";

const TrackCard = ({ track, currentTrack, setCurrentTrack }) => {
  return (
    <>
      <h2>{track.name}</h2>
      <AudioControls
        track={track}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />
    </>
  );
};

export default TrackCard;
