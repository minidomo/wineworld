import defaultRegionImage from '../assets/r2.jpg';
import defaultVineyardImage from '../assets/v2.jfif';
import defaultWineImage from '../assets/w2.jpg';

export function handleWineImageError(ev) {
    ev.target.src = defaultWineImage;
    ev.onerror = null;
}

export function handleRegionImageError(ev) {
    ev.target.src = defaultRegionImage;
    ev.onerror = null;
}

export function handleVineyardImageError(ev) {
    ev.target.src = defaultVineyardImage;
    ev.onerror = null;
}
