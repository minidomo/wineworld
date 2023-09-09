import { byIso } from "country-code-lookup";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { URL } from "node:url";
import { ProjectWineRegion } from "./wines";
import * as Yelp from "./api/yelp";

export interface ProjectVineyardWineRegion {
    name: string,
    country: string,
    longitude: number,
    latitude: number,
}

export interface ProjectVineyardAttributes {
    name: string,
    price: number,
    rating: number,
    reviews: number,
    image: string,
    country: string,
    url: string,
    longitude: number,
    latitude: number,
    regions: ProjectVineyardWineRegion[],
}

interface Query<E extends Yelp.BusinessSearchResponse | Yelp.ErrorResponse> {
    region: ProjectWineRegion,
    response: E,
}

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

export async function queryAllData(regions: ProjectWineRegion[]) {
    const generalYelpApiParams = {
        term: 'winery',
        categories: [categories],
        limit: '20',
    };

    const rawData: Query<Yelp.BusinessSearchResponse | Yelp.ErrorResponse>[] = [];

    // do normal for loop with inner await to prevent rate limiting
    for (const region of regions) {
        const response = await Yelp.businessSearch(process.env.YELP_API_KEY!, {
            location: `${region.name}, ${region.country}`,
            ...generalYelpApiParams,
        });

        rawData.push({ region, response });
    }

    const validResponses = rawData.filter(data => {
        if ('error' in data.response) {
            console.log(data.response.error.code);
            return false;
        }

        return true;
    }) as Query<Yelp.BusinessSearchResponse>[];

    const businesses: Map<string, Yelp.BusinessObject> = new Map();
    const businessWineRegions: Map<string, ProjectVineyardWineRegion[]> = new Map();

    validResponses.forEach(query => {
        query.response.businesses.forEach(business => {
            if (!businessWineRegions.has(business.id)) {
                businessWineRegions.set(business.id, []);
            }

            const country = byIso(business.location.country)?.country;
            if (country === query.region.country) {
                businessWineRegions.get(business.id)?.push({
                    ...query.region,
                    ...query.response.region.center,
                });
            }

            if (!businesses.has(business.id)) {
                businesses.set(business.id, business);
            }
        });
    });

    const modifiedData = [...businesses.values()]
        .map(business => modifyBusinessData(business, businessWineRegions.get(business.id) as ProjectVineyardWineRegion[]))
        .filter(business => business !== null) as ProjectVineyardAttributes[];

    return modifiedData;
}

function validateBusinessData(data: ProjectVineyardAttributes) {
    const stringValues = (Object.values(data)
        .filter(v => typeof v === 'string') as string[])
        .map(v => v.trim());

    if (stringValues.some(v => v.length === 0)) return false;

    if (data.price <= 0) return false;
    if (!(data.rating > 0)) return false;
    if (data.reviews <= 0) return false;

    return true;
}

function modifyBusinessData(data: Yelp.BusinessObject, regions: ProjectVineyardWineRegion[]): ProjectVineyardAttributes | null {
    try {
        const url = new URL(data.url);
        const country = byIso(data.location.country)!.country;

        const ret: ProjectVineyardAttributes = {
            name: data.name,
            price: data.price!.length,
            rating: data.rating,
            reviews: data.review_count,
            image: data.image_url,
            country,
            url: `${url.origin}${url.pathname}`,
            ...data.coordinates,
            regions,
        };

        return ret;
    } catch {
        return null;
    }
}

export function writeData(data: ProjectVineyardAttributes[]) {
    const jsonData = { data: data.filter(validateBusinessData) };
    const jsonString = JSON.stringify(jsonData, null, 4);

    if (!existsSync(saveDir)) {
        mkdirSync(saveDir, { recursive: true });
    }

    const fullPath = `${saveDir}/${saveFile}`;
    writeFileSync(fullPath, jsonString, { encoding: 'utf-8' })
}

export function readData(): ProjectVineyardAttributes[] {
    const fullPath = `${saveDir}/${saveFile}`;
    if (!existsSync(fullPath)) return [];

    const jsonString = readFileSync(fullPath, { encoding: 'utf-8' });
    const jsonData = JSON.parse(jsonString);
    return jsonData['data'] as ProjectVineyardAttributes[];
}
