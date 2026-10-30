# OpenRCT2 RGB Chroma (v1.1.0)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![OpenRCT2](https://img.shields.io/badge/OpenRCT2-v0.4.0%2B-green.svg)](https://openrct2.io)

A dedicated, ultra-high-performance **60 FPS Real-Time Rainbow RGB Chroma FX** plugin for [OpenRCT2](https://openrct2.io).

---

## 🌟 Credits & Authors

* **Lead Developer:** [ReaLFoxy](https://github.com/ReaLFoxy)
* **AI Coding Partner:** Google Gemini 3.8 Flash (High)

---

## 💡 About RGB Chroma

**RGB Chroma** transforms your OpenRCT2 park into a dazzling, synchronized RGB light show! From roller coaster trains to track structures, water bodies, souvenir stalls, guest accessories, and staff uniforms, everything dances together to real-time continuous rainbow waves running at a silky-smooth **60 FPS** with **zero lag**.

---

## ✨ Features

### 🌈 Dual Animation FX Modes
* 🌊 **Smooth Breathing RGB**: 32-step serpentine traversal through OpenRCT2's native color palette grid, providing organic, breathing color transitions without harsh jumps.
* 🌈 **Classic Rainbow Spectrum**: 9-step vibrant spectrum rotation.

### 🎢 Intelligent Vehicle Styling
* **Per Car (Rainbow Cars)**: Colors shift dynamically backward along the train from car to car in real time. Works dynamically with any train length ($1 \sim N$ cars)!
* **Per Train (Distinct Trains)**: Each train cycles with its own harmonized phase offset.
* **All Same (Synchronized)**: Synchronous train-wide color cycle.
* **Automatic In-Game Sync**: Automatically synchronizes OpenRCT2's internal `vehicleColourSettings` (`type: 6`) to match the selected mode.

### 🎡 Multi-Target Animation
* **Vehicles**: Real-time coloring for roller coaster trains, tracked rides, and flat rides (Carousel, Ferris Wheel, Enterprise, Top Spin, Launched Freefall, etc.).
* **Tracks & Ride Structures**: Synchronous wave animation cycling Main and Alt 1–3 schemes across all coaster tracks, towers, and flat ride frames simultaneously. Alt schemes 1–3 feature a staggered 2-step phase delay per index, creating dynamic multi-color track gradients along coaster layouts.
* **Water Bodies (RGB Chroma Cycle)**: Real-time water palette shifting locked 1:1 with the park's main chroma cycle. Breathes in harmony across all 32 steps in Breathing mode, or cycles through 9 bold spectrum colors in Classic mode.
* **Balloons & Shops**: Real-time color transitions for guest balloons, umbrellas, and the merchandise displayed on stall sprites (Balloon Stalls, Souvenir Stalls, Hat Stalls, T-Shirt Stalls, Information Kiosks, and facilities).
* **Guests & Staff Clothes**: Synchronized T-shirts and hats for guests, plus harmonized uniforms for **Handymen**, **Mechanics**, and **Security Guards**.

### ⚡ Zero-Lag Architecture & Controls
* **Direct Entity In-Memory Updates**: Moving coaster cars and guest clothes update via direct memory manipulation (`car.colours`), eliminating game action queue bottlenecks and guaranteeing **rock-solid 60 FPS**.
* **Automatic Snapshot & Restore**: When RGB Chroma is enabled or stepped manually, an in-memory snapshot of your park's original colors is captured.
* **`< Prev Step` / `Next Step >` Frame-by-Frame Navigation**: Step through the RGB color phases one tick at a time while stopped. Automatically pauses active animation, allowing players to leisurely browse and inspect every color combination across trains, tracks, water, and stalls.
* **Apply Current as Permanent**: Found a stunning color palette combination you love? Freeze and commit the current colors to your park's save file permanently as the new default!
* **Stop RGB (Keep Colors) / Restart RGB**: Freezes the animation in place without reverting colors, letting you pause or resume the RGB wave whenever you like.
* **Stop RGB & Restore Colors**: Reverts all rides, stalls, water, and structures back to their pre-RGB original baseline colors.

### ⏱️ Speed Controls
* `Slow (Chill Wave)`
* `Normal (Classic Chroma)`
* `Fast (Hyper Gamer RGB)`

---

## 📥 Installation

For the full experience (including synchronized Water RGB cycling), install both the plugin script and the bundled water objects:

### 1. Plugin Script
Copy **`dist/rgb-chroma.js`** to your OpenRCT2 `plugin` folder:
* **Windows**: `Documents\OpenRCT2\plugin\`
* **macOS**: `~/Library/Application Support/OpenRCT2/plugin/`
* **Linux**: `~/.config/OpenRCT2/plugin/`

### 2. Custom Water Objects (for Water RGB Cycle)
Copy the contents of the **`objects/`** folder (`openrct2.water.chroma_00.json` ~ `_31.json`) to your OpenRCT2 `object` folder:
* **Windows**: `Documents\OpenRCT2\object\`
* **macOS**: `~/Library/Application Support/OpenRCT2/object/`
* **Linux**: `~/.config/OpenRCT2/object/`

> **Note:** If you download a release ZIP, simply extract the `plugin/` and `object/` folders directly into your `OpenRCT2/` user directory.

---

## 🌊 Custom Water Objects & Compatibility FAQ

### Q. What happens if someone doesn't install the custom water objects?
* **Zero Crashes, Graceful Fallback**: The plugin has built-in safety guards. If a player installs only `rgb-chroma.js` without the water JSON files, all core RGB features (roller coasters, flat rides, guests, stalls, and staff) will continue to work normally at 60 FPS. Only the water will remain at its current vanilla palette.

### Q. What if I share my saved park (`.park`) with someone who doesn't have the plugin or objects?
* **Automatic Object Embedding**: OpenRCT2 automatically embeds any loaded custom objects directly into `.park` scenario and save files. If you use **"Apply Current as Permanent"** to lock in a custom water color and save the park, other players who download your `.park` file will see the custom water palette automatically, even if they never installed the object files beforehand!

---

## 📋 Planned Features / Roadmap (To-Do List)

* [ ] 🌳 **Scenery & Architecture Object Color Synchronization**:
  * Real-time RGB Chroma color synchronization for recolorable scenery elements (walls, roofs, fences, abstract geometric shapes, path banners, and decorative garden blocks).
  * Enable park builders to sync architectural illumination and thematic park scenery directly with roller coaster tracks and water light waves.
* [ ] 🔄 **Enhanced Snapshot & Restore Engine**:
  * Persistent cache restoration for transient entities (guest clothing and stall merchandise) upon stopping RGB mode.

---

## ⚠️ Known Issues
* **Incomplete Color Restore for Transient Entities**: When clicking **"Stop RGB & Restore Colors"**, guest clothing, staff uniforms, and certain transient stall merchandise items may not completely revert to their pre-Chroma colors due to entity lifecycle and in-memory palette limitations. Track structures, ride vehicles, and water palettes restore normally.

---

## 🛠️ Building from Source

```bash
# Install dependencies
npm install

# Build production bundle to dist/rgb-chroma.js
npm run build

# Or live build & watch for local development
npm start
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).  
Copyright (c) 2026 ReaLFoxy & Contributors.
