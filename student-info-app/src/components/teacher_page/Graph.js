import Chart from 'chart.js';
import axios from 'axios';
import TopNav from '../main_page/TopNav';
import {  Container, Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

function Graph(props) {
    let [courseOptionArr, setCourseOptionArr] = useState([]);
    let [courseRetrospectiveArr, setCourseRetrospectiveArr] = useState([]);
    let courseOptionRef = useRef(null);
    let canvasRef = useRef(null);

    const location = useLocation();
    const tid = props.match.params.tuid;
    const componentLocation = '/see-graph';
    const currentLocation = location.pathname;
    const redirectUrl = currentLocation.slice(0, currentLocation.length - componentLocation.length);

    useEffect(() => {
        console.log(tid);
        const fetchData = async () => {
        const response = await axios.get('http://localhost:4000/teachers/' + tid);
        const data = response.data;
        
        let currentCourseOptionArr = [];

        data.courses.forEach(element => {
            currentCourseOptionArr.push(element.course_name);
        });

        console.log(data.courses);
        console.log(currentCourseOptionArr);

        setCourseOptionArr(currentCourseOptionArr);
        setCourseRetrospectiveArr(data.courses);
        } 

        fetchData();
    }, []);

    const createChart = (grades, years) => {
        const ctx = canvasRef.current.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [
                        {
                            label: 'Average grade evolution',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: "rgb(255, 99, 132)",
                            showLine: true,
                            fill: 'white',
                            data: grades
                        }
                    ],
                    options: {}
                },
            });
    };

    const handleChooseCourse = () => {
        let currentCourse = courseOptionRef.current.value;
        let currentCourseRetrospectiveArr = courseRetrospectiveArr.filter(course => course.course_name === currentCourse);
        let currentGradeArr = [];
        let currentYearArr = [];

        console.log(currentCourseRetrospectiveArr);
        currentCourseRetrospectiveArr.forEach(courseStatistic => {
            courseStatistic.grades.forEach(element => {
            currentGradeArr.push(element.avg_grade);
            currentYearArr.push(element.year);
            })
        });

        console.log(currentGradeArr);
        console.log(currentYearArr)
        createChart(currentGradeArr, currentYearArr);
    }

    return (
        <>
        <TopNav brandUrlPath={redirectUrl}></TopNav>
        <Container style={{marginTop: '5%'}}>
            <Row>
                    <Col><h3 style={{color:'rgb(30, 103, 160)'}}>Vizualize course evolution</h3></Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Choose Course</Form.Label>
                        <Form.Control as="select" ref={courseOptionRef}>
                            {
                            courseOptionArr.map((course, index) =>{
                                return(
                                <option>{course}</option>
                                )
                            })
                            }
                        </Form.Control>
                        <br />
                        <Button onClick={handleChooseCourse}>See graph</Button>
                    </Form.Group>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
        <canvas ref={canvasRef}></canvas>
        </>
    );
}

export default Graph;