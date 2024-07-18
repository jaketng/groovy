import React, { createContext, useContext, useReducer } from "react";
import { trackReducer, ACTIONS } from "./trackReducer";

const TrackContext = createContext();

const initialState = {
  likedTracks: [],
  currentTrack: null,
  currentTrackIndex: 0,
  recommendedTracks: [],
  selectedTrack: null, // New state for selected track
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

  const setSelectedTrack = (track) => {
    // Action to set selected track
    dispatch({ type: ACTIONS.SET_SELECTED_TRACK, payload: track });
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
        setSelectedTrack,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

const useTrack = () => {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error("useTrack must be used within a TrackProvider");
  }
  return context;
};

export { TrackProvider, useTrack };
