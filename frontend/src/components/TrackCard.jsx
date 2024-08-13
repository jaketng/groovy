import React, { useEffect, useState } from "react";
import AudioControls from "./AudioControls";
import { addToLibrary, checkTrackInLibrary } from "../services/spotifyService";
import { useTrack } from "../context/TrackContext";
import {
  EllipsisIcon,
  SpotifyIcon,
  BackButtonIcon,
} from "../assets/ComponentIcons";

const TrackCard = ({ handleLike, handlePass, handleGoBack }) => {
  const [isInLibrary, setIsInLibrary] = useState(false);
  const {
    state: { currentTrackIndex, currentTrack: track },
  } = useTrack();

  const artistNames = track.artists.map((artist) => artist.name).join(", ");
  const albumImageUrl = track.album.images[0]?.url; // Ensure the track has an album image
  const spotifyUrl = track.external_urls.spotify; // Get the Spotify URL for the track
  const artistUrl = track.artists[0]?.external_urls.spotify;

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
      <div className="card w-11/12 max-w-96 h-full max-h-[550px] overflow-hidden bg-neutral p-4 text-neutral-content">
        <div className="flex flex-col h-full">
          {albumImageUrl && (
            <div className="pb-4 pt-4 items-center h-2/3 flex justify-center overflow-hidden">
              <img
                src={albumImageUrl}
                alt={`${track.name} album cover`}
                className="object-cover max-h-full max-w-full"
              />
            </div>
          )}
          <div>
            <div className="flex flex-row justify-between pt-2 pl-4">
              <div className="gap-2 flex flex-col w-full">
                <p className="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis mr-4 hover:underline">
                  <a
                    href={spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {track.name}
                  </a>
                </p>
                <p className="text-xl whitespace-nowrap overflow-hidden text-ellipsis hover:underline">
                  <a href={artistUrl} target="_blank" rel="noopener noreferrer">
                    {artistNames}
                  </a>
                </p>
              </div>
            </div>

            <div className="relative mt-4">
              <div className="absolute h-full flex w-1/4 justify-center left-0">
                <button
                  onClick={handleGoBack}
                  className={
                    currentTrackIndex >> 0 ? "" : "btn-disabled opacity-20"
                  }
                >
                  <BackButtonIcon />
                </button>
              </div>

              <div className="flex justify-center gap-6">
                <button onClick={handlePass}>SKIP</button>
                <AudioControls />
                <button onClick={handleLike}>LIKE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackCard;
