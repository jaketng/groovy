import { Routes, Route } from "react-router-dom";
import DiscoverTracksPage from "../pages/DiscoverTracksPage.jsx";
import LikedTracksPage from "../pages/LikedTracksPage.jsx";
import SpotifyLoginPage from "../pages/SpotifyLoginPage.jsx";
import { ProfilePage } from "../pages/ProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<DiscoverTracksPage />} />
      <Route path={"/login"} element={<SpotifyLoginPage />} />
      <Route
        path={"/discover-tracks"}
        element={<ProtectedRoute element={<DiscoverTracksPage />} />}
      />
      <Route
        path={"/liked-tracks"}
        element={<ProtectedRoute element={<LikedTracksPage />} />}
      />
      <Route
        path={"/profile"}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
