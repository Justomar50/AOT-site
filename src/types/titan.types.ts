export interface Titan{
    id: number;
    name: string;
    img: string;
    height: string;
    abilities: string[];


}
export interface TitansResponse {
    results: Titan[];

}

