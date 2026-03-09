const btnAsc  = document.getElementById("btn-asc");
const btnDesc = document.getElementById("btn-desc");
const statusEl = document.getElementById("status");
const listEl   = document.getElementById("tab-list");

/** Format seconds → "1:23:45" or "4:02" */
function formatDuration(seconds) {
  if (seconds == null) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Get the video ID from a YouTube watch URL */
function videoId(url) {
  try {
    return new URL(url).searchParams.get("v");
  } catch (_) {
    return null;
  }
}

/** Render the tab list in the popup */
function renderList(tabs) {
  listEl.innerHTML = "";
  for (const tab of tabs) {
    const item = document.createElement("div");
    item.className = "tab-item";

    const vid = videoId(tab.url);
    const thumbSrc = vid
      ? `https://i.ytimg.com/vi/${vid}/default.jpg`
      : null;

    item.innerHTML = `
      ${thumbSrc ? `<img class="tab-thumb" src="${thumbSrc}" alt="">` : `<div class="tab-thumb"></div>`}
      <div class="tab-info">
        <div class="tab-title">${escapeHtml(tab.title)}</div>
        <div class="tab-duration ${tab.duration == null ? "unknown" : ""}">
          ${tab.duration != null ? formatDuration(tab.duration) : "duration unavailable"}
        </div>
      </div>
    `;
    listEl.appendChild(item);
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Inject content.js into a tab and return its duration (or null) */
async function getDuration(tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"],
    });
    return results?.[0]?.result ?? null;
  } catch (_) {
    return null;
  }
}

let youtubeTabs = [];

async function init() {
  const tabs = await chrome.tabs.query({ url: "*://www.youtube.com/watch?v=*" });

  if (tabs.length === 0) {
    statusEl.textContent = "No YouTube video tabs found.";
    statusEl.className = "error";
    return;
  }

  statusEl.textContent = `Found ${tabs.length} tab${tabs.length > 1 ? "s" : ""}. Reading durations...`;

  // Fetch durations in parallel
  const durations = await Promise.all(tabs.map((t) => getDuration(t.id)));

  youtubeTabs = tabs.map((tab, i) => ({
    ...tab,
    duration: durations[i],
  }));

  const unknown = youtubeTabs.filter((t) => t.duration == null).length;
  statusEl.textContent =
    `${tabs.length} tab${tabs.length > 1 ? "s" : ""} found` +
    (unknown > 0 ? ` (${unknown} duration${unknown > 1 ? "s" : ""} unavailable)` : "") +
    ".";
  statusEl.className = "";

  renderList(youtubeTabs);
  btnAsc.disabled  = false;
  btnDesc.disabled = false;
}

/** Sort tabs by duration and move them in Chrome */
async function sortTabs(order) {
  btnAsc.disabled  = true;
  btnDesc.disabled = true;
  statusEl.textContent = "Sorting...";
  statusEl.className = "";

  // Tabs with unknown duration go to the end
  const sorted = [...youtubeTabs].sort((a, b) => {
    if (a.duration == null && b.duration == null) return 0;
    if (a.duration == null) return 1;
    if (b.duration == null) return -1;
    return order === "asc" ? a.duration - b.duration : b.duration - a.duration;
  });

  // Move each tab to its new index sequentially
  // We need the index of the first YouTube tab as our anchor
  const firstIndex = Math.min(...youtubeTabs.map((t) => t.index));

  for (let i = 0; i < sorted.length; i++) {
    await chrome.tabs.move(sorted[i].id, { index: firstIndex + i });
  }

  youtubeTabs = sorted;
  renderList(youtubeTabs);

  statusEl.textContent = `Sorted ${sorted.length} tab${sorted.length > 1 ? "s" : ""} by duration (${order === "asc" ? "shortest" : "longest"} first).`;
  statusEl.className = "success";

  btnAsc.disabled  = false;
  btnDesc.disabled = false;
}

btnAsc.addEventListener("click",  () => sortTabs("asc"));
btnDesc.addEventListener("click", () => sortTabs("desc"));

init();
