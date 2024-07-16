import { useRef, useEffect, useState } from "react";

const AudioControls = ({ currentTrack, setCurrentTrack, track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    if (track.id === currentTrack?.id) {
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
      <button
        onClick={togglePlayPause}
        className="btn-primary btn btn-circle btn-lg"
      >
        {isPlaying ? (
          // pause button
          <svg
            className="swap-on h-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z" />
          </svg>
        ) : (
          // play button
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
        )}
      </button>
      <audio
        ref={audioRef}
        src={track.preview_url}
        onEnded={() => setIsPlaying(false)}
      />
    </>
  );
};

export default AudioControls;
