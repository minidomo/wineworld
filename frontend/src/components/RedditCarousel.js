import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './RedditCarousel.css';

function RedditCarousel(props) {
    /** @type {string[]} */
    const redditUrls = props.redditUrls
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => setIndex(selectedIndex);

    return (
        <Carousel id='reddit-carousel' activeIndex={index} onSelect={handleSelect}>
            {
                redditUrls.map((redditUrl, i) => (
                    <Carousel.Item>
                        <iframe
                            title="reddit_frame"
                            id={`reddit-embed-${i}`}
                            src={`${redditUrl}?ref_source=embed&amp;ref=share&amp;embed=true&amp;theme=dark`}
                            sandbox={'allow-scripts allow-same-origin allow-popups'}
                            style={{ border: 'none' }}
                            height={'100%'}
                            width={'100%'}
                        ></iframe>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    );
}

export default RedditCarousel;