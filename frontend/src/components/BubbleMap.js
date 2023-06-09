import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Plot from 'react-plotly.js';

import { wineworld } from '../api';

const population = [];
const cityLat = [];
const cityLon = [];
const hoverText = [];
const scale = 50000;

const BubbleMap = () => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    wineworld
      .get('/visualizations/provider/bubble')
      .then(res => {
        setCityData(res.data.data);
      })
      .catch(console.error);
  }, []);

  return (
    <Container fluid="md">
      {cityData.forEach(cityInfo => {
        population.push(cityInfo.population / scale);
        cityLat.push(cityInfo.latitude);
        cityLon.push(cityInfo.longitude);
        hoverText.push(`${cityInfo.city}, ${cityInfo.state} population: ${cityInfo.population}`);
      })}
      <h3 className="p-5 text-center">City Population Map</h3>
      <Row>
        <Col>
          <Plot
            data={[
              {
                type: 'scattergeo',
                locationmode: 'USA-states',
                lat: cityLat,
                lon: cityLon,
                hoverinfo: 'text',
                text: hoverText,
                marker: {
                  size: population,
                  line: {
                    color: 'black',
                    width: 1,
                  },
                },
              },
            ]}
            layout={{
              showlegend: false,
              geo: {
                scope: 'usa',
                projection: {
                  type: 'albers usa',
                },
                showland: true,
                landcolor: 'rgb(217, 217, 217)',
                subunitwidth: 1,
                countrywidth: 1,
                subunitcolor: 'rgb(255,255,255)',
                countrycolor: 'rgb(255,255,255)',
              },
            }}
            config={{
              scrollZoom: false,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default BubbleMap;
