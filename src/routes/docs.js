import { AutoRouter, html } from "itty-router";

const router = AutoRouter({ base: "/" });
const hostname = "https://wplt20.deno.dev";
router.get("/", () => {
  const doc = `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WPL API Documentation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
      }

      h1,
      h2,
      h3,
      footer {
        color: #333;
      }

      pre {
        background: #eee;
        padding: 10px;
        border-radius: 5px;
        text-wrap: balance;
      }

      code {
        font-family: monospace;
        color: #c7254e;
        background-color: #f9f2f4;
        padding: 2px 4px;
        border-radius: 3px;
      }

      footer {
        text-align: center;
      }
    </style>
  </head>

  <body>
    <header>
      <h1>Women's Premier League (WPL) API Documentation</h1>
    </header>
    <main>
      <p><strong>Base URL:</strong></p>
      <pre><code>${hostname}/</code></pre>
      <section>
        <h2>Endpoints</h2>
        <div>
          <article>
            <h3>1. Get Videos</h3>
            <p><strong>GET /videos</strong></p>
            <p>Returns a list of videos related to the Women's Premier League.</p>
            <pre><code>GET ${hostname}/videos</code></pre>
          </article>
          <article>
            <h3>2. Get Videos by Category</h3>
            <p><strong>GET /videos/:category</strong></p>
            <p>Returns videos belonging to a specific category within the Women's Premier League.</p>
            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>category</code>: The category of videos (e.g., latest, match-highlights, auctions, interviews, press-conferences, magic-moments).</li>
            </ul>
            <pre><code>GET ${hostname}/videos/match-highlights</code></pre>
          </article>
          <article>
            <h3>3. Get Specific Video</h3>
            <p><strong>GET /videos/:slug</strong></p>
            <p>Returns details of a specific video identified by its slug.</p>
            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>slug</code>: The slug identifier for the video.</li>
            </ul>
            <pre><code>GET ${hostname}/videos/top-moments-of-tata-wpl-2024-6349237512112</code></pre>
          </article>
          <article>
            <h3>4. Get Teams</h3>
            <p><strong>GET /teams</strong></p>
            <p>Returns a list of teams participating in the Women's Premier League.</p>
            <pre><code>GET ${hostname}/teams</code></pre>
          </article>
          <article>
            <h3>5. Get Team Details</h3>
            <p><strong>GET /teams/:slug</strong></p>
            <p>Returns details of a specific team identified by its slug.</p>
            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>slug</code>: The slug identifier for the team.</li>
            </ul>
            <pre><code>GET ${hostname}/teams/royal-challengers-bangalore-3513</code></pre>
          </article>
          <article>
            <h3>6. Get Team Squad</h3>
            <p><strong>GET /teams/:slug/squad</strong></p>
            <p>Returns the squad members of a specific team identified by its slug.</p>
            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>slug</code>: The slug identifier for the team.</li>
            </ul>
            <pre><code>GET ${hostname}/teams/royal-challengers-bangalore-3513/squad</code></pre>
          </article>
          <article>
            <h3>7. Get News</h3>
            <p><strong>GET /news</strong></p>
            <p>Returns news articles related to the Women's Premier League.</p>
            <pre><code>GET ${hostname}/news</code></pre>
          </article>
          <article>
            <h3>8. Get News Article Details</h3>
            <p><strong>GET /news/:slug</strong></p>
            <p>Returns details of a specific news article identified by its slug.</p>
            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>slug</code>: The slug identifier for the news article.</li>
            </ul>
            <pre><code>GET ${hostname}/news/match-report-tata-wpl-2024-final</code></pre>
          </article>
          <article>
            <h3>9. Get Photo Albums</h3>
            <p><strong>GET /photos</strong></p>
            <p>Returns a list of albums related to the Women's Premier League.</p>
            <pre><code>GET ${hostname}/photos</code></pre>
          </article>
          <article>
            <h3>10. Get Photos in Album</h3>
            <p><strong>GET /photos/:slug</strong></p>
            <p>Returns all photos of a specific album identified by its slug.</p>
            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>slug</code>: The slug identifier for the photo album.</li>
            </ul>
            <pre><code>GET ${hostname}/photos/tata-wpl-2024-final-delhi-capitals-vs-royal-challengers-bangalore</code></pre>
          </article>
          <article>
            <h3>11. Get Matches</h3>
            <p><strong>GET /matches</strong></p>
            <p>Returns a list of matches in the Women's Premier League.</p>
            <pre><code>GET ${hostname}/matches</code></pre>
          </article>
          <article>
            <h3>12. Get Player Details</h3>
            <p><strong>GET /players/:slug</strong></p>
            <p>Returns details of a specific player identified by its slug.</p>
            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>slug</code>: The slug identifier for the player.</li>
            </ul>
            <pre><code>GET ${hostname}/players/smriti-mandhana-wpl-profile-63992</code></pre>
          </article>
          <article>
            <h3>13. Get Points Table</h3>
            <p><strong>GET /points</strong></p>
            <p>Returns the points table of the Women's Premier League.</p>
            <pre><code>GET ${hostname}/points</code></pre>
          </article>
          <article>
            <h3>14. Get Statistics</h3>
            <p><strong>GET /stats</strong></p>
            <p>Returns statistics of the Women's Premier League.</p>
            <pre><code>GET ${hostname}/stats</code></pre>
          </article>
          <article>
            <h3>15. Get Specific Statistics</h3>
            <p><strong>GET /stats/:slug</strong></p>
            <p>Returns details of a specific statistics identified by its slug.</p>
            <p><strong>Parameters:</strong></p>
            <ul>
              <li><code>slug</code>: The slug identifier for the statistic.</li>
            </ul>
            <pre><code>GET ${hostname}/stats/most-wickets-13-5961-statistics</code></pre>
          </article>
        </div>
      </section>
    </main>
    <footer>
      <p>Made with ♥️ by <a href="https://github.com/LakhindarPal">Lakhindar</a></p>
    </footer>
  </body>

  </html>
  `;
  return html(doc);
});

export default router;
