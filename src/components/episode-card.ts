import type { Episode } from "../types/episode.types";

export function createEpisodeCard(episode: Episode) {
  const element = document.createElement("div");
  element.className = "episode-row";

  element.innerHTML = `
    <img src="${episode.img}" class="episode-thumbnail" />
    <div class="episode-info">
      <h4>${episode.episode} · ${episode.name}</h4>
    </div>
  `;

  return element;
}