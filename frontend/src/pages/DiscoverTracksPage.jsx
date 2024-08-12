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
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="w-full flex justify-center pt-8">
          <TrackInput />
        </div>
        <div className="pl-6 flex justify-center pt-4">
          <SelectedTrackCard />
        </div>
      </div>
      <div className="w-full flex justify-center items-center h-[calc(100svh-250px)]">
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
    </div>
  );
};

export default DiscoverTracks;
