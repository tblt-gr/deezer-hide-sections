# Deezer Hide Sections

Browser extension (Chrome / Firefox) to hide unwanted sections on the Deezer home page.

## Features

- Add a hide button next to each section title
- Hidden sections persist across page reloads (stored locally)
- Works with dynamically loaded content

## Installation

### Chrome

1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select this folder

### Firefox

1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on** → select `manifest.json`

## Usage

Click the **⊘** button next to any section title to hide it.

To restore hidden sections, remove them from extension storage via the browser dev tools (`chrome.storage.local` / `browser.storage.local`).

## Files

```
├── manifest.json       Extension manifest (MV3)
├── content.js          Content script
├── content.css         Styles
└── icons/
    ├── hide-button.svg Hide button icon
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```