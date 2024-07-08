import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TrackInput = () => {
  const [trackId, setTrackId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!trackId) {
      alert("Not a valid URL");
    } else {
      console.log(trackId);
      navigate("/discover-tracks");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="track-input"
          value={trackId}
          onChange={(event) => setTrackId(event.target.value)}
        />
        <input type="submit" value="Find Songs!" />
      </form>
    </>
  );
};

export default TrackInput;
