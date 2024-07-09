import { useRef, useEffect, useState } from "react";

const AudioControls = ({ currentTrack, setCurrentTrack, track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    if (track.id === currentTrack?.id) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentTrack, isPlaying, track.id]);

  const togglePlayPause = () => {
    if (track.id === currentTrack?.id) {
      setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <>
      <button onClick={togglePlayPause}>{isPlaying ? "PAUSE" : "PLAY"}</button>
      <audio
        ref={audioRef}
        src={track.preview_url}
        onEnded={() => setIsPlaying(false)}
      />
    </>
  );
};

export default AudioControls;
