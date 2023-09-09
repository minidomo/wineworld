import { URLSearchParams } from "node:url";

export interface CategoryObject {
    alias: string,
    title: string,
}

export interface OpenObject {
    day: string,
    start: string,
    end: string,
    is_overnight: boolean,
}

export interface HourObject {
    hour_type: string,
    open: OpenObject[],
    is_open_now: boolean,
}

export interface BusinessObject {
    id: string,
    alias: string,
    name: string,
    image_url: string,
    is_closed: boolean,
    url: string,
    review_count: number,
    categories: CategoryObject[],
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
    hours?: HourObject[],
    attributes?: Record<string, any>,
}

export interface BusinessSearchResponse {
    total: number,
    region: {
        center: {
            longitude: number,
            latitude: number,
        },
    },
    businesses: BusinessObject[],
}

export interface ErrorResponse {
    error: {
        code: string,
        description: string,
    },
}

// params - https://docs.developer.yelp.com/reference/v3_business_search
export async function businessSearch(key: string, params: Record<string, string | readonly string[]>) {
    const baseUrl = 'https://api.yelp.com/v3/businesses/search';
    const url = `${baseUrl}?` + new URLSearchParams(params);
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${key}`,
        }
    });
    return await response.json() as BusinessSearchResponse | ErrorResponse;
}