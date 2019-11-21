import React from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";
import mainStyles from '../../style.scss';

class RoomRow extends React.Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount(){

    }


    render(){
        const details = this.props.details
        return(
                <div className={mainStyles.classCard}>
                    <div className={mainStyles.nicknameContainer}>
                       <h4>{details.nickname}</h4>
                       <div className={mainStyles.editDeleteContainer}>
                            <i className={`bx bxs-edit ${mainStyles.editBtn}`}></i>
                            <i className={`bx bx-trash ${mainStyles.deleteBtn}`}></i>
                       </div>

                    </div>
                    <div className={mainStyles.classCardContentContainer}>
                        <p className={mainStyles.courseTitle}>{details.title}</p>
                        <p>{details.instructor}</p>
                        <p>{details.starttime} - {details.endtime}</p>
                    </div>



                </div>

            )
    }


}

export default RoomRow;