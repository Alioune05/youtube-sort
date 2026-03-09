# YouTube Sort

A Tampermonkey userscript and a Chrome extension to manage your YouTube watch queue by duration.

---

## Structure

```
youtube-sort/
├── tampermonkey/
│   └── youtube-tab-sorter.user.js   # Tampermonkey script
└── extension/
    ├── manifest.json                 # Chrome extension
    ├── popup.html
    ├── popup.js
    └── content.js
```

---

## Tampermonkey Script

Tracks every YouTube video you open and displays them in a floating panel sorted by duration.

**Features:**
- Floating panel with tracked videos sorted shortest → longest (or reverse)
- Total watch time counter
- Search bar to filter videos
- Refresh button to re-fetch missing durations
- Pause all tabs button
- Auto-play next video when current one ends
- `Shift+N` shortcut to skip to the next video in the list

### Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser
2. Click the link below — Tampermonkey will prompt you to install

**[Install youtube-tab-sorter.user.js](https://raw.githubusercontent.com/Alioune05/youtube-sort/master/tampermonkey/youtube-tab-sorter.user.js)**

Auto-updates are enabled: Tampermonkey checks for new versions automatically.

---

## Chrome Extension

### Installation

1. Go to `chrome://extensions/`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked** and select the `extension/` folder

---

## Contributing

Issues and PRs welcome at [github.com/Alioune05/youtube-sort](https://github.com/Alioune05/youtube-sort/issues).
