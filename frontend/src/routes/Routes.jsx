import { Routes, Route } from "react-router-dom";
import InputTrackPage from "../pages/InputTrackPage.jsx";
import DisoverTracksPage from "../pages/DiscoverTracksPage.jsx";
import LikedTracksPage from "../pages/LikedTracksPage.jsx";
import SpotifyLoginPage from "../pages/SpotifyLoginPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<InputTrackPage />} />
      {<Route path={"/login"} element={<SpotifyLoginPage />} />}
      <Route path={"/discover-tracks"} element={<DisoverTracksPage />} />
      <Route path={"/liked-tracks"} element={<LikedTracksPage />} />
    </Routes>
  );
};

export default AppRoutes;
