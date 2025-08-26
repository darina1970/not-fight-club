import { playSound } from "./js/sounds.js";
import { characters, enemies } from "./data/characters.js";

const bgMusic = document.getElementById("bgMusic");
const chooseTitle = document.querySelector(".choose-title");
const infoName = document.getElementById("infoName");
const infoWeapon = document.getElementById("infoWeapon");
const infoStrength = document.getElementById("infoStrength");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

backBtn.style.display = "none";

let musicVolume = localStorage.getItem("musicVolume");
bgMusic.volume = musicVolume ? musicVolume : 0.3;
bgMusic.play().catch(() => console.log("Autoplay blocked"));

let stage = "character";
let selectedCharacter = null;

const savedCharacter = JSON.parse(localStorage.getItem("playerCharacter"));

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
      infoName.textContent = item.name;
      infoWeapon.textContent = item.weapon;
      infoStrength.textContent = item.strength;
      selectedCharacter = item;
      nextBtn.classList.add("active");
      nextBtn.disabled = false;
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

renderSlides(characters, savedCharacter);

backBtn.addEventListener("click", () => {
  if (stage === "enemy") {
    stage = "character";
    chooseTitle.textContent = "Choose your character";
    nextBtn.textContent = "Next";
    nextBtn.classList.remove("active");
    nextBtn.disabled = true;

    selectedCharacter =
      JSON.parse(localStorage.getItem("playerCharacter")) || null;

    infoName.textContent = "";
    infoWeapon.textContent = "";
    infoStrength.textContent = "";

    renderSlides(characters, selectedCharacter);

    backBtn.style.display = "none";
  }
});

nextBtn.addEventListener("click", () => {
  if (!selectedCharacter) return;

  if (stage === "character") {
    localStorage.setItem("playerCharacter", JSON.stringify(selectedCharacter));
    localStorage.removeItem("currentBattle");

    stage = "enemy";
    chooseTitle.textContent = "Choose your opponent";
    nextBtn.textContent = "Fight";
    nextBtn.classList.remove("active");
    nextBtn.disabled = true;
    selectedCharacter = null;

    infoName.textContent = "";
    infoWeapon.textContent = "";
    infoStrength.textContent = "";

    renderSlides(enemies);

    backBtn.style.display = "inline-block";
  } else {
    localStorage.setItem("enemyCharacter", JSON.stringify(selectedCharacter));
    localStorage.removeItem("currentBattle");
    selectedCharacter = null;
    window.location.href = "fight.html";
  }
});
