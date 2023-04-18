import defaultRegionImage from '../assets/placeholder/region.jpg';
import defaultVineyardImage from '../assets/placeholder/vineyard.jpg';
import defaultWineImage from '../assets/placeholder/wine.jpg';

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
