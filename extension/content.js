(() => {
  // Try the video element first — most reliable when the video is loaded
  const video = document.querySelector("video");
  if (video && video.duration && isFinite(video.duration)) {
    return Math.round(video.duration);
  }

  // Fallback: parse the duration text shown in the player (e.g. "12:34" or "1:23:45")
  const durationEl = document.querySelector(".ytp-time-duration");
  if (durationEl && durationEl.textContent) {
    const parts = durationEl.textContent.trim().split(":").map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
  }

  // Fallback: read from ytInitialData (works on page load before player is ready)
  try {
    const data = window.ytInitialData;
    const videoDetails =
      data?.contents?.twoColumnWatchNextResults?.results?.results?.contents
        ?.find((c) => c?.videoPrimaryInfoRenderer)
        ?.videoPrimaryInfoRenderer;

    // Duration lives in microformat
    const seconds =
      window.ytInitialPlayerResponse?.videoDetails?.lengthSeconds;
    if (seconds) return parseInt(seconds, 10);
  } catch (_) {}

  return null; // duration unavailable (e.g. live stream, tab not yet loaded)
})();
