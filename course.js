//course.js
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const CourseObj = { 
  Course: null,
  create_schema(){
    return new Schema(
      {
        course: {type: Schema.Types.String, required: true, unique:true},
        category: {type: Schema.Types.String,required:true},
        semester: {type: Schema.Types.String, required: true, enum: ['I', 'II']},
        credits: {type: Schema.Types.Number, required:true}
      }
    );
  },
  create_model(){
    this.Course=mongoose.model('course_tables', this.create_schema());
  },
  delete(courseName){
    this.Student.find({ course:courseName }).remove().exec()
    console.log('course deleted')
  },
  insert(course){
    console.log('inserting course')
    course.save(err =>{console.error(err)});
  },
  course_find(courseName){
    var promise = this.Course.findOne({course:courseName},'-_id').exec();
    return promise;
 }
}

module.exports = CourseObj