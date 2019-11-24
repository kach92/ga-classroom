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

    handleLogout(e){
        e.preventDefault();
        document.cookie = 'session='+"gibberish"+'; path=/';
        this.props.checkUser();
        this.props.history.push("/login");
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
                  <NavDropdown className={mainStyles.navLink} title="View Display" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/classrooms/1">CLASSROOM 1</NavDropdown.Item>
                    <NavDropdown.Item href="/classrooms/2">CLASSROOM 2</NavDropdown.Item>
                    <NavDropdown.Item href="/classrooms/3">CLASSROOM 3</NavDropdown.Item>
                    <NavDropdown.Item href="/classrooms/4">CLASSROOM 4</NavDropdown.Item>
                    <NavDropdown.Item href="/classrooms/5">CLASSROOM 5</NavDropdown.Item>
                    <NavDropdown.Item href="/classrooms/6">CLASSROOM 6</NavDropdown.Item>

                  </NavDropdown>
                  <Nav.Link onClick={(e)=>{this.handleLogout(e)}} className={mainStyles.navLink}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }


}

export default Navigation;