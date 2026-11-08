# 📦 Publishing & Sharing WebLab Enhancer

This guide explains how to make **WebLab - Courses Currently Taking** public so fellow TU Delft students can use it.

---

## 🚀 Option 1: Share on GitHub (Zero Cost, Immediate)

1. Create a new public repository on GitHub (e.g. `weblab-current-courses`).
2. Push the contents of the `weblab-enhancer/` directory to that repository.
3. Add a link in your README:
   - **For Chrome / Edge / Brave / Arc users**:
     1. Download `weblab-courses-extension.zip` from Releases.
     2. Unzip the folder.
     3. Go to `chrome://extensions`, enable **Developer mode** (top-right).
     4. Click **Load unpacked** and select the `extension` folder.
   - **For Safari & Tampermonkey users**:
     1. Click the raw link to `weblab-current-courses.user.js`.
     2. Userscripts / Tampermonkey will prompt: **"Install script?"** → Click **Install**.

---

## 🦊 Option 2: Firefox Add-ons Store (100% Free, Official Store)

Mozilla allows anyone to publish extensions on [addons.mozilla.org (AMO)](https://addons.mozilla.org/) for free:

1. Create a free account at [addons.mozilla.org](https://addons.mozilla.org/).
2. Click **Submit a New Add-on**.
3. Upload `weblab-courses-extension.zip`.
4. Fill in the title, description, and tags (`tudelft`, `weblab`).
5. Once approved (usually within 24–48 hours), any student on Firefox can install it with a single click from the official store.

---

## ⚡ Option 3: GreasyFork (Instant 1-Click for Userscripts)

GreasyFork is the official public directory for browser scripts:

1. Go to [GreasyFork.org](https://greasyfork.org/) and sign in with GitHub.
2. Click **"Post a new script"**.
3. Paste the contents of `weblab-current-courses.user.js`.
4. Click **Post**.
5. You get a public URL (e.g. `greasyfork.org/scripts/...`) where any student with Tampermonkey, Violentmonkey, or Safari Userscripts can click **"Install"** with 1 click.

---

## 🌐 Option 4: Chrome Web Store ($5 one-time developer fee)

1. Register at the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) ($5 one-time Google fee).
2. Click **Add new item** and upload `weblab-courses-extension.zip`.
3. Add screenshots of your WebLab dashboard.
4. Submit for review (takes 1–3 business days).
