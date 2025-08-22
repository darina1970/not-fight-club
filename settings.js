const playerNameInput = document.getElementById("playerName");
const saveNameBtn = document.getElementById("saveName");
const saveVolumeBtn = document.getElementById("saveVolume");
const volumeControl = document.getElementById("volumeControl");
const bgMusic = document.getElementById("bgMusic");
const backBtn = document.getElementById("settingsBackBtn");

let playerName = localStorage.getItem("playerName") || "";
playerNameInput.value = playerName;

playerNameInput.addEventListener("focus", () => {
  playerNameInput.value = "";
});

playerNameInput.addEventListener("blur", () => {
  if (playerNameInput.value.trim() === "") {
    playerNameInput.value = playerName;
  }
});

let musicVolume = localStorage.getItem("musicVolume");
if (musicVolume) {
  bgMusic.volume = musicVolume;
  volumeControl.value = musicVolume;
} else {
  bgMusic.volume = 0.3;
  volumeControl.value = 0.3;
}

bgMusic.play().catch(() => {
  console.log("Autoplay blocked, will play on user interaction");
});

saveNameBtn.addEventListener("click", () => {
  const newName = playerNameInput.value.trim();
  if (newName) {
    localStorage.setItem("playerName", newName);
    alert("New name saved!");
  } else {
    alert("Please enter a valid name!");
  }
});

volumeControl.addEventListener("input", () => {
  bgMusic.volume = volumeControl.value;
});

saveVolumeBtn.addEventListener("click", () => {
  localStorage.setItem("musicVolume", volumeControl.value);
  alert("Music volume saved!");
});

backBtn.addEventListener("click", () => {
  window.history.back();
});
