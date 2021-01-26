import Footer from "../main_page/Footer";
import TopNav from "../main_page/TopNav";
import axios from 'axios';
import { useLocation } from "react-router";
import { Container, Row, Button, Col, Form } from 'react-bootstrap';
import { createRef, useEffect, useRef, useState } from "react";

function GradeStudent(props) {
    let courseOptionRef = useRef(null);
    let studentContainerRef = useRef(null);
    let successfulGradeSubmitionRef = useRef();
    let [gradeRef, setGradeRef] = useState([]);
    let [studentList, setStudentList] = useState([]);
    let [courses, setCourses] = useState([]);

    const location = useLocation();
    const tid = props.match.params.tuid;
    const componentLocation = '/grade-a-stud';
    const currentLocation = location.pathname;
    const redirectUrl = currentLocation.slice(0, currentLocation.length - componentLocation.length);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios('http://localhost:5000/teacher/grades/' + tid);
            const data = response.data;
            console.log(data);
            setCourses(data);
        }
    
        fetchData();
        setGradeRef(ref => (
            Array(studentList.length).fill().map((_, i) => ref[i] || createRef())
          ));
    }, [studentList])

    const showStudentsHandler = () => {
        successfulGradeSubmitionRef.current.hidden = true;
        let currentCourseName = courseOptionRef.current.value;
        courses.forEach(course => {
            if(course.course_name === currentCourseName) {
                setStudentList(course.students);
                studentContainerRef.current.hidden = false;
            }
        })
    }

    const sendGradesHandler = async () => {
        let sendException = {message: 'Cannot send'};

        try {
            let gradeArr = [];
            let currentCourse = courseOptionRef.current.value;
            let dataToSend = {};
            for(let i=0; i<gradeRef.length; i++) {
                let grade = parseInt(gradeRef[i].current.value, 10);
                let student = studentList[i].stud_name;
                let gradeObj = {
                    stud_name: student,
                    grade: grade
                };
                if(grade <= 0 || grade > 10) {
                    throw sendException;
                }
                gradeArr.push(gradeObj);
            }
            dataToSend.course_name = currentCourse;
            dataToSend.grades = gradeArr;
            const optionHeaders = {
                method: 'POST', 
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify(dataToSend)
            };

            const response = await fetch('http://localhost:5000/teacher/give-grades', optionHeaders);
            const data = await response.json();

            if(data.status === 200) {
                studentContainerRef.current.hidden = true;
                successfulGradeSubmitionRef.current.hidden = false;
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <>
        <div className='content-page' style={{minHeight:'calc(100vh - 10px)'}}>
            <TopNav brandUrlPath={redirectUrl} />
            <Container style={{marginTop:'5%'}}>
                <Row>
                    <Col><h3 style={{color:'rgb(30, 103, 160)'}}>Grading students</h3></Col>
                </Row>
                <br />
                <Row className="justify-content-md-center"> 
                    <Col md='6'>
                    <Form>
                        <Form.Group>
                            <Form.Label>Choose course</Form.Label>
                            <Form.Control as="select" size="md" custom ref={courseOptionRef}>
                                {courses.map((course, index) => {
                                        return (
                                            <option>{course.course_name}</option>
                                        )   
                                    })
                                }
                            </Form.Control>
                            </Form.Group>
                            <Button variant='primary' onClick={showStudentsHandler}>See students</Button>
                        </Form>
                    </Col>
                    <Col md='6'></Col>
                </Row>
            </Container>
            <h3 style={{textAlign:'center'}}  hidden ref={successfulGradeSubmitionRef}>Grades were assigned !</h3>
            <Container style={{marginTop:'5%'}} hidden ref={studentContainerRef}>
                    <Row className="justify-content-md-center">
                        <Col xs lg='2'>
                            <h4>Student Name</h4>   
                        </Col>
                        <Col md='2'></Col>
                        <Col xs lg='2'>
                            <h4>Grade</h4>
                        </Col>
                    </Row>
                    <hr/>
                    {studentList.map((student, index) => {
                        return (
                            <Row className="justify-content-md-center">
                                <Col xs lg='2'>
                                    <h5>{student.stud_name}</h5>   
                                </Col>
                                <Col md='2'></Col>
                                <Col xs lg='2'>
                                    <input type='number' min='1' max='10' ref={gradeRef[index]}/>
                                </Col>
                            </Row>
                        )
                    })}
                    <br />
                    <Row className="justify-content-md-center">
                        <Col xs lg='2'></Col>
                        <Col md='2'><Button variant='primary' onClick={sendGradesHandler}>Submit</Button></Col>
                        <Col xs lg='2'></Col>
                    </Row>
                </Container>
        </div>
        <Footer />
        </>
    );
};

export default GradeStudent; 