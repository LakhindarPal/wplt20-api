import { loadHTML } from "../utils/loadHTML.js";
import { AutoRouter } from "itty-router";

const router = AutoRouter({ base: "/photos" });

router.get("/", async () => {
  const $ = await loadHTML(`/photos`);
  const articles = $(".article-content");

  const data = articles
    .map((_index, element) => ({
      thumbnail: $(element)
        .find(".social-share")
        .attr("data-img")
        .split("?")[0],
      title: $(element).find(".social-share").attr("data-title"),
      date: $(element).find(".meta-date span").text(),
      url: $(element).find(".social-share").attr("data-url"),
    }))
    .get();

  return data;
});

router.get("/:slug", async ({ slug }) => {
  const $ = await loadHTML(`/photos/${slug}`);

  const data = {
    title: $("h1.title").text(),
    date: $(".meta-date").text(),
    count: Number($(".meta-count").text()),
    url: "https://www.wplt20.com/photos" + slug,
    photos: $(".article-thumbnail img")
      .map((_i, el) => $(el).attr("data-src"))
      .get(),
  };

  return data;
});

export default router;
