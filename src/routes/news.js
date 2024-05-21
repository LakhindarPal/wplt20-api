import { loadHTML } from "../utils/loadHTML.js";
import { AutoRouter } from "itty-router";

const router = AutoRouter({ base: "/news" });

router.get("/", async () => {
  const $ = await loadHTML(`/news`);
  const articles = $(".article-content");

  const data = articles
    .map((_index, element) => ({
      thumbnail: $(element)
        .find(".nuxt-listing .social-share")
        .attr("data-img")
        .split("?")[0],
      title: $(element).find(".nuxt-listing .social-share").attr("data-title"),
      description: $(element)
        .find(".nuxt-listing .social-share")
        .attr("data-desc"),
      date: $(element).find(".meta-date span").text(),
      url: $(element).find(".nuxt-listing .social-share").attr("data-url"),
    }))
    .get();

  return data;
});

router.get("/:slug", async ({ slug }) => {
  const $ = await loadHTML(`/news/${slug}`);

  const data = {
    thumbnail: $(".nuxt-detail .social-share").attr("data-img").split("?")[0],
    title: $(".nuxt-detail .social-share").attr("data-title"),
    description: $(".nuxt-detail .social-share").attr("data-desc"),
    url: $(".nuxt-detail .social-share").attr("data-url"),
    date: $(".meta-date span").text().trim(),
    content: $(".article-body").text().trim(),
    extract: $(".article-body").html(),
  };

  return data;
});

export default router;
