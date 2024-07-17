import TrackInput from "../components/TrackInput";
import TrackCard from "../components/TrackCard.jsx";
import { useEffect, useState } from "react";
import { useTrack } from "../context/TrackContext.jsx";

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

  const handleLike = () => {
    if (currentTrack && !likedTracks.includes(currentTrack.id)) {
      addLikedTrack(currentTrack);
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
    <div className="flex justify-left gap-20 pt-20">
      <div className="pl-20 pt-2">
        <TrackInput />
      </div>
      <div className="">
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
            {currentTrackIndex === 0 ? (
              <></>
            ) : (
              <>
                <p>
                  Enter another track or{" "}
                  <button
                    className="btn btn-link p-0 m-0 align-baseline"
                    onClick={handleGoBack}
                  >
                    go back
                  </button>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DiscoverTracks;
