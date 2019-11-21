import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
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
            <div className={mainStyles.navBar}>
                <img src="https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/9142/thumb_CMYK-Red_Small_GeneralAssembly-Cog.png" className={mainStyles.navImage}/>
                <Link to="/admin/rooms" className={mainStyles.navLink}>Rooms</Link>
                <Link to="/admin/classes" className={mainStyles.navLink}>Classes</Link>
            </div>
        )
    }


}

export default Navigation;