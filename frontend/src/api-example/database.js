import wines from './data/wines.json';
import vineyards from './data/vineyards.json';
import regions from './data/regions.json';

/**
 * @type {ApiExample.Database.GetWineFunction}
 */
export function getWine(id) {
    return wines.data.find(e => e.id === id) ?? null;
}

/**
 * @type {ApiExample.Database.GetVineyardFunction}
 */
export function getVineyard(id) {
    return vineyards.data.find(e => e.id === id) ?? null;
}

/**
 * @type {ApiExample.Database.GetRegionFunction}
 */
export function getRegion(id) {
    return regions.data.find(e => e.id === id) ?? null;
}
