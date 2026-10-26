# Firefox port

The shared popup and translations are in `src/`. Add a Firefox manifest here after confirming the required tab grouping APIs and their behavior in the supported Firefox versions. Then run `node scripts/build.mjs firefox` and test the generated extension before publishing it to Firefox Add-ons.

This directory is preparatory; no Firefox package is released yet.
