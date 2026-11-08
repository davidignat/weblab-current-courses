# 🎓 WebLab - Courses Currently Taking

[![TU Delft](https://img.shields.io/badge/TU%20Delft-WebLab-00A6D6?style=flat-square)](https://weblab.tudelft.nl/)
[![Version](https://img.shields.io/badge/version-3.3.0-blue?style=flat-square)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Safari Compatible](https://img.shields.io/badge/Safari-100%25%20Supported-blue?style=flat-square&logo=safari)]()
[![Chrome Compatible](https://img.shields.io/badge/Chrome%20%2F%20Edge%20%2F%20Brave-Manifest%20V3-orange?style=flat-square&logo=googlechrome)]()

A lightweight, seamless browser extension and userscript for **TU Delft WebLab** (`weblab.tudelft.nl`). It adds a dedicated, clean **"Courses Currently Taking"** section directly at the top of your dashboard, allowing you to separate your active quarter courses from past-year subjects.

---

## 📌 The Problem

On standard WebLab, your home dashboard lists every course you've ever accessed or enrolled in inside a cramped, horizontally scrolling box ("Recent Courses"), alongside thousands of subjects in the public "Course Catalog". Navigating to your current courses requires scrolling, searching, and sifting through previous academic years every single day.

## ✨ The Solution

**WebLab - Courses Currently Taking** cleanly organizes your dashboard:
- 🎯 **Native WebLab Aesthetic**: Flat, clean design matching WebLab's native Bootstrap typography and TU Delft palette.
- ⚡ **Auto-Populates From Recent Courses**: Automatically loads your enrolled subjects so you never see random catalog courses.
- ✕ **1-Click Deselect**: Click the subtle **`[✕]`** button on any past course to hide it.
- 💾 **Instant & Persistent**: Real-time DOM updates saved in `localStorage`. Remembers your preferences across browser sessions.
- 👁️ **Hidden Drawer & Reset**: Expand the `Hidden` drawer to restore any deselected course with one click, or use `Reset All`.
- 🔗 **Zero 404s**: Triggers WebLab's native navigation handlers.
- ⚓ **No Annoying Auto-Scroll**: Keeps the page anchored at the top on page load.
- 🔒 **Private & Secure**: Runs 100% locally in your browser. Zero tracking, zero telemetry, zero external dependencies.

---

## 🚀 Installation

Choose the method that fits your browser:

### 🍏 Safari (macOS, iPadOS, iOS) — Recommended
1. Install the free, open-source **[Userscripts](https://apps.apple.com/app/userscripts/id1463298887)** extension from the Mac App Store.
2. In Safari, open **Settings (`Cmd + ,`) → Extensions**, enable **Userscripts**, and set permissions to **Always Allow**.
3. Click the Userscripts icon (`</>`) in Safari's toolbar → Click **`+`** (New Script).
4. Paste the contents of [`weblab-current-courses.user.js`](weblab-current-courses.user.js) and press `Cmd + S` to save.
5. Visit [weblab.tudelft.nl](https://weblab.tudelft.nl/) — your current courses section will be live!

---

### 🌐 Chrome / Arc / Brave / Edge (Manifest V3 Extension)
1. Download or clone this repository:
   ```bash
   git clone git@github.com:davidignat/weblab-current-courses.git
   ```
   *(Or download [`weblab-courses-extension.zip`](weblab-courses-extension.zip) and unzip it).*
2. Open your browser and navigate to `chrome://extensions` (or `edge://extensions` / `brave://extensions`).
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the `extension` folder.
5. Open [weblab.tudelft.nl](https://weblab.tudelft.nl/)!

---

### 🦊 Firefox (Tampermonkey / Greasemonkey)
1. Install **Tampermonkey** or **Violentmonkey** from Firefox Add-ons.
2. Click **Create a new script** (`+`).
3. Paste the contents of [`weblab-current-courses.user.js`](weblab-current-courses.user.js) and save.
4. Refresh [weblab.tudelft.nl](https://weblab.tudelft.nl/).

---

### 🔖 Universal 1-Click Bookmarklet (Zero Extensions Needed)
If you cannot install extensions:
1. Show your browser Favorites / Bookmarks bar (`Cmd + Shift + B`).
2. Bookmark any page into Favorites and name it `WebLab Current Courses`.
3. Right-click the bookmark → **Edit Address...**.
4. Paste the single-line code from [`safari-bookmarklet.txt`](safari-bookmarklet.txt).
5. Whenever you visit [weblab.tudelft.nl](https://weblab.tudelft.nl/), click the bookmark!

---

## 🛠️ Usage

| Feature | How It Works |
| :--- | :--- |
| **Hide Course** | Hover over any course in the top section and click **`[✕]`**. It is removed immediately. |
| **Restore Course** | Click **`Hidden (X)`** in the section header, then click **`+ [Course]`** to bring it back. |
| **Collapse Recent Below** | Click **`Hide Recent Below`** in the header to collapse the lower row of past courses. |
| **Reset All** | Click **`Reset All`** to restore all enrolled courses to the top section. |

---

## 📁 Repository Structure

```text
├── weblab-current-courses.user.js   # Userscript for Safari (Userscripts app) & Tampermonkey
├── weblab-courses-extension.zip     # Pre-packaged Manifest V3 browser extension
├── extension/                       # Unpacked Manifest V3 extension source
│   ├── manifest.json
│   ├── content.js
│   ├── content.css
│   ├── icons/                       # 16px, 48px, 128px TU Delft cyan icons
│   └── popup/                       # Extension action popup
├── bookmarklet.js                   # Formatted bookmarklet code
├── safari-bookmarklet.txt           # Single-line URL-safe bookmarklet snippet
├── LICENSE                          # MIT License
└── README.md
```

---

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome!
Feel free to open an issue or submit a Pull Request.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
