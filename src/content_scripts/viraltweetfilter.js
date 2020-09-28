/* eslint-disable no-console */
/* eslint-disable strict */
/**
 * ViralTweetFilter - Browser extension to filter "Viral" Tweets on Twitter
 * Copyright (C) 2020  Ralph Drake
 * See the bottom of this file for license information.
*/

'use strict';

console.log('[ViralTweetFilter]', 'Loaded');

// TODO: Localize number suffixes
const suffixes = {
  K: 1000,
  M: 1000000,
};
const attrName = 'vtfChecked';
let userThreshold = 10000;

function shouldCheck(tweet) {
  if (tweet.getAttribute(attrName)) { return false; }

  tweet.setAttribute(attrName, true);
  return true;
}

// TODO: Add functionality to only display debug messages if the addon is
//       installed temporarily (see https://s.ralph.sh/temp-ext)
function debugMsg(...params) {
  console.debug('[ViralTweetFilter]', '(debug)', ...params);
}

function filterTweet(tweet) {
  return new Promise((resolve, reject) => {
    const likesSpan = tweet.querySelector('div[data-testid="like"] span');
    if (!likesSpan) {
      return reject(new Error('Unable to find likes for Tweet.'));
    }

    const likesText = likesSpan.innerText;

    // Expect nums like 1, 10, 100, 1K, 1.2K, 10.2K, 100.2K, 1M, 1.2M
    // TODO: Localize decimal separator (some use ',' instead of '.')
    // TODO: (See line 13) Localize number suffixes
    let numText = likesText.match(/^([0-9]+\.?[0-9]?)/g);
    let suffix = likesText.match(/(K|M)$/g);

    if (numText && numText.length > 0) {
      [numText] = numText;
    } else { // tweet has 0 likes or element isn't a tweet
      return reject(new Error('Unable to parse number of likes.'));
    }

    if (suffix && suffix.length > 0) {
      [suffix] = suffix;
    }

    // If there's no suffix, we can safely parseInt as it will be a number 1-999
    // Otherwise, we have a number like 10.2K so we:
    //    - parse 10.2 as a float
    //    - multiply it by its suffix
    //    - parse the product as an int
    const likes = (suffix)
      ? parseInt(parseFloat(numText, 10) * suffixes[suffix], 10)
      : parseInt(numText, 10);

    if (likes >= userThreshold) {
      debugMsg(`Hiding a Tweet with ${likes} likes.`);
      // eslint-disable-next-line no-param-reassign
      tweet.style.maxHeight = '0px';

      // Set 'display: none;' after 50ms to improve rendering performance
      // and help out those with screen readers.
      return window.setTimeout(() => {
        // eslint-disable-next-line no-param-reassign
        tweet.style.display = 'none';
        resolve(`Hid a Tweet with ${likes} likes.`);
      }, 50, likes);
    }

    return resolve(`Skipped a Tweet with ${likes} likes.`);
  });
}

// TODO: Make this a user-customizable value
let shouldFilter = true;
const filterDelay = 250;

// We don't pass the event itself to the function because we don't need it.
window.addEventListener('scroll', () => {
  if (!shouldFilter) { return; }
  shouldFilter = false;

  window.setTimeout(() => {
    shouldFilter = true;
  }, filterDelay);

  const tweets = document.querySelectorAll('main section article');

  tweets.forEach((tweet) => {
    if (!shouldCheck(tweet)) { return; }

    filterTweet(tweet)
      .then((successMsg) => {
        debugMsg('Tweet resolved:', successMsg);
      })
      .catch((err) => {
        debugMsg('Tweet rejected:', err.message);
      });
  });
});

// Attempt to retrieve user prefs as soon as the script activates
(() => {
  debugMsg('Getting threshold from sync storage...');

  chrome.storage.sync.get('threshold', (items) => {
    if (typeof items.threshold === 'undefined') {
      debugMsg('items[threshold] is undefined:', items);
      debugMsg('Attempting to instantiate sync storage.');

      chrome.storage.sync.set({ threshold: userThreshold }, () => {
        debugMsg('Instantiated sync storage.');
      });
    } else {
      const { threshold } = items;
      debugMsg('Got threshold of', threshold);
      userThreshold = threshold;
    }
  });
})();

/**
 * ViralTweetFilter - Browser extension to filter "Viral" Tweets on Twitter
 * Copyright (C) 2020  Ralph Drake

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.

 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
