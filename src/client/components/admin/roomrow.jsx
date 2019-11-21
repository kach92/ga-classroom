import React from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";
import mainStyles from '../../style.scss';

class RoomRow extends React.Component {
    constructor(props){
        super(props);
        this.state={
            room_id:null,
            details:null,
            classes:null
        }
    }

    componentDidMount(){
        this.setState({
            room_id:this.props.roomDetails.id,
            details:this.props.roomDetails,
            classes:this.props.allClasses
        })

    }


    getClassDetails(class_id){
        const url = "/server_class/"+class_id;
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({details:res});
            return res;
        })
        .catch(error => console.error('Error:', error));
    }



    async nickSelectChange(e){
            const class_id = e.target.value;
            const newClassDetails = await this.getClassDetails(class_id);
            this.props.updateRoomWholeState(this.state.room_id,newClassDetails);
            console.log(newClassDetails)

    }

    render(){
        const details = this.state.details ? this.state.details : "";
        const room_id = this.state.room_id ? this.state.room_id : "";
        const classes = this.state.classes? this.state.classes.sort((a,b)=>a.id === details.class_id? -1 : b.id === details.class_id ? 1: 0).map(x=><option key={x.id}value={x.id}>{x.nickname}</option>) : "";
        return(
                <div className={mainStyles.roomCard}>
                    <h3>Classroom {room_id}</h3>

                        <select onChange={(e)=>{this.nickSelectChange(e)}}>
                            {classes}
                        </select>

                        <p>{details.title}</p>
                        <p>{details.instructor}</p>
                        <div className={mainStyles.timingContainer}>
                            <p>{details.starttime}</p>
                            <p>-</p>
                            <p>{details.endtime}</p>
                        </div>


                </div>

            )
    }


}

export default RoomRow;