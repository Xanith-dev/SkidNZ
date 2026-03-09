# SKID NZ — Drift Events Website

## Structure

```
skidnz/
├── index.html        ← Main page (open this in a browser)
├── css/
│   └── styles.css    ← All styles
├── js/
│   ├── events.js     ← Event data (add/edit events here)
│   └── app.js        ← App logic (filtering, modal)
└── assets/           ← Place images here if needed
```

## How to Launch

**Option 1 — Double click**
Just open `index.html` in any browser. No server needed.

**Option 2 — Local server (recommended)**
```bash
cd skidnz
npx serve .
# or
python3 -m http.server 8080
```
Then visit http://localhost:8080

## Adding Events

Edit `js/events.js` and add a new object to the `events` array:

```js
{
  title: "YOUR EVENT NAME",
  date: "12 JUL 2025",
  loc: "Venue Name",
  region: "North Island",   // or "South Island"
  type: "comp",             // comp | club | practice
  tags: ["COMPETITION"],
  entry: "$150",
  desc: "Event description goes here.",
  hot: true,                // red highlight badge
  sold: false               // mark as sold out
}
```

## Deploying

Upload the entire `skidnz/` folder to any static host:
- **Netlify** — drag & drop the folder at netlify.com/drop
- **Vercel** — `vercel deploy`
- **GitHub Pages** — push to a repo and enable Pages
