import { Redirect } from 'react-router';
import AuthInfo from '../../AuthenticationInfo';

function SignUp() {
    AuthInfo.deauthenticate();
    return (
        <Redirect to='/' />
    );
}

export default SignUp;