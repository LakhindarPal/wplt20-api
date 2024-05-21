import { loadHTML } from "../utils/loadHTML.js";
import { AutoRouter } from "itty-router";

const base = "https://www.wplt20.com";

const router = AutoRouter({ base: "/stats" });

router.get("/", async () => {
  const $ = await loadHTML(`/stats`);
  const data = [];
  const sections = $(".card-section");

  sections.each((_index, section) => {
    const title = $(section).find(".card-title").text();
    const cards = $(section).find(".card-item");

    cards.each((_idx, element) => {
      data.push({
        title,
        subtitle: $(element).find(".card-subtitle").text(),
        thumbnail: base +
          $(element).find(".card-thumbnail img").attr("src").split("?")[0],
        logo: base +
          $(element).find(".card-logo img").attr("src").split("?")[0],
        name: {
          first: $(element).find(".card-name .fname").text(),
          last: $(element).find(".card-name .lname").text(),
        },
        label: $(element).find(".card-label").text(),
        points: $(element).find(".card-points .number").text(),
        players: $(element)
          .find(".item")
          .map((_i, el) => ({
            logo: base + $(el).find(".item-img img").attr("src").split("?")[0],
            name: {
              first: $(el).find(".item-name .fname").text(),
              last: $(el).find(".item-name .lname").text(),
            },
            points: $(el).find(".item-number .text").text(),
          }))
          .get(),
        url: base + $(element).find(".card-footer a").attr("href"),
      });
    });
  });

  return data;
});

router.get("/:slug", async ({ slug }) => {
  const $ = await loadHTML(`/stats/${slug}`);
  const data = [];

  $(".table-left .table-body .table-row").each((index, element) => {
    const leftDiv = $(element);
    const rightDiv = $(".table-right .table-body .table-row").eq(index);

    const stats = {
      position: leftDiv.find(".position").text(),
      logo: base + leftDiv.find("img").attr("src").split("?")[0],
      name: {
        full: leftDiv.find(".name").text(),
      },
      mat: rightDiv.find(".played-matches span").text(),
      inns: rightDiv.find(".table-data:eq(1)").text(),
      no: rightDiv.find(".table-data:eq(2)").text(),
      runs: rightDiv.find(".runs span").text(),
      hs: rightDiv.find(".highest-score span").text(),
      avg: rightDiv.find(".average span").text(),
      sr: rightDiv.find(".strike-rate span").text(),
      "100s": rightDiv.find(".100s span").text(),
      "50s": rightDiv.find(".50s span").text(),
      "4s": rightDiv.find(".4s span").text(),
      "6s": rightDiv.find(".6s span").text(),
    };

    data.push(stats);
  });

  return data;
});

export default router;
