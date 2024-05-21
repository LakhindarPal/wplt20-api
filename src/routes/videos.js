import { loadHTML } from "../utils/loadHTML.js";
import { AutoRouter } from "itty-router";

const base = "https://www.wplt20.com";

const router = AutoRouter({ base: "/videos" });

router.get("/", async () => {
  const $ = await loadHTML(`/videos`);

  const keys = {
    VideosVideos: "latest",
    "Magic MomentsMagic Moments": "magic-moments",
    HighlightsHighlights: "match-highlights",
    "Press ConferencePress Conference": "press-conferences",
    InterviewsInterviews: "interviews",
    AuctionsAuctions: "auctions",
  };
  const data = {};

  $("section.waf-row:not(.waf-row-video-team)").each((_index, element) => {
    const heading = $(element).find(".head-wrap h2.title").text().trim();
    const more = base + $(element).find(`li a[title="View More"]`).attr("href");

    const videos = $(element)
      .find("article.article-item")
      .map((_i, el) => ({
        id: $(el).attr("data-video-id"),
        timestamp: $(el).attr("data-publish-date"),
        views: $(el).find(".view-count p.count").text().replace(" Views", ""),
        thumbnail: $(el)
          .find(".article-thumbnail img")
          .attr("data-src")
          .split("?")[0],
        duration: $(el).find(".timestamp p").text(),
        title: $(el).find(".article-title").text().trim(),
        date: $(el).find(".meta-date span").text(),
        url: $(el).find(".social-share").attr("data-url"),
      }))
      .get();

    data[keys[heading]] = { url: more, videos };
  });

  return data;
});

router.get(
  "/(latest|magic-moments|match-highlights|press-conferences|interviews|auctions)",
  async ({ url }) => {
    const regex =
      /\/(latest|magic-moments|match-highlights|press-conferences|interviews|auctions)/;
    const category = url.match(regex)[1];

    const $ = await loadHTML(`/videos/${category}`);

    const data = $("article.article-item")
      .map((_i, el) => ({
        id: $(el).attr("data-video-id"),
        timestamp: $(el).attr("data-publish-date"),
        views: $(el).find(".view-count p.count").text().replace("  Views", ""),
        thumbnail: $(el)
          .find(".article-thumbnail img")
          .attr("data-src")
          .split("?")[0],
        duration: $(el).find(".timestamp p").text(),
        title: $(el).find(".article-title").text().trim(),
        date: $(el).find(".meta-date span").text(),
        url: $(el).find(".social-share").attr("data-url"),
      }))
      .get();

    return data;
  },
);

router.get("/:slug", async ({ slug }) => {
  const $ = await loadHTML(`/videos/${slug}`);
  const element = $(".article-detail");
  const dateObj = new Date(element.find(".meta-date").text().trim());

  const data = {
    title: element.find("h1.title").text(),
    date: dateObj.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    timestamp: dateObj.toISOString().slice(0, 19),
    views: element.find(".views-section p.count").text().replace(" Views", ""),
    thumbnail: element.find(".social-share").attr("data-img").split("?")[0],
    url: element.find(".social-share").attr("data-url"),
    id: element.find("video").attr("data-video-id"),
    duration: element.find(".vjs-duration-display").text(),
  };

  return data;
});

export default router;
