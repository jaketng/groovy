import TrackInput from "../components/TrackInput";
import { tracks } from "../utils/mockData.js";

const DiscoverTracks = () => {
  return (
    <>
      <h1>Discover Tracks</h1>
      <TrackInput />
      {tracks.map((track) => (
        <div key={track.id}>
          <h2>{track.name}</h2>
        </div>
      ))}
    </>
  );
};

export default DiscoverTracks;
