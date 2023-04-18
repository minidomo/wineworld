import AmplifyImage from '../assets/logos/amplify.png';
import BootstrapImage from '../assets/logos/bootstrap.png';
import DigitalOceanImage from '../assets/logos/digitalocean.png';
import DockerImage from '../assets/logos/docker.png';
import FlaskImage from '../assets/logos/flask.png';
import GitLabImage from '../assets/logos/gitlab.png';
import JestImage from '../assets/logos/jest.png';
import MySQLImage from '../assets/logos/mysql.png';
import NamecheapImage from '../assets/logos/namecheap.png';
import NpmImage from '../assets/logos/npm.png';
import PostmanImage from '../assets/logos/postman.png';
import ReactImage from '../assets/logos/react.png';
import Route53Image from '../assets/logos/route53.png';
import SeleniumImage from '../assets/logos/selenium.png';
import SQLAlchemyImage from '../assets/logos/sqlalchemy.png';
import TeamsImage from '../assets/logos/teams.png';
import VSCodeImage from '../assets/logos/vscode.png';

const toolData = [
  {
    name: 'React',
    image: ReactImage,
    text: 'A Javascript library for front-end development',
    url: 'https://reactjs.org/',
  },
  {
    name: 'GitLab',
    image: GitLabImage,
    text: 'Collaborative software development platform',
    url: 'https://about.gitlab.com/',
  },
  {
    name: 'Microsoft Teams',
    image: TeamsImage,
    text: 'Designated communication platform',
    url: 'https://www.microsoft.com/en-us/microsoft-teams/group-chat-software',
  },
  {
    name: 'React Bootstrap',
    image: BootstrapImage,
    text: 'Bootstrap framework for React',
    url: 'https://react-bootstrap.github.io/',
  },
  {
    name: 'Postman',
    image: PostmanImage,
    text: 'Platform for API development and testing',
    url: 'https://www.postman.com/',
  },
  {
    name: 'AWS Amplify',
    image: AmplifyImage,
    text: 'Hosting platform for WineWorld',
    url: 'https://aws.amazon.com/amplify/',
  },
  {
    name: 'Namecheap',
    image: NamecheapImage,
    text: 'Domain name registration for site',
    url: 'https://www.namecheap.com/',
  },
  {
    name: 'Visual Studio Code',
    image: VSCodeImage,
    text: 'Popular code editing software',
    url: 'https://code.visualstudio.com/',
  },
  {
    name: 'NPM',
    image: NpmImage,
    text: 'Javascript package manager',
    url: 'https://www.npmjs.com/',
  },
  {
    name: 'Selenium',
    image: SeleniumImage,
    text: 'GUI Testing Tool',
    url: 'https://www.selenium.dev/',
  },
  {
    name: 'Jest',
    image: JestImage,
    text: 'JavaScript testing framework',
    url: 'https://jestjs.io/',
  },
  {
    name: 'Digital Ocean',
    image: DigitalOceanImage,
    text: 'Hosting for Database and Backend Server',
    url: 'https://www.digitalocean.com/',
  },
  {
    name: 'Flask',
    image: FlaskImage,
    text: 'Micro web development framework',
    url: 'https://flask.palletsprojects.com/en/2.2.x/',
  },
  {
    name: 'MySQL',
    image: MySQLImage,
    text: 'Underlying Database Management System',
    url: 'https://www.mysql.com/',
  },
  {
    name: 'SQLAlchemy',
    image: SQLAlchemyImage,
    text: 'Object relational mapper used to manipualte database',
    url: 'https://www.sqlalchemy.org/',
  },
  {
    name: 'Route 53 AWS',
    image: Route53Image,
    text: 'Routing from amplify to domain',
    url: 'https://aws.amazon.com/route53/',
  },
  {
    name: 'Docker',
    image: DockerImage,
    text: 'Tool for standardizing development environment',
    url: 'https://www.docker.com/',
  },
].sort((a, b) => (a.name < b.name ? -1 : 1));

export { toolData };
