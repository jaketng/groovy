import React, { createContext, useContext, useReducer, useEffect } from "react";
import { trackReducer, ACTIONS } from "./trackReducer";
import {
  getRecsWithPreviewUrls,
  getRecentlyLikedTrack,
  getTrackDetails,
} from "../services/spotifyService";

const TrackContext = createContext();

const initialState = {
  likedTracks: [],
  currentTrack: null,
  currentTrackIndex: 0,
  recommendedTracks: [],
  selectedTrack: null,
};

const TrackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trackReducer, initialState);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Check if selected track ID exists in local storage
        const storedTrackId = localStorage.getItem("selectedTrackId");
        let selectedTrack = null;

        if (storedTrackId) {
          // Fetch selected track details from API if ID exists
          selectedTrack = await getTrackDetails(storedTrackId); // Implement getTrackDetails as per your SpotifyService
        } else {
          // Fetch recently liked track
          const recentlyLikedTrack = await getRecentlyLikedTrack();
          if (recentlyLikedTrack) {
            selectedTrack = recentlyLikedTrack;
            localStorage.setItem("selected_track_id", selectedTrack.id); // Store selected track ID in local storage
          }
        }

        if (selectedTrack) {
          dispatch({
            type: ACTIONS.SET_SELECTED_TRACK,
            payload: selectedTrack,
          });

          // Fetch recommendations if selected track is set
          const recTracks = await getRecsWithPreviewUrls(selectedTrack.id);
          dispatch({
            type: ACTIONS.SET_RECOMMENDED_TRACKS,
            payload: recTracks,
          });
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []); // Empty dependency array ensures it runs only once on mount

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
    dispatch({ type: ACTIONS.SET_SELECTED_TRACK, payload: track });
    localStorage.setItem("selected_track_id", track.id); // Update selected track ID in local storage
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
