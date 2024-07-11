const SpotifyLoginPage = () => {
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:5173/spotify/login";
  };

  return (
    <>
      <h1>Spotify Login Page</h1>
      <button onClick={handleSpotifyLogin}>Login</button>
    </>
  );
};

export default SpotifyLoginPage;
