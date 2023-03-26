import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import About from './containers/About';
import Home from './containers/Home';
import Wines from './containers/WineModel';
import WineInstance from './containers/WineInstance';
import Vineyards from './containers/VineyardModel';
import VineyardInstance from './containers/VineyardInstance';
import Regions from './containers/RegionModel';
import RegionInstance from './containers/RegionInstance';
import Search from './containers/Search';

const App = () => (
    <Router>
        <div className="App">
            <Navbar />
            <div className="Content">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/Wines" element={<Wines />}></Route>
                    <Route path="/Wines/:id" element={<WineInstance />}></Route>
                    <Route path="/Vineyards" element={<Vineyards />}></Route>
                    <Route path="/Vineyards/:id" element={<VineyardInstance />}></Route>
                    <Route path="/Regions" element={<Regions />}></Route>
                    <Route path="/Regions/:id" element={<RegionInstance />}></Route>
                    <Route path="/About" element={<About />}></Route>

                    <Route path="/Search/:query" element={<Search />}></Route>
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
