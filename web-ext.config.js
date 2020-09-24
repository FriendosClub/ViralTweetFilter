module.exports = {
  // global options
  ignoreFiles: [
    'package.json',
    'web-ext.config.js',
    'yarn.lock',
    '**/*.psd',
    '**/*.code-workspace',
  ],

  // command-specific options
  run: {
    browserConsole: true,
    firefoxProfile: 'web-ext-viraltweetfilter',
    keepProfileChanges: true,
    startUrl: ['https://twitter.com/home'],
  },
  lint: {
    warningsAsErrors: true,
  },
  build: {
    overwriteDest: true,
  },
  sign: {
    // Signing takes a __long__ time
    //       m    s    ms
    timeout: 10 * 60 * 1000,
  },
};
