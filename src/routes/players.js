import { loadHTML } from "../utils/loadHTML.js";
import { AutoRouter } from "itty-router";

const base = "https://www.wplt20.com";

const router = AutoRouter({ base: "/players" });

router.get("/:slug", async ({ slug }) => {
  const $ = await loadHTML(`/players/${slug}`);

  const data = {
    name: {
      first: $(".player-name .first-name").text(),
      last: $(".player-name .last-name").text(),
    },
    role: $(".player-role").text().trim(),
    country: $(".country-name").text(),
    overview: {},
    thumbnail: base + $(".player-thumbnail img").attr("src").split("?")[0],
    bio: $(".player-bio-wrap .content").text(),
    stats: {
      batting: processStats("batting"),
      bowling: processStats("bowling"),
    },
    url: `${base}/players/${slug}`,
  };

  $(".player-meta-list")
    .find(".player-meta-item")
    .each((_index, element) => {
      const [title, value] = $(element)
        .find(".player-meta-title, .player-meta-value")
        .map((_i, el) => $(el).text())
        .get();
      const key = title.toLowerCase().replace(/\s+/g, "-");

      data.overview[key] = value;
    });

  function processStats(category) {
    const stats = {};
    $(`.player-stats-category.${category}`)
      .find(".player-stats-item")
      .each((_index, element) => {
        const [title, count] = $(element)
          .find(".player-stats-title, .player-stats-count")
          .map((_i, el) => $(el).text().trim())
          .get();

        const key = title.toLowerCase().replace(/\s+/g, "-");
        stats[key] = count;
      });

    return stats;
  }

  return data;
});

export default router;
