import homeimage from '../assets/home_logo.jpg';
import regionsimage from '../assets/r_home.jpg';
import vineyardsimage from '../assets/v_home.jpg';
import wineimage from '../assets/w_home.jpg';
import HomeCard from '../components/HomeCard';

const Home = () => (
    <div>
        <img src={homeimage} class="img-fluid w-100" alt="..."></img>
        <div class="container text-center">
            <div class="row">
                <div class="col">
                    <HomeCard title="Wines" text="Find wines that satisfy your taste" link="/Wines" image={wineimage} />
                </div>
                <div class="col">
                    <HomeCard
                        title="Vineyards"
                        text="Discover amazing vineyards"
                        link="/Vineyards"
                        image={vineyardsimage}
                    />
                </div>
                <div class="col">
                    <HomeCard title="Regions" text="Explore new regions" link="/Regions" image={regionsimage} />
                </div>
            </div>
        </div>
    </div>
);
export default Home;
