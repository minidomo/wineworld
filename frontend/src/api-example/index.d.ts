declare global {
    namespace ApiExample {

        namespace SiteApi {
            interface Config {
                params: Record<string | number, any>,
                failOnPurpose: boolean,
            }

            interface Response {
                status: number,
                statusText: string,
                data: Record<string, any> | string,
            }

            interface ErrorResponse {
                message: string,
                name: string,
                code: string,
                response: Response,
            }

            type GetRequestFunction = (url: string, config?: Config) => Promise<Response>;
        }

        namespace Database {
            type WineType = 'Red' | 'White' | 'Sparkling' | 'Rose' | 'Dessert' | 'Port';
            type TripType = 'Business' | 'Couples' | 'Solo' | 'Family' | 'Friends';

            type MiniWineSchema = Omit<WineSchema, 'related'>;
            type MiniVineyardSchema = Omit<VineyardSchema, 'related'>;
            type MiniRegionSchema = Omit<RegionSchema, 'related'>;

            interface WineSchema {
                id: number,
                name: string,
                country: string,
                region: string,
                winery: string,
                rating: number,
                reviews: number,
                type: WineType,
                image: string,
                related: {
                    vineyards: MiniVineyardSchema[],
                    regions: MiniRegionSchema[],
                },
            }

            interface VineyardSchema {
                id: number,
                name: string,
                country: string,
                price: number,
                rating: number,
                reviews: number,
                image: string,
                related: {
                    wines: MiniWineSchema[],
                    regions: MiniRegionSchema[],
                },
            }

            interface RegionSchema {
                id: number,
                name: string,
                country: string,
                rating: number,
                reviews: number,
                tags: string[],
                tripTypes: TripType[],
                webUrl: string,
                related: {
                    wines: MiniWineSchema[],
                    vineyards: MiniVineyardSchema[],
                },
            }

            type QueryWineFunction = (id: number) => WineSchema?;
            type QueryVineyardFunction = (id: number) => VineyardSchema?;
            type QueryRegionFunction = (id: number) => RegionSchema?;

            type QueryAllWinesFunction = (filter: WineFilter) => MiniWineSchema[];
            type QueryAllVineyardsFunction = (filter: VineyardFilter) => MiniVineyardSchema[];
            type QueryAllRegionsFunction = (filter: RegionFilter) => MiniRegionSchema[];

            interface WineFilter {
                name?: string,
                nameSort?: boolean,
                country?: string[],
                winery?: string,
                startRating?: number,
                endRating?: number,
                startReviews?: number,
                endReviews?: number,
                type?: WineType,
            }

            interface VineyardFilter {
                name?: string,
                nameSort?: boolean,
                country?: string[],
                startPrice?: number,
                endPrice?: number,
                startRating?: number,
                endRating?: number,
                startReviews?: number,
                endReviews?: number,
            }

            interface RegionFilter {
                name?: string,
                nameSortAlpha?: boolean,
                country?: string,
                startRating?: number,
                endRating?: number,
                startReviews?: number,
                endReviews?: number,
                tags?: string[],
                tripTypes?: TripType[],
            }
        }
    }
}

export { };