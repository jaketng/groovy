import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecsWithPreviewUrls } from "../services/spotifyService.js";
import { useTrack } from "../context/TrackContext.jsx";

const extractTrackId = (url) => {
  const trackIdMatch = url.match(/track\/([a-zA-Z0-9]+)/);
  return trackIdMatch ? trackIdMatch[1] : null;
};

const TrackInput = () => {
  const [inputUrl, setInputUrl] = useState("");
  const navigate = useNavigate();
  const { setRecommendedTracks } = useTrack();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trackId = extractTrackId(inputUrl);
    if (!trackId) {
      alert("Not a valid Spotify track URL");
    } else {
      console.log(trackId);
      const recommendedTracks = await getRecsWithPreviewUrls(trackId);
      const recommendedTracks_withPreview = recommendedTracks.filter(
        (track) => track.preview_url !== null
      );
      setRecommendedTracks(recommendedTracks_withPreview);
      navigate("/discover-tracks", { state: { recommendedTracks } });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="gap-4 m-4 pt-16 flex">
        <input
          type="text"
          name="track-input"
          value={inputUrl}
          onChange={(event) => setInputUrl(event.target.value)}
          placeholder="Enter Spotify track URL"
          className="input input-bordered input-primary "
        />
        <input
          className="btn btn-secondary"
          type="submit"
          value="Find Songs!"
        />
      </form>
    </>
  );
};

export default TrackInput;
