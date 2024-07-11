import { Router } from "express";
import querystring from "querystring";

const spotifyRouter = Router();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri =
  process.env.SPOTIFY_REDIRECT_URI || "http://localhost:5173/callback";

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

spotifyRouter.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    })}`
  );
});

export default spotifyRouter;
