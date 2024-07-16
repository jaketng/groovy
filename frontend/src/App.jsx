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
        <>
          <div className="flex h-fit p-4 justify-between bg-neutral">
            <Navbar />
            <button
              className="btn bg-spotify hover:bg-spotify-accent text-black"
              onClick={logout}
            >
              Log out
            </button>
          </div>

          <div className="flex justify-center flex-col">
            <AppRoutes />
          </div>
        </>
      )}
    </>
  );
};

export default App;
