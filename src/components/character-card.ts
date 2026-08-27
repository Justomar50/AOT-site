import type { Character } from "../types/character.types";
import erenImage from "../assets/eren.jfif";

export function createCharacterCard(character: Character) {
  const element = document.createElement("div");
  element.className = "flip-card";

  const customImages: Record<string, string> = {
    "Eren Jaeger": erenImage,
  };

  const imageSource = customImages[character.name] ?? character.img;

  const infoText = `${character.status ?? "Unknown"} · ${character.occupation ?? "Unknown"} · ${character.residence ?? "Unknown"}`;

  element.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${imageSource}" />
      </div>
      <div class="flip-card-back">
        <h3>${character.name}</h3>
        <p>${infoText}</p>
      </div>
    </div>
  `;
  element.addEventListener("click", () => {
  element.classList.toggle("is-flipped");
});

  return element;
}