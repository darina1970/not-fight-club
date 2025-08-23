import { playSound } from "./js/sounds.js";

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

const player = JSON.parse(localStorage.getItem("playerCharacter"));
const enemy = JSON.parse(localStorage.getItem("enemyCharacter"));

const instructionEl = document.querySelector(".instruction");
const attackZones = document.getElementById("attackZones");
const defenceZones = document.getElementById("defenceZones");
const playerName =
  localStorage.getItem("playerName") || player.name || "Player";
const playerNameEl = document.getElementById("playerName");
const enemyNameEl = document.getElementById("enemyName");
const playerImgEl = document.getElementById("playerImg");
const enemyImgEl = document.getElementById("enemyImg");
const playerHealthEl = document.getElementById("playerHealth");
const enemyHealthEl = document.getElementById("enemyHealth");
const fightBtn = document.getElementById("fightBtn");
const logEl = document.getElementById("battleLog");

player.currentHealth = player.health;
enemy.currentHealth = enemy.health;

playerNameEl.textContent = player.name;
enemyNameEl.textContent = enemy.name;
playerImgEl.src = player.img;
enemyImgEl.src = enemy.img;
updateHealthBars();
instructionEl.textContent = `${playerName}, please pick 1 attack zone and 2 defence zones`;

const zones = ["head", "neck", "body", "belly", "legs"];
let selectedAttack = null;
let selectedDefence = [];

zones.forEach((zone) => {
  const attackBtn = document.createElement("div");
  attackBtn.classList.add("zone");
  attackBtn.textContent = zone;
  attackBtn.addEventListener("click", () => {
    selectedAttack = zone;
    document
      .querySelectorAll("#attackZones .zone")
      .forEach((z) => z.classList.remove("selected"));
    attackBtn.classList.add("selected");
    checkReady();
  });
  attackZones.appendChild(attackBtn);

  const defBtn = document.createElement("div");
  defBtn.classList.add("zone");
  defBtn.textContent = zone;
  defBtn.addEventListener("click", () => {
    if (selectedDefence.includes(zone)) {
      selectedDefence = selectedDefence.filter((z) => z !== zone);
      defBtn.classList.remove("selected");
    } else {
      if (selectedDefence.length < 2) {
        selectedDefence.push(zone);
        defBtn.classList.add("selected");
      }
    }
    checkReady();
  });
  defenceZones.appendChild(defBtn);
});

function checkReady() {
  if (selectedAttack && selectedDefence.length === 2) {
    fightBtn.disabled = false;
    fightBtn.classList.add("active");
  } else {
    fightBtn.disabled = true;
    fightBtn.classList.remove("active");
  }
}

function addLog(message) {
  const p = document.createElement("p");
  p.innerHTML = message;
  logEl.prepend(p);
}

function calculateDamage(attacker, defenderZones, attackZone) {
  let crit = Math.random() < attacker.critChance;
  let baseDamage = attacker.damage;
  let damage = baseDamage;

  if (defenderZones.includes(attackZone)) {
    if (crit) {
      damage = Math.round(baseDamage * attacker.critMultiplier);
    } else {
      damage = 0;
    }
  } else {
    if (crit) {
      damage = Math.round(baseDamage * attacker.critMultiplier);
    }
  }
  return { damage, crit };
}

function applyDamage(character, damage) {
  character.currentHealth = Math.max(0, character.currentHealth - damage);
}

function updateHealthBars() {
  const playerPercent = (player.currentHealth / player.health) * 100;
  const enemyPercent = (enemy.currentHealth / enemy.health) * 100;

  playerHealthEl.style.width = playerPercent + "%";
  enemyHealthEl.style.width = enemyPercent + "%";

  document.getElementById(
    "playerHealthText"
  ).textContent = `${player.currentHealth} / ${player.health}`;
  document.getElementById(
    "enemyHealthText"
  ).textContent = `${enemy.currentHealth} / ${enemy.health}`;
}

function processAttack(attacker, defender, attackZone, defenceZones) {
  const { damage, crit } = calculateDamage(attacker, defenceZones, attackZone);
  applyDamage(defender, damage);

  const entry = document.createElement("p");
  entry.innerHTML =
    damage > 0
      ? crit
        ? `<span class="log-attacker">${attacker.name}</span> CRITICALLY hit <span class="log-defender">${defender.name}</span>'s <span class="log-zone">${attackZone}</span> for <span class="log-damage">${damage}</span> damage!`
        : `<span class="log-attacker">${attacker.name}</span> hit <span class="log-defender">${defender.name}</span>'s <span class="log-zone">${attackZone}</span> for <span class="log-damage">${damage}</span> damage!`
      : `<span class="log-attacker">${attacker.name}</span> attacked <span class="log-defender">${defender.name}</span>'s <span class="log-zone">${attackZone}</span>, but it was blocked!`;

  logEl.prepend(entry);

  updateHealthBars();
  // checkBattleEnd();
}

fightBtn.addEventListener("click", doFight);

function doFight() {
  if (!selectedAttack || selectedDefence.length !== 2) return;

  const enemyAttack = getRandomZones(1)[0];
  const enemyDefence = getRandomZones(2);

  processAttack(player, enemy, selectedAttack, enemyDefence);

  processAttack(enemy, player, enemyAttack, selectedDefence);

  selectedAttack = null;
  selectedDefence = [];

  document
    .querySelectorAll(".zone.selected")
    .forEach((z) => z.classList.remove("selected"));
  fightBtn.disabled = true;
  fightBtn.classList.remove("active");

  // if (player.currentHealth <= 0 || enemy.currentHealth <= 0) {
  //   fightBtn.disabled = true;
  //   addLog("💥 Бой завершён!");
  //   updateStats(player.currentHealth > 0 ? "win" : "loss");
  // }

  checkBattleEnd();
}

function getRandomZones(count) {
  const shuffled = [...zones].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// function updateStats(result) {
//   let stats = JSON.parse(localStorage.getItem("fightStats")) || {
//     wins: 0,
//     losses: 0,
//   };

//   if (result === "win") {
//     stats.win += 1;
//     addLog("🏆 Victory!");
//   } else {
//     stats.losses += 1;
//     addLog("💀 Defeat...");
//   }

//   localStorage.setItem("fightStats", JSON.stringify(stats));
// }

function checkBattleEnd() {
  if (player.currentHealth <= 0 || enemy.currentHealth <= 0) {
    fightBtn.disabled = true;
    fightBtn.classList.remove("active");

    if (player.currentHealth <= 0 && enemy.currentHealth <= 0) {
      addLog(`<span style="color:gray;font-weight:bold;">It's a draw!</span>`);
      saveResult("draw");
    } else if (player.currentHealth <= 0) {
      addLog(
        `<span style="color:red;font-weight:bold;">${enemy.name} wins!</span>`
      );
      saveResult("loss");
    } else {
      addLog(
        `<span style="color:green;font-weight:bold;">${player.name} wins!</span>`
      );
      saveResult("win");
    }

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "New Battle";
    restartBtn.classList.add("restart-btn");
    restartBtn.addEventListener("click", startNewBattle);
    logEl.prepend(restartBtn);
  }
}

function saveResult(result) {
  let stats = JSON.parse(localStorage.getItem("battleStats")) || {
    wins: 0,
    losses: 0,
    draws: 0,
  };

  if (result === "win") stats.wins++;
  if (result === "loss") stats.losses++;
  if (result === "draw") stats.draws++;

  localStorage.setItem("battleStats", JSON.stringify(stats));
}

function startNewBattle() {
  // Сбрасываем здоровье
  player.currentHealth = player.health;
  enemy.currentHealth = enemy.health;

  updateHealthBars();

  selectedAttack = null;
  selectedDefence = [];
  document
    .querySelectorAll(".zone")
    .forEach((z) => z.classList.remove("selected"));

  document.querySelectorAll(".restart-btn").forEach((btn) => btn.remove());

  fightBtn.disabled = true;
  fightBtn.classList.remove("active");

  logEl.innerHTML = "";

  addLog(
    `<span style="color:orange;font-weight:bold;">New battle started!</span>`
  );
}
