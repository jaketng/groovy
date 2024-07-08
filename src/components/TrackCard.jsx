const TrackCard = ({ track, handleLike, handlePass }) => {
  return (
    <>
      <h2>{track.name}</h2>
      <button onClick={handleLike}>LIKE</button>
      <button onClick={handlePass}>PASS</button>
    </>
  );
};

export default TrackCard;
