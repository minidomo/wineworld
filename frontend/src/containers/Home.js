import HomeCard from '../components/HomeCard'
import wineimage from '../assets/winehome.jpg'
import vineyardsimage from '../assets/vineyardshome.jpg'
import regionsimage from '../assets/regionshome.jpg'
import homeimage from '../assets/home.jpg'

const Home = () => {
    return (
        <div>
            <img src={homeimage} class="img-fluid" alt="..."></img>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <HomeCard
                            title="Wines"
                            text="Find wines that satisfy your taste"
                            link="/Wines"
                            image={wineimage}
                        />
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
                        <HomeCard
                            title="Regions"
                            text="Explore new regions"
                            link="/Regions"
                            image={regionsimage}
                        />
                    </div>
                </div>
            </div>
        </div>

    )

}
export default Home;
