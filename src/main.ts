import "./style.css";
import { fetchImportantCharacters } from "./api/character.api";
import type { Character } from "./types/character.types";
import { createCharacterCard } from "./components/character-card";
import { fetchTitans } from "./api/titans.api";
import type { Titan } from "./types/titan.types";
import { createTitansCard } from "./components/titan-card";
import { fetchEpisodes } from "./api/episode.api";
import type { Episode } from "./types/episode.types";
import { createEpisodeCard } from "./components/episode-card";

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
      <button id="episodes-btn">Episodes</button>
      <button id="about-btn">About</button>
    </div>
  </nav>
  <div id="content-area"></div>
`;

const contentArea = document.getElementById("content-area");

if (!contentArea) {
  throw new Error("content area not found");
}

const content: HTMLElement = contentArea;
let cachedCharacters: Character[] | null = null;
let cachedTitans: Titan[] | null = null;
let cachedEpisodes: Episode[] | null = null;
function showLoading() {
  content.innerHTML = `
    <div class="loading-container">
      <div class="spinner"></div>
      <p class="loading-text">Loading.........</p>
    </div>
  `;
}

function renderGrid(cards: HTMLElement[]) {
  content.innerHTML = "";

  const cardsGrid = document.createElement("div");
  cardsGrid.className = "cards-grid";

  cards.forEach((card) => {
    cardsGrid.appendChild(card);
  });

  content.appendChild(cardsGrid);
}
function renderCharactersView() {
  if (cachedCharacters) {
    const cards = cachedCharacters.map((character) => createCharacterCard(character));
    renderGrid(cards);
    return;
  }

  showLoading();

  const importantNames = [
    "Eren Jaeger", "Eren", "Mikasa", "Armin", "Levi","Erwin","Jean","Sasha",
    "Conny", "Reiner","Annie","Bertolt", "Zeke",
    "Historia", "Hange", "Kenny", "Ymir", "Hitch", "Marlo", "Nile", "Pixis",
    "Krista", "Marco", "Petra", "Floch", "Gabi", "Falco", "Porco", "Pieck", "Colt", "Magath", "Yelena", "Onyankopon",
  ];

  fetchImportantCharacters(importantNames).then((characters: Character[]) => {
    cachedCharacters = characters;
    const cards = characters.map((character) => createCharacterCard(character));
    renderGrid(cards);
  });
}
function renderTitansView() {
  if (cachedTitans) {
    const cards = cachedTitans.map((titan) => createTitansCard(titan));
    renderGrid(cards);
    return;
  }

  showLoading();

  fetchTitans().then((titans: Titan[]) => {
    cachedTitans = titans;
    const cards = titans.map((titan) => createTitansCard(titan));
    renderGrid(cards);
  });
}
function renderEpisodesView() {
  if (cachedEpisodes) {
    buildEpisodesUI(cachedEpisodes);
    return;
  }

  showLoading();

  fetchEpisodes().then((episodes: Episode[]) => {
    cachedEpisodes = episodes;
    buildEpisodesUI(episodes);
  });
}

function buildEpisodesUI(episodes: Episode[]) {
  content.innerHTML = "";

  const seasonGroups: Record<string, Episode[]> = {};

  episodes.forEach((episode) => {
    const seasonCode = episode.episode.slice(0, 3);
    if (!seasonGroups[seasonCode]) {
      seasonGroups[seasonCode] = [];
    }
    seasonGroups[seasonCode].push(episode);
  });

  const seasonCodes = Object.keys(seasonGroups);

  const seasonTabs = document.createElement("div");
  seasonTabs.className = "nav-buttons season-tabs";

  seasonCodes.forEach((seasonCode) => {
    const tabButton = document.createElement("button");
    tabButton.textContent = seasonCode;
    tabButton.addEventListener("click", () => {
      showSeasonEpisodes(seasonCode, seasonGroups[seasonCode]);
      seasonTabs.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove("active");
      });
      tabButton.classList.add("active");
    });
    seasonTabs.appendChild(tabButton);
  });

  content.appendChild(seasonTabs);

  const episodesContainer = document.createElement("div");
  episodesContainer.className = "episodes-container";
  episodesContainer.id = "episodes-list";
  content.appendChild(episodesContainer);

  if (seasonCodes.length > 0) {
    showSeasonEpisodes(seasonCodes[0], seasonGroups[seasonCodes[0]]);
    seasonTabs.querySelector("button")?.classList.add("active");
  }
}

function showSeasonEpisodes(seasonCode: string, episodes: Episode[]) {
  const episodesList = document.getElementById("episodes-list");
  if (!episodesList) {
    return;
  }

  episodesList.innerHTML = "";

  episodes.forEach((episode) => {
    const row = createEpisodeCard(episode);
    episodesList.appendChild(row);
  });
}

function renderAboutView() {
  content.innerHTML = `
    <div class="about-container">
      <section class="about-section">
        <h2>About Attack on Titan</h2>
        <p>
          Attack on Titan (Shingeki no Kyojin) is an anime adapted from Hajime
          Isayama's manga. The story follows humanity's last survivors, living
          behind massive walls to protect themselves from man-eating Titans.
          The plot centers on Eren Yeager and his companions in the Scout
          Regiment as they uncover the hidden truths behind their world.
        </p>
      </section>

      <section class="about-section">
        <h3>Seasons</h3>
        <div class="seasons-grid">
          <div class="season-card">
            <h4>Season 1</h4>
            <p>2013 · 25 Episodes</p>
            <p>Wit Studio</p>
          </div>
          <div class="season-card">
            <h4>Season 2</h4>
            <p>2017 · 12 Episodes</p>
            <p>Wit Studio</p>
          </div>
          <div class="season-card">
            <h4>Season 3</h4>
            <p>2018–2019 · 22 Episodes</p>
            <p>Wit Studio</p>
          </div>
          <div class="season-card">
            <h4>Season 4 (Final)</h4>
            <p>2020–2023 · 35 Episodes + 2 Specials</p>
            <p>MAPPA</p>
          </div>
        </div>
      </section>

      <section class="about-section">
        <h3>About This Project</h3>
        <p>
          This is a personal learning project built with Vanilla TypeScript
          and Vite to practice frontend development fundamentals: DOM
          manipulation, async data fetching, TypeScript typing, and CSS
          layout techniques. It is not an official website and has no
          affiliation with the studios, publisher, or original creator.
        </p>
        <p>
          Character, Titan, and episode data is provided by the
          <a href="https://www.attackontitanapi.com" target="_blank">Attack on Titan API</a>,
          a free community-maintained resource.
        </p>
      <a href="https://github.com/omarmahhmoud2233-ship-it/AOT-site" target="_blank" class="github-link">
  View on GitHub
</a>
      </section>

      <section class="copyright-notice">
        <h4>Copyright Notice</h4>
        <p>
          All characters, images, names, and story elements related to
          Attack on Titan are the property of Hajime Isayama and Kodansha
          (original manga), and Wit Studio / MAPPA (anime adaptation).
        </p>
        <p>
          This project is a non-commercial fan-made application created
          strictly for educational purposes. No copyright infringement is
          intended, and no revenue is generated from this site.
        </p>
      </section>
    </div>
  `;
}

const charactersBtn = document.getElementById("characters-btn");
const titansBtn = document.getElementById("titans-btn");
const episodesBtn = document.getElementById("episodes-btn");
const aboutBtn = document.getElementById("about-btn");

function setActive(activeBtn: HTMLElement | null) {
  [charactersBtn, titansBtn, episodesBtn, aboutBtn].forEach((btn) => {
    btn?.classList.remove("active");
  });
  activeBtn?.classList.add("active");
}

charactersBtn?.addEventListener("click", () => {
  renderCharactersView();
  setActive(charactersBtn);
});

titansBtn?.addEventListener("click", () => {
  renderTitansView();
  setActive(titansBtn);
});

episodesBtn?.addEventListener("click", () => {
  renderEpisodesView();
  setActive(episodesBtn);
});

aboutBtn?.addEventListener("click", () => {
  renderAboutView();
  setActive(aboutBtn);
});
const navbarTitle = document.querySelector(".navbar-title");

navbarTitle?.addEventListener("click", () => {
  renderAboutView();
  setActive(aboutBtn);
});

renderCharactersView();
setActive(charactersBtn);
