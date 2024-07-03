export const ACTIONS = {
  ADD_LIKED_TRACK: "ADD_LIKED_TRACK",
  REMOVE_LIKED_TRACK: "REMOVE_LIKED_TRACK",
  SET_CURRENT_TRACK: "SET_CURRENT_TRACK",
};

const trackReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_LIKED_TRACK:
      return { ...state, likedTacks: [...state.likedTacks, action.payload] };
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
        currentTrack: action.payload.track,
      };
    default:
      state;
  }
};

export default trackReducer;
