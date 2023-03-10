import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';

const RegionSearch = () => (
    <div>
        <Container>
            <Row>
                <Col>
                    <DropdownButton
                        id="dropdown-basic-button"
                        variant="secondary"
                        size="sm"
                        menuVariant="dark"
                        title="Sort By"
                        className="mt-2"
                    >
                        <Dropdown.Item href="#/action-1">Name</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Region</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Rating</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <DropdownButton
                        id="dropdown-basic-button"
                        variant="secondary"
                        size="sm"
                        menuVariant="dark"
                        title="Order"
                        className="mt-2"
                    >
                        <Dropdown.Item href="#/action-1">Ascending</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Descending</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <form class="d-flex" role="search">
                        <input class="form-control me-1" type="search" placeholder="Search" aria-label="Search"></input>
                        <button class="btn btn-outline-secondary" type="submit">
                            Search
                        </button>
                    </form>
                </Col>
            </Row>
        </Container>
    </div>
);
export default RegionSearch;
