# OpenRCT2 RGB Chroma (v1.0.0)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![OpenRCT2](https://img.shields.io/badge/OpenRCT2-v0.4.0%2B-green.svg)](https://openrct2.io)

A dedicated, ultra-high-performance **60 FPS Real-Time Rainbow RGB Chroma FX** plugin for [OpenRCT2](https://openrct2.io).

---

## 🌟 Credits & Authors

* **Lead Developer:** [ReaLFoxy](https://github.com/ReaLFoxy)
* **AI Coding Partner:** Google Gemini 3.8 Flash (High)

---

## 💡 About RGB Chroma

**RGB Chroma** transforms your OpenRCT2 park into a dazzling, synchronized RGB light show! From roller coaster trains to track structures, souvenir stalls, guest accessories, and staff uniforms, everything can dance together to real-time continuous rainbow waves running at a silky-smooth **60 FPS** with **zero lag**.

---

## ✨ Features

### 🌈 Dual Animation FX Modes
* 🌊 **Smooth Breathing RGB**: 32-step serpentine traversal through OpenRCT2's native color palette grid, providing organic, breathing color transitions without harsh jumps.
* 🌈 **Classic Rainbow Spectrum**: 9-step vibrant spectrum rotation.

### 🎢 Intelligent Vehicle Styling
* **Per Car (Rainbow Cars / 차량마다 다른 색)**: Colors shift dynamically backward along the train from car to car in real time. Works dynamically with any train length ($1 \sim N$ cars)!
* **Per Train (Distinct Trains / 편성마다 다른 색)**: Each train cycles with its own harmonized phase offset.
* **All Same (Synchronized / 모든 차량 같은 색)**: Synchronous train-wide color cycle.
* **Automatic In-Game Sync**: Automatically synchronizes OpenRCT2's internal `vehicleColourSettings` (`type: 6`) to match the selected mode.

### 🎡 Multi-Target Animation
* **Vehicles**: Real-time coloring for roller coaster trains, tracked rides, and flat rides (Carousel, Ferris Wheel, Enterprise, Top Spin, Launched Freefall, etc.).
* **Tracks & Ride Structures**: Synchronous 12-slot wave animation cycling Main and Alt 1–3 schemes across all coaster tracks, towers, and flat ride frames simultaneously.
* **Balloons & Shops**: Real-time color transitions for guest balloons, umbrellas, and the merchandise displayed on stall sprites (Balloon Stalls, Souvenir Stalls, Hat Stalls, T-Shirt Stalls, Information Kiosks, and facilities).
* **Guests & Staff Clothes**: Synchronized T-shirts and hats for guests, plus harmonized uniforms for **Handymen (미화원)**, **Mechanics (정비원)**, and **Security Guards (보안요원)**.

### ⚡ Zero-Lag Architecture & Controls
* **Direct Entity In-Memory Updates**: Moving coaster cars and guest clothes update via direct memory manipulation (`car.colours`), eliminating game action queue bottlenecks and guaranteeing **rock-solid 60 FPS**.
* **Automatic Snapshot & Restore**: When RGB Chroma is enabled, an in-memory snapshot of your park's original colors is captured.
* **Stop RGB & Restore Colors**: Instantly reverts all rides, stalls, and staff back to their pre-RGB original colors.
* **Stop RGB (Keep Colors) / Restart RGB**: Freezes the rainbow animation in place, preserving the vibrant rainbow look on all park assets, and lets you resume the cycle whenever you like!

### ⏱️ Speed Controls
* `Slow (Chill Wave)`
* `Normal (Classic Chroma)`
* `Fast (Hyper Gamer RGB)`

---

## ⚠️ Known Issues
* **Color Restore Incomplete (색상 복원 미완료 현상)**: When clicking **"Stop RGB & Restore Colors"**, guest clothes, staff uniforms (미화원/정비원), stall merchandise items (풍선/우산/모자), and certain vehicle types currently may not completely revert back to their original pre-Chroma colors due to entity memory persistence and sprite palette constraints. Track structures (spines, rails, supports) and primary ride frames restore normally. A more comprehensive snapshot & restore engine for transient entities is planned for a future patch.

---

## 📥 Installation

1. Copy **`dist/rgb-chroma.js`** to your OpenRCT2 `plugin` folder:
   * **Windows**: `Documents\OpenRCT2\plugin\`
     *(e.g. `C:\Users\<YourUsername>\Documents\OpenRCT2\plugin\`)*
   * **macOS**: `~/Library/Application Support/OpenRCT2/plugin/`
   * **Linux**: `~/.config/OpenRCT2/plugin/`
2. Launch OpenRCT2 and open **RGB Chroma** from the top map menu dropdown.

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
