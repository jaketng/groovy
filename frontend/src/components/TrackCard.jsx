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
                className="rounded-lg h-auto"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      {/* ellipsis */}
                      <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                    </svg>
                  </div>

                  <div className="w-12 fill-primary mr-4 -mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                    >
                      {/* spotify logo */}
                      <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
                    </svg>
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
                        Add to Your Library
                      </button>
                    )}
                  </li>
                  <li>
                    <a>
                      <a
                        href={spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button>Open in Spotify</button>
                      </a>
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
                  <svg
                    className="h-8 fill-current m-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    {/* back button */}
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
