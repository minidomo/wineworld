
import './App.css';
import Navbar from './navBar';
import About from './About';
import Home from './Home';
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
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
