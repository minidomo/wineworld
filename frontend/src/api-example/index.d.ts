declare global {
    namespace ApiExample {

        namespace SiteApi {
            interface Config {
                params: Record<string | number, any>,
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

            type GetRequestFunction = (url: string, config: Config) => Promise<Response>;
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

            type GetWineFunction = (id: number) => WineSchema?;
            type GetVineyardFunction = (id: number) => VineyardSchema?;
            type GetRegionFunction = (id: number) => RegionSchema?;
        }
    }
}

export { };