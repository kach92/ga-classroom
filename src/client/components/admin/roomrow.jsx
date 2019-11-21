import React from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";
import mainStyles from '../../style.scss';

class RoomRow extends React.Component {
    constructor(props){
        super(props);

    }

    render(){
        const details = this.props.roomDetails;
        return(
                <div className={mainStyles.roomCard}>
                    <h3>Classroom {details.id}</h3>



                </div>

            )
    }


}

export default RoomRow;