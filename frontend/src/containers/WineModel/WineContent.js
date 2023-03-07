import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import '../image.css';
import axios from "axios";
import { useState, useEffect } from 'react';

const WineContent = () => {
    const [wines, setWines] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let mounted = true;
        axios.get('https://api.wineworld.me/wines')
          .then(response => {
              if(mounted) {
                  // list = response.data;
                  setWines(response.data.list);
              }
          })
          .catch(errRes => {
              console.error(errRes);
          })
        return () => mounted = false;
      }, [])
  
    return (
        wines.map(wd => (<Col>
            {
                <Card border='dark' style={{width: 200}}>
                    <Card.Img class="rounded mx-auto d-block" variant="top" style={{width: 50}} src={wd.image} />
                    {/* <Card.Header className='text-muted '> Recommended </Card.Header> */}
                    <Card.Body>
                        <Card.Title> <p>{wd.name}</p> </Card.Title>
                        <Card.Subtitle> <p>Wine Type: {wd.type}</p></Card.Subtitle>
                        <Card.Text>
                            <p>
                                Winery: {wd.winery}
                            </p>
                            <p>
                                Rating: {wd.rating}
                            </p>
                            <p>
                                Reviews: {wd.reviews}
                            </p>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="">
                        <Button
                            className="btn btn-primary stretched-link"
                            variant="secondary"
                            href={"/Wines/Wine1"}
                        >
                            See More
                        </Button>
                    </Card.Footer>
                </Card>
            }
        </Col>))
    )
}
export default WineContent