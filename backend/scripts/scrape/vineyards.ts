import fetch from "node-fetch";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { URL, URLSearchParams } from "node:url";

export interface YelpCategoryObject {
    alias: string,
    title: string,
}

export interface YelpOpenObject {
    day: string,
    start: string,
    end: string,
    is_overnight: boolean,
}

export interface YelpHourObject {
    hour_type: string,
    open: YelpOpenObject[],
    is_open_now: boolean,
}

export interface YelpBusinessObject {
    id: string,
    alias: string,
    name: string,
    image_url: string,
    is_closed: boolean,
    url: string,
    review_count: number,
    categories: YelpCategoryObject[],
    rating: number,
    coordinates: {
        latitude: number,
        longitude: number,
    },
    transactions: string[],
    price?: string,
    location: {
        address1: string,
        address2: string,
        address3: string,
        city: string,
        zip_code: string,
        country: string,
        state: string,
        display_address: string[],
    },
    phone: string,
    display_phone: string,
    distance?: string,
    hours?: YelpHourObject[],
    attributes?: Record<string, any>,
}

export interface YelpApiDataRaw {
    total: number,
    region: {
        center: {
            longitude: number,
            latitude: number,
        },
    },
    businesses: YelpBusinessObject[],
}

export interface YelpApiError {
    error: {
        code: string,
        description: string,
    },
}

export interface Region {
    name: string,
    country: string,
}

export interface YelpApiRegion {
    name: string,
    country: string,
    longitude: number,
    latitude: number,
}

export interface YelpApiDataModified {
    name: string,
    price: number,
    rating: number,
    reviews: number,
    image: string,
    country: string,
    url: string,
    longitude: number,
    latitude: number,
    regions: YelpApiRegion[],
}

interface YelpQuery<E extends YelpApiDataRaw | YelpApiError> {
    region: Region,
    response: E,
}

const baseUrl = 'https://api.yelp.com/v3/businesses/search';

// https://docs.developer.yelp.com/docs/resources-categories
const categories = [
    'wineries',
    'winetastingroom',
    'winetasteclasses',
    'beer_and_wine',
    'winetours',
    'wine_bars',
].join(',');

export const saveDir = 'data/temp/vineyards';
export const saveFile = 'vineyards.json';

export async function yelpApi(params: Record<string, string | readonly string[]>) {
    const url = `${baseUrl}?` + new URLSearchParams(params);
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
        }
    });
    return (await response.json()) as YelpApiDataRaw | YelpApiError;
}

export async function queryAllData(regions: Region[]) {
    const generalYelpApiParams = {
        term: 'winery',
        categories: [categories],
        limit: '20',
    };

    const rawData = await Promise.all(regions.map(async region => {
        const response = await yelpApi({
            location: `${region.name}, ${region.country}`,
            ...generalYelpApiParams,
        });

        const ret: YelpQuery<YelpApiDataRaw | YelpApiError> = { region, response, };
        return ret;
    }));

    const validResponses = rawData.filter(data => !('error' in data.response)) as YelpQuery<YelpApiDataRaw>[];

    const businesses: Map<string, YelpBusinessObject> = new Map();
    const businessRegions: Map<string, YelpApiRegion[]> = new Map();

    validResponses.forEach(query => {
        query.response.businesses.forEach(business => {
            if (!businessRegions.has(business.id)) {
                businessRegions.set(business.id, []);
            }

            businessRegions.get(business.id)?.push({
                ...query.region,
                ...query.response.region.center,
            });

            if (!businesses.has(business.id)) {
                businesses.set(business.id, business);
            }
        });
    });

    const modifiedData = [...businesses.values()]
        .map(business => modifyBusinessData(business, businessRegions.get(business.id) as YelpApiRegion[]))
        .filter(business => business !== null) as YelpApiDataModified[];

    return modifiedData;
}

function validateBusinessData(data: YelpApiDataModified) {
    const stringValues = (Object.values(data)
        .filter(v => typeof v === 'string') as string[])
        .map(v => v.trim());

    if (stringValues.some(v => v.length === 0)) return false;

    if (data.price <= 0) return false;
    if (!(data.rating > 0)) return false;
    if (data.reviews <= 0) return false;

    return true;
}

function modifyBusinessData(data: YelpBusinessObject, regions: YelpApiRegion[]): YelpApiDataModified | null {
    try {
        const url = new URL(data.url);

        const ret: YelpApiDataModified = {
            name: data.name,
            price: data.price!.length,
            rating: data.rating,
            reviews: data.review_count,
            image: data.image_url,
            country: regions[0].country,
            url: `${url.origin}${url.pathname}`,
            ...data.coordinates,
            regions,
        };

        return ret;
    } catch {
        return null;
    }
}

export function writeData(data: YelpApiDataModified[]) {
    const jsonData = { data: data.filter(validateBusinessData) };
    const jsonString = JSON.stringify(jsonData, null, 4);

    if (!existsSync(saveDir)) {
        mkdirSync(saveDir, { recursive: true });
    }

    const fullPath = `${saveDir}/${saveFile}`;
    writeFileSync(fullPath, jsonString, { encoding: 'utf-8' })
}

export function readData(): YelpApiDataModified[] {
    const fullPath = `${saveDir}/${saveFile}`;
    if (!existsSync(fullPath)) return [];

    const jsonString = readFileSync(fullPath, { encoding: 'utf-8' });
    const jsonData = JSON.parse(jsonString);
    return jsonData['data'] as YelpApiDataModified[];
}
