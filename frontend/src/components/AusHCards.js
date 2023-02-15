import { Link } from 'react-router-dom';

const Cards = ({ title, text, link, image }) => {
    return (
        <div class="card" style={{ width: '18rem'}}>
            <img src={image} class="image-thumbnail" alt=""/>
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{text}</p>
                <Link to={link} class="btn btn-primary">Search</Link>
            </div>
        </div>
    )
}

export default Cards;