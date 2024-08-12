// TrackInput.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSearch,
  getRecsWithPreviewUrls,
} from "../services/spotifyService.js";
import { useTrack } from "../context/TrackContext.jsx";

const TrackInput = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const { setRecommendedTracks, setSelectedTrack, setCurrentTrackIndex } =
    useTrack();

  useEffect(() => {
    const fetchTracks = async () => {
      if (!search) return setSearchResults([]);
      const tracks = await getSearch(search);
      setSearchResults(tracks);
    };

    fetchTracks();
  }, [search]);

  const handleTrackSelect = async (track) => {
    const trackId = track.id;
    const recommendedTracks = await getRecsWithPreviewUrls(trackId);
    const recommendedTracks_withPreview = recommendedTracks.filter(
      (track) => track.preview_url !== null
    );
    setRecommendedTracks(recommendedTracks_withPreview);
    setSelectedTrack(track);
    setCurrentTrackIndex(0);
    navigate("/discover-tracks");
    setSearch("");
  };

  return (
    <div className="items-center w-80">
      <form className="w-full flex flex-col items-center gap-4">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search Tracks"
          className="input input-bordered input-primary w-full"
        />
      </form>

      {search && (
        <div className="search-results-container mt-2 w-full h-96 overflow-y-scroll">
          {searchResults.length === 0 ? (
            <p className="text-center text-gray-600 py-4">No tracks found</p>
          ) : (
            searchResults.map((track) => (
              <div
                key={track.id}
                className="track-item flex items-center gap-2 cursor-pointer hover:bg-neutral rounded-md p-2 transition duration-300 ease-in-out"
                onClick={() => handleTrackSelect(track)}
              >
                <img
                  src={
                    track.album?.images?.[0]?.url ||
                    "https://via.placeholder.com/150"
                  }
                  alt={track.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-lg truncate">{track.name}</p>
                  <p className="text-gray-600 text-sm truncate">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TrackInput;
