import React, { useEffect, useState } from "react";
import AudioControls from "./AudioControls";
import { addToLibrary, checkTrackInLibrary } from "../services/spotifyService";

const TrackCard = ({ track, currentTrack, setCurrentTrack, index }) => {
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
      {albumImageUrl && (
        <img src={albumImageUrl} alt={`${track.name} album cover`} />
      )}
      <h2>{track.name}</h2>
      <h4>{artistNames}</h4>
      <h4>{index}</h4>
      <AudioControls
        track={track}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
      />
      {spotifyUrl && (
        <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">
          <button>Open in Spotify</button>
        </a>
      )}
      {isInLibrary ? (
        <button disabled>Added to Library</button>
      ) : (
        <button onClick={handleAddToLibrary}>Add to User Library</button>
      )}
    </>
  );
};

export default TrackCard;
