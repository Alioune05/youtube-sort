// ==UserScript==
// @name         YouTube Auto Skip Ads
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Skip YouTube ads automatically as soon as possible
// @author       You
// @match        *://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  setInterval(() => {
    // Click any visible skip button
    const skipBtn = document.querySelector([
      '.ytp-skip-ad-button',
      '.ytp-ad-skip-button',
      '.ytp-ad-skip-button-modern',
      'ytp-skip-ad-button button',
      'ytp-skip-ad-button',
      '[class*="skip-ad"]',
      '[class*="skip-button"]',
    ].join(','));

    if (skipBtn) {
      ['mousedown', 'mouseup', 'click'].forEach(type => {
        skipBtn.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true }));
      });
      return;
    }

    // Non-skippable ad: jump to end
    const player = document.querySelector('.html5-video-player');
    const isAd = player && (
      player.classList.contains('ad-showing') ||
      player.classList.contains('ad-interrupting')
    );
    if (isAd) {
      const video = document.querySelector('video');
      if (video && video.duration && isFinite(video.duration)) {
        video.currentTime = video.duration;
      }
    }
  }, 300);

})();
