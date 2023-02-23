import wines from './data/wines.json';
import vineyards from './data/vineyards.json';
import regions from './data/regions.json';

/**
 * @type {ApiExample.Database.QueryWineFunction}
 */
export function queryWine(id) {
    return wines.data.find(e => e.id === id) ?? null;
}

/**
 * @type {ApiExample.Database.QueryVineyardFunction}
 */
export function queryVineyard(id) {
    return vineyards.data.find(e => e.id === id) ?? null;
}

/**
 * @type {ApiExample.Database.QueryRegionFunction}
 */
export function queryRegion(id) {
    return regions.data.find(e => e.id === id) ?? null;
}

/**
 * @type {ApiExample.Database.QueryAllWinesFunction}
 */
export function queryAllWines(filter = {}) {
    let res = wines.data;

    if (typeof filter.name !== 'undefined') {
        res = res.filter(e => e.name.includes(filter.name));
    }

    if (typeof filter.country !== 'undefined') {
        res = res.filter(e => filter.country.includes(e.country));
    }

    if (typeof filter.winery !== 'undefined') {
        res = res.filter(e => filter.winery.includes(e.winery));
    }

    if (typeof filter.startRating !== 'undefined') {
        res = res.filter(e => e.rating >= filter.startRating);
    }

    if (typeof filter.endRating !== 'undefined') {
        res = res.filter(e => e.rating <= filter.endRating);
    }

    if (typeof filter.startReviews !== 'undefined') {
        res = res.filter(e => e.reviews >= filter.startReviews);
    }

    if (typeof filter.endReviews !== 'undefined') {
        res = res.filter(e => e.reviews <= filter.endReviews);
    }

    if (typeof filter.type !== 'undefined') {
        res = res.filter(e => e.type === filter.type);
    }

    if (typeof filter.nameSort !== 'undefined') {
        const direction = filter.nameSort ? 1 : -1;
        res.sort((a, b) => {
            const ret = a.name < b.name ? -1 : 1;
            return ret * direction;
        });
    }

    return res;
}

/**
 * @type {ApiExample.Database.QueryAllVineyardsFunction}
 */
export function queryAllVineyards(filter = {}) {
    let res = vineyards.data;

    if (typeof filter.name !== 'undefined') {
        res = res.filter(e => e.name.includes(filter.name));
    }

    if (typeof filter.country !== 'undefined') {
        res = res.filter(e => filter.country.includes(e.country));
    }

    if (typeof filter.startPrice !== 'undefined') {
        res = res.filter(e => e.price >= filter.startPrice);
    }

    if (typeof filter.endPrice !== 'undefined') {
        res = res.filter(e => e.price <= filter.endPrice);
    }

    if (typeof filter.startRating !== 'undefined') {
        res = res.filter(e => e.rating >= filter.startRating);
    }

    if (typeof filter.endRating !== 'undefined') {
        res = res.filter(e => e.rating <= filter.endRating);
    }

    if (typeof filter.startReviews !== 'undefined') {
        res = res.filter(e => e.reviews >= filter.startReviews);
    }

    if (typeof filter.endReviews !== 'undefined') {
        res = res.filter(e => e.reviews <= filter.endReviews);
    }

    if (typeof filter.nameSort !== 'undefined') {
        const direction = filter.nameSort ? 1 : -1;
        res.sort((a, b) => {
            const ret = a.name < b.name ? -1 : 1;
            return ret * direction;
        });
    }

    return res;
}

/**
 * @type {ApiExample.Database.QueryAllRegionsFunction}
 */
export function queryAllRegions(filter = {}) {
    let res = regions.data;

    if (typeof filter.name !== 'undefined') {
        res = res.filter(e => e.name.includes(filter.name));
    }

    if (typeof filter.country !== 'undefined') {
        res = res.filter(e => filter.country.includes(e.country));
    }


    if (typeof filter.startRating !== 'undefined') {
        res = res.filter(e => e.rating >= filter.startRating);
    }

    if (typeof filter.endRating !== 'undefined') {
        res = res.filter(e => e.rating <= filter.endRating);
    }

    if (typeof filter.startReviews !== 'undefined') {
        res = res.filter(e => e.reviews >= filter.startReviews);
    }

    if (typeof filter.endReviews !== 'undefined') {
        res = res.filter(e => e.reviews <= filter.endReviews);
    }

    if (typeof filter.tags !== 'undefined') {
        res = res.filter(e => {
            return filter.tags.every(tag => e.tags.includes(tag));
        });
    }

    if (typeof filter.tripTypes !== 'undefined') {
        res = res.filter(e => {
            return filter.tripTypes.every(tripType => e.tripTypes.includes(tripType));
        });
    }

    if (typeof filter.nameSort !== 'undefined') {
        const direction = filter.nameSort ? 1 : -1;
        res.sort((a, b) => {
            const ret = a.name < b.name ? -1 : 1;
            return ret * direction;
        });
    }

    return res;
}
