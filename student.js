//student.js
var mongoose = require('mongoose');
var CourseObj = require('./course');
const Bcrypt = require('bcryptjs');
var TeacherObj = require('./teacher');
const GradeObj = require('./grade');
var Schema=mongoose.Schema
const StudentObj = {
  Student:null,
  create_schema(){
    return new Schema(
      {
        _id: {type: Schema.Types.Number},
        first_name: {type: Schema.Types.String,required:true},
        family_name: {type: Schema.Types.String,required:true},
        email: {type: Schema.Types.String,required:true},
        password: {type: Schema.Types.String,required:true},
        date_of_birth: {type: Schema.Types.String,required:true},
        country_of_birth: {type: Schema.Types.String,required:true},
        city_of_birth: {type: Schema.Types.String,required:true},
        sex: {type: Schema.Types.String,required:true},
        CNP: {type: Schema.Types.String,required:true},
        courses: [{type: Schema.Types.String}],
      }
    )
  },
  create_model(){
    StudentSchema = this.create_schema()
    StudentSchema.pre("save", function(next) {
      if(!this.isModified("password")) {
          return next();
      }
      this.password = Bcrypt.hashSync(this.password, 10);
      next();
  }); 
    this.Student=new mongoose.model('student_tables',StudentSchema)
  },
  insert(stud){
    console.log('inserting')
    //encrypt password
    stud.save(err =>{console.error(err)});
  },
  delete(studId){
    this.Student.find({ _id:studId }).remove().exec()
    console.log('student deleted')
  },
  async addCourse(courseName,studId){
    var course=await CourseObj.course_find(courseName)
    var student=await this.find_by_id(studId)
    
    console.log(course)
    console.log(student);

    if(course!=null&&student!=null){
      console.log('course in database')
      var teacher=await TeacherObj.addStudent(student,courseName)
      var grade=await GradeObj.insert(courseName,studId)
      //call teacher update
      this.Student.updateOne(
        { _id: studId },
        { $addToSet: { courses: [courseName] } },
        function(err, result) {
          if (err) {
            console.log('ERROR AT UPDATE')
          }
          else {
            console.log('STUDENT UPDATE SUCCESSFUL')
            //call update teacher update
          }
        }
      );
      
    }
    else{
      console.log('course or student not in database')
      return;
    }
  },
  async removeCourse(courseName,studId){
    var student=await this.find_by_id(studId)
    this.Student.updateOne( {_id: studId}, { $pullAll: {courses: [courseName] } }, 
      function(err, result) {
        if (err) {
          console.log('ERROR AT UPDATE')
        }
        else {
          console.log('STUDENT UPDATE SUCCESSFUL')
          //call update teacher update
        }
      });
      TeacherObj.removeStudent(student,courseName);
      GradeObj.delete(courseName,studId);
  },
  async find_by_id(studId){
    var promise = this.Student.findOne({_id:studId}).exec();
    return promise;
  },
  async find_by_email(email){
    var promise = this.Student.findOne({email:email}).exec();
    return promise;
  },
  async find_by_name(studName){
    //split
    studName=studName.split(' ')
    var promise = this.Student.findOne({first_name:studName[0],family_name:studName[1]}).exec();
    return promise;
  }
};

/* Virtual for student's URL
StudentSchema
.virtual('url')
.get(function () {
  return '/student/' + this._id;
});*/

//Export model
module.exports = StudentObj