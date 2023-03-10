import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import ApiCard from '../components/ApiCard';
import { ApiData } from '../components/ApiData.js';
import DeveloperCard from '../components/DeveloperCard';
import { teamData } from '../components/TeamData.js';
import ToolCard from '../components/ToolCard';
import { toolData } from '../components/ToolData.js';

const client = axios.create({
    baseURL: 'https://gitlab.com/api/v4/',
});

const fetchGitLabData = async () => {
    let totalCommits = 0,
        totalIssues = 0,
        totalUnitTests = 0;
    await client.get('projects/43416454/repository/commits?per_page=9999').then(response => {
        teamData.forEach(member => {
            member.commits = 0;
            member.issues = 0;
            totalUnitTests += member.unit_tests;
        });
        response.data.forEach(element => {
            const { author_name } = element;
            teamData.forEach(member => {
                if (member.name === author_name || member.gitlab_id === author_name) {
                    member.commits++;
                }
            });
        });
        totalCommits = response.data.length;
    });

    await client.get('projects/43416454/issues_statistics?author_username=jrayyin').then(response => {
        teamData[0].issues = response.data.statistics.counts.all;
        totalIssues += response.data.statistics.counts.all;
    });

    await client.get('projects/43416454/issues_statistics?author_username=saniyashaju').then(response => {
        teamData[1].issues = response.data.statistics.counts.all;
        totalIssues += response.data.statistics.counts.all;
    });

    await client.get('projects/43416454/issues_statistics?author_username=minidomo').then(response => {
        teamData[2].issues = response.data.statistics.counts.all;
        totalIssues += response.data.statistics.counts.all;
    });

    await client.get('projects/43416454/issues_statistics?author_username=rparappuram').then(response => {
        teamData[3].issues = response.data.statistics.counts.all;
        totalIssues += response.data.statistics.counts.all;
    });

    await client.get('projects/43416454/issues_statistics?author_username=acbarret').then(response => {
        teamData[4].issues = response.data.statistics.counts.all;
        totalIssues += response.data.statistics.counts.all;
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
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (teamList === undefined || teamList.length === 0) {
                const gitLabData = await fetchGitLabData();
                setTotalCommits(gitLabData.totalCommits);
                setTotalIssues(gitLabData.totalIssues);
                setTeamList(gitLabData.teamData);
                setLoaded(true);
            }
        };
        fetchData();
    }, [teamList]);

    return (
        <Stack>
            <Container className="p-4"></Container>

            <Container className="p-4" style={{ backgroundColor: '#FFFFFF' }}>
                <h1 className="d-flex justify-content-center p-4 ">Welcome to WineWorld!</h1>
                <p className="mx-auto">
                    WineWorld is an innovative platform that provides a comprehensive guide to the world of wine,
                    vineyards, and wine regions. Our goal is to empower wine enthusiasts, from beginners to experts, to
                    explore and deepen their understanding of this fascinating industry.
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
                        <h2>Total Tests: 0</h2>
                    </Col>
                </Row>

                <a href={'https://documenter.getpostman.com/view/21507814/2s93CEvGRv'}>
                    <h2>API Documentation</h2>
                </a>
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
