const playerName = localStorage.getItem("playerName");

if (!playerName) {
  window.location.href = "index.html";
}

document.getElementById(
  "welcomeText"
).textContent = `WELCOME TO THE NOT FIGHT CLUB, ${playerName}!`;

document.getElementById("startFight").addEventListener("click", () => {
  alert("В разработке...");
});

document.getElementById("characterPage").addEventListener("click", () => {
  alert("В разработке...");
});
