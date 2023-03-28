import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import About from './containers/About';
import Home from './containers/Home';
import Wines from './containers/WineModel';
import WineInstance from './containers/WineInstance';
import WineSearch from './containers/WineSearch'
import Vineyards from './containers/VineyardModel';
import VineyardInstance from './containers/VineyardInstance';
import VineyardSearch from './containers/VineyardSearch';
import Regions from './containers/RegionModel';
import RegionInstance from './containers/RegionInstance';
import RegionSearch from './containers/RegionSearch';
import Search from './containers/Search';

const App = () => (
    <Router>
        <div className="App">
            <Navbar />
            <div className="Content">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/wines" element={<Wines />}></Route>
                    <Route path="/wines/:id" element={<WineInstance />}></Route>
                    <Route path="/vineyards" element={<Vineyards />}></Route>
                    <Route path="/vineyards/:id" element={<VineyardInstance />}></Route>
                    <Route path="/regions" element={<Regions />}></Route>
                    <Route path="/regions/:id" element={<RegionInstance />}></Route>
                    <Route path="/about" element={<About />}></Route>

                    <Route path="/search/:query" element={<Search />}></Route>
                    <Route path="/wines/search/:query" element={<WineSearch />}></Route>
                    <Route path="/vineyards/search/:query" element={<VineyardSearch />}></Route>
                    <Route path="/regions/search/:query" element={<RegionSearch />}></Route>
                </Routes>
            </div>
        </div>
    </Router>
);

export default App;

export function ColorTheme() {
    let my_theme;
    return my_theme;
}
