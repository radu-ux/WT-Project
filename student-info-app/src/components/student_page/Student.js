import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopNav from '../main_page/TopNav';
import Footer from '../main_page/Footer';
import './styles/Student.css';


function Student(props) {
    let history = useHistory();
    const {sid} = props.match.params;
    const urlPath = '/student-home-page/sid/' + sid;

    const handleGrades = () => {
        history.push(urlPath + '/grades');
    }
    const handleCourses = () => {
        history.push(urlPath + '/courses');
    }

    const handleInfo = () => {
        history.push(urlPath + '/info');
    }

    return (
        <>
            <div className='content-page' style={{minHeight:'calc(100vh - 10px)'}}>
                <TopNav brandUrlPath={urlPath}/>
                <Container id='card-container'>
                <Row>
                    <Col sm={6} md={6}>
                        <Card>
                            <Card.Header>UVT Student Info</Card.Header>
                            <Card.Body>
                                <Card.Title>Student Grades</Card.Title>
                                <Card.Text>
                                Here you can visualize all your grades for courses you are enrolled to.
                                </Card.Text>
                                <Button variant="primary" onClick={handleGrades}>See Grades</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={6} md={6}>
                        <Card>
                            <Card.Header>UVT Student Info</Card.Header>
                            <Card.Body>
                                <Card.Title>Course Informatiom</Card.Title>
                                <Card.Text>
                                Here you can visualize all your with corresponding credit number.
                                </Card.Text>
                                <Button variant="primary" onClick={handleCourses}>See Courses</Button>
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
                                <Button variant="primary" onClick={handleInfo}>See Info</Button>
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

export default Student;