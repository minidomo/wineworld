import AustinImage from '../assets/devs/austin.jpg';
import JBImage from '../assets/devs/jb.jpg';
import RayImage from '../assets/devs/ray.jpg';
import RyanImage from '../assets/devs/ryan.jpg';
import SaniyaImage from '../assets/devs/saniya.jpg';

const teamData = [
  {
    name: 'Ray Yin',
    alt_names: new Set(['jrayyin']),
    gitlab_id: 'jrayyin',
    role: 'Front-end',
    bio:
      "I'm a junior studying CS at UT Austin. In my free time I enjoy playing volleyball and " +
      'trying new restaurants.',
    commits: 0,
    issues: 0,
    unit_tests: 10,
    image: RayImage,
  },
  {
    name: 'Ryan Parappuram',
    alt_names: new Set(['rparappuram']),
    gitlab_id: 'rparappuram',
    role: 'Full-Stack',
    bio:
      "I'm a sophomore learning full-stack software engineering. I love to play basketball, eat tasty food, " +
      'and drive cars!',
    commits: 0,
    issues: 0,
    // 33 backend, 54 postman
    unit_tests: 87,
    image: RyanImage,
  },
  {
    name: 'JB Ladera',
    alt_names: new Set(),
    gitlab_id: 'minidomo',
    role: 'Full-Stack',
    bio:
      "I'm a third year CS student studying at UT Austin. I enjoy watching anime and playing video games in " +
      'my spare time.',
    commits: 0,
    issues: 0,
    unit_tests: 29,
    image: JBImage,
  },
  {
    name: 'Saniya Shaju',
    alt_names: new Set(['saniyashaju-admin']),
    gitlab_id: 'saniyashaju',
    role: 'Front-end',
    bio:
      "I'm a sophomore CS major at UT Austin. I enjoy reading " +
      'novels, crocheting, and writing short stories and poetry.',
    commits: 0,
    issues: 0,
    unit_tests: 10,
    image: SaniyaImage,
  },
  {
    name: 'Austin Barret',
    alt_names: new Set(['austin25coding']),
    gitlab_id: 'acbarret',
    role: 'Front-end',
    bio: "I'm a sophomore frontend developer at UT Austin. " +
    'I love to go windsurfing, play the piano, and write my own music.',
    commits: 0,
    issues: 0,
    unit_tests: 0,
    image: AustinImage,
  },
];

export { teamData };
