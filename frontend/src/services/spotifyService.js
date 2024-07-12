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
export const getTracks = async (seedTrackId) => {
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
