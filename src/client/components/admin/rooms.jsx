import React from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";
import mainStyles from '../../style.scss';

import RoomRow from './roomrow';

class Rooms extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            endpoint : "http://localhost:3000/",
            rooms:null,
            classes:null
        }

        this.updateRoomWholeState = this.updateRoomWholeState.bind(this);;
    }

    async saveChanges(){
        const data = {
            data:this.state.rooms
        }
        return fetch('/server_classrooms', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log("save changes done")
        })
        .catch(error => console.error('Error:', error));
    }


    updateRoomWholeState(room_id,newClassDetails){
        this.state.rooms[room_id-1] = {
            id : room_id,
            class_id : newClassDetails.class_id,
            title : newClassDetails.title,
            instructor : newClassDetails.instructor,
            starttime : newClassDetails.starttime,
            endtime : newClassDetails.endtime,
            nickname : newClassDetails.nickname
        };
        this.setState({rooms:this.state.rooms});
    }

    componentDidMount(){
        this.getRoomsDataAndClasses();
    }

    getRoomsDataAndClasses(){
        const url = "/server_classrooms/";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            this.setState({
                rooms:res.classrooms,
                classes:res.classes
            })
        })
        .catch(error => console.error('Error:', error));
    }



    sendSocket(){
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('details updated', true) // change 'red' to this.state.color
    }

    send (){
        let data = {
            input : this.refs.input.value
        }
        const url = '/server_classroom/1'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            this.sendSocket();
        })
        .catch(error => console.error('Error:', error));
    }

    render(){
        const classes = this.state.classes? this.state.classes : "";
        const currentClasses = this.state.rooms? this.state.rooms.map(x=><RoomRow key={x.id} roomDetails={x} allClasses={this.state.classes} updateRoomWholeState={this.updateRoomWholeState}/>) : "";
        return(
                <div className={mainStyles.mainContainer}>

                    <h1 className={mainStyles.title}>Classrooms</h1>
                    <button className={mainStyles.btn} style={{margin:"0 auto"}} onClick={(e)=>{this.saveChanges(e)}}>Save Changes</button>
                    <div className={mainStyles.subContainer}>
                        {currentClasses}

                    </div>

                </div>

            )
    }


}

export default Rooms;