const SpotifyLoginPage = () => {
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:8888/login";
  };

  return (
    <>
      <h1>Spotify Login Page</h1>
      <button onClick={handleSpotifyLogin}>Login</button>
    </>
  );
};

export default SpotifyLoginPage;
