import wine_image from '../assets/wine-bottle-and-glass-vector-clipart.png'

const Cards = () => {
    return (
        <div class="container">
            <div class="card" style={{ width: '18rem' }}>
                <img src={wine_image} class="card-img-top" alt="" />
                <div class="card-body">
                    <h5 class="card-title">Wines</h5>
                    <p class="card-text">Find wines that fits your taste</p>
                    <a href="http://400" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}

export default Cards;