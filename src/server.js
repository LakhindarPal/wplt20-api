import docs from "./routes/docs.js";
import matches from "./routes/matches.js";
import news from "./routes/news.js";
import photos from "./routes/photos.js";
import players from "./routes/players.js";
import points from "./routes/points.js";
import stats from "./routes/stats.js";
import teams from "./routes/teams.js";
import videos from "./routes/videos.js";

import { AutoRouter } from "itty-router";

const router = AutoRouter();

router
  .get("/", docs.fetch)
  .get("/matches/*", matches.fetch)
  .get("/news/*", news.fetch)
  .get("/photos/*", photos.fetch)
  .get("/players/:slug", players.fetch)
  .get("/points", points.fetch)
  .get("/stats/*", stats.fetch)
  .get("/teams/*", teams.fetch)
  .get("/videos/*", videos.fetch);

Deno.serve(router.fetch);
