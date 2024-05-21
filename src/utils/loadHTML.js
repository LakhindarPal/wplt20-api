import { load } from "cheerio";

async function loadHTML(path) {
  const res = await fetch(`https://www.wplt20.com${path}`);
  const html = await res.text();

  return load(html);
}

export { loadHTML };
