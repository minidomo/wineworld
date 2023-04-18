import homeimage from '../assets/home/main-logo.jpg';
import regionsimage from '../assets/home/region.jpg';
import vineyardsimage from '../assets/home/vineyard.jpg';
import wineimage from '../assets/home/wine.jpg';
import HomeCard from '../components/HomeCard';

const Home = () => (
  <div>
    <img src={homeimage} class="img-fluid w-100" alt="..."></img>
    <p></p>
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <HomeCard title="Wines" text="Find wines that satisfy your taste" link="/wines" image={wineimage} />
        </div>
        <div class="col">
          <HomeCard title="Vineyards" text="Discover amazing vineyards" link="/vineyards" image={vineyardsimage} />
        </div>
        <div class="col">
          <HomeCard title="Regions" text="Explore new regions" link="/regions" image={regionsimage} />
        </div>
      </div>
    </div>
    <p></p>
  </div>
);
export default Home;
