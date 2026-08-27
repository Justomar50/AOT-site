import type { Episode, EpisodesResponse } from "../types/episode.types";

const BASE_URL = "https://api.attackontitanapi.com";

async function fetchEpisodesPage(page: number): Promise<Episode[]> {
  try {
    const res = await fetch(`${BASE_URL}/episodes?page=${page}`);
    if (!res.ok) {
      throw new Error(`failed ${page}: ${res.status}`);
    }
    const json: EpisodesResponse = await res.json();
    return json.results;
  } catch (error) {
    console.error(` failed happend    ${page}:`, error);
    return [];
  }
}

export async function fetchEpisodes(): Promise<Episode[]> {
  const pagePromises = [1, 2, 3, 4, 5].map((page) => fetchEpisodesPage(page));
  const allPages = await Promise.all(pagePromises);

  return allPages.flat();
}