declare global {
    namespace ApiExample {
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
}

export { };