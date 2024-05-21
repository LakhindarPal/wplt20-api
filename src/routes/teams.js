import { loadHTML } from "../utils/loadHTML.js";
import { AutoRouter } from "itty-router";

const base = "https://www.wplt20.com";

const router = AutoRouter({ base: "/teams" });

router.get("/", async () => {
  const $ = await loadHTML("/teams");
  const cards = $(".card-item");

  const data = cards
    .map((_index, element) => ({
      id: $(element)
        .attr("class")
        .match(/team-(\d+)/)[1],
      thumbnail: base +
        $(element).find(".card-thumbnail img").attr("src").split("?")[0],
      logo: base + $(element).find(".card-logo img").attr("src").split("?")[0],
      name: $(element).find(".card-name .fname").text() +
        " " +
        $(element).find(".card-name .lname").text(),
      url: base + $(element).find(".card-footer a").attr("href"),
    }))
    .get();

  return data;
});

router.get("/:slug", async ({ slug }) => {
  const $ = await loadHTML(`/teams/${slug}/squad`);
  const element = $(".card-item");

  const data = {
    id: $(element)
      .attr("class")
      .match(/team-(\d+)/)[1],
    name: $(element).find(".content-title").text(),
    thumbnail: base +
      $(element).find(".card-thumbnail img").attr("src").split("?")[0],
    owner: $(element)
      .find(`.card-content-item:contains("Team Owner") .text`)
      .text(),
    coach: $(element)
      .find(`.card-content-item:contains("Head Coach") .text`)
      .text(),
    captain: $(element)
      .find(`.card-content-item:contains("Captain") .text`)
      .text(),
    socials: $(element)
      .find(".social-links a")
      .map((_i, el) => $(el).attr("href"))
      .get(),
  };

  return data;
});

router.get("/:slug/squad", async ({ slug }) => {
  const $ = await loadHTML(`/teams/${slug}/squad`);

  const data = $(".squad-item")
    .map((_index, element) => ({
      name: {
        full: $(element).find(".player-wrap").attr("data-name"),
        first: $(element).find(".player-name .first-name").text(),
        last: $(element).find(".player-name .last-name").text(),
      },
      id: $(element).find(".player-wrap").attr("data-id"),
      thumbnail: base +
        $(element).find(".player-thumbnail img").attr("src").split("?")[0],
      role: $(element).find(".player-role .role").text(),
      overseas: $(element).parent().hasClass("overseas"),
      url: base + $(element).find(".card-action a").attr("href"),
    }))
    .get();

  return data;
});

export default router;
