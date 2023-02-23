import { makeResponse, ERROR_RESPONSE } from './response';
import * as database from './database';

const baseUrl = 'https://api.wineworld.me';
const wineUrlRegex = /^https:\/\/api\.wineworld\.me\/wine\/(\d+)/;
const vineyardUrlRegex = /^https:\/\/api\.wineworld\.me\/vineyard\/(\d+)/;
const regionUrlRegex = /^https:\/\/api\.wineworld\.me\/region\/(\d+)/;

/**
 * @type {ApiExample.SiteApi.GetRequestFunction}
 */
export async function get(url, config = {}) {
    // artificial latency to simulate slow api calls
    await wait(2000);

    return new Promise((resolve, reject) => {

        if (config.failOnPurpose) {
            reject(ERROR_RESPONSE.INTERNAL_SERVER);
            return;
        }

        try {
            if (url === `${baseUrl}/wines`) {
                const list = database.queryAllWines(config.params);
                resolve(makeResponse({
                    data: {
                        list,
                    },
                    status: 200,
                    statusText: 'OK',
                }));
                return;
            }

            if (url === `${baseUrl}/vineyards`) {
                const list = database.queryAllVineyards(config.params);
                resolve(makeResponse({
                    data: {
                        list,
                    },
                    status: 200,
                    statusText: 'OK',
                }));
                return;
            }

            if (url === `${baseUrl}/regions`) {
                const list = database.queryAllRegions(config.params);
                resolve(makeResponse({
                    data: {
                        list,
                    },
                    status: 200,
                    statusText: 'OK',
                }));
                return;
            }

            if (wineUrlRegex.test(url)) {
                const [, id] = url.match(wineUrlRegex);
                const numId = parseInt(id);
                const data = database.queryWine(numId);

                if (data) {
                    resolve(makeResponse({
                        data,
                        status: 200,
                        statusText: 'OK',
                    }))
                } else {
                    reject(ERROR_RESPONSE.NOT_FOUND);
                }
                return;
            }

            if (vineyardUrlRegex.test(url)) {
                const [, id] = url.match(vineyardUrlRegex);
                const numId = parseInt(id);
                const data = database.queryVineyard(numId);

                if (data) {
                    resolve(makeResponse({
                        data,
                        status: 200,
                        statusText: 'OK',
                    }))
                } else {
                    reject(ERROR_RESPONSE.NOT_FOUND);
                }
                return;
            }

            if (regionUrlRegex.test(url)) {
                const [, id] = url.match(regionUrlRegex);
                const numId = parseInt(id);
                const data = database.queryRegion(numId);

                if (data) {
                    resolve(makeResponse({
                        data,
                        status: 200,
                        statusText: 'OK',
                    }))
                } else {
                    reject(ERROR_RESPONSE.NOT_FOUND);
                }
                return;
            }

            // default
            reject(ERROR_RESPONSE.NOT_FOUND);
        } catch (err) {
            const res = Object.assign({}, ERROR_RESPONSE.INTERNAL_SERVER);
            res.message = '500 error occurred during api call';
            res.response.data = err;
            reject(res);
        }
    });
};

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
