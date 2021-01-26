import { Redirect, Route } from 'react-router';
import AuthInfo from './AuthenticationInfo';

function PrivateRoute({component: Component, redirectStudentUrl, redirectTeacherUrl, ...rest}) {
    const sid = AuthInfo.isStudentAuthenticated();
    const tid = AuthInfo.isTeacherAuthenticated();
    
    console.log('In PrivateRute');
    console.log('Student auth ' + sid);
    console.log('Teacher auth ' + tid);


    if(sid !== undefined) { //Is student logged in ?
        return <Redirect to={redirectStudentUrl + sid} />;
    }

    if(tid !== undefined) { //Is teacher logged in ?
        return <Redirect to={redirectTeacherUrl + tid} />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />
}

export default PrivateRoute;