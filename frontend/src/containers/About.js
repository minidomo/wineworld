import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';

import { gitlab } from '../api';
import ApiCard from '../components/ApiCard';
import { ApiData } from '../components/ApiData.js';
import DeveloperCard from '../components/DeveloperCard';
import { teamData } from '../components/TeamData.js';
import ToolCard from '../components/ToolCard';
import { toolData } from '../components/ToolData.js';

const fetchGitLabData = async () => {
  let totalCommits = 0,
    totalIssues = 0,
    totalUnitTests = 0;

  await gitlab.get('projects/43416454/repository/contributors').then(response => {
    teamData.forEach(member => {
      member.commits = 0;
      member.issues = 0;
      totalUnitTests += member.unit_tests;
    });

    response.data.forEach(element => {
      const { name, commits } = element;

      let found = false;
      teamData.forEach(member => {
        if (member.name === name || member.alt_names.has(name)) {
          member.commits += commits;
          totalCommits += commits;
          found = true;
        }
      });

      if (!found) {
        console.log(`No member found with name: ${name}`);
      }
    });
  });

  const issueStatisticsPromises = teamData.map(member =>
    gitlab.get('projects/43416454/issues_statistics', {
      params: {
        author_username: member.gitlab_id,
      },
    }),
  );

  const issueStatistics = await Promise.all(issueStatisticsPromises);
  issueStatistics.forEach((response, i) => {
    const count = response.data.statistics.counts.all;
    teamData[i].issues = count;
    totalIssues += count;
  });

  return {
    totalCommits: totalCommits,
    teamData: teamData,
    totalIssues: totalIssues,
    totalUnitTests: totalUnitTests,
  };
};

const About = () => {
  const [teamList, setTeamList] = useState([]);
  const [totalCommits, setTotalCommits] = useState(0);
  const [totalIssues, setTotalIssues] = useState(0);
  const [totalTotalTests, setTotalTests] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (teamList === undefined || teamList.length === 0) {
        const gitLabData = await fetchGitLabData();
        setTotalCommits(gitLabData.totalCommits);
        setTotalIssues(gitLabData.totalIssues);
        setTeamList(gitLabData.teamData);
        setTotalTests(gitLabData.totalUnitTests);
        setLoaded(true);
      }
    };
    fetchData();
  }, [teamList]);

  return (
    <Stack>
      <Container className="d-flex justify-content-center p-4">
        <Row>
          <Col>
            <Card style={{ width: '70rem' }}>
              <Card.Body>
                <Card.Title>
                  <h1>
                    Welcome to WineWorld!
                  </h1>
                </Card.Title>
                <Card.Text>
                  <p className="mx-auto">
                    WineWorld is an innovative platform that provides a comprehensive guide to the world of
                    wine, vineyards, and wine regions. Our goal is to empower wine enthusiasts, from
                    beginners to experts, to explore and deepen their
                    understanding of this fascinating industry.
                  </p>
                  <h1 className="d-flex justify-content-center p-3 ">Repository Statistics</h1>
                  <Row className="p-4">
                    <Col className="d-flex justify-content-center">
                      <h2>Total Commits: {totalCommits}</h2>
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <h2>Total Issues: {totalIssues}</h2>
                    </Col>
                    <Col className="d-flex justify-content-center">
                      <h2>Total Tests: {totalTotalTests}</h2>
                    </Col>
                  </Row>
                  <Link to={'https://documenter.getpostman.com/view/21507814/2s93CEvGRv'}
                    class={'btn custom1 stretched-link'}>
                    <h2>API Documentation</h2>
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="p-4">
        <h1 className="d-flex justify-content-center p-4 ">Meet the WineWorld Team!</h1>

        {loaded ? (
          <Row xs={1} sm={2} md={3} xl={5} className="g-4 p-4 justify-content-center">
            {teamList.map((member, i) => (
              <Col className="d-flex align-self-stretch" key={i}>
                <DeveloperCard devCard={member} key={i} />
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            <Col className="d-flex justify-content-center">
              <Spinner animation="grow" />
            </Col>
          </Row>
        )}
      </Container>

      <Container className="p-4">
        <h1 className="d-flex justify-content-center p-4 ">Tools</h1>
        <Row xs={1} sm={2} md={3} xl={5} className="g-4 p-4 justify-content-center">
          {toolData.map((member, i) => (
            <Col className="d-flex align-self-stretch" key={i}>
              <ToolCard tool={member} key={i} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="p-4">
        <h1 className="d-flex justify-content-center p-4 ">APIs</h1>
        <Row xs={1} sm={2} md={3} xl={5} className="g-4 p-4 justify-content-center">
          {ApiData.map((member, i) => (
            <Col className="d-flex align-self-stretch" key={i}>
              <ApiCard api={member} key={i} />
            </Col>
          ))}
        </Row>
      </Container>
    </Stack>
  );
};

export default About;
