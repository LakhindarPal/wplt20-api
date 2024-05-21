import { loadHTML } from "../utils/loadHTML.js";
import { AutoRouter } from "itty-router";

const base = "https://www.wplt20.com";

const router = AutoRouter({ base: "/matches" });

router.get("/", async () => {
  const $ = await loadHTML("/schedule-fixtures-results");

  const data = $(".card-item")
    .map((_index, element) => ({
      id: $(element).attr("data-game-id"),
      number: $(element).attr("data-match-number"),
      dtstart: $(element).find(".dtstart").text(),
      dtend: $(element).find(".dtend").text(),
      date: $(element).find(".meta.date").text().trim(),
      time: $(element).find(".meta.time").text().trim(),
      title: {
        full: $(element).find(".card-report a").attr("data-title"),
        short: $(element).find(".card-report a").attr("data-title-short"),
      },
      url: base + $(element).find(".card-report a").attr("href"),
      teams: $(element)
        .find(".team")
        .map((_i, el) => ({
          name: $(el).find(".team-image img").attr("alt"),
          logo: base +
            $(el).find(".team-image img").attr("data-src").split("?")[0],
          score: $(el).find(".score").text().trim(),
          overs: $(el)
            .find(".overs")
            .text()
            .replace(/\((.*)\)/, "$1"),
          won: $(el).hasClass("team-won"),
        }))
        .get(),
      venue: $(element).find(".card-venue").text().trim(),
      result: $(element).find(".card-footer-text").text().trim(),
    }))
    .get();

  return data;
});

export default router;
