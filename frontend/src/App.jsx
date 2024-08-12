import Navbar from "./components/Navbar.jsx";
import AppRoutes from "./routes/Routes.jsx";
import SpotifyLoginPage from "./pages/SpotifyLoginPage.jsx";
import { useState, useEffect } from "react";
import { accessToken, logout } from "./services/spotifyService.js";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <>
      {!token ? (
        <SpotifyLoginPage />
      ) : (
        <div className="h-[100svh] w-[100svw] overflow-hidden">
          <button
            className="btn bg-spotify hover:bg-spotify-accent text-black fixed"
            onClick={logout}
          >
            Log out
          </button>

          <AppRoutes />

          <Navbar />
        </div>
      )}
    </>
  );
};

export default App;
