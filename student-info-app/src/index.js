import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AboutUs from './components/about_us_page/AboutUs';
import Student from './components/student_page/Student';
import StudentLogin from './components/student_page/StudentLogin';
import Teacher from './components/teacher_page/Teacher';
import TeacherLogin from './components/teacher_page/TeacherLogin';
import GradeStudent from './components/teacher_page/GradeStudent';
import TeacherInfo from './components/teacher_page/TeacherInfo';
import Graph from './components/teacher_page/Graph';
import Grades from './components/student_page/Grades';
import Courses from './components/student_page/Courses';
import StudentInfo from './components/student_page/StudentInfo';
import PrivateRoute from './PrivateRoute';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
       
       <PrivateRoute exact path='/student-login' 
                    component={StudentLogin}
                    redirectStudentUrl='/student-home-page/sid/'
                    redirectTeachertUrl='/teacher-home-page/tid/' //Accessible only if student and teacher are NOT logged in
      />

      <PrivateRoute exact path='/teacher-login'
                   component={TeacherLogin}
                   redirectStudentUrl='/student-home-page/sid/'
                   redirectTeachertUrl='/teacher-home-page/tid/' //Accessible only if student and teacher are NOT logged in
       />

      <Route exact path='/aboutus'
             render={props => <AboutUs {...props}/>} // Accessible from anywhere
      /> 

       <Route exact path='/teacher-home-page/tid/:tid' 
             render={props=> <Teacher {...props} />}  //Accesible only if the student is logged in
       />

       <Route exact path='/teacher-home-page/tid/:tuid/grade-a-stud'
             render={props => <GradeStudent {...props} />}
       />

      <Route exact path='/teacher-home-page/tid/:tuid/see-graph'
             render={props => <Graph {...props} />}
      />

      <Route exact path='/teacher-home-page/tid/:tuid/info'
             render={props => <TeacherInfo {...props} />}
      />      

      <Route exact path='/student-home-page/sid/:sid' 
             render={props=> <Student {...props} />}  //Accesible only if the student is logged in
      />

      <Route exact path='/student-home-page/sid/:uid/grades'
                   render={props => <Grades {...props} />}      
      />    

      <Route exact path='/student-home-page/sid/:uid/courses'
                   render={props => <Courses {...props} />}      
      />    

      <Route exact path='/student-home-page/sid/:uid/info'
                   render={props => <StudentInfo {...props} />}      
      />    

      <PrivateRoute path='/' 
             component={App}
             redirectStudentUrl='/student-home-page/sid/' //Accessible only if teacher and student are NOT logged in
             redirectTeacherUrl='/teacher-home-page/tid/'
      />

      <Route path='*' 
            render={props => {return <div>Page not available</div>}}
      />
      
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
