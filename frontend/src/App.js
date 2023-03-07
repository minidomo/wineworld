import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';

import Home from './containers/Home';
import About from './containers/About';

import Wines from './containers/WineModel';
// import Wines from './containers/WineModel/Wines';
import WineInstance from './containers/WineInstance';

import Vineyards from './containers/VineyardModel';
// import Vineyards from './containers/VineyardModel/Vineyards';
import VineyardInstance from './containers/VineyardInstance';

import Regions from './containers/RegionModel';
// import Regions from './containers/RegionModel/Regions';
import RegionInstance from './containers/RegionInstance';


const App = () => {
  return (
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
}


export default App;


export function ColorTheme() {
  let my_theme;
  return my_theme;
}
