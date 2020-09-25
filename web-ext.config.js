/**
 * ViralTweetFilter - Browser extension to filter "Viral" Tweets on Twitter
 * Copyright (C) 2020  Ralph Drake
 * See the bottom of this file for license information.
*/

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
    timeout: 30 * 60 * 1000,
  },
};

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
