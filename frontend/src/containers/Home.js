import AusHCards from '../components/AusHCards'
import wineimage from '../Images/winehome.jpg'
import vineyardsimage from '../Images/vineyardshome.jpg'
import regionsimage from '../Images/regionshome.avif'
import homeimage from '../Images/home.avif'
const Home = () => {
    return (
        <div>
            <img src={homeimage} class="img-fluid" alt="..."></img>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <AusHCards
                            title="Wines"
                            text="Find wines that satisfy your taste"
                            link="/Wines"
                            image={wineimage}
                        />
                    </div>
                    <div class="col">
                        <AusHCards
                            title="Vineyards"
                            text="Discover amazing vineyards"
                            link="/Vineyards"
                            image={vineyardsimage}
                        />
                    </div>
                    <div class="col">
                        <AusHCards
                            title="Regions"
                            text="Explore new regions"
                            link="/Vineyards"
                            image={regionsimage}
                        />
                    </div>
                </div>
            </div>
        </div>

    )

}
export default Home;
