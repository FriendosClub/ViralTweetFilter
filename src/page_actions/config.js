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
