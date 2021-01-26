import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import Email from './static/email.png'
import './styles/Footer.css'

function Footer() {
    return (
        <footer className='footer'>
            <hr />
            <h4>SUPPORT</h4>
            <Container>
                <Row>
                    <Col>
                        <Button onClick={() => {window.open('mailto:radu.uivari99@e-uvt.ro')}} variant='outline-primary'>
                            <Image src={Email} />{' '}
                            radu.uivari99@e-uvt.ro
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={() => {window.open('mailto:george.sotoc99@e-uvt.ro')}} variant='outline-primary'>
                            <Image src={Email} />{' '}
                            george.sotoc99@e-uvt.ro
                        </Button>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col id='info-text'>Info at (0254.203.331)</Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;