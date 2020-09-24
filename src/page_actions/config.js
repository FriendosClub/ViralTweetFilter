/**
 * ViralTweetFilter - Browser extension to filter "Viral" Tweets on Twitter
 * Copyright (C) 2020  Ralph Drake
 * See the bottom of this file for license information.
*/

function initThresholdStorage() {
  chrome.storage.sync.set({ threshold: 10000 }, () => { });
}

function initThresholdInput(threshold) {
  if (!threshold || typeof (threshold) === 'undefined') {
    initThresholdStorage();
    return;
  }

  const thresholdInput = document.querySelector('#threshold');
  thresholdInput.value = threshold;
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['threshold'], (items) => {
    const { threshold } = items;

    if (threshold) {
      initThresholdInput(threshold);
    } else {
      initThresholdStorage();
    }
  });
});

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
