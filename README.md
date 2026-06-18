<h2 align="center">
  <img src="icons/icon128.png" width="72" alt="Deezer Hide Sections logo"><br>
  <b>Deezer Hide Sections</b>
</h2>
<h4 align="center">Browser extension — hide unwanted sections on Deezer, persistently.</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-v3-4285F4?logo=googlechrome&logoColor=white">
  <img src="https://img.shields.io/badge/Firefox-109%2B-FF7139?logo=firefoxbrowser&logoColor=white">
  <img src="https://img.shields.io/badge/Chrome-compatible-4285F4?logo=googlechrome&logoColor=white">
  <img src="https://img.shields.io/badge/version-1.0.0-8B5CF6">
</p>

<hr>
<p align="center">
  <a href="#features">Features</a> &bull;
  <a href="#installation">Installation</a> &bull;
  <a href="#usage">Usage</a> &bull;
  <a href="#project-structure">Project Structure</a>
</p>
<hr>

Lightweight content script that injects a **hide button** next to every section title on `deezer.com`. Hidden sections are persisted in browser storage — they stay hidden across reloads and navigation.

## Screenshot

<p align="center">
  <img src=".github/assets/screenshots/hide_sections_button.png" width="80%" alt="Hide button next to a Deezer section title">
</p>

## Features

- **One-click hide** — hide button injected next to every section title
- **Persistent** — hidden sections stored locally, survive page reloads
- **Dynamic** — `MutationObserver` handles Deezer's lazy-loaded content
- **Zero dependencies** — plain JS + CSS, no build step required
- **Cross-browser** — works on Chrome (MV3) and Firefox (109+)

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

To restore a hidden section, remove its entry from extension storage via the browser console:

```js
// Chrome
chrome.storage.local.remove('hiddenModules');

// Firefox
browser.storage.local.remove('hiddenModules');
```

## Project Structure

```
├── manifest.json       Extension manifest (MV3)
├── content.js          Content script — injects buttons, handles hide logic
├── content.css         Styles for the hide button and hidden state
└── icons/
    ├── hide-button.svg Hide button icon (injected into page)
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```