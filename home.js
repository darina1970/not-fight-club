import { characters, enemies } from "./data/characters.js";

function getRandomItem(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

document.getElementById("fightBtn").addEventListener("click", () => {
  let player = JSON.parse(localStorage.getItem("playerCharacter"));
  if (!player) {
    player = getRandomItem(characters);
    localStorage.setItem("playerCharacter", JSON.stringify(player));
  }

  let enemy = JSON.parse(localStorage.getItem("enemyCharacter"));
  if (!enemy) {
    enemy = getRandomItem(enemies);
    localStorage.setItem("enemyCharacter", JSON.stringify(enemy));
  }

  window.location.href = "fight.html";
});

const playerName = localStorage.getItem("playerName");

if (!playerName) {
  window.location.href = "index.html";
}

document.getElementById(
  "welcomeText"
).textContent = `WELCOME TO THE NOT FIGHT CLUB, ${playerName}!`;

const music = document.getElementById("bgMusic");
let musicVolume = localStorage.getItem("musicVolume");
if (musicVolume) {
  music.volume = musicVolume;
} else {
  music.volume = 0.3;
}

music.play().catch(() => {
  console.log("Autoplay blocked. User interaction required.");
});

document.getElementById("chooseBtn").addEventListener("click", () => {
  window.location.href = "character.html";
});

document.getElementById("statsBtn").addEventListener("click", () => {
  window.location.href = "characterstat.html";
});

document.getElementById("settingsBtn").addEventListener("click", () => {
  window.location.href = "settings.html";
});
