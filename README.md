# Viral Tweet Filter

[![Build Status](https://travis-ci.org/FriendosClub/ViralTweetFilter.svg?branch=master)][4]
[![Firefox Add-On](https://img.shields.io/amo/v/viral-tweet-filter)][5]
![Chrome Web Store](https://img.shields.io/chrome-web-store/v/hgjnjpfcmgmdbfjdmmdciklmhhjmahmk?label=chrome%20extension)
[![Code Style: Airbnb](https://img.shields.io/badge/code%20style-airbnb-blue)][6]

A tool to hide Tweets that have more than a certain amount of likes.


## Working on the Extension

### Setting up the development environment

There are a few manual configuration steps one needs to take before they can
begin working on this project.

1. Install dependencies
   - Make sure you have a flavor of Firefox installed (default, beta, developer edition, etc.)
   - Install Yarn if needed
   - Run `yarn install` in the root of this project to install dependencies
2. Set up development profile
   1. Open Firefox and navigate to `about:profiles`
   2. Click the "Create a New Profile" button
   3. In the pop-up menu, specify `web-ext-viraltweetfilter` for the profile name
   4. Use the default profile directory
   5. Click "Done" to create the development profile.
3. (Optional) Specify the version of Firefox you're using
   - If you have multiple versions of Firefox installed, you can use the
     `WEB_EXT_FIREFOX` environment variable to tell `web-ext` which version to
     use. [Click here to read the web-ext documentation for this feature.][1]


### Developing the Extension

There are several Yarn scripts for aiding development:
- `yarn start`:
  - Opens a new Firefox instance with the `web-ext-viraltweetfilter` profile active
  - **NB:** Make sure you set up this profile in step 2 above!
  - Automatically reloads the extension when changes are made
- `yarn lint`:
  - Checks the project for linting errors with `web-ext lint` and `eslint`
- `yarn build`:
  - Builds the extension, creating a zip file in `web-ext-artifacts/`
- `yarn test`:
  - Checks that both `yarn lint` and `yarn build` succeed.
  - **NB:** This is used by Travis CI and must pass for pull requests
- `yarn sign`:
  - Sends the plugin to Mozilla's AMO for signing
  - Typically only run by the package maintainer, not needed for a CI build to pass
  - **NB:** See [Signing the Extension](#signing-the-extension) below for
    information about configuring this process.


### Signing the Extension

If you want to create a signed version of this extension, you need to set up
your own extension on the AMO and change `gecko.id` in `manifest.json` to that
extension's ID.

See [Submitting an Add-On][2] and [Packaging your extension][3] for more
information about this process.


## Todo

- [See the v1.0.0 milestone][7]


## License

```
ViralTweetFilter - Browser extension to filter "Viral" Tweets on Twitter
Copyright (C) 2020  Ralph Drake

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```


[1]: https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#--firefox
[2]: https://extensionworkshop.com/documentation/publish/submitting-an-add-on/
[3]: https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/#packaging-your-extension
[4]: https://travis-ci.org/FriendosClub/ViralTweetFilter
[5]: https://addons.mozilla.org/en-US/firefox/addon/viral-tweet-filter/
[6]: https://github.com/airbnb/javascript
[7]: https://github.com/FriendosClub/ViralTweetFilter/milestone/1
