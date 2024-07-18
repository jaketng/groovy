import { useRef, useEffect, useState } from "react";
import { useTrack } from "../context/TrackContext";
import { PlayIcon, PauseIcon } from "../assets/ComponentIcons";

const AudioControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    state: { currentTrack },
  } = useTrack();
  const audioRef = useRef();

  useEffect(() => {
    if (currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(true);
        });
      } else {
        audioRef.current.pause();
      }
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [currentTrack, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <>
      <button
        onClick={togglePlayPause}
        className="btn-primary btn btn-circle btn-lg"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <audio
        ref={audioRef}
        src={currentTrack?.preview_url}
        onEnded={() => setIsPlaying(false)}
      />
    </>
  );
};

export default AudioControls;
