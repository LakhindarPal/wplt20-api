import { loadHTML } from "../utils/loadHTML.js";
import { AutoRouter } from "itty-router";

const base = "https://www.wplt20.com";

const router = AutoRouter({ base: "/points" });

router.get("/", async () => {
  const $ = await loadHTML("/points-table-standings");

  const data = $(".table-row-head")
    .map((_index, element) => ({
      logo: base + $(element).find(".team-image img").attr("src").split("?")[0],
      title: {
        full: $(element).find(".team-name .full-name").text(),
        short: $(element)
          .find(".team-name .short-name")
          .text()
          .replace(" (Q)", ""),
      },
      played: $(element).find(".matches-play p").text(),
      won: $(element).find(".matches-won p").text(),
      lost: $(element).find(".matches-lost p").text(),
      nrr: $(element).find(".matches-nr p").text(),
      form: $(element).find(".form-guide-listing").text().trim(),
      points: $(element).find(".points p").text(),
    }))
    .get();

  return data;
});

export default router;
