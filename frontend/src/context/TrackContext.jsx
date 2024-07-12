import React, { useEffect, createContext, useContext, useReducer } from "react";
import { trackReducer, ACTIONS } from "./trackReducer";

const TrackContext = createContext();

const initialState = {
  likedTracks: [],
  currentTrack: null,
  recommendedTracks:
    JSON.parse(localStorage.getItem("recommendedTracks")) || [],
};

const TrackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trackReducer, initialState);

  useEffect(() => {
    localStorage.setItem(
      "recommendedTracks",
      JSON.stringify(state.recommendedTracks)
    );
  }, [state.recommendedTracks]);

  const addLikedTrack = (track) => {
    dispatch({ type: ACTIONS.ADD_LIKED_TRACK, payload: track });
  };

  const removeLikedTrack = (trackId) => {
    dispatch({ type: ACTIONS.REMOVE_LIKED_TRACK, payload: { trackId } });
  };

  const setRecommendedTracks = (tracks) => {
    dispatch({ type: "SET_RECOMMENDED_TRACKS", payload: tracks });
  };

  const updateCurrentTrack = (track) => {
    dispatch({ type: ACTIONS.SET_CURRENT_TRACK, payload: { track } });
  };

  return (
    <TrackContext.Provider
      value={{
        state,
        removeLikedTrack,
        addLikedTrack,
        updateCurrentTrack,
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
