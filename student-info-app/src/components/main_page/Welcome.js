import { Container, Row, Col } from 'react-bootstrap';
import MyCard from './MyCard';
import TopNav from './TopNav';
import Footer from './Footer';
import StudentLogo from './static/student logo.jpg';
import TeacherLogo from './static/teacher logo.jpg';
import AuthInfo from '../../AuthenticationInfo';
import './styles/Welcome.css';


function Welcome() {
    console.log('In Welcome')
    console.log('Student auth ' + AuthInfo.isStudentAuthenticated());
    console.log('Teacher auth ' + AuthInfo.isTeacherAuthenticated());

    return (
        <>
            <div className='content-page' style={{minHeight:'calc(100vh - 10px)'}}>
                <TopNav brandUrlPath='/'/>
                <Container id='card-container'>
                    <Row>
                        <Col md={6} lg={6}><MyCard className='my-card' logo={StudentLogo} title='Student'/></Col>
                        <Col md={6} lg={6}><MyCard className='my-card' logo={TeacherLogo} title='Teacher'/></Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Welcome;