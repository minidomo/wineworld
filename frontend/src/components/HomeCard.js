import { Link } from 'react-router-dom';

const HomeCard = ({ title, text, link, image }) => {
    return (
        <div class="card text-bg-light mb-3" style={{ width: '18rem'}}>
            <img src={image} class="image-thumbnail" alt=""/>
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <p class="card-text">{text}</p>
                <Link to={link} class="btn btn-primary">Explore</Link>
            </div>
        </div>
    )
}

export default HomeCard;