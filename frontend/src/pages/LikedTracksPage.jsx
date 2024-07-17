import { useTrack } from "../context/TrackContext.jsx";
import { Link } from "react-router-dom";

const LikedTracksPage = () => {
  const { state } = useTrack();
  const likedTracks = state.likedTracks || [];
  const placeholder = true;

  return (
    <div className="flex flex-col justify-center">
      {placeholder ? (
        <div
          className="playlist-container w-full neutral flex justify-center items-center box-border"
          style={{ height: "calc(100vh - 80px)" }}
        >
          <iframe
            className="w-2/3 h-full"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/3MlarOb8BzfkyaTnMTV7fn?utm_source=generator"
            frameBorder="0"
            allowFullScreen="true"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      ) : (
        <div className="flex flex-col m-auto pt-20">
          <p className="text-3xl">You have no liked tracks!</p>
          <Link to="/" className="btn btn-link">
            Find New Tracks Here
          </Link>
        </div>
      )}
    </div>
  );
};

export default LikedTracksPage;
