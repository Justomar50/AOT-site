import type { Titan, TitansResponse } from "../types/titan.types";

const BASE_URL = "https://api.attackontitanapi.com";

export async function fetchTitans(): Promise<Titan[]> {
  try {
    const res = await fetch(`${BASE_URL}/titans`);
    if (!res.ok) {
      throw new Error(`failed ${res.status}`);
    }
    const json: TitansResponse = await res.json();
    return json.results;
  } catch (error) {
    console.error(`error happend`,error);
    return [];
  }
}