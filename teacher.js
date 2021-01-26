//teacher.js
var mongoose = require('mongoose');
var CourseObj = require('./course');
var Bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

const TeacherObj = {
  Teacher: null,
  create_schema(){
    var stud_schema = Schema({
        stud_name:{type: Schema.Types.String},
        _id : {id:false}
      });
      var course_schema = Schema({
        course_name:{type: Schema.Types.String},
        students: [stud_schema],
        _id : {id:false}
      });
    return new Schema(
      {
        _id: {type: Schema.Types.Number},
        courses: [
            course_schema
        ],
        first_name: {type: Schema.Types.String,required:true},
        family_name: {type: Schema.Types.String,required:true},
        email: {type: Schema.Types.String,required:true},
        password: {type: Schema.Types.String,required:true}
      }
    );
  },
  create_model(){
    TtudentSchema = this.create_schema()
    TtudentSchema.pre("save", function(next) {
      if(!this.isModified("password")) {
          return next();
      }
      this.password = Bcrypt.hashSync(this.password, 10);
      next();
  }); 
    this.Teacher=new mongoose.model('teacher_tables',TtudentSchema)
  },

  delete(tid){
    this.Teacher.find({ _id: tid}).remove().exec()
    console.log('teacher deleted')
  },
  insert(teacher){
    console.log('inserting teacher')
    teacher.save(err =>{console.error(err)});
  },
  teacher_find(tid){
    var promise = this.Teacher.findOne({_id:tid},'-_id').exec();
    return promise;
  },
  async addCourse(courseName,tid){
    var course=await CourseObj.course_find(courseName)
    var teacher=await this.find_Prof_of_course(courseName)
    if(course!=null && teacher==null){//if course exists and no other teacher teaches it
      console.log('course in database')
      this.Teacher.updateOne(
        { _id: tid },
        { $addToSet: { 
            courses:
            {
                course_name: courseName 
            } 
        }},
        function(err, result) {
          if (err) {
            console.log(err)
            console.log('TEACHER ERROR AT UPDATE')
          } else {
            console.log('TEACHER UPDATE SUCCESSFUL')
          }
        }
      );
    }
    else{
      console.log('course not in database or teacher already teaches course')
      return;
    }
  },
  async find_Prof_of_course(courseName){
    var promise = this.Teacher.findOne({'courses.course_name':courseName} ).exec();
    return promise
  },
  async get_teacher_courses(tid){
    var teacher = await this.teacher_find(tid) 
  },
  async addStudent(student,courseName){
    var teacher = await this.find_Prof_of_course(courseName)
    //console.log(student)

    if(teacher!=null){
        var promise=this.Teacher.updateOne(
          { _id: teacher._id, 'courses.course_name':courseName },
          {$addToSet:{
              'courses.$.students': 
              {
                  stud_name:student.first_name+' '+student.family_name
              }
          }},
          function(err, result) {
            if (err) {
              console.log(err)
              console.log('TEACHER ERROR AT UPDATE')
            } else {
                console.log('TEACHER UPDATE SUCCESSFUL')
            }
          }
        ).exec();
        return promise
      }
      else{
        console.log('teacher not assigned to course')
        return null;
      }
  },
  async removeStudent(student,courseName){
    var teacher = await this.find_Prof_of_course(courseName)
    if(teacher!=null){
        var promise=this.Teacher.updateOne(
          { _id: teacher._id, 'courses.course_name':courseName },
          {$pullAll:{
              'courses.$.students': [{stud_name:student.first_name+' '+student.family_name}]
          }},
          function(err, result) {
            if (err) {
              console.log(err)
              console.log('TEACHER ERROR AT UPDATE')
            } else {
                console.log('TEACHER UPDATE SUCCESSFUL')
            }
          }
        ).exec();
        return promise
      }
      else{
        console.log('teacher not assigned to course')
        return null;
      }
  }, 
  async find_by_id(tid){
    var promise = this.Teacher.findOne({_id:tid}).exec();
    return promise;
  },
  async find_by_email(email){
    var promise = this.Teacher.findOne({email:email}).exec();
    return promise;
  }
}

module.exports = TeacherObj