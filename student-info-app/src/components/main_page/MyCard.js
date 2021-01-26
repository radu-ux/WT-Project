import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './styles/MyCard.css';

function MyCard(props) {
    let history = useHistory();
    
    function handleClick() {
        if (props.title === 'Student') {
            history.push('/student-login');
        } else if (props.title === 'Teacher') {
            history.push('/teacher-login');
        }
    }

    return (
            <Card id='container'>
                <Card.Img src={props.logo}/>
                <Card.ImgOverlay>
                    <Card.Body>
                        <Card.Title id='title'>{[props.title]}</Card.Title>
                        <Button onClick={handleClick} id='button' variant="primary">Log in</Button>
                    </Card.Body>
                </Card.ImgOverlay>
            </Card>
    );
}

export default MyCard;