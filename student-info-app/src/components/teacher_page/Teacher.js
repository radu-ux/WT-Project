import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopNav from '../main_page/TopNav';
import Footer from '../main_page/Footer';
import './styles/Teacher.css'

function Teacher(props) {
    let history = useHistory();
    const {tid} = props.match.params;
    const urlPath = '/teacher-home-page/tid/' + tid;

    const createGraphHandler = () => {
        history.push('/teacher-home-page/tid/' + tid + '/see-graph');
    }

    const gradeAStudentHandler = () => {
        history.push('/teacher-home-page/tid/' + tid + '/grade-a-stud');
    }

    const generalInfoHandler = () => {
        history.push('/teacher-home-page/tid/' + tid + '/info');
    }

    return (
        <>
            <div className='content-page' style={{minHeight:'calc(100vh - 10px)'}}>
                <TopNav brandUrlPath={urlPath} />
                <Container id='card-container'>
                <Row>
                    <Col sm={6} md={6}>
                        <Card>
                            <Card.Header>UVT Student Info</Card.Header>
                            <Card.Body>
                                <Card.Title>Grade a student</Card.Title>
                                <Card.Text>
                                Here you can give grades to students enrolled to your course.
                                </Card.Text>
                                <Button variant="primary" onClick={gradeAStudentHandler}>Grade student</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} md={6}>
                        <Card>
                            <Card.Header>UVT Student Info</Card.Header>
                            <Card.Body>
                                <Card.Title>Plot course evolution</Card.Title>
                                <Card.Text>
                                Here you can visualize a graph describing grades obtained at your course.
                                </Card.Text>
                                <Button variant="primary" onClick={createGraphHandler}>Create graph</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                <br />
                <Row >
                    <Col sm={3} md={3}></Col>
                    <Col sm={6} md={6}>
                    <Card >
                        <Card.Header>UVT Student Info</Card.Header>
                            <Card.Body>
                                <Card.Title>General Information</Card.Title>
                                <Card.Text>
                                Here you can visualize your personal infromation.
                                </Card.Text>
                                <Button variant="primary" onClick={generalInfoHandler}>See Info</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={3} md={3}></Col>
                </Row>
            </Container>
            </div>
            <Footer />
        </>
    );
}

export default Teacher;
