import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav class="navbar bg-dark" data-bs-theme="dark">
            <div class="container">
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <Link class="navbar-brand" to="/">WineWorld</Link>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarText">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link class="nav-link" to="/About">About</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/Wines">Wines</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/Vineyards">Vineyards</Link>
                                </li>
                                <li class="nav-item">
                                    <Link class="nav-link" to="/Regions">Regions</Link>
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

export default NavBar;