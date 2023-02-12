
import './App.css';

const NavBar = () => {
  return (
    <nav class="navbar bg-dark" data-bs-theme="dark">
      <div class="container">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="https://www.youtube.com/results?search_query=bootstrap+vs+react">WineWorld</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="https://www.youtube.com/results?search_query=bootstrap+vs+react">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="https://www.youtube.com/results?search_query=bootstrap+vs+react">Wines</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="https://www.youtube.com/results?search_query=bootstrap+vs+react">Vineyards</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="https://www.youtube.com/results?search_query=bootstrap+vs+react">Regions</a>
                </li>
              </ul>
            </div>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
          </div>
        </nav>
      </div>
    </nav>
  )
}

const Cards = () => {
  return (
    <div class="container">
      <div class="card" style={{ width: '18rem' }}>
        <img src="Wine-bottle-and-glass-vector-clipart.png" class="card-img-top" alt="" />
        <div class="card-body">
          <h5 class="card-title">Wines</h5>
          <p class="card-text">Find wines that fits your taste</p>
          <a href="http://400" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  )
}
const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Cards />
    </div>
  );
}

export default App;
