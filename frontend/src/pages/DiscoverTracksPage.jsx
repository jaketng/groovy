import TrackInput from "../components/TrackInput";
import TrackCard from "../components/TrackCard.jsx";
import { useEffect, useState } from "react";
import { useTrack } from "../context/TrackContext.jsx";
import { addTrackToPlaylist } from "../services/spotifyService.js";

const DiscoverTracks = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const { state, addLikedTrack, setRecommendedTracks } = useTrack();
  const { recommendedTracks, likedTracks } = state;
  const [currentTrack, setCurrentTrack] = useState(null);

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
      await addTrackToPlaylist("3MlarOb8BzfkyaTnMTV7fn", currentTrack.uri);
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    } else {
      alert("Track already liked");
    }
  };

  const handlePass = () => {
    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
  };

  const handleGoBack = () => {
    if (currentTrackIndex === 0) {
      alert("Can't go further back");
    } else {
      setCurrentTrackIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="relative mt-20 flex w-2/3 m-auto">
      <div className="w-1/3">
        <TrackInput />
      </div>
      <div className="flex justify-left w-full pl-20">
        {console.log(currentTrackIndex)}
        {console.log(recommendedTracks)}
        {currentTrack ? (
          <>
            <TrackCard
              track={currentTrack}
              currentTrack={currentTrack}
              handleLike={handleLike}
              handlePass={handlePass}
              currentTrackIndex={currentTrackIndex}
              handleGoBack={handleGoBack}
            />
          </>
        ) : (
          <>
            {currentTrackIndex !== 0 && (
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
