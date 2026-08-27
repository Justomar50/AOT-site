import type { Character, CharactersResponse } from "../types/character.types";

const BASE_URL = "https://api.attackontitanapi.com";

async function fetchCharacterByName(name: string): Promise<Character | null> {
  try {
    const res = await fetch(`${BASE_URL}/characters?name=${encodeURIComponent(name)}`);
    if (!res.ok) {
      throw new Error(`error   ${name}: ${res.status}`);
    }
    const json: CharactersResponse = await res.json();
    return json.results[0] ?? null;
  } catch (error) {
    console.error(` error ${name}:`, error);
    return null;
  }
}


export async function fetchImportantCharacters(names: string[]): Promise<Character[]> {
  const promises = names.map((name) => fetchCharacterByName(name));
  const results = await Promise.all(promises);

  const characters = results.filter((character): character is Character => character !== null);

  return characters;
}