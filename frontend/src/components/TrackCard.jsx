import React, { useEffect, useState } from "react";
import AudioControls from "./AudioControls";
import { addToLibrary, checkTrackInLibrary } from "../services/spotifyService";

const TrackCard = ({
  track,
  currentTrack,
  setCurrentTrack,
  handleLike,
  handlePass,
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
            <div className="border-2 border-green-500 flex justify-center gap-4">
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
    </>
  );
};

export default TrackCard;
