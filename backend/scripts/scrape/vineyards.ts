import fetch from "node-fetch";
import { URLSearchParams } from "node:url";

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

const baseUrl = 'https://api.yelp.com/v3/businesses/search';

export async function yelpApi(params: Record<string, string | readonly string[]>) {
    const url = `${baseUrl}?` + new URLSearchParams(params);
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
        }
    });
    return (await response.json()) as YelpApiDataRaw;
}