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
          <Navbar />
          <button onClick={logout}>Log out</button>
          <AppRoutes />
        </>
      )}
    </>
  );
};

export default App;
