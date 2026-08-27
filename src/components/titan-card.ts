import type { Titan } from "../types/titan.types";


export function createTitansCard(titan:Titan) {
      const element = document.createElement("div");
  element.className = "flip-card";
const abilitiesText = titan.abilities.slice(0, 2).join(", ");
    element.innerHTML = `
     <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${titan.img}" />
      </div>
      <div class="flip-card-back">
        <h3>${titan.name}</h3>
        <p>Height: ${titan.height}</p>
        <p>Abilities: ${abilitiesText}</p>
      </div>
    </div>
  `;
element.addEventListener("click", () => {
  element.classList.toggle("is-flipped");
});
  return element;
    
}
