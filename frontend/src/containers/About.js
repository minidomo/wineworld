//import RayDeveloperCard from "../components/Cards/RayDeveloperCard";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button"
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
        </Container>

        <Container className="p-4" style= {{backgroundColor: '#ff9194'}}>
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
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/rayPic.jpg"} />
                <Card.Body>
                    <Card.Title>{devName}</Card.Title>
                    <Card.Text>
                    abc
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Total Commits: {totalCommits}</ListGroup.Item>
                    <ListGroup.Item>Total Issues: {totalIssues}</ListGroup.Item>
                    <ListGroup.Item>Total Unit Tests: </ListGroup.Item>
                </ListGroup>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                <Card.Body>
                    <Card.Title>{devName}</Card.Title>
                    <Card.Text>
                    abc
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

        <Container className="p-4">
        <h1 className="d-flex justify-content-center p-4 ">Tools</h1>
        <Row xs={1} sm={2} md={3} xl={5} className="g-4 p-4 justify-content-center">

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/logo512.png"} />
                <Card.Body>
                    <Card.Title>React</Card.Title>
                    <Card.Text>
                    A Javascript library for front-end development
                    </Card.Text>
                    <a href="https://reactjs.org/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/gitlab.png"} />
                <Card.Body>
                    <Card.Title>GitLab</Card.Title>
                    <Card.Text>
                    Collaborative software development platform
                    </Card.Text>
                    <a href="https://about.gitlab.com/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col>

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/mteams.png"} />
                <Card.Body>
                    <Card.Title>Microsoft Teams</Card.Title>
                    <Card.Text>
                    Designated communication platform
                    </Card.Text>
                    <a href="https://www.microsoft.com/en-us/microsoft-teams/group-chat-software">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col>

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/bootstrap.png"} />
                <Card.Body>
                    <Card.Title>React Bootstrap</Card.Title>
                    <Card.Text>
                    Bootstrap framework for React
                    </Card.Text>
                    <a href="https://react-bootstrap.github.io/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col>

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/postman.png"} />
                <Card.Body>
                    <Card.Title>Postman</Card.Title>
                    <Card.Text>
                    Platform for API development and testing
                    </Card.Text>
                    <a href="https://www.postman.com/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col>

            </Row>

            <Row xs={1} sm={2} md={3} xl={5} className="g-4 p-4 justify-content-center">

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/aws.png"} />
                <Card.Body>
                    <Card.Title>AWS Amplify</Card.Title>
                    <Card.Text>
                    Hosting platform for WineWorld
                    </Card.Text>
                    <a href="https://aws.amazon.com/amplify/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col>

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/namecheap.png"} />
                <Card.Body>
                    <Card.Title>Namecheap</Card.Title>
                    <Card.Text>
                    Domain name registration for
                    </Card.Text>
                    <a href="https://www.namecheap.com/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/vscode.png"} />
                <Card.Body>
                    <Card.Title>Visual Studio Code</Card.Title>
                    <Card.Text>
                    Popular code editing software
                    </Card.Text>
                    <a href="https://code.visualstudio.com/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/npm.png"} />
                <Card.Body>
                    <Card.Title>Node Package Manager</Card.Title>
                    <Card.Text>
                    Javascript package manager
                    </Card.Text>
                    <a href="https://www.npmjs.com/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/route53.png"} />
                <Card.Body>
                    <Card.Title>Route 53 AWS</Card.Title>
                    <Card.Text>
                    Routing from amplify to domain
                    </Card.Text>
                    <a href="https://aws.amazon.com/route53/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col>   

            </Row>
        </Container>

        <Container className="p-4">
        <h1 className="d-flex justify-content-center p-4 ">APIs</h1>
        <Row xs={1} sm={2} md={3} xl={5} className="g-4 p-4 justify-content-center">

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/logo512.png"} />
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                    
                    </Card.Text>
                    <a href="">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/logo512.png"} />
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                    
                    </Card.Text>
                    <a href="">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/logo512.png"} />
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                    
                    </Card.Text>
                    <a href="">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/logo512.png"} />
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>
                    
                    </Card.Text>
                    <a href="">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            </Row>
        </Container>

    </Stack>    
    )
}

export default About