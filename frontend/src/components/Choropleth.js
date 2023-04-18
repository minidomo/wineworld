import axios from 'axios';
import { CategoryScale, Chart, Legend, Title, Tooltip } from 'chart.js/auto';
import * as ChartGeo from 'chartjs-chart-geo';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { wineworld } from '../api';

// register controller in chart.js and ensure the defaults are set
Chart.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ChartGeo.ChoroplethController,
  ChartGeo.ProjectionScale,
  ChartGeo.ColorScale,
  ChartGeo.GeoFeature,
);

const Choropleth = () => {
  const [usData, setUsData] = useState([]);

  useEffect(() => {
    wineworld
      .get('/visualizations/provider/choropleth')
      .then(res => {
        setUsData(res.data.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    axios
      .get('https://unpkg.com/us-atlas/states-10m.json')
      .then(res => {
        const us = res.data;
        const nation = ChartGeo.topojson.feature(us, us.objects.nation).features[0];
        const states = ChartGeo.topojson.feature(us, us.objects.states).features;

        const data = {
          labels: states.map(d => d.properties.name),
          datasets: [
            {
              label: 'States',
              outline: nation,
              data: states.map(d => {
                const name = usData.find(e => e.state === d.properties.name);
                return {
                  feature: d,
                  value: name ? name.num_airports : 0,
                };
              }),
            },
          ],
        };

        const options = {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            projection: {
              axis: 'x',
              projection: 'albersUsa',
            },
            color: {
              axis: 'x',
              quantize: 20,
              max: 40,
              legend: {
                position: 'bottom-right',
                align: 'bottom',
              },
            },
          },
        };

        const wrapper = document.getElementById('choropleth-wrapper');
        const oldCanvas = wrapper.querySelector('canvas');
        if (oldCanvas) {
          wrapper.removeChild(oldCanvas);
        }

        const canvas = document.createElement('canvas');
        wrapper.appendChild(canvas);

        // eslint-disable-next-line
        const choro = new Chart(canvas.getContext('2d'), {
          type: 'choropleth',
          data,
          options,
        });
      })
      .catch(console.error);
  }, [usData]);

  return (
    <Container>
      <Row style={{ height: '100%' }}>
      <h3 className="p-5 text-center">Number of Airports per State</h3>
        <div id="choropleth-wrapper" style={{ height: '400px' }}></div>
      </Row>
    </Container>
  );
};

export default Choropleth;
