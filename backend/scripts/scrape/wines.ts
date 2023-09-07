import fetch from "node-fetch";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

export interface WineApiDataRaw {
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

export type WineType = 'Red' | 'White' | 'Sparkling' | 'Rose' | 'Dessert' | 'Port';

export interface WineApiDataModified {
    winery: string,
    image: string,
    rating: number,
    reviews: number,
    country: string,
    region: string,
    name: string,
    type: WineType,
}

const endpoints = ["reds", "whites", "sparkling", "rose", "dessert", "port"];
const baseUrl = 'https://api.sampleapis.com/wines';

const endpointMapping: Record<string, WineType> = {
    "reds": "Red",
    "whites": "White",
    'sparkling': 'Sparkling',
    'rose': 'Rose',
    'dessert': 'Dessert',
    'port': 'Port',
};

export const saveDir = 'data/temp/wines';
export const saveFile = 'wines.json';

export async function winesApi(endpoint: string) {
    const response = await fetch(`${baseUrl}/${endpoint}`);
    return (await response.json()) as WineApiDataRaw[];
}

function modifyWineData(data: WineApiDataRaw, type: WineType): WineApiDataModified | null {
    try {
        const match = data.rating.reviews.match(/\d+/) as RegExpMatchArray;
        const reviews = parseInt(match[0]);
        const rating = parseFloat(data.rating.average);
        const [country, region] = data.location.split('\n·\n');

        return {
            winery: data.winery,
            image: data.image,
            name: data.wine,
            type,
            reviews,
            rating,
            country,
            region,
        };
    } catch (err) {
        return null;
    }
}

export async function queryAllData() {
    const rawData = await Promise.all(endpoints.map(endpoint => winesApi(endpoint)));
    const modifiedData = rawData
        .map((wines, i) => {
            const endpoint = endpoints[i];
            return wines
                .map(wd => modifyWineData(wd, endpointMapping[endpoint]))
                .filter(wd => wd !== null) as WineApiDataModified[];
        })
        .reduce((prev, cur) => prev.concat(cur), []);
    return modifiedData;
}

function validateWineData(data: WineApiDataModified) {
    const stringValues = (Object.values(data)
        .filter(v => typeof v === 'string') as string[])
        .map(v => v.trim());

    if (stringValues.some(v => v.length === 0)) return false;

    if (data.rating <= 0) return false;
    if (data.reviews <= 0) return false;

    return true;
}

export function writeData(data: WineApiDataModified[]) {
    const jsonData = { data: data.filter(validateWineData) };
    const jsonString = JSON.stringify(jsonData, null, 4);

    if (!existsSync(saveDir)) {
        mkdirSync(saveDir, { recursive: true });
    }

    const fullPath = `${saveDir}/${saveFile}`;
    writeFileSync(fullPath, jsonString, { encoding: 'utf-8' })
}

export function readData(): WineApiDataModified[] {
    const fullPath = `${saveDir}/${saveFile}`;
    if (!existsSync(fullPath)) return [];

    const jsonString = readFileSync(fullPath, { encoding: 'utf-8' });
    const jsonData = JSON.parse(jsonString);
    return jsonData['data'] as WineApiDataModified[];
}
