import Footer from "../main_page/Footer";
import TopNav from "../main_page/TopNav";
import * as d3 from 'd3';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from "react-bootstrap";
import { useLocation } from "react-router";
import './styles/Courses_Grades.css'

function Courses(props) {
  const location = useLocation();
  const sid = props.match.params.uid;
  const componentUrl = '/courses';
  const currentLocation = location.pathname;
  const redirectUrl = currentLocation.slice(0, currentLocation.length - componentUrl.length);
  const attributes = ['course', 'category', 'semester', 'credits'];
  
  function createTable(data) {
    let table = d3.select('.table-container')
                .append('table')
                .style('width', '100%')
    table.selectAll('tr')
          .data(attributes)
          .join('th')
          .style('background', '#666')
          .style('color', '#fff')
          .text(d => d.toUpperCase());

    table.selectAll('tr')
          .data(data)
          .join('tr')
    let tr = d3.selectAll('tr') 
    tr.each((d, i, nodes) => {
      let currentTr = d3.select(nodes[i])
      attributes.forEach(element => {
        currentTr.append('td')
                  .style('padding', '8px')
                  .text(d[element])
      });
    })
  }    

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios('http://localhost:5000/student/courses/' + sid);
      const courses = response.data;
      createTable(courses);
    }

    fetchData();
  }, []);

  return (
        <>
            <div className='content-page' style={{minHeight:'calc(100vh - 10px)'}}>
              <TopNav brandUrlPath={redirectUrl}/>
              <Container id='main-container'>
                <div className='table-container'>
                  <div id='courses-container'>
                      <h2 id='courses-container-title'>Your courses</h2>
                      <hr id='courses-container-hr' />
                  </div>
                </div>
            </Container>
            </div>
            <Footer />
        </>
    );
}

export default Courses;