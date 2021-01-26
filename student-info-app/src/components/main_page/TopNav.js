import { Container, Row, Col, Navbar } from 'react-bootstrap'
import Brand from './Brand'
import PersistentNav from './PersistentNav'
import './styles/TopNav.css'

function TopNav(porps) {
    return (
        <Container>
            <Row id='nav-row'>
                <Col>
                    <Navbar>
                        <Brand urlPath={porps.brandUrlPath}/>
                        <Navbar.Collapse>
                            <PersistentNav />
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Container>
        
    );
}

export default TopNav;  