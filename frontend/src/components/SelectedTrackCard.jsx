import { useTrack } from "../context/TrackContext";

const SelectedTrackCard = () => {
  const {
    state: { selectedTrack },
  } = useTrack();

  return (
    <>
      {selectedTrack ? (
        <p className="w-11/12 max-w-96 whitespace-nowrap overflow-hidden text-ellipsis">
          Recommended on: {selectedTrack.name}
        </p>
      ) : null}
    </>
  );
};

export default SelectedTrackCard;
