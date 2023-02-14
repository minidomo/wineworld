const navBar = () => {
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

export default navBar;