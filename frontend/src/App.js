import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';

import About from './containers/About';
import Home from './containers/Home';

import RegionInstance from './containers/RegionInstance';
import Regions from './containers/RegionModel';
import VineyardInstance from './containers/VineyardInstance';
import Vineyards from './containers/VineyardModel';
import WineInstance from './containers/WineInstance';
import Wines from './containers/WineModel';
// Import Wines from './containers/WineModel/Wines';

// Import Vineyards from './containers/VineyardModel/Vineyards';

// Import Regions from './containers/RegionModel/Regions';

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
