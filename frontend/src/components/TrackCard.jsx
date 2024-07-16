import React, { useEffect, useState } from "react";
import AudioControls from "./AudioControls";
import { addToLibrary, checkTrackInLibrary } from "../services/spotifyService";

const TrackCard = ({
  track,
  currentTrack,
  setCurrentTrack,
  handleLike,
  handlePass,
  currentTrackIndex,
  handleGoBack,
}) => {
  const [isInLibrary, setIsInLibrary] = useState(false);
  const artistNames = track.artists.map((artist) => artist.name).join(", ");
  const albumImageUrl = track.album.images[0]?.url; // Ensure the track has an album image
  const spotifyUrl = track.external_urls.spotify; // Get the Spotify URL for the track

  // Check if the track is in the library when the component mounts
  useEffect(() => {
    const checkLibraryStatus = async () => {
      const isInLibrary = await checkTrackInLibrary(track.id);
      setIsInLibrary(isInLibrary);
    };

    checkLibraryStatus();
  }, [track.id]);

  const handleAddToLibrary = async () => {
    if (isInLibrary) return; // Do nothing if the track is already in the library

    const success = await addToLibrary(track.id);
    if (success) {
      setIsInLibrary(true);
    } else {
      alert("Failed to add track to your library.");
    }
  };

  return (
    <>
      <div className="card w-96 shadow-xl bg-neutral p-4 text-neutral-content">
        <div>
          {albumImageUrl && (
            <div className="pb-4">
              <img
                src={albumImageUrl}
                alt={`${track.name} album cover`}
                className="rounded-lg"
              />
            </div>
          )}
          <div className="border-red-500 border-2">
            <div className="flex flex-row justify-between border-2 border-orange-500">
              <div className="gap-2 flex flex-col">
                <p className="card-title">{track.name}</p>
                <p>{artistNames}</p>
              </div>
              <div>
                <p>...</p>
                {/* {spotifyUrl && (
                  <a
                    href={spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>Open in Spotify</button>
                  </a>
                )}
                {isInLibrary ? (
                  <button disabled>Added to Library</button>
                ) : (
                  <button onClick={handleAddToLibrary}>
                    Add to User Library
                  </button>
                )} */}
              </div>
            </div>

            <div className="border-2 border-green-500 relative">
              <div className="absolute h-full flex w-1/4 justify-center left-0">
                <button
                  onClick={handleGoBack}
                  className={
                    currentTrackIndex >> 0 ? "" : "btn-disabled opacity-50"
                  }
                >
                  <svg
                    className="h-8 fill-current m-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={handleLike}>SKIP</button>
                <AudioControls
                  track={track}
                  currentTrack={currentTrack}
                  setCurrentTrack={setCurrentTrack}
                />
                <button onClick={handlePass}>LIKE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackCard;
