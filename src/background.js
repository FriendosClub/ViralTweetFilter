chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'twitter.com/home' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

/**
 * Original implementation copyright (c) 2011 The Chromium Authors. All rights
 * reserved. Use of this source code is governed by a BSD-style license that can
 * be found at
 * https://chromium.googlesource.com/chromium/src/+/refs/heads/master/LICENSE
 */
