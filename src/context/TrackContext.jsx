import React, { createContext, useContext, useReducer } from "react";
import { trackReducer, ACTIONS } from "./trackReducer";

const TrackContext = createContext();

const initialState = {
  likedTracks: [],
  currentTrack: null,
};

const TrackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trackReducer, initialState);

  const addLikedTrack = (track) => {
    dispatch({ type: ACTIONS.ADD_LIKED_TRACK, payload: track });
  };

  const removeLikedTrack = (trackId) => {
    dispatch({ type: ACTIONS.REMOVE_LIKED_TRACK, payload: { trackId } });
  };

  const updateCurrentTrack = (track) => {
    dispatch({ type: ACTIONS.SET_CURRENT_TRACK, payload: { track } });
  };

  return (
    <TrackContext.Provider
      value={{ state, removeLikedTrack, addLikedTrack, updateCurrentTrack }}
    >
      {children}
    </TrackContext.Provider>
  );
};

const useTrack = () => {
  return useContext(TrackContext);
};

export { TrackProvider, useTrack };
