let stickers = JSON.parse(localStorage.getItem('stickers')) || [];
let completedMissions = JSON.parse(localStorage.getItem('completedMissions')) || [false, false, false];

const stickerIcons = ["🐔", "🌻", "🐷", "🐮", "🥕", "🐑"];
const trophyLevels = [5, 10, 15, 20];
const trophyNames = ["Chick Champion 🐣", "Little Gardener 🌱", "Animal Pal 🐾", "Farm Expert 🎓"];
let trophyEarned = JSON.parse(localStorage.getItem('trophies')) || [];

function completeMission(index) {
  if (!completedMissions[index]) {
    completedMissions[index] = true;
    const newSticker = stickerIcons[Math.floor(Math.random() * stickerIcons.length)];
    stickers.push(newSticker);
    alert(`Yay! You earned a sticker: ${newSticker}`);
    saveData();
    updateUI();
  }
}

function updateUI() {
  // Disable completed missions
  completedMissions.forEach((done, i) => {
    document.querySelectorAll("button")[i].disabled = done;
  });

  // Show stickers
  const stickerBox = document.getElementById("stickers");
  if (stickerBox) {
    stickerBox.innerHTML = '';
    stickers.forEach(icon => {
      const el = document.createElement("span");
      el.className = 'sticker';
      el.textContent = icon;
      stickerBox.appendChild(el);
    });
  }

  // Show trophies
  const trophyBox = document.getElementById("trophyList");
  if (trophyBox) {
    trophyBox.innerHTML = '';
    trophyLevels.forEach((level, i) => {
      if (stickers.length >= level && !trophyEarned.includes(level)) {
        alert(`🏆 You unlocked a trophy: ${trophyNames[i]}!`);
        trophyEarned.push(level);
        saveData();
      }
      if (stickers.length >= level) {
        const el = document.createElement("div");
        el.className = 'trophy';
        el.textContent = `🏆 ${trophyNames[i]}`;
        trophyBox.appendChild(el);
      }
    });
  }
}

function saveData() {
  localStorage.setItem('stickers', JSON.stringify(stickers));
  localStorage.setItem('completedMissions', JSON.stringify(completedMissions));
  localStorage.setItem('trophies', JSON.stringify(trophyEarned));
}

// Sticker Book Modal Interaction
const allStickers = {
  rabbit: "🐇",
  chicken: "🐔",
  pig: "🐷",
  cow: "🐮",
  duck: "🦆",
  sheep: "🐑",
};

document.getElementById("stickerBookModal").addEventListener("show.bs.modal", () => {
  const claimed = JSON.parse(localStorage.getItem("claimedStickers")) || {};
  const grid = document.getElementById("stickerGrid");
  grid.innerHTML = "";

  for (const [key, emoji] of Object.entries(allStickers)) {
    const sticker = document.createElement("div");
    sticker.className = "sticker-slot";
    const stickerEmoji = document.createElement("span");
    stickerEmoji.className = "sticker-emoji";
    stickerEmoji.innerHTML = emoji;

    const label = document.createElement("div");
    label.className = "label";
    label.innerText = key.charAt(0).toUpperCase() + key.slice(1);

    sticker.appendChild(stickerEmoji);
    sticker.appendChild(label);

    if (!claimed[key]) {
      sticker.classList.add("locked");
      label.innerText = "Locked";
    } else {
      // Toggle visual raised effect
      sticker.addEventListener("click", () => {
        sticker.classList.toggle("selected");
      });
    }

    grid.appendChild(sticker);
  }
});

// Run on page load
updateUI();


