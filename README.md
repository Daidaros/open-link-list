# Open Link List

Open a pasted list of URLs in separate browser tabs. You can optionally place the new tabs in a named, colored group and remember its name and color for the next use. The interface includes English and Spanish.

## Browser support

| Browser | Status |
| --- | --- |
| Chrome | Working extension, version 1.1.4 |
| Firefox | Port planned; compatibility and packaging still need testing |
| Safari | Port planned; API compatibility and Apple packaging still need testing |

## Project layout

- Repository root: loadable Chrome extension, including its manifest, popup, translations, and icons.
- `browsers/firefox/`: Firefox port notes.
- `browsers/safari/`: Safari port notes.
- `scripts/build.mjs`: assembles a browser extension from shared files and a browser manifest.
- `dist/`: previously released Chrome ZIP files. These archives are kept unchanged.

## Build and install Chrome locally

The repository root is directly loadable in Chrome. Run `node scripts/build.mjs chrome` only when you need a clean package. This creates `build/chrome/` and a ZIP file in `build/`.

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this repository's root directory. If it is already loaded, click **Reload** on its extension card.
4. Optionally, pin the extension from Chrome's Extensions menu.

The extension processes pasted URLs locally. It does not collect or send them to a service.
