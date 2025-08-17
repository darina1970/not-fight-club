const playerName = localStorage.getItem("playerName");

if (!playerName) {
  window.location.href = "index.html";
}

document.getElementById(
  "welcomeText"
).textContent = `WELCOME TO THE NOT FIGHT CLUB, ${playerName}!`;

const music = document.getElementById("bgMusic");
music.volume = 0.3;
music.play().catch(() => {
  console.log("Autoplay blocked. User interaction required.");
});
document.getElementById("fightBtn").addEventListener("click", () => {
  alert("В разработке...");
  localStorage.setItem("playerCharacter", Math.floor(Math.random() * 3) + 1);
  localStorage.setItem("enemyCharacter", Math.floor(Math.random() * 2) + 1);
  window.location.href = "fight.html";
});

document.getElementById("chooseBtn").addEventListener("click", () => {
  alert("В разработке...");
  window.location.href = "character.html";
});

document.getElementById("settingsBtn").addEventListener("click", () => {
  window.location.href = "settings.html";
});
