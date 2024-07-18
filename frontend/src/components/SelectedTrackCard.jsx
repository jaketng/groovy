import { useTrack } from "../context/TrackContext";

const SelectedTrackCard = () => {
  const {
    state: { selectedTrack },
  } = useTrack();

  return (
    <>
      {selectedTrack ? (
        <p className="pt-4 pl-4 w-full">
          Recommendations based on: {selectedTrack.name}
        </p>
      ) : null}
    </>
  );
};

export default SelectedTrackCard;
