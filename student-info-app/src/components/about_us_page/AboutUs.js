import { Container, Row, Col, Image } from "react-bootstrap";
import UVTBanner from './static/uvt banner.png';
import Brand from '../main_page/Brand';

function AboutUs() {
    return (
        <Container style={{marginTop:'15%'}}>
            <Row>
                <Col><hr /></Col>
            </Row>
            <Row>
                <Col md='6'>
                    <div>
                        <h2 style={{color:'rgb(30, 103, 160)'}}>Student info application</h2>
                        <p>
                            This app intends to act as a tool for students to visualize their grades and courses and
                            also for teachers to grade their students and to maintain a course retrospective
                        </p>
                    </div>
                </Col>
                <Col md='6' style={{textAlign:'center'}}>
                    <Image src={UVTBanner} />
                </Col>
            </Row>
            <Row>
                <Col><hr /></Col>
            </Row>
        </Container>
    );
}

export default AboutUs;