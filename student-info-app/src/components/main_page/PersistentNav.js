import { Nav } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import AuthInfo from '../../AuthenticationInfo';


function PersistentNav(props) {
    let history = useHistory();
    const sid = AuthInfo.isStudentAuthenticated();
    const tid = AuthInfo.isTeacherAuthenticated();

    const logOutHandler = () => {
        if(sid !== undefined) {
            AuthInfo.deauthenticateStudent();
        } else if(tid !== undefined) {
            AuthInfo.deauthenticateTeacher();
        }
        fetch('http://localhost:5000/logout')
        .then(response => response.json)
        .then(data => console.log(data))
        .catch(err => console.log('Error on logout'));
        history.push('/');
    }

    return (
        <Nav variant="tabs" >
            <Nav.Item>
                <Nav.Link href="/aboutus">About Us</Nav.Link>
            </Nav.Item>
            {sid !== undefined || tid !== undefined?
                <Nav.Item>
                    <Nav.Link onClick={logOutHandler}>Log out</Nav.Link>
                </Nav.Item>
                :
                <Nav.Item>
                    <Nav.Link href="https://www.uvt.ro/ro/">Contact</Nav.Link>
                </Nav.Item>
            }
            <Nav.Item>
                <Nav.Link href="https://www.uvt.ro/ro/">Visit Official Website</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default PersistentNav;