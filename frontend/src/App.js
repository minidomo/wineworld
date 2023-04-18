import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/NavBar';
import About from './containers/About';
import Home from './containers/Home';
import ProviderVisualizations from './containers/Provider';
import RegionInstance from './containers/RegionInstance';
import Regions from './containers/RegionModel';
import Search from './containers/Search';
import VineyardInstance from './containers/VineyardInstance';
import Vineyards from './containers/VineyardModel';
import Visualizations from './containers/Visualizations';
import WineInstance from './containers/WineInstance';
import Wines from './containers/WineModel';

const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <div className="Content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wines" element={<Wines />} />
          <Route path="/wines/:id" element={<WineInstance />} />
          <Route path="/vineyards" element={<Vineyards />} />
          <Route path="/vineyards/:id" element={<VineyardInstance />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/regions/:id" element={<RegionInstance />} />
          <Route path="/about" element={<About />} />
          <Route path="/visualizations" element={<Visualizations />} />
          <Route path="/provider" element={<ProviderVisualizations />} />

          <Route path="/search/:query" element={<Search />} />
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
