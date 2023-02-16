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
    headers: { "PRIVATE-TOKEN" : "glpat-8b25mfH7tj6qdzrFRfv1" },
  });
  

const fetchGitLabData = async () => {
    let totalCommits = 0,
      totalIssues = 0,
      totalUnitTests = 0;

      
    
      console.log("run");
    
    await client
      .get("projects/43416454/repository/commits?per_page=9999")
      .then((response) => {
        console.log(response.data);
        teamData.forEach((member) => {
            member.commits = 0;
            member.issues = 0;
            totalUnitTests += member.unit_tests;
          });
        response.data.forEach((element) => {
          const {author_name} = element;
          teamData.forEach((member) => {
            if (member.name === author_name || member.gitlab_id === author_name) {
              member.commits ++;
            }
            
          });
          
        });
        totalCommits = response.data.length;
      });

      await client.get("projects/43416454/issues_statistics?author_username=jrayyin").then((response) => {
       
        teamData[0].issues = response.data.statistics.counts.all;
        totalIssues += response.data.statistics.counts.all;
      });

      await client.get("projects/43416454/issues_statistics?author_username=saniyashaju").then((response) => {
        
        teamData[1].issues = response.data.statistics.counts.all;
        totalIssues += response.data.statistics.counts.all;
      });

      await client.get("projects/43416454/issues_statistics?author_username=minidomo").then((response) => {
        
        teamData[2].issues = response.data.statistics.counts.all;
        totalIssues += response.data.statistics.counts.all;
      });

      await client.get("projects/43416454/issues_statistics?author_username=rparappuram").then((response) => {
        teamData[3].issues = response.data.statistics.counts.all;
        totalIssues += response.data.statistics.counts.all;
      });

      await client.get("projects/43416454/issues_statistics?author_username=acbarret").then((response) => {
        
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


    useEffect(() => {
        const fetchData = async () => {
          if (teamList === undefined || teamList.length === 0) {
            const gitLabData = await fetchGitLabData();
            setTotalCommits(gitLabData.totalCommits);
            setTotalIssues(gitLabData.totalIssues);
            setTeamList(gitLabData.teamInfo);
          }
        };
        fetchData();
      }, [teamList]);
    

    return (
    <Stack>
        <Container className="p-4">
        </Container>

        <Container className="p-4" style= {{backgroundColor: '#ffb5b7'}}>
          <h1 className="d-flex justify-content-center p-4 ">Welcome to WineWorld!</h1>
          <p className="mx-auto">
          WineWorld is an innovative platform that provides a comprehensive guide to the world of wine, vineyards, and wine regions.
        Our goal is to empower wine enthusiasts, from beginners to experts, to explore and deepen their understanding of this fascinating industry. 
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

            <a
                href={"https://documenter.getpostman.com/view/21507814/2s93CEvGRv"}
             >
            <h2>API Documentation</h2>
          </a>

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
                    <Card.Title>Ray Yin</Card.Title>
                    <Card.Text>
                    I'm a junior studying Computer Science at UT Austin. In my free time I enjoy playing volleyball and trying new restaurants.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Front-end</ListGroup.Item>
                    <ListGroup.Item> Commits: {teamData[0].commits}</ListGroup.Item>
                    <ListGroup.Item> Issues: {teamData[0].issues}</ListGroup.Item>
                    <ListGroup.Item> Unit Tests: 0</ListGroup.Item>
                </ListGroup>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/ryan.jpg"} />
                <Card.Body>
                    <Card.Title>Ryan Parappuram</Card.Title>
                    <Card.Text>
                    I'm a sophomore learning full-stack software engineering. I love to play basketball, eat tasty food, and drive cars!
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Full-stack</ListGroup.Item>
                    <ListGroup.Item>Commits: {teamData[3].commits}</ListGroup.Item>
                    <ListGroup.Item>Issues: {teamData[3].issues}</ListGroup.Item>
                    <ListGroup.Item>Unit Tests: 0</ListGroup.Item>
                </ListGroup>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/jbladera.jpg"} />
                <Card.Body>
                    <Card.Title>JB Ladera</Card.Title>
                    <Card.Text>
                    I'm a third year CS student studying at UT Austin. I enjoy watching anime and playing video games in my spare time.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Back-end</ListGroup.Item>
                    <ListGroup.Item>Commits: {teamData[2].commits}</ListGroup.Item>
                    <ListGroup.Item>Issues: {teamData[2].issues}</ListGroup.Item>
                    <ListGroup.Item>Unit Tests: 0</ListGroup.Item>
                </ListGroup>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/saniya.jpg"} />
                <Card.Body>
                    <Card.Title>Saniya Shaju</Card.Title>
                    <Card.Text>
                    I'm a sophomore computer science major at UT Austin. My hobbies include crocheting, reading fiction novels, and writing short stories and poetry.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Front-End</ListGroup.Item>
                    <ListGroup.Item>Commits: {teamData[1].commits}</ListGroup.Item>
                    <ListGroup.Item>Issues: {teamData[1].issues}</ListGroup.Item>
                    <ListGroup.Item>Unit Tests: 0</ListGroup.Item>
                </ListGroup>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/austin.jpg"} />
                <Card.Body>
                    <Card.Title>Austin Barret</Card.Title>
                    <Card.Text>
                    I'm a sophomore computer science major at UT Austin. My hobbies include cooking, windsurfing, and reading books.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Front-end</ListGroup.Item>
                    <ListGroup.Item>Commits: {teamData[4].commits}</ListGroup.Item>
                    <ListGroup.Item>Issues: {teamData[4].issues}</ListGroup.Item>
                    <ListGroup.Item>Unit Tests: 0</ListGroup.Item>
                </ListGroup>
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
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/gitlab.png"} />
                <Card.Body>
                    <Card.Title>GitLab API</Card.Title>
                    <Card.Text>
                    GitLab API was used to find repository statistics
                    </Card.Text>
                    <a href="https://docs.gitlab.com/ee/api/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/wine.jpg"} />
                <Card.Body>
                    <Card.Title>Wines API</Card.Title>
                    <Card.Text>
                    Wines API was used to find general information about wines such as price, name, and country
                    </Card.Text>
                    <a href="https://sampleapis.com/api-list/wines">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/yelp.jpg"} />
                <Card.Body>
                    <Card.Title>Yelp Fusion API</Card.Title>
                    <Card.Text>
                    Yelp Fusion API was used to find information about vineyards like ratings based on reviews and price level
                    </Card.Text>
                    <a href="https://fusion.yelp.com/">
                        <Button variant="primary">Learn More</Button>
                    </a>
                </Card.Body>
            </Card>
            </Col> 

            <Col className="d-flex align-self-stretch">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/tripadvisor.png"} />
                <Card.Body>
                    <Card.Title>Tripadvisor API</Card.Title>
                    <Card.Text>
                    Tripadvisor API was used to find information about regions including country, ratings, and relevant tags
                    </Card.Text>
                    <a href="https://www.tripadvisor.com/developers">
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