# 🐾 Tomodachi (友達)

**Tomodachi** (Japanese for *Friends/Buddies*) is a collection of cute, desktop-dwelling virtual companions designed to keep you company and help you manage your focus sessions using Pomodoro technique while working.

---

## 🐱 Met Momo — Your First Companion!

**Momo** is a cozy, pixel-art cat buddy built to balance your productivity and remind you to take breaks. 

### ⏱️ How Momo Works (The 30-15-15 Rule)

Momo runs on a custom 60-minute focus cycle that balances deep work with timely break reminders:

* **0 – 30 Mins (Focus Mode)**: Momo stays happy while you dive deep into work. The affection meter drains from `100%` down to `0%`.
* **30 – 45 Mins (Mild Break Call)**: Momo gets a little lonely. It's your cue to wrap up your task and take a 15-minute break.
* **45 – 60 Mins (Urgent Break Call)**: If you keep ignoring Momo, the mood shifts to **Demanding**.
* **60+ Mins (Overdue)**: Neglect Momo for a full hour, and Momo dies, requiring a fresh restart!

Click **PET ME** during break time to refill Momo's affection back to 100% and start a new focus session!

---

## 🛠️ Tech Stack

* **Framework**: [Electron.js](https://www.electronjs.org/)
* **Frontend**: HTML5, CSS3 (Pixelify Sans font), Vanilla JavaScript
* **IPC**: Electron `ipcRenderer` for frameless window controls (minimize/close)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/tomodachi.git](https://github.com/YOUR_USERNAME/tomodachi.git)
   cd tomodachi

2. **Install dependencies:**
   ```bash
   npm install  

3. **Run the app:**
   ```bash
   npm start


## 📂 Project Structure

```text
Tomodachi/
├── assets/          # Images, icons, and GIFs for Momo
├── index.html       # App layout & pet meter UI
├── main.js          # Electron main process & window configuration
├── script.js        # Companionship & timer logic
├── styles.css       # Retro/Pixel theme styling
└── package.json     # Project dependencies & scripts
```

## 🗺️ Roadmap & Future Companions
[x] Momo (Cat Companion) — Focus & Break companion 

[ ] Panda Buddy — Water tracking companion

[ ] Custom Timer Settings — Adjustable focus/break intervals

[ ] Sound Effects & Audio Cues — Subtle meows and UI clicks