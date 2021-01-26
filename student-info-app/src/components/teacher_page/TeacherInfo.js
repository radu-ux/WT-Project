import Footer from "../main_page/Footer";
import TopNav from "../main_page/TopNav";
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from "react-router";
import { useEffect, useState } from 'react';

function TeacherInfo(props) {
    let [teacherInfo, setTeacherInfo] = useState({});

    const location = useLocation();
    const componentLocation = '/info';
    const currentLocation = location.pathname;
    const redirectUrl = currentLocation.slice(0, currentLocation.length - componentLocation.length);
    const tid = props.match.params.tuid;

    useEffect(async () => {
        const fetchData = async () => {
            const response = await axios('http://localhost:5000/teacher/info/' + tid);
            const data = response.data;
            const currentTeacherInfo = {
                first_name: data.first_name,
                family_name: data.family_name,
                email: data.email,
            }
            setTeacherInfo(currentTeacherInfo);
        }
        fetchData();
    }, []);

    return (
        <>
            <div div className='content-page' style={{minHeight:'calc(100vh - 10px)'}}>
                <TopNav brandUrlPath={redirectUrl} />
                <Container id='info-container'>
                <h2 id='info-container-title'>General Information</h2>
                <hr id='info-container-hr' />
                <Container style={{marginLeft:'3%'}}>
                    <Row className="justify-content-md-center">
                        <Col  xs lg="2"><h5>First Name</h5></Col>
                        <Col md="2"></Col>
                        <Col xs lg="3">{teacherInfo.first_name}</Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col  xs lg="2"><h5>Familiy Name</h5></Col>
                        <Col md="2"></Col>
                        <Col xs lg="3">{teacherInfo.family_name}</Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col  xs lg="2"><h5>Email</h5></Col>
                        <Col md="2"></Col>
                        <Col xs lg="3">{teacherInfo.email}</Col>
                    </Row>
                </Container>
            </Container>
            </div>
            <Footer />
        </>
    );
};

export default TeacherInfo;    