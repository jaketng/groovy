import { Routes, Route } from "react-router-dom";
import InputTrackPage from "../pages/InputTrackPage.jsx";
import DisoverTracksPage from "../pages/DiscoverTracksPage.jsx";
import LikedTracksPage from "../pages/LikedTracksPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<InputTrackPage />} />
      <Route path={"/discover-tracks"} element={<DisoverTracksPage />} />
      <Route path={"/liked-tracks"} element={<LikedTracksPage />} />
    </Routes>
  );
};

export default AppRoutes;
