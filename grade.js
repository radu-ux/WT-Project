//grade.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GradeObj = {
  Grade:null,
  create_schema(){
    return new Schema(
      {
        stud_id: {type: Schema.Types.Number,ref:'student_tables'},
        course: {type: Schema.Types.String, required: true},
        grade: {type:Schema.Types.Number, default:0}
      }
    );
  },
  create_model(){
    this.Grade=mongoose.model('grade_tables', this.create_schema());
  },
  async delete(courseName,studId){
    this.Grade.find({ stud_id:studId, course:courseName }).remove().exec()
    console.log('grade deleted')
  },
  async insert(courseName,studId){
    grade=await GradeObj.course_grade_find(courseName,studId)
    //console.log(grade)
    if(grade==null){
      var grade1 = new GradeObj.Grade({stud_id: studId,course:courseName})
      grade1.save(err=>console.log(err))
      console.log('GRADE INSERTED')
    }
    else{
      console.log('GRADE IN DATABASE')
    }
  },
  async update_grade(studId,courseName,grade){
    console.log(courseName, grade);
    this.Grade.updateOne(
      { stud_id: studId, course: courseName},
      { $set: { grade: grade } },
      function(err, result) {
        if (err) {
          console.log('GRADE ERROR AT UPDATE')
        }
        else {
          console.log('GRADE UPDATE SUCCESSFUL')
          //call update teacher update
        }
      }
    );
  },
  async course_grade_find(courseName,studId){
    var promise = this.Grade.findOne({stud_id:studId,course:courseName},'-_id -stud_id').exec();
    return promise;
  },
  async grade_find(studId){
    var promise = this.Grade.find({stud_id:studId},'-_id -stud_id').exec();
    return promise;
  }
}

module.exports = GradeObj