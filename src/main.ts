import "./style.css";
import { fetchImportantCharacters } from "./api/character.api";
import type { Character } from "./types/character.types";
import { createCharacterCard } from "./components/character-card";
import { fetchTitans } from "./api/titans.api";
import type { Titan } from "./types/titan.types";
import { createTitansCard } from "./components/titan-card";

const appElement = document.getElementById("app");

if (!appElement) {
  throw new Error("item not found");
}

appElement.innerHTML = `
  <nav class="navbar">
    <div class="navbar-brand">
      <span class="navbar-title">Attack on Titan</span>
    </div>
    <div class="nav-buttons">
      <button id="characters-btn">Characters</button>
      <button id="titans-btn">Titans</button>
    </div>
  </nav>
  <div id="content-area"></div>
`;
const contentArea = document.getElementById("content-area");

if (!contentArea) {
  throw new Error("content area not found");
}

const content: HTMLElement = contentArea;

function showLoading() {
  content.innerHTML = `
    <div class="loading-container">
      <div class="spinner"></div>
      <p class="loading-text">Loading.........</p>
    </div>
  `;
}

function renderCharactersView() {
  showLoading();

 const importantNames = [
  "Eren Jaeger",
  "Eren",
  "Mikasa",
  "Armin",
  "Levi",
  "Erwin",
  "Jean",
  "Sasha",
  "Conny",
  "Reiner",
  "Annie",
  "Bertolt",
  "Zeke",
  "Historia",
  "Hange",
  "Kenny",
"Ymir",
"Hitch",
"Marlo",
"Nile",
"Pixis",
"Krista",
"Marco",
"Petra",
"Floch",
"Gabi",
"Falco",
"Porco",
"Pieck",
"Colt",
"Magath",
"Yelena",
"Onyankopon",
];

  fetchImportantCharacters(importantNames).then((characters: Character[]) => {
    content.innerHTML = "";

    const cardsGrid = document.createElement("div");
    cardsGrid.className = "cards-grid";

    const cards = characters.map((character) => createCharacterCard(character));
    cards.forEach((card) => {
      cardsGrid.appendChild(card);
    });

    content.appendChild(cardsGrid);
  });
}

function renderTitansView() {
  showLoading();

  fetchTitans().then((titans: Titan[]) => {
    content.innerHTML = "";

    const cardsGrid = document.createElement("div");
    cardsGrid.className = "cards-grid";

    const cards = titans.map((titan) => createTitansCard(titan));
    cards.forEach((card) => {
      cardsGrid.appendChild(card);
    });

    content.appendChild(cardsGrid);
  });
}

const charactersBtn = document.getElementById("characters-btn");
const titansBtn = document.getElementById("titans-btn");

charactersBtn?.addEventListener("click", () => {
  renderCharactersView();
  charactersBtn.classList.add("active");
  titansBtn?.classList.remove("active");
});
charactersBtn?.classList.add("active");

titansBtn?.addEventListener("click", () => {
  renderTitansView();
  titansBtn.classList.add("active");
  charactersBtn?.classList.remove("active");
});
renderCharactersView();