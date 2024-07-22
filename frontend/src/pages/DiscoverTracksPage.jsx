import TrackInput from "../components/TrackInput";
import TrackCard from "../components/TrackCard.jsx";
import { useEffect } from "react";
import { useTrack } from "../context/TrackContext.jsx";
import { addTrackToPlaylist } from "../services/spotifyService.js";
import SelectedTrackCard from "../components/SelectedTrackCard"; // Corrected import name

const DiscoverTracks = () => {
  const {
    state,
    addLikedTrack,
    setRecommendedTracks,
    setCurrentTrackIndex,
    setCurrentTrack,
  } = useTrack();
  const { recommendedTracks, likedTracks, currentTrackIndex, currentTrack } =
    state;
  const dailyPlaylistId = window.localStorage.getItem("dailyPlaylistId");

  useEffect(() => {
    if (recommendedTracks.length > 0) {
      setCurrentTrack(recommendedTracks[currentTrackIndex]);
    } else {
      setCurrentTrack(null);
    }
  }, [currentTrackIndex, recommendedTracks]);

  useEffect(() => {
    const filteredTracks = recommendedTracks.filter(
      (track) => !likedTracks.some((likedTrack) => likedTrack.id === track.id)
    );
    setRecommendedTracks(filteredTracks);
  }, []);

  const handleLike = async () => {
    if (currentTrack && !likedTracks.includes(currentTrack.id)) {
      addLikedTrack(currentTrack);
      await addTrackToPlaylist(dailyPlaylistId, currentTrack.uri);
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      alert("Track already liked");
    }
  };

  const handlePass = () => {
    setCurrentTrackIndex(currentTrackIndex + 1);
  };

  const handleGoBack = () => {
    if (currentTrackIndex === 0) {
      alert("Can't go further back");
    } else {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  return (
    <div className="flex justify-between w-full pt-20">
      <div className="w-1/3 pl-20 pr-20 pt-2">
        <TrackInput />
      </div>
      <div className="w-1/3 flex justify-center">
        {currentTrack ? (
          <TrackCard
            track={currentTrack}
            handleLike={handleLike}
            handlePass={handlePass}
            handleGoBack={handleGoBack}
          />
        ) : (
          <>
            {currentTrackIndex === 0 ? null : (
              <p>
                Enter another track or{" "}
                <button
                  className="btn btn-link p-0 m-0 align-baseline"
                  onClick={handleGoBack}
                >
                  go back
                </button>
              </p>
            )}
          </>
        )}
      </div>
      <div className="w-1/3">
        <SelectedTrackCard />
      </div>
    </div>
  );
};

export default DiscoverTracks;
