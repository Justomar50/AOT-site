export interface Episode {
  id: number;
  name: string;
  img: string;
  episode: string;
}

export interface EpisodesResponse {
  results: Episode[];
}