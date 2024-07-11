import express from "express";
import spotifyRoutes from "./routes/spotifyRoutes.js";

const app = express();
app.use(express.json());

app.use("/spotify", spotifyRoutes);

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
