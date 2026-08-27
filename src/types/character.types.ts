export interface Character {
  id: number;
  name: string;
  img: string;
  status: string | null;
  occupation: string | null;
  residence: string | null;
  roles: string[];
}

export interface CharactersResponse {
  results: Character[];
}