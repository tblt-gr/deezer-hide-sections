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

## Screenshots

<table align="center">                                                                                                            
  <tr>                                                                                                                            
    <td align="center" width="50%">                                                                                               
      <img src=".github/assets/screenshots/hide_sections_button.png" width="100%" alt="Hide button next to a Deezer section title"
><br>                                                                                                                             
      <sub>Hide button next to a section title</sub>                                                                              
    </td>                                                                                                                         
    <td align="center" width="50%">                                                                                               
      <img src=".github/assets/screenshots/extension_panel.png" width="100%" alt="Popup panel listing hidden sections with a Show 
button each"><br>                                                                                                                 
      <sub>Restore panel — show hidden sections</sub>                                                                             
    </td>                                                                                                                         
  </tr>                                                                                                                           
</table>

## Features

- **One-click hide** — hide button injected next to every section title
- **Restore panel** — popup lists hidden sections by title; one click to show again
- **Persistent** — hidden sections stored locally, survive page reloads
- **Live sync** — restoring from the popup reveals the section without a reload
- **Dynamic** — `MutationObserver` handles Deezer's lazy-loaded content
- **Zero dependencies** — plain JS + CSS, no build step required
- **Cross-browser** — works on Chrome (MV3) and Firefox (109+)

## Installation

### Via Releases (Recommended)

1. Download the latest ZIP version from the [Releases](https://github.com/tblt-gr/deezer-hide-sections/releases) tab.
2. Extract the archive on your computer.
3. Follow the instructions below based on your browser.

### Chrome

1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select this folder

### Firefox

1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on** → select `manifest.json`

## Usage

**Hide** — click the **⊘** button next to any section title.

**Restore** — click the extension icon in the toolbar to open the panel, then click **Show** next to the section you want back. It reappears instantly, no reload needed.

## Project Structure

```
├── manifest.json       Extension manifest (MV3)
├── content.js          Content script — injects buttons, handles hide logic
├── content.css         Styles for the hide button and hidden state
├── popup/
│   ├── popup.html      Restore panel markup
│   ├── popup.css       Panel styles
│   └── popup.js        Lists hidden sections, handles restore
└── icons/
    ├── hide-button.svg Hide button icon (injected into page)
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```