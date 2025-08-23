import { characters } from "./data/characters.js";

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

const playerName = localStorage.getItem("playerName") || "Player";
let selectedCharacter = JSON.parse(localStorage.getItem("playerCharacter"));
const stats = JSON.parse(localStorage.getItem("battleStats")) || null;

const characterImgEl = document.getElementById("characterImg");
const modal = document.getElementById("characterModal");
const closeModalBtn = document.getElementById("closeModal");

const infoName = document.getElementById("infoName");
const infoWeapon = document.getElementById("infoWeapon");
const infoStrength = document.getElementById("infoStrength");
const nextBtn = document.getElementById("nextBtn");

function updateCharacterDisplay(char) {
  if (char) {
    characterImgEl.src = char.img;
    document.getElementById("characterName").textContent = char.name;
    document.getElementById("characterWeapon").textContent = char.weapon;
    document.getElementById("characterStrength").textContent = char.strength;
  } else {
    characterImgEl.src = "assets/images/plus.jpg";
    document.getElementById("characterName").textContent =
      "Choose your character";
    document.getElementById("characterWeapon").textContent = "-";
    document.getElementById("characterStrength").textContent = "-";
  }
}

updateCharacterDisplay(selectedCharacter);

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function renderSlides(list, highlight = null) {
  swiper.removeAllSlides();

  list.forEach((item) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");
    if (highlight && item.name === highlight.name) {
      slide.classList.add("selected");
    }

    slide.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="tooltip">Click me</div>
    `;

    slide.addEventListener("mouseenter", () => {
      infoName.textContent = item.name;
      infoWeapon.textContent = item.weapon;
      infoStrength.textContent = item.strength;
    });

    slide.addEventListener("click", () => {
      swiper.slides.forEach((s) => s.classList.remove("selected"));
      slide.classList.add("selected");
      selectedCharacter = item;
      nextBtn.classList.add("active");
      nextBtn.disabled = false;
      playSound("select");
    });

    swiper.appendSlide(slide);
  });

  if (highlight) {
    const index = list.findIndex((c) => c.name === highlight.name);
    if (index >= 0) swiper.slideTo(index, 0);
  }
}

characterImgEl.addEventListener("click", () => {
  renderSlides(characters, selectedCharacter);
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  if (!selectedCharacter) return;
  localStorage.setItem("playerCharacter", JSON.stringify(selectedCharacter));
  updateCharacterDisplay(selectedCharacter);
  modal.style.display = "none";
});

document.getElementById("playerName").textContent = playerName;
document.getElementById("playerNameStats").textContent = playerName;

const statsContainer = document.getElementById("statsContainer");
if (stats) {
  statsContainer.innerHTML = `
        <p><strong>Wins:</strong> ${stats.wins}</p>
        <p><strong>Losses:</strong> ${stats.losses}</p>
        <p><strong>Draws:</strong> ${stats.draws}</p>
    `;
} else {
  statsContainer.textContent = "⚔️ Fight and start writing your story";
}
