import { useRef, useEffect, useState } from "react";

const AudioControls = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack ? currentTrack.preview_url : "";
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <button onClick={togglePlayPause}>{isPlaying ? "PAUSE" : "PLAY"}</button>
      <audio ref={audioRef} />
    </>
  );
};

export default AudioControls;
