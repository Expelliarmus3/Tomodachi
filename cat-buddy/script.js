const { ipcRenderer } = require("electron");

// Title bar buttons
document.getElementById("minimize-btn").addEventListener("click", () =>
  ipcRenderer.send("window:minimize")
);
document.getElementById("close-btn").addEventListener("click", () =>
  ipcRenderer.send("window:close")
);

// -- Configuration --
// 30 mins focus (1800s) + 15 mins mild break (900s) + 15 mins urgent break (900s) = 3600s total
const FOCUS_DURATION = 30 * 60; // 1800 seconds (100% to 0%)
const MILD_BREAK_END = 45 * 60;  // 2700 seconds
const MAX_TIME = 60 * 60;        // 3600 seconds (wilted / restart)
const affection_cooldown = 10000; // 10s cooldown after petting

// -- State --
let seconds_elapsed = 0; // Tracks total seconds elapsed
let affection_on_cooldown = false;
let cooldown_timer = null;

// -- Elements --
const bars = Array.from({ length: 10 }, (_, i) =>
  document.getElementById(`bar-${i + 1}`)
);
const percentage_el = document.getElementById("percentage");
const mood_tag = document.getElementById("mood");
const cat_icon = document.getElementById("cat");
const care_reminder = document.getElementById("message");
const pet_btn = document.getElementById("pet-btn");
const affection_timer_el = pet_btn.querySelector(".timer");
const restart_btn = document.getElementById("restart-btn");

// -- Render --
function updateUI() {
  // Calculate percentage remaining for the first 30 minutes
  // 1800s elapsed = 0%, 0s elapsed = 100%
  const remaining_focus_sec = Math.max(0, FOCUS_DURATION - seconds_elapsed);
  const affection_level = Math.ceil((remaining_focus_sec / FOCUS_DURATION) * 100);

  percentage_el.textContent = `${affection_level}%`;

  // Render 10 bars (each bar = 10%)
  bars.forEach((bar, i) => {
    const threshold = (i + 1) * 10;
    const filled = affection_level >= threshold;
    bar.style.background = filled ? "#e65100" : "#ff9800";
    bar.style.color = filled ? "#e65100" : "#ff9800";
  });

  // State & Message handling based on elapsed seconds
  if (seconds_elapsed < FOCUS_DURATION) {
    // Phase 1: Focusing (0 to 30 mins)
     cat_icon.src = "assets/Kitty.gif";
    mood_tag.textContent = "Thriving";
    care_reminder.textContent = "- All good here, Just Vibing! -";
    restart_btn.style.display = "none";
    pet_btn.style.display = "flex";

  } else if (seconds_elapsed < MILD_BREAK_END) {
    // Phase 2: Mild Break Prompt (30 to 45 mins)
     cat_icon.src = "assets/Attention.gif"; //new gif needed
    mood_tag.textContent = "Lonely";
    care_reminder.textContent = "- Feeling a bit lonely over here... -";
    restart_btn.style.display = "none";
    pet_btn.style.display = "flex";

  } else if (seconds_elapsed < MAX_TIME) {
    // Phase 3: Urgent Break Prompt (45 to 60 mins)
     cat_icon.src = "assets/Urgent.gif"; //new gif needed
    mood_tag.textContent = "Demanding";
    care_reminder.textContent = "- GIVE ME ATTENTION NOW!! MEOWW!! -";
    restart_btn.style.display = "none";
    pet_btn.style.display = "flex";

  } else {
    // Phase 4: Overdue / Wilted (60+ mins)
     cat_icon.src = "assets/dead.png"; //new gif needed
    mood_tag.textContent = "RIP";
    care_reminder.textContent = "- I died due to lack of attention... 💀 -";
    restart_btn.style.display = "flex";
    pet_btn.style.display = "none";
  }
}

// -- Main Timer Loop (Runs every 1 second) --
setInterval(() => {
  if (seconds_elapsed < MAX_TIME) {
    seconds_elapsed++;
    updateUI();
  }
}, 1000);

// -- Pet / Refill button --
pet_btn.addEventListener("click", () => {
  if (affection_on_cooldown) return;

  // Reset elapsed time back to 0 (100% affection)
  seconds_elapsed = 0;
  updateUI();

  // Cooldown logic
  affection_on_cooldown = true;
  pet_btn.disabled = true;
  pet_btn.style.opacity = 0.5;
  let remaining = affection_cooldown / 1000;
  affection_timer_el.textContent = `${remaining}s`;

  cooldown_timer = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(cooldown_timer);
      affection_on_cooldown = false;
      pet_btn.disabled = false;
      pet_btn.style.opacity = 1;
      affection_timer_el.textContent = "READY";
    } else {
      affection_timer_el.textContent = `${remaining}s`;
    }
  }, 1000);
});

// -- Restart button --
restart_btn.addEventListener("click", () => {
  seconds_elapsed = 0;
  affection_on_cooldown = false;
  pet_btn.disabled = false;
  pet_btn.style.opacity = 1;
  affection_timer_el.textContent = "READY";
  clearInterval(cooldown_timer);
  updateUI();
});

// Initial Render
updateUI();