import Footer from "../main_page/Footer";
import TopNav from "../main_page/TopNav";
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from "react-router";
import { useEffect, useState } from 'react';
import './styles/Info.css';

function Info(props) {
    let [studentInfo, setStudentInfo] = useState({});
    
    const location = useLocation();
    const componentUrl = '/info';
    const currentUrl = location.pathname;
    const redirectUrl = currentUrl.slice(0, currentUrl.length - componentUrl.length)
    const sid = props.match.params.uid;

    useEffect(async () => {
        const fetchData = async () => {
            const response = await axios('http://localhost:5000/student/info/' + sid);
            const data = response.data;
            const currentStudentInfo = {
                first_name: data.first_name,
                family_name: data.family_name,
                email: data.email,
                date_of_birth: data.date_of_birth,
                country_of_birth: data.country_of_birth,
                city_of_birth: data.city_of_birth,
                sex: data.sex,
                CNP: data.CNP
            }
            setStudentInfo(currentStudentInfo);
        }
        fetchData();
    }, []);

    console.log(studentInfo);

    return (
        <>
            <div className='content-page' style={{minHeight:'calc(100vh - 10px)'}}>
                <TopNav brandUrlPath={redirectUrl} />
                <Container id='info-container'>
                <h2 id='info-container-title'>General Information</h2>
                <hr id='info-container-hr' />
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="2"><h5>First Name</h5></Col>
                        <Col md="2"></Col>
                        <Col xs lg="2">{studentInfo.first_name}</Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs lg="2"><h5>Familiy Name</h5></Col>
                        <Col md="2"></Col>
                        <Col xs lg="2">{studentInfo.family_name}</Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs lg="2"><h5>Date of birth</h5></Col>
                        <Col md="2"></Col>
                        <Col xs lg="2">{studentInfo.date_of_birth}</Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs lg="2"><h5>Country of birth</h5></Col>
                        <Col md="2"></Col>
                        <Col xs lg="2">{studentInfo.country_of_birth}</Col>
                    </Row >
                    <Row className="justify-content-md-center">
                        <Col xs lg="2"><h5>City of birth</h5></Col>
                        <Col md="2"></Col>
                        <Col xs lg="2">{studentInfo.city_of_birth}</Col>
                    </Row>
                    <Row className="justify-content-md-center"> 
                        <Col xs lg="2"><h5>Sex</h5></Col>
                        <Col md="2"></Col>
                        <Col xs lg="2">{studentInfo.sex}</Col>
                    </Row>
                    <Row className="justify-content-md-center"> 
                        <Col xs lg="2"><h5>CNP</h5></Col>
                        <Col md="2"></Col>
                        <Col xs lg="2">{studentInfo.CNP}</Col>
                    </Row>
                </Container>
            </Container>
            </div>
            <Footer />
        </>
    );
}

export default Info;