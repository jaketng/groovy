import axios from "axios";

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
};

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // Navigate to homepage
  window.location = window.location.origin;
};

/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
  const expireTime = parseInt(LOCALSTORAGE_VALUES.expireTime, 10);
  const timestamp = parseInt(LOCALSTORAGE_VALUES.timestamp, 10);
  const millisecondsElapsed = Date.now() - timestamp;
  return millisecondsElapsed / 1000 > expireTime;
};

/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in our Node app, then update values in localStorage with data from response.
 * @returns {void}
 */
const refreshToken = async () => {
  try {
    const refreshToken = LOCALSTORAGE_VALUES.refreshToken;

    // Logout if there's no refresh token stored
    if (!refreshToken) {
      console.error("No refresh token available");
      logout();
      return;
    }

    // Use `/refresh_token` endpoint from our Node app
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${refreshToken}`
    );

    // Update localStorage values
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    );
    window.localStorage.setItem(LOCALSTORAGE_KEYS.expireTime, data.expires_in);
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    // Update axios header
    axios.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;
  } catch (e) {
    console.error("Error refreshing token:", e);
    logout();
  }
};

/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accessTokenFromUrl = urlParams.get("access_token");
  const refreshTokenFromUrl = urlParams.get("refresh_token");
  const expireTimeFromUrl = urlParams.get("expires_in");
  const hasError = urlParams.get("error");

  // If there's an error, log out
  if (hasError) {
    console.error("Spotify API Error:", hasError);
    logout();
    return false;
  }

  // If the access token has expired, refresh it
  if (hasTokenExpired()) {
    refreshToken();
    return false;
  }

  // If there is a valid access token in localStorage, use that
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there is a token in the URL query params, user is logging in for the first time
  if (accessTokenFromUrl) {
    // Store the query params in localStorage
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      accessTokenFromUrl
    );
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.refreshToken,
      refreshTokenFromUrl
    );
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.expireTime,
      expireTimeFromUrl
    );
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    // Return access token from query params
    return accessTokenFromUrl;
  }

  // We should never get here!
  return false;
};

export const accessToken = getAccessToken();

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";

/**
 * Get recommended tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 * @returns {Promise}
 */
export const getRecommendations = async (seedTrackId) => {
  try {
    const response = await axios.get("/recommendations", {
      params: {
        limit: 100,
        seed_tracks: seedTrackId,
      },
    });
    return response.data.tracks;
  } catch (error) {
    console.error("Error fetching recommended tracks:", error);
    return [];
  }
};

/**
 * Get track details
 * https://developer.spotify.com/documentation/web-api/reference/get-track
 * @returns {Promise}
 */
export const getTrackDetails = async (trackId) => {
  try {
    const response = await axios.get(`/tracks/${trackId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching track details:", error);
    return null;
  }
};

/**
 * Ensure all recommended tracks have preview URLs
 * @returns {Promise}
 */
export const getRecsWithPreviewUrls = async (seedTrackId) => {
  const recommendedTracks = await getRecommendations(seedTrackId);

  const tracksWithPreviews = await Promise.all(
    recommendedTracks.map(async (track) => {
      if (!track.preview_url) {
        const fullTrackDetails = await getTrackDetails(track.id);
        return fullTrackDetails;
      }
      return track;
    })
  );

  return tracksWithPreviews;
};

/**
 * Add track to user's library
 * https://developer.spotify.com/documentation/web-api/reference/save-tracks-user/
 * @param {string} trackId - The ID of the track to add
 * @returns {Promise}
 */
export const addToLibrary = async (trackId) => {
  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Error adding track to library:", error);
    return false;
  }
};

/**
 * Check if a track is in the user's library
 * https://developer.spotify.com/documentation/web-api/reference/check-user-library-contains-tracks/
 * @param {string} trackId - The ID of the track to check
 * @returns {Promise<boolean>}
 */
export const checkTrackInLibrary = async (trackId) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data[0]; // true if the track is in the library, false otherwise
  } catch (error) {
    console.error("Error checking track in library:", error);
    return false;
  }
};

/**
 * Search for tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-search/
 * @param {string} query - The search query
 * @returns {Promise<object[]>} - An array of track objects
 */
export const getSearch = async (query) => {
  try {
    const response = await axios.get("/search", {
      params: {
        q: query,
        type: "track",
        limit: 20,
      },
    });
    // Extract track items from the response
    return response.data.tracks.items;
  } catch (error) {
    console.error("Error searching for tracks:", error);
    return [];
  }
};

/**
 * Add a track to a playlist
 * https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist/
 * @param {string} playlistId - The ID of the playlist
 * @param {string} trackUri - The URI of the track to add
 * @returns {Promise<void>}
 */
export const addTrackToPlaylist = async (playlistId, trackUri) => {
  try {
    await axios.post(`/playlists/${playlistId}/tracks`, {
      uris: [trackUri],
    });
  } catch (error) {
    console.error("Error adding track to playlist:", error);
  }
};
