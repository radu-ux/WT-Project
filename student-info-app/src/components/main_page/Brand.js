import { Navbar } from 'react-bootstrap' 
import UVTBanner from './static/uvt banner.png'

function Brand(props) {
    return (
        <Navbar.Brand href={props.urlPath} id='banner'>
            <img
                alt=""
                src={UVTBanner}
                width="40"
                height="40"
                className="d-inline-block align-top"
            />{' '}
            Student Info
        </Navbar.Brand>
    );
}

export default Brand;