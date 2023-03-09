import renderer from "react-test-renderer";
import RayImage from "../assets/rayPic.jpg";
import WineCard from "../components/WineCard";
import RegionCard from "../components/RegionCard";
import VineyardCard from "../components/VineyardCard";
import DeveloperCard from "../components/DeveloperCard";
import HomeCard from "../components/HomeCard";
import ToolCard from "../components/ToolCard";
import GitLabImage from "../assets/gitlab.png";
import ApiCard from "../components/ApiCard";
import WineImage from "../assets/wine.jpg";
import ReactImage from "../assets/logo512.png";
import NavBar from "../components/NavBar";
import { BrowserRouter } from "react-router-dom";
import App from "../App.js";
import About from "../containers/About.js";

it("Init Wine", () => {
  const wine = {
    "country": "United States",
    "id": 310,
    "image": "https://images.vivino.com/thumbs/_IiGnDHSSaOc9u9c9CzVSA_pb_x300.png",
    "name": "Beckstoffer Dr. Crane Vineyard 2012",
    "rating": 4.9,
    "region": "St. Helena",
    "reviews": 32,
    "type": "Red",
    "winery": "Realm"
  };
  const component = renderer.create(<BrowserRouter><WineCard wine={wine} /></BrowserRouter>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Init Vineyard", () => {
  const vineyard = {
    "country": "United States",
    "id": 202,
    "image": "https://s3-media4.fl.yelpcdn.com/bphoto/Sam2Wv5bvNpEtcTLNYeB3g/o.jpg",
    "name": "Carhartt Family Wines",
    "price": 2,
    "rating": 4.5,
    "reviews": 561,
    "url": "https://www.yelp.com/biz/carhartt-family-wines-los-olivos"
  };
  const component = renderer.create(<BrowserRouter><VineyardCard vineyard={vineyard} /></BrowserRouter>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Init Region", () => {
  const region = {
    "country": "United States",
    "id": 3,
    "image": {
      "height": 450,
      "url": "https://media-cdn.tripadvisor.com/media/photo-s/19/8b/fb/16/die-neverland-ranch-war.jpg",
      "width": 450
    },
    "name": "Sta. Rita Hills",
    "rating": 4.1,
    "related": {
      "vineyards": [
        {
          "country": "United States",
          "id": 202,
          "image": "https://s3-media4.fl.yelpcdn.com/bphoto/Sam2Wv5bvNpEtcTLNYeB3g/o.jpg",
          "name": "Carhartt Family Wines",
          "price": 2,
          "rating": 4.5,
          "reviews": 561,
          "url": "https://www.yelp.com/biz/carhartt-family-wines-los-olivos"
        },
        {
          "country": "United States",
          "id": 203,
          "image": "https://s3-media2.fl.yelpcdn.com/bphoto/wHilkiD9MUr1CIJMutiMow/o.jpg",
          "name": "Saarloos & Sons",
          "price": 2,
          "rating": 4.5,
          "reviews": 507,
          "url": "https://www.yelp.com/biz/saarloos-and-sons-los-olivos"
        },
        {
          "country": "United States",
          "id": 204,
          "image": "https://s3-media1.fl.yelpcdn.com/bphoto/TpPsvmQVES-F47GB31hCNA/o.jpg",
          "name": "Dreamcôte Wine Co.",
          "price": 2,
          "rating": 4.5,
          "reviews": 154,
          "url": "https://www.yelp.com/biz/dreamc%C3%B4te-wine-co-los-olivos"
        }
      ],
      "wines": [
        {
          "country": "United States",
          "id": 17,
          "image": "https://images.vivino.com/thumbs/DtBMhsMBTtiA4URvVaUBNA_pb_x300.png",
          "name": "Rattrapante Grenache 2012",
          "rating": 4.9,
          "region": "Sta. Rita Hills",
          "reviews": 34,
          "type": "Red",
          "winery": "Sine Qua Non"
        },
        {
          "country": "United States",
          "id": 18,
          "image": "https://images.vivino.com/thumbs/hhlGZQVnR7C_RYEn8e677g_pb_x300.png",
          "name": "Chardonnay 2016",
          "rating": 4.6,
          "region": "Sta. Rita Hills",
          "reviews": 38,
          "type": "White",
          "winery": "Sea Smoke"
        },
        {
          "country": "United States",
          "id": 364,
          "image": "https://images.vivino.com/thumbs/czzcC4ZaStGChaDkmFYmww_pb_x300.png",
          "name": "The 17th Nail in My Cranium 2005",
          "rating": 4.8,
          "region": "Sta. Rita Hills",
          "reviews": 58,
          "type": "Red",
          "winery": "Sine Qua Non"
        },
        {
          "country": "United States",
          "id": 376,
          "image": "https://images.vivino.com/thumbs/eoESQg64S8mw1BwEJVVkGQ_pb_x300.png",
          "name": "Stockholm Syndrome Eleven Confession Vineyard Grenache N.V.",
          "rating": 4.8,
          "region": "Sta. Rita Hills",
          "reviews": 42,
          "type": "Red",
          "winery": "Sine Qua Non"
        },
        {
          "country": "United States",
          "id": 379,
          "image": "https://images.vivino.com/thumbs/eoESQg64S8mw1BwEJVVkGQ_pb_x300.png",
          "name": "Stockholm Syndrome Eleven Confession Vineyard Grenache 2010",
          "rating": 4.8,
          "region": "Sta. Rita Hills",
          "reviews": 40,
          "type": "Red",
          "winery": "Sine Qua Non"
        }
      ]
    },
    "reviews": 90,
    "tags": [
      "Shopping",
      "Wine Bars",
      "Activities",
      "Wineries & Vineyards",
      "Food & Drink",
      "Gift & Specialty Shops",
      "Nightlife"
    ],
    "tripTypes": [
      "Couples",
      "Friends getaway"
    ],
    "url": "https://www.tripadvisor.com/Tourism-g32660-Los_Olivos_California-Vacations.html",
  };
  const component = renderer.create(<BrowserRouter><RegionCard region={region} /></BrowserRouter>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Init Developer", () => {
  const Developer = {
    name: "Ray Yin",
    gitlab_id: "jrayyin",
    role: "Front-end",
    bio: " I'm a junior studying Computer Science at UT Austin. In my free time I enjoy playing volleyball and trying new restaurants.",
    commits: 0,
    issues: 0,
    unit_tests: 10,
    image: RayImage,
  };
  const component = renderer.create(<DeveloperCard devCard={Developer} />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Init Api", () => {
  const Api = {
    name: "GitLab API",
    image: GitLabImage,
    text: "A Javascript library for front-end development",
    url: "https://docs.gitlab.com/ee/api/",
  };
  const component = renderer.create(<ApiCard api={Api} />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Init Tool", () => {
  const Tool = {
    name: "React",
    image: ReactImage,
    text: "A Javascript library for front-end development",
    url: "https://reactjs.org/",
  };
  const component = renderer.create(<ToolCard tool={Tool} />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Init NavBar", () => {
  const component = renderer.create(<BrowserRouter><NavBar /></BrowserRouter>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Init App", () => {
  const component = renderer.create(<App />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Init About", () => {
  const component = renderer.create(<About />);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


it("Init HomeCard", () => {
  const Home = {
    title: "Wine",
    image: WineImage,
    text: "Check out some wines!",
    link: "https://www.google.com/",
  };
  const component = renderer.create(<BrowserRouter><HomeCard home={Home} /></BrowserRouter>);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


