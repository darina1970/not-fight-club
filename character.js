// import { playSound } from "./js/sounds.js";
// const characters = [
//   {
//     id: 1,
//     name: "Leonardo",
//     weapon: "Katanas",
//     strength: 80,
//     img: "./assets/images/leonardo.jpg",
//   },
//   {
//     id: 2,
//     name: "Raphael",
//     weapon: "Sai",
//     strength: 80,
//     img: "./assets/images/raphael.jpeg",
//   },
//   {
//     id: 3,
//     name: "Donatello",
//     weapon: "Bo staff",
//     strength: 80,
//     img: "./assets/images/leonardo.jpg",
//   },
//   {
//     id: 4,
//     name: "Michelangelo",
//     weapon: "Nunchaku",
//     strength: 80,
//     img: "./assets/images/leonardo.jpg",
//   },
//   {
//     id: 5,
//     name: "Michelangelo",
//     weapon: "Nunchaku",
//     strength: 80,
//     img: "./assets/images/leonardo.jpg",
//   },
//   {
//     id: 6,
//     name: "Michelangelo",
//     weapon: "Nunchaku",
//     strength: 80,
//     img: "./assets/images/leonardo.jpg",
//   },
// ];

// const enemies = [
//   {
//     id: 101,
//     name: "Shredder",
//     weapon: "Claws",
//     strength: 80,
//     img: "./assets/images/leonardo.jpg",
//   },
//   {
//     id: 102,
//     name: "Bebop",
//     weapon: "Club",
//     strength: 80,
//     img: "./assets/images/leonardo.jpg",
//   },
//   {
//     id: 103,
//     name: "Rocksteady",
//     weapon: "Hammer",
//     strength: 80,
//     img: "./assets/images/leonardo.jpg",
//   },
// ];

// const bgMusic = document.getElementById("bgMusic");
// const chooseTitle = document.querySelector(".choose-title");
// const infoName = document.getElementById("infoName");
// const infoWeapon = document.getElementById("infoWeapon");
// const infoStrength = document.getElementById("infoStrength");
// const nextBtn = document.getElementById("nextBtn");

// let musicVolume = localStorage.getItem("musicVolume");
// bgMusic.volume = musicVolume ? musicVolume : 0.3;
// bgMusic.play().catch(() => console.log("Autoplay blocked"));

// let stage = "character";
// let selectedId = null;

// const swiper = new Swiper(".mySwiper", {
//   slidesPerView: 4,
//   spaceBetween: 20,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

// function renderSlides(list) {
//   swiper.removeAllSlides();

//   list.forEach((item) => {
//     const slide = document.createElement("div");
//     slide.classList.add("swiper-slide");

//     slide.innerHTML = `
//             <img src="${item.img}" alt="${item.name}">
//             <div class="tooltip">Click me</div>
//         `;

//     slide.addEventListener("mouseenter", () => {
//       infoName.textContent = item.name;
//       infoWeapon.textContent = item.weapon;
//       infoStrength.textContent = item.strength;
//     });

//     slide.addEventListener("click", () => {
//       swiper.slides.forEach((s) => s.classList.remove("selected"));
//       slide.classList.add("selected");
//       selectedId = item.id;
//       nextBtn.classList.add("active");
//       nextBtn.disabled = false;
//       playSound("select");
//     });

//     swiper.appendSlide(slide);
//   });
// }

// renderSlides(characters);

// nextBtn.addEventListener("click", () => {
//   if (!selectedId) return;

//   if (stage === "character") {
//     localStorage.setItem("playerCharacter", selectedId);
//     stage = "enemy";
//     chooseTitle.textContent = "Choose your opponent";
//     nextBtn.textContent = "Fight";
//     nextBtn.classList.remove("active");
//     nextBtn.disabled = true;
//     renderSlides(enemies);
//   } else {
//     localStorage.setItem("enemyCharacter", selectedId);
//     selectedId = null;
//     window.location.href = "fight.html";
//   }
// });

import { playSound } from "./js/sounds.js";
import { characters, enemies } from "./data/characters.js";

const bgMusic = document.getElementById("bgMusic");
const chooseTitle = document.querySelector(".choose-title");
const infoName = document.getElementById("infoName");
const infoWeapon = document.getElementById("infoWeapon");
const infoStrength = document.getElementById("infoStrength");
const nextBtn = document.getElementById("nextBtn");

let musicVolume = localStorage.getItem("musicVolume");
bgMusic.volume = musicVolume ? musicVolume : 0.3;
bgMusic.play().catch(() => console.log("Autoplay blocked"));

let stage = "character";
let selectedCharacter = null;

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function renderSlides(list) {
  swiper.removeAllSlides();

  list.forEach((item) => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

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
}

renderSlides(characters);

nextBtn.addEventListener("click", () => {
  if (!selectedCharacter) return;

  if (stage === "character") {
    // сохраняем в LocalStorage весь объект
    localStorage.setItem("playerCharacter", JSON.stringify(selectedCharacter));

    stage = "enemy";
    chooseTitle.textContent = "Choose your opponent";
    nextBtn.textContent = "Fight";
    nextBtn.classList.remove("active");
    nextBtn.disabled = true;
    selectedCharacter = null;
    renderSlides(enemies);
  } else {
    localStorage.setItem("enemyCharacter", JSON.stringify(selectedCharacter));
    selectedCharacter = null;
    window.location.href = "fight.html";
  }
});
