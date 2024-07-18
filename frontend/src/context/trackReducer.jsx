const ACTIONS = {
  ADD_LIKED_TRACK: "ADD_LIKED_TRACK",
  REMOVE_LIKED_TRACK: "REMOVE_LIKED_TRACK",
  SET_CURRENT_TRACK: "SET_CURRENT_TRACK",
  SET_RECOMMENDED_TRACKS: "SET_RECOMMENDED_TRACKS",
  SET_CURRENT_TRACK_INDEX: "SET_CURRENT_TRACK_INDEX",
};

const trackReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_LIKED_TRACK:
      return { ...state, likedTracks: [...state.likedTracks, action.payload] };
    case ACTIONS.REMOVE_LIKED_TRACK:
      return {
        ...state,
        likedTracks: state.likedTracks.filter(
          (track) => track.id !== action.payload.trackId
        ),
      };
    case ACTIONS.SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload,
      };
    case ACTIONS.SET_RECOMMENDED_TRACKS:
      return {
        ...state,
        recommendedTracks: action.payload,
      };
    case ACTIONS.SET_CURRENT_TRACK_INDEX:
      return {
        ...state,
        currentTrackIndex: action.payload,
      };
    default:
      return state;
  }
};

export { trackReducer, ACTIONS };
