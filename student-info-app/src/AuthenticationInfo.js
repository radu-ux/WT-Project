import Cookies from 'js-cookie';

const AuthInfo = {
    authenticateStudent(newUserId) {
        Cookies.set('student-id', newUserId);
    },

    authenticateTeacher(newUserId) {
        Cookies.set('teacher-id', newUserId);
    },
    
    deauthenticateStudent() {
        Cookies.remove('student-id');
    },

    deauthenticateTeacher() {
        Cookies.remove('teacher-id');
    },

    isStudentAuthenticated() {
        return Cookies.get('student-id');
    },
    
    isTeacherAuthenticated() {
        return Cookies.get('teacher-id');
    }
}


export default AuthInfo;