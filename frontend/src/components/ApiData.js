import GitLabImage from '../assets/logos/gitlab.png';
import RedditImage from '../assets/logos/reddit.png';
import TripImage from '../assets/logos/tripadvisor.png';
import WineImage from '../assets/logos/wine.png';
import YelpImage from '../assets/logos/yelp.png';

const ApiData = [
  {
    name: 'GitLab API',
    image: GitLabImage,
    text: 'A Javascript library for front-end development',
    url: 'https://docs.gitlab.com/ee/api/',
  },
  {
    name: 'Wines API',
    image: WineImage,
    text: 'A Javascript library for front-end development',
    url: 'https://sampleapis.com/api-list/wines',
  },
  {
    name: 'Yelp Fusion API',
    image: YelpImage,
    text: 'Collaborative software development platform',
    url: 'https://fusion.yelp.com/',
  },
  {
    name: 'Tripadvisor API',
    image: TripImage,
    text: 'Designated communication platform',
    url: 'https://www.tripadvisor.com/developers',
  },
  {
    name: 'Reddit API',
    image: RedditImage,
    text: 'Source of reddit posts for wines',
    url: 'https://www.reddit.com/dev/api/',
  },
].sort((a, b) => (a.name < b.name ? -1 : 1));

export { ApiData };
