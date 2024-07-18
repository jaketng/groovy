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
        <div className="">
          {albumImageUrl && (
            <div className="pb-4 h-96">
              <img
                src={albumImageUrl}
                alt={`${track.name} album cover`}
                className="rounded-lg"
              />
            </div>
          )}
          <div>
            <div className="flex flex-row justify-between">
              <div className="gap-2 flex flex-col w-9/12">
                <p className="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis mr-4">
                  {track.name}
                </p>
                <p className="text-xl whitespace-nowrap overflow-hidden text-ellipsis">
                  {artistNames}
                </p>
              </div>

              <div className="dropdown dropdown-right">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex flex-col transition-transform transform hover:scale-105"
                >
                  <div className="fill-neutral-content w-5 ml-auto pb-0 dropdown dropdown-right">
                    <EllipsisIcon />
                  </div>

                  <div className="w-12 fill-primary mr-4 -mt-2">
                    <SpotifyIcon />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-gray-800 rounded-r-lg z-[1] w-max p-2 ml-4 no-animation"
                >
                  <li>
                    {isInLibrary ? (
                      <button disabled>Added to Library</button>
                    ) : (
                      <button onClick={handleAddToLibrary}>
                        Add to Library
                      </button>
                    )}
                  </li>
                  <li>
                    <a
                      href={spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button>Open in Spotify</button>
                    </a>
                  </li>
                </ul>
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

              <div className="flex justify-center gap-4">
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
