/**
 * ViralTweetFilter - Browser extension to filter "Viral" Tweets on Twitter
 * Copyright (C) 2020  Ralph Drake
 * See the bottom of this file for license information.
*/

// Form field references
const thresholdInput = document.querySelector('#threshold');
const settingsForm = document.querySelector('#settings');
const outputWrapper = document.querySelector('#output');
const outputText = document.querySelector('#outputText');

function initThresholdStorage() {
  chrome.storage.sync.set({ threshold: 10000 });
}

function initThresholdInput(threshold) {
  thresholdInput.value = threshold;
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['threshold'], (items) => {
    const { threshold } = items;
    const tInt = parseInt(threshold, 10);

    if (!Number.isNaN(tInt) && threshold >= 1) {
      initThresholdInput(tInt);
    } else {
      initThresholdStorage();
    }
  });
});

function resetOutput() {
  outputWrapper.classList.add('collapsed');
  outputWrapper.classList.remove('error', 'success');
}

settingsForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Don't actually submit the form

  const threshold = parseInt(thresholdInput.value, 10);
  // TODO: Localize success and error messages
  if (Number.isNaN(threshold) || threshold < 1) {
    outputText.innerHTML = 'Error: Not a valid number.';
    outputWrapper.classList.add('failure');
  } else {
    outputText.innerHTML = 'Settings saved.';
    outputWrapper.classList.add('success');
  }

  outputWrapper.classList.remove('collapsed');
  window.setTimeout(() => { resetOutput(); }, 4000);
  chrome.storage.sync.set({ threshold });
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
