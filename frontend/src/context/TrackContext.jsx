import React, { createContext, useContext, useReducer } from "react";
import { trackReducer, ACTIONS } from "./trackReducer";

const TrackContext = createContext();

const initialState = {
  likedTracks: [],
  currentTrack: null,
  currentTrackIndex: 0,
  recommendedTracks: [],
};

const TrackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trackReducer, initialState);

  const addLikedTrack = (track) => {
    dispatch({ type: ACTIONS.ADD_LIKED_TRACK, payload: track });
  };

  const removeLikedTrack = (trackId) => {
    dispatch({ type: ACTIONS.REMOVE_LIKED_TRACK, payload: { trackId } });
  };

  const setRecommendedTracks = (tracks) => {
    dispatch({ type: ACTIONS.SET_RECOMMENDED_TRACKS, payload: tracks });
  };

  const setCurrentTrack = (track) => {
    dispatch({ type: ACTIONS.SET_CURRENT_TRACK, payload: track });
  };

  const setCurrentTrackIndex = (index) => {
    dispatch({ type: ACTIONS.SET_CURRENT_TRACK_INDEX, payload: index });
  };

  return (
    <TrackContext.Provider
      value={{
        state,
        removeLikedTrack,
        addLikedTrack,
        setCurrentTrack,
        setCurrentTrackIndex,
        setRecommendedTracks,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

const useTrack = () => {
  return useContext(TrackContext);
};

export { TrackProvider, useTrack };
