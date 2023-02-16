import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar';
import Home from './containers/Home';
import About from './containers/About';


import Wines from './containers/WineModel/Wines';
import Wine1 from './containers/WineModel/Wine1';
import Wine2 from './containers/WineModel/Wine2';
import Wine3 from './containers/WineModel/Wine3';

import Vineyards from './containers/VineyardModel/Vineyards';
import Vineyard1 from './containers/VineyardModel/Vineyard1';
import Vineyard2 from './containers/VineyardModel/Vineyard2';
import Vineyard3 from './containers/VineyardModel/Vineyard3';


import Regions from './containers/RegionModel/Regions';
import Region1 from './containers/RegionModel/Region1';
import Region2 from './containers/RegionModel/Region2';
import Region3 from './containers/RegionModel/Region3';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Routes>
            <Route path="/" element={<Home />}></Route>


            <Route path="/Wines" element={<Wines />}></Route>
            <Route path="/Wines/Wine1" element={<Wine1 />}></Route>
            <Route path="/Wines/Wine2" element={<Wine2 />}></Route>
            <Route path="/Wines/Wine3" element={<Wine3 />}></Route>


            <Route path="/Vineyards" element={<Vineyards />}></Route>
            <Route path="/Vineyards/Vineyard1" element={<Vineyard1 />}></Route>
            <Route path="/Vineyards/Vineyard2" element={<Vineyard2 />}></Route>
            <Route path="/Vineyards/Vineyard3" element={<Vineyard3 />}></Route>


            <Route exact path="/Regions" element={<Regions />}></Route>
            <Route path="/Regions/Region1" element={<Region1 />}></Route>
            <Route path="/Regions/Region2" element={<Region2 />}></Route>
            <Route path="/Regions/Region3" element={<Region3 />}></Route>


            <Route path="/About" element={<About />}></Route>
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;



