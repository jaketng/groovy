const SpotifyLoginPage = () => {
  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:8888/login";
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <p className="text-2xl pb-4">Spotify Login Page</p>
      <button
        onClick={handleSpotifyLogin}
        className="btn bg-spotify hover:bg-spotify-accent text-black"
        //className="btn btn-secondary"
      >
        Login
      </button>
    </div>
  );
};

export default SpotifyLoginPage;
