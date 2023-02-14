
import './App.css';
import Navbar from '../components/navBar';
import About from '../containers/About';
import Home from '../containers/Home';
import Vineyards from '../containers/Vineyards';
import Regions from '../containers/Regions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/About" element={<About/>}></Route>
            <Route exact path="/Vineyards" element={<Vineyards/>}></Route>
            <Route exact path="/Regions" element={<Regions/>}></Route>
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
