import fetch from "node-fetch";
import { URLSearchParams } from "node:url";

export interface AddressObject {
    street1?: string,
    street2?: string,
    city?: string,
    state?: string,
    country?: string,
    postalcode?: string,
    address_string?: string,
    phone?: string,
    latitude?: number,
    longitude?: number,
}

export interface SimpleLocationObject {
    location_id: string,
    name: string,
    distance: string,
    rating?: string,
    bearing: string,
    address_obj: AddressObject,
}

export interface NearbyLocationSearchResponse {
    data: SimpleLocationObject[],
}

export interface ErrorResponse {
    error: {
        message: string,
        type: string,
        code: number,
    },
}

// params - https://tripadvisor-content-api.readme.io/reference/searchfornearbylocations
export async function nearbyLocationSearch(key: string, params: Record<string, string | readonly string[]>) {
    const baseUrl = 'https://api.content.tripadvisor.com/api/v1/location/nearby_search';
    const url = `${baseUrl}?` + new URLSearchParams({ ...params, key });
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'accept': 'application/json',
        }
    });
    return await response.json() as NearbyLocationSearchResponse | ErrorResponse;
}