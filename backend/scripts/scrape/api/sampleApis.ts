import fetch from "node-fetch";

export interface WineAttributes {
    winery: string,
    wine: string,
    rating: {
        average: string,
        reviews: string,
    },
    location: string,
    image: string,
    id: number,
}

export type WineType = 'reds' | 'whites' | 'sparkling' | 'rose' | 'dessert' | 'port';

export async function wines(type: WineType) {
    const baseUrl = 'https://api.sampleapis.com/wines';
    const response = await fetch(`${baseUrl}/${type}`);
    return await response.json() as WineAttributes[];
}