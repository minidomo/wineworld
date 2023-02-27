/**
 * 
 * @param {ApiExample.SiteApi.Response} data 
 */
export function makeResponse(data) {
    return data;
}

/**
 * 
 * @param {ApiExample.SiteApi.ErrorResponse} data 
 */
export function makeErrorResponse(data) {
    return data;
}

export const ERROR_RESPONSE = {
    /**
     * @type {ApiExample.SiteApi.ErrorResponse}
     */
    NOT_FOUND: {
        message: 'Request failed with status code 404',
        name: 'AxiosError',
        code: 'ERR_BAD_REQUEST',
        response: {
            status: 404,
            statusText: 'NOT FOUND',
            data: '<!doctype html>' +
                '<html lang=en>' +
                '<title>404 Not Found</title>' +
                '<h1>Not Found</h1>' +
                '<p>The requested URL was not found on the server. ' +
                'If you entered the URL manually please check your spelling and try again.</p>'
        }
    },

    /**
     * @type {ApiExample.SiteApi.ErrorResponse}
     */
    INTERNAL_SERVER: {
        message: 'Request failed with status code 500',
        name: 'AxiosError',
        code: 'ERR_BAD_RESPONSE',
        response: {
            status: 500,
            statusText: 'INTERNAL SERVER ERROR',
            data: '<!doctype html>' +
                '<html lang=en>' +
                '<title>500 Internal Server Error</title>' +
                '<h1>Internal Server Error</h1>' +
                '<p>The server encountered an internal error and was unable to complete your request. ' +
                'Either the server is overloaded or there is an error in the application.</p>'
        }
    },
};