import { createContext, useContext } from "react";
import { trackReducer } from "./trackReducer";

const TrackContext = createContext();

const initialState = {
  likedTracks: [],
  currentTrack: null,
};

const TrackProvder = ({ children }) => {
  const [state, dispatch] = useReducer(trackReducer, initialState);
  return <TrackContext.Provider value={{}}>{children}</TrackContext.Provider>;
};

export const useTrack = () => {
  return useContext(TrackContext);
};
