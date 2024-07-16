const SpotifyLoginPage = () => {
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:8888/login";
  };

  return (
    <>
      <h1>Spotify Login Page</h1>
      <button onClick={handleSpotifyLogin} className="bg-blue-500">
        Login
      </button>
    </>
  );
};

export default SpotifyLoginPage;
