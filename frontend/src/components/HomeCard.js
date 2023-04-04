import { Link } from 'react-router-dom';

const HomeCard = ({ title, text, link, image }) => (
  <div class={'card'} style={{ width: '18rem' }}>
    <img src={image} class="card-img-top" alt="" />
    <div class="card-body">
      <h5 class="card-title">{title}</h5>
      <p class="card-text">{text}</p>
      <Link to={link} class={'btn custom1 stretched-link'}>
        Explore
      </Link>
    </div>
  </div>
);

export default HomeCard;
