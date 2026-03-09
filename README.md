# YouTube Sort

Two Tampermonkey userscripts (+ a Chrome extension) to manage your YouTube watch queue.

---

## Scripts

### YouTube Tab Sorter
Tracks every YouTube video you open and displays them in a floating panel sorted by duration.

**Features:**
- Floating panel with your tracked videos sorted shortest → longest (or reverse)
- Total watch time counter
- Search bar to filter videos
- Refresh button to re-fetch missing durations
- Pause all tabs button
- Auto-play next video when current one ends
- `Shift+N` shortcut to skip to the next video in the list

**Install:** [youtube-tab-sorter.user.js](https://raw.githubusercontent.com/Alioune05/youtube-sort/master/youtube-tab-sorter.user.js)

---

### YouTube Auto Skip Ads
Automatically skips or fast-forwards through YouTube ads.

**Features:**
- Clicks the skip button as soon as it appears
- Jumps to end of non-skippable ads

**Install:** [youtube-skip-ads.user.js](https://raw.githubusercontent.com/Alioune05/youtube-sort/master/youtube-skip-ads.user.js)

---

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser
2. Click one of the install links above — Tampermonkey will prompt you to install
3. Click **Install**

Auto-updates are enabled: Tampermonkey will check for new versions automatically.

---

## Chrome Extension (alternative)

A standalone extension version is also included (`manifest.json`, `popup.html`, `popup.js`, `content.js`).

1. Go to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select this folder

---

## Contributing

Issues and PRs welcome at [github.com/Alioune05/youtube-sort](https://github.com/Alioune05/youtube-sort/issues).
