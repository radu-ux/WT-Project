import AuthInfo from '../../AuthenticationInfo';
import Logo from './static/student login logo.png';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button, Card, Image } from 'react-bootstrap';

function StudentLogin() {
    let history = useHistory();
    let errorMessage = useRef(null);
    let emailField = useRef(null);
    let passwordField = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const user = {
                email: email,
                password: password
            }
            const optionHeaders = {
                method: 'POST', 
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify(user)
            };
            const response = await fetch('http://localhost:5000/login/student', optionHeaders)
            const data = await response.json();
            AuthInfo.authenticateStudent(data.userId);
            history.push('/student-homepage/sid/' + data.userId);
        } catch {
            errorMessage.current.innerText = 'Error: email or password incorrect'
            emailField.current.value = '';
            passwordField.current.value = '';
        }
    }   

    return (
        <Container>
            <Card id="login-card-container" className="mx-auto" style={{height:'350px', marginTop:'10%'}}>
                <Card.Body>
                <Image src={Logo} style={{marginLeft:'43%', width:'50px', height:'50px'}}/>
                <Card.Title style={{textAlign:'center', color:'rgb(30, 103, 160)'}}>Student Login</Card.Title>
                    <Form onSubmit={handleSubmit} id='form'>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' onChange={({target}) => setEmail(target.value)} ref={emailField}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' onChange={({target}) => setPassword(target.value)} ref={passwordField}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Form.Text ref={errorMessage} style={{color:'red'}}></Form.Text>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default StudentLogin;