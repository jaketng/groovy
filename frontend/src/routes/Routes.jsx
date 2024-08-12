import { Routes, Route } from "react-router-dom";
import DisoverTracksPage from "../pages/DiscoverTracksPage.jsx";
import LikedTracksPage from "../pages/LikedTracksPage.jsx";
import SpotifyLoginPage from "../pages/SpotifyLoginPage.jsx";
import { ProfilePage } from "../pages/ProfilePage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<DisoverTracksPage />} />
      {<Route path={"/login"} element={<SpotifyLoginPage />} />}
      <Route path={"/discover-tracks"} element={<DisoverTracksPage />} />
      <Route path={"/liked-tracks"} element={<LikedTracksPage />} />
      <Route path={"/profile"} element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
