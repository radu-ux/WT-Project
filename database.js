//database.js
var mongoose = require('mongoose');
var StudentObj = require('./student')
var CourseObj = require('./course');
var GradeObj = require('./grade');
var TeacherObj = require('./teacher');
//const { Teacher } = require('./teacher');
//Set up mongoose connection
var mongoDB = 'mongodb://localhost:27017/student_web';
mongoose.connect(mongoDB, {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
//create models
StudentObj.create_model()
CourseObj.create_model()
GradeObj.create_model()
TeacherObj.create_model()
//insert
var stud1 = new StudentObj.Student({_id:1,first_name:'Calin',family_name:'Ploscaru',email:'calin.ploscaru99@e-uvt.ro',password:'password1',date_of_birth:'17.12.1999',country_of_birth:'Romania',city_of_birth:'Sibiu',sex:'male',CNP:'1111111'});
var stud2 = new StudentObj.Student({_id:2,first_name:'Denis',family_name:'Rotariu',email:'denis.rotariu99@e-uvt.ro',password:'password2',date_of_birth:'16.11.1999',country_of_birth:'Romania',city_of_birth:'Oradea',sex:'male',CNP:'2222222'});
var stud3= new StudentObj.Student({_id:3,first_name:'Gabriel',family_name:'Tiplea',email:'gabriel.tiplea99@e-uvt.ro',password:'password3',date_of_birth:'7.10.1999',country_of_birth:'Romania',city_of_birth:'Hunedoara',sex:'male',CNP:'3333333'});
var stud4 = new StudentObj.Student({_id:4,first_name:'Ionut',family_name:'Valase',email:'ionut.valase99@e-uvt.ro',password:'password4',date_of_birth:'22.09.1999',country_of_birth:'Romania',city_of_birth:'Arad',sex:'male',CNP:'4444444'});
var stud5 = new StudentObj.Student({_id:5,first_name:'Flavius',family_name:'Holerga',email:'flavius.holerga99@e-uvt.ro',password:'password5',date_of_birth:'11.08.1999',country_of_birth:'Romania',city_of_birth:'Timisoara',sex:'male',CNP:'5555555'});
var stud6 = new StudentObj.Student({_id:6,first_name:'Luca',family_name:'Vlad',email:'luca.vlad99@e-uvt.ro',password:'password6',date_of_birth:'9.02.1999',country_of_birth:'Romania',city_of_birth:'Cluj',sex:'male',CNP:'6666666'});
var stud7 = new StudentObj.Student({_id:7,first_name:'Alexe',family_name:'Spataru',email:'alexe.spataru99@e-uvt.ro',password:'password7',date_of_birth:'8.07.1999',country_of_birth:'Romania',city_of_birth:'Iasi',sex:'male',CNP:'7777777'});
var stud8 = new StudentObj.Student({_id:8,first_name:'Clara',family_name:'Mnere',email:'clara.mnere99@e-uvt.ro',password:'password8',date_of_birth:'23.06.1999',country_of_birth:'Romania',city_of_birth:'Bucuresti',sex:'female',CNP:'8888888'});
var stud9 = new StudentObj.Student({_id:9,first_name:'George',family_name:'Sotoc',email:'george.sotoc99@e-uvt.ro',password:'password9',date_of_birth:'30.05.1999',country_of_birth:'Romania',city_of_birth:'Oradea',sex:'male',CNP:'9999999'});
var stud10 = new StudentObj.Student({_id:10,first_name:'Ana',family_name:'Oravitan',email:'ana.oravitan99@e-uvt.ro',password:'password10',date_of_birth:'12.04.1999',country_of_birth:'Romania',city_of_birth:'Deva',sex:'female',CNP:'1212121'});
var stud11 = new StudentObj.Student({_id:11,first_name:'Edward',family_name:'Laitin',email:'edward.laitin99@e-uvt.ro',password:'password11',date_of_birth:'17.03.1999',country_of_birth:'Romania',city_of_birth:'Satu Mare',sex:'male',CNP:'2323232'});
var stud12 = new StudentObj.Student({_id:12,first_name:'Silvia',family_name:'Muresan',email:'silvia.muresan99@e-uvt.ro',password:'password12',date_of_birth:'17.01.1999',country_of_birth:'Romania',city_of_birth:'Ploiesti',sex:'female',CNP:'3344334'});

// StudentObj.insert(stud1)
// StudentObj.insert(stud2)
// StudentObj.insert(stud3)
// StudentObj.insert(stud4)
// StudentObj.insert(stud5)
// StudentObj.insert(stud6)
// StudentObj.insert(stud7)
// StudentObj.insert(stud8)
// StudentObj.insert(stud9)
// StudentObj.insert(stud10)
// StudentObj.insert(stud11)
// StudentObj.insert(stud12)
//StudentObj.delete(2)
var course1=new CourseObj.Course({course: 'Web Technology', category: 'compulsory', semester: 'I', credits: 5}) 
var course2=new CourseObj.Course({course: 'Design Patterns', category: 'optional', semester: 'I', credits: 5})
var course3=new CourseObj.Course({course: 'Database I', category: 'compulsory', semester: 'I', credits: 4})
var course4=new CourseObj.Course({course: 'Programming I', category: 'compulsory', semester: 'I', credits: 5})
var course5=new CourseObj.Course({course: 'Algorithms and Data Structures', category: 'compulsory', semester: 'I', credits: 5})
var course6=new CourseObj.Course({course: 'Algebra', category: 'compulsory', semester: 'I', credits: 4})
// CourseObj.insert(course1)
// CourseObj.insert(course2)
// CourseObj.insert(course3)
// CourseObj.insert(course4)
// CourseObj.insert(course5)
// CourseObj.insert(course6)
// StudentObj.addCourse('Web Technology',1)
// StudentObj.addCourse('Web Technology',2)
// StudentObj.addCourse('Database I',3)
// StudentObj.addCourse('Database I',4)
// StudentObj.addCourse('Programming I',5)
// StudentObj.addCourse('Programming I',6)
// StudentObj.addCourse('Algebra',7)
// StudentObj.addCourse('Algebra',8)
// StudentObj.addCourse('Algorithms and Data Structures',9)
// StudentObj.addCourse('Algorithms and Data Structures',10)
// StudentObj.addCourse('Design Patterns',11)
// StudentObj.addCourse('Design Patterns',12)
// StudentObj.removeCourse('Web Technology',1)
var grade1 = new GradeObj.Grade({stud_id: 1,course:'Web Technology'})
var grade2 = new GradeObj.Grade({stud_id: 2,course:'Web Technology'})
var grade3 = new GradeObj.Grade({stud_id: 3,course:'Database I'})
var grade4 = new GradeObj.Grade({stud_id: 4,course:'Database I'})
var grade5 = new GradeObj.Grade({stud_id: 5,course:'Programming I'})
var grade6 = new GradeObj.Grade({stud_id: 6,course:'Programming I'})
var grade7 = new GradeObj.Grade({stud_id: 7,course:'Algebra'})
var grade8 = new GradeObj.Grade({stud_id: 8,course:'Algebra'})
var grade9 = new GradeObj.Grade({stud_id: 9,course:'Algorithms and Data Structures'})
var grade10 = new GradeObj.Grade({stud_id: 10,course:'Algorithms and Data Structures'})
var grade11 = new GradeObj.Grade({stud_id: 11,course:'Design Patterns'})
var grade12 = new GradeObj.Grade({stud_id: 12,course:'Design Patterns'})
// GradeObj.insert(grade1)
// GradeObj.insert(grade2)
// GradeObj.insert(grade3)
// GradeObj.insert(grade4)
// GradeObj.insert(grade5)
// GradeObj.insert(grade6)
// GradeObj.insert(grade7)
// GradeObj.insert(grade8)
// GradeObj.insert(grade9)
// GradeObj.insert(grade11)
// GradeObj.insert(grade10)
// GradeObj.insert(grade12)
var teacher1 = new TeacherObj.Teacher({_id:1,first_name:'Marius',family_name:'Budisteanu',email:'marius.budisteanu@e-uvt.ro', password:'passwordT1'})
var teacher2 = new TeacherObj.Teacher({_id:2,first_name:'Dorin',family_name:'Ogner',email:'dorin.ogner@e-uvt.ro', password:'passwordT2'})
var teacher3 = new TeacherObj.Teacher({_id:3,first_name:'Ionela',family_name:'Radu',email:'ionela.radu@e-uvt.ro', password:'passwordT3'})
var teacher4 = new TeacherObj.Teacher({_id:4,first_name:'Florin',family_name:'Cotojman',email:'florin.cotojman@e-uvt.ro', password:'passwordT4'})
var teacher5 = new TeacherObj.Teacher({_id:5,first_name:'Laurentiu',family_name:'Militaru',email:'laurentiu.militaru@e-uvt.ro', password:'passwordT5'})

// TeacherObj.insert(teacher1)
// TeacherObj.insert(teacher2)
// TeacherObj.insert(teacher3)
// TeacherObj.insert(teacher4)
// TeacherObj.insert(teacher5)
// TeacherObj.addCourse('Web Technology',1)
// TeacherObj.addCourse('Database I',2)
// TeacherObj.addCourse('Programming I',3)
// TeacherObj.addCourse('Design Patterns',4)
// TeacherObj.addCourse('Algebra',5)
// TeacherObj.addCourse('Algorithms and Data Structures',5);
module.exports=conn