/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { signAddon } = require('sign-addon');

const {
  WEB_EXT_API_KEY,
  WEB_EXT_API_SECRET,
  WEB_EXT_ID,
  PKG_VERSION,
} = process.env;

const envNames = [
  'WEB_EXT_API_KEY',
  'WEB_EXT_API_SECRET',
  'WEB_EXT_ID',
  'PKG_VERSION',
];

[WEB_EXT_API_KEY, WEB_EXT_API_SECRET, WEB_EXT_ID, PKG_VERSION].forEach(
  (value, index) => {
    if (!value) {
      throw new Error(`Missing required environment variable ${envNames[index]}!`);
    }
  },
);

const xpiPath = path.resolve(
  __dirname,
  '..',
  'web-ext-artifacts',
  `viral_tweet_filter-${PKG_VERSION}.zip`,
);
// console.debug('xpiPath is', xpiPath);

if (!fs.existsSync(xpiPath)) {
  throw new Error(`Addon file ${xpiPath} doesn't exist!`);
}

signAddon({
  xpiPath,
  version: PKG_VERSION,
  apiKey: WEB_EXT_API_KEY,
  apiSecret: WEB_EXT_API_SECRET,
  id: WEB_EXT_ID,
})
  .then((result) => {
    if (result.success) {
      console.log('Add-on was successfully signed.');
      console.log('The following signed files were downloaded:');
      console.log(result.downloadedFiles);
      console.log('Your extension ID is:');
      console.log(result.id);
    } else {
      if (result.errorCode === 'ADDON_NOT_AUTO_SIGNED') {
        process.exit(0);
      }
      console.error('Failed to sign add-on.');
      console.error('Error code: ', result.errorCode);
      console.error('Details: ', result.errorDetails);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Signing error:', error);
    process.exit(1);
  });
