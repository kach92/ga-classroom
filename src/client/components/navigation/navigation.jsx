import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import mainStyles from '../../style.scss';

class Navigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:null
        }
    }


    render(){
        return(
            <Navbar bg="dark" variant = "dark"className={mainStyles.navBar} expand="lg">
                <div className={mainStyles.navSubContainer}>
                    <img src="https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/9142/thumb_CMYK-Red_Small_GeneralAssembly-Cog.png" className={mainStyles.navImage}/>
                    <h2>GA Classroom Display</h2>
                </div>
              <Navbar.Toggle className={mainStyles.toggler}aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/admin/rooms" className={mainStyles.navLink}>Rooms</Nav.Link>
                  <Nav.Link href="/admin/classes" className={mainStyles.navLink}>Classes</Nav.Link>
                  <NavDropdown className={mainStyles.navLink} title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }


}

export default Navigation;