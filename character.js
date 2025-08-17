const characters = [
  {
    id: 1,
    name: "Leonardo",
    weapon: "Katanas",
    strength: 80,
    img: "./assets/images/leonardo.jpg",
  },
  {
    id: 2,
    name: "Raphael",
    weapon: "Sai",
    strength: 80,
    img: "./assets/images/raphael.jpeg",
  },
  {
    id: 3,
    name: "Donatello",
    weapon: "Bo staff",
    strength: 80,
    img: "./assets/images/leonardo.jpg",
  },
  {
    id: 4,
    name: "Michelangelo",
    weapon: "Nunchaku",
    strength: 80,
    img: "./assets/images/leonardo.jpg",
  },
];

const enemies = [
  {
    id: 101,
    name: "Shredder",
    weapon: "Claws",
    strength: 80,
    img: "./assets/images/leonardo.jpg",
  },
  {
    id: 102,
    name: "Bebop",
    weapon: "Club",
    strength: 80,
    img: "./assets/images/leonardo.jpg",
  },
  {
    id: 103,
    name: "Rocksteady",
    weapon: "Hammer",
    strength: 80,
    img: "./assets/images/leonardo.jpg",
  },
];

const gallery = document.getElementById("gallery");
const nextBtn = document.getElementById("nextBtn");
const characterTitle = document.querySelector(".character-title");

const infoName = document.getElementById("infoName");
const infoWeapon = document.getElementById("infoWeapon");
const infoStrength = document.getElementById("infoStrength");

let stage = "character";
let selectedId = null;

function renderGallery(list) {
  gallery.innerHTML = "";
  list.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = item.id;

    card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="tooltip">Click me</div>
        `;

    card.addEventListener("mouseenter", () => {
      infoName.textContent = item.name;
      infoWeapon.textContent = item.weapon;
      infoStrength.textContent = item.strength;
    });

    card.addEventListener("click", () => {
      document
        .querySelectorAll(".card")
        .forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedId = item.id;
      nextBtn.classList.add("active");
      nextBtn.disabled = false;
    });

    gallery.appendChild(card);
  });
}

renderGallery(characters);
