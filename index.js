//Packages required
const express = require("express");
const cors = require('cors');
const expressSession = require('express-session');
const Passport = require("passport").Passport;
const studentPassport = new Passport();
const teacherPassport = new Passport();
const initializePassport = require('./passport-config');
const path = require('path');
const conn = require('./database')
const StudentObj = require('./student')
const Student = StudentObj.Student
const CourseObj = require('./course')
const Course = CourseObj.Course
const GradeObj = require('./grade')
const Grade = GradeObj.Grade
const TeacherObj = require('./teacher');
const { response } = require("express");
const Teacher = TeacherObj.Teacher

//Variable definitions
const app = express();
const port = process.env.PORT || 5000;
const Students = [{id: 1, email: 'radu.uivari99@e-uvt.ro', password: '123456'}];
const Teachers = [{id: 1, email: 'radu.uivari22@e-uvt.ro', password: '1234567'}];

initializePassport(studentPassport, 
    async (email) => {
        const user = await StudentObj.find_by_email(email)
        return user; 
    },
    async (id) => {
        const user = await StudentObj.find_by_id(id)
        return user;
    }
);

initializePassport(teacherPassport,
    async (email) => {
        const user = await TeacherObj.find_by_email(email)
        return user; 
    },
    async (id) => {
        const user = await TeacherObj.find_by_id(id)
        return user;
    }
);

app.use(express.static(path.join(__dirname, 'student-info-app/build')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(studentPassport.initialize());
app.use(teacherPassport.initialize());
app.use(studentPassport.session());
app.use(teacherPassport.session());
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.post("/login/student", studentPassport.authenticate('local'), (req, res) => {
    const response = {
        userId: req.user.id
    };
    res.json(response);
});    

app.post("/login/teacher", teacherPassport.authenticate('local'), (req, res) => {
    const response = {
        userId: req.user.id
    };
    res.json(response);
});    

app.post('/teacher/give-grades', async (req,res) => {
    var response=req.body
    console.log(response);
    //for every grade in the ay
    for(var i=0;i<response.grades.length;i++){
        current_grade=response.grades[i]
        student=await StudentObj.find_by_name(current_grade.stud_name)
        //console.log('student: ' + student);
        //update grade
        GradeObj.update_grade(student._id,response.course_name,current_grade.grade)
    }
    res.json({status:200})
})

app.get('/logout', (req, res) => {
    req.logout();
    const data = {
        userId: null
    }
    res.json(data);
});

app.get('/student/info/:sid', async (req, res) => {
    var sid = req.params.sid;
    var stud=await StudentObj.find_by_id(sid)
    res.json(stud)
});

app.get('/student/courses/:sid',async (req,res)=>{
    var sid = req.params.sid;
    var stud=await StudentObj.find_by_id(sid)
    //console.log(stud.courses)
    courses_information=[]
    for(let i=0;i<stud.courses.length;i++){
        var course=await CourseObj.course_find(stud.courses[i])
        courses_information.push(course)
    }
    res.json(courses_information)
});

app.get('/student/grades/:sid', async (req, res) => {
    // how to get the url param
    var sid = req.params.sid;
    var grade=await GradeObj.grade_find(sid)
    res.json(grade)
});

app.get('/teacher/info/:tid', async (req, res) => {
    var tid = req.params.tid;
    var teacher=await TeacherObj.teacher_find(tid)
    //var teacher=await TeacherObj.find_Prof_of_course('Web Technology')
    res.json(teacher)
});

app.get('/teacher/grades/:tid', async (req, res) => {
    var tid = req.params.tid;
    var teacher=await TeacherObj.teacher_find(tid)
    var teacher_courses=teacher.courses
    res.json(teacher_courses)
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "student-info-app/build/index.html"));
});