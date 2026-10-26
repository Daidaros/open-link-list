# Open Link List

Open a pasted list of URLs in separate browser tabs. You can optionally place the new tabs in a named, colored group. The interface includes English and Spanish.

## Browser support

| Browser | Status |
| --- | --- |
| Chrome | Working extension, version 1.1.2 |
| Firefox | Port planned; compatibility and packaging still need testing |
| Safari | Port planned; API compatibility and Apple packaging still need testing |

## Project layout

- `src/`: shared popup, translations, and icons.
- `browsers/chrome/`: Chrome manifest.
- `browsers/firefox/`: Firefox port notes.
- `browsers/safari/`: Safari port notes.
- `scripts/build.mjs`: assembles a browser extension from shared files and a browser manifest.
- `dist/`: previously released Chrome ZIP files. These archives are kept unchanged.

## Build and install Chrome locally

Run `node scripts/build.mjs chrome` from this repository. This creates `build/chrome/` and a ZIP file in `build/`.

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select `build/chrome/`.
4. Optionally, pin the extension from Chrome's Extensions menu.

The extension processes pasted URLs locally. It does not collect or send them to a service.
