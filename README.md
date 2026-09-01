# FINVEST AI — integrated site

This folder wires two of your uploads together into one working app:

- **`backend/`** — your `hackverse-backend` (Python/FastAPI, multi-agent
  stock analysis: momentum, volume, and RAG-grounded sentiment agents,
  synthesized per user). Runs fully offline, no API keys.
- **`index.html`** — your `FinvestAI_fixed.html` frontend, now calling the
  backend's REST API for real analysis instead of generating everything
  client-side.

`Parallax` (the Node/Gemini backend) was **not** wired in — it's a second,
overlapping implementation of the same feature, and mixing both into one
site would just mean two competing sources of truth. If you'd rather use
that one, say the word and I'll redo the frontend wiring against it instead
(you'll need a Gemini API key for that one).

## How it works

- `TCS`, `INFY`, and `RELIANCE` are the three tickers the backend actually
  knows about. When you pick one of those and hit **Analyze Stock**, the
  page calls `GET /analyze/{ticker}` and `GET /market/{ticker}` on the
  backend and renders the real momentum/volume/sentiment agent output plus
  the synthesized recommendation and its cited sources.
- Any other ticker in the picker (`HDFCBANK`, `AAPL`) or a stopped backend
  falls back to the original built-in demo-data generator, so the page
  never breaks — it just shows a "Demo Mode" badge instead of "Live Backend
  Connected" at the top.
- The pipeline animation (Market → Technical → Fundamental → Sentiment →
  Risk → Synthesis) still plays for a couple seconds either way, it's just
  showing real numbers when the backend is live.

Note: the backend only ships 3 signal agents (momentum, volume anomaly,
sentiment), not a separate "fundamentals" engine. The frontend's third
card is relabeled **"Volume & Liquidity"** when live data is showing, since
that's what's actually backing it — this is called out in the code
(`adaptBackendResult` in `index.html`) rather than faked.

## Run it

**1. Start the backend** (from this folder):

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Leave that running. You should see it serving at `http://localhost:8000`
(check `http://localhost:8000/docs` in a browser to confirm it's up).

**2. Open the site** — just double-click `index.html`, or serve it:

```bash
# from this folder, in a second terminal
python -m http.server 5500
# then open http://localhost:5500/index.html
```

Either way works — the backend's CORS is wide open for local demo use.

**3. Pick TCS, INFY, or RELIANCE and hit "Analyze Stock".** You should see
a teal **"Live Backend Connected"** badge at the top instead of the amber
demo badge, and the sources section will show real citations pulled from
the backend's synthetic filings/earnings corpus.

If the badge stays amber/"Demo Mode", the backend either isn't running or
isn't reachable at `http://localhost:8000` — check the terminal it's
running in for errors, and check your browser console (the page logs a
warning there when a live call fails and it falls back to demo data).

### Changing the backend URL

If you run the backend on a different host/port, set this before the page
loads its scripts (e.g. add it near the top of `index.html`, right after
`<body>`):

```html
<script>window.FINVEST_API_BASE = "http://localhost:9000";</script>
```

## What I changed in `index.html`

- Added `API_BASE`, `LIVE_TICKERS`, `fetchLiveAnalysis()`, `pingBackend()`,
  and `adaptBackendResult()` — this last one maps the backend's
  `SynthesisResult` JSON onto the exact shape the existing UI components
  already expect, so none of the rendering/animation code had to change.
- `runAnalysis()` now tries the real backend first (for TCS/INFY/RELIANCE,
  when it's reachable) and transparently falls back to the original
  built-in demo generator otherwise.
- The hero badge now reflects real connection status instead of a static
  "Demo Mode Active" label.
- The sparkline in the Technical card uses the backend's real price
  history when a live result is showing.
- `FundamentalCard`'s header/description switch to "Volume & Liquidity"
  text when showing live data (see note above).

Everything else — layout, styling, portfolio page, backtest section,
history — is untouched and still uses the original demo data, since the
backend doesn't expose that information.
