import TrackInput from "../components/TrackInput";
import { tracks } from "../utils/mockData.js";
import TrackCard from "../components/TrackCard.jsx";

const DiscoverTracks = () => {
  return (
    <>
      <h1>Discover Tracks</h1>
      <TrackInput />
      {tracks.map((track) => (
        <TrackCard key={track.id} trackName={track.name} />
      ))}
    </>
  );
};

export default DiscoverTracks;
