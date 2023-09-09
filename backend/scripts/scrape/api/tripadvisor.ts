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
    latitude?: string,
    longitude?: string,
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
        code: string,
    },
}

export interface AncestorObject {
    abbrv?: string,
    level: string,
    name: string,
    location_id: string,
}

export interface RankingDataObject {
    geo_location_id: string,
    ranking_string: string,
    geo_location_name: string,
    ranking_out_of: string,
    ranking: string,
}

export interface ReviewRatingCountObject {
    '1': string,
    '2': string,
    '3': string,
    '4': string,
    '5': string,
}

export interface PeriodObject {
    open: {
        day: number,
        time: string,
    },
    close: {
        day: number,
        time: string,
    },
}

export interface CategoryObject {
    name: string,
    localized_name: string,
}

export interface HoursObject {
    periods: PeriodObject[],
    weekday_text: string[],
    subcategory?: CategoryObject[],
}

export interface GroupObject {
    name: string,
    localized_name: string,
    categories: CategoryObject[],
}

export interface TripTypeObject {
    name: string,
    localized_name: string,
    value: string,
}

export interface LocationDetailsResponse {
    location_id: string,
    name: string,
    description: string,
    web_url: string,
    address_obj: AddressObject,
    ancestors: AncestorObject[],
    latitude?: string,
    longitude?: string,
    timezone: string,
    email?: string,
    phone?: string,
    website?: string,
    write_review: string,
    ranking_data: RankingDataObject,
    rating: string,
    rating_image_url: string,
    num_reviews: string,
    review_rating_count: ReviewRatingCountObject,
    subratings?: any,
    photo_count: string,
    see_all_photos: string,
    price_level: string,
    hours: HoursObject,
    amenities?: string[],
    features?: string[],
    cuisine?: any[],
    parent_brand?: string,
    brand?: string,
    category: CategoryObject,
    subcategory: CategoryObject[],
    groups: GroupObject[],
    styles?: string[],
    neighborhood_info?: any[],
    trip_types: TripTypeObject[],
    awards: any[],
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

export async function locationDetails(key: string, locationId: string, params: Record<string, string | readonly string[]>) {
    const baseUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details`;
    const url = `${baseUrl}?` + new URLSearchParams({ ...params, key });
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'accept': 'application/json',
        }
    });
    return await response.json() as LocationDetailsResponse | ErrorResponse;
}
