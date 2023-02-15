//import RayDeveloperCard from "../components/Cards/RayDeveloperCard";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import {teamData} from "../components/TeamData.js"


import ListGroup from 'react-bootstrap/ListGroup';

const client = axios.create({
    baseURL: "https://gitlab.com/api/v4/",
  });
  

const fetchGitLabData = async () => {
    let totalCommits = 0,
      totalIssues = 0,
      totalUnitTests = 0;
  
    await client
      .get("projects/43416454/repository/contributors")
      .then((response) => {
        response.data.forEach((element) => {
          const { name, email, commits } = element;
  
          teamData.forEach((member) => {
            if (
              member.name === name ||
              member.gitlab_username === name ||
              member.email === email
            ) {
              console.log(commits);
              member.commits = commits;
            }
          });
          totalCommits += commits;
        });
      });

      await client.get("projects/39707042/issues").then((response) => {
        response.data.forEach((element) => {
          const { assignees } = element;
          assignees.forEach((assignee) => {
            const { name, email } = assignee;
            teamData.forEach((member) => {
              if (
                member.name === name ||
                member.gitlab_username === name ||
                member.email === email
              )
                member.issues += 1;
            });
          });
          totalIssues += 1;
        });
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
    const [totalTests, setTotalTests] = useState(0);
    const [devName, setDevName] = useState(0);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
          if (teamList === undefined || teamList.length === 0) {
            const gitLabData = await fetchGitLabData();
            setTotalCommits(gitLabData.totalCommits);
            setTotalIssues(gitLabData.totalIssues);
            setTotalTests(gitLabData.totalTests);
            setTeamList(gitLabData.teamInfo);
            setDevName(teamList[1].name);
            setLoaded(true);
          }
        };
        fetchData();
      }, [teamList]);
    

    return (
    <Stack>
        <Container className="p-4">
          <h1 className="d-flex justify-content-center p-4 ">Welcome to WineWorld!</h1>
          <p className="mx-auto">
            WineWorld is the place to learn about new and interesting wines and discover destinations where you can undertake a wine journey.
          </p>
        </Container>
        <Container className="p-4">
        <h1 className="d-flex justify-content-center p-4 ">Meet the WineWorld Team!</h1>
        <Row
            xs={1}
            sm={2}
            md={3}
            xl={5}
            className="g-4 p-4 justify-content-center"
          >

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/logo512.png"} />
                <Card.Body>
                    <Card.Title>{devName}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Total Commits: {totalCommits}</ListGroup.Item>
                    <ListGroup.Item>Total Issues: {totalIssues}</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
            </Col> 
            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                <Card.Body>
                    <Card.Title>{devName}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Total Commits: {totalCommits}</ListGroup.Item>
                    <ListGroup.Item>Total Issues: {totalIssues}</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
            </Col> 
            </Row>
        </Container>
    </Stack>    
    )
}

export default About