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
            rooms:[]
        }
    }

    componentDidMount(){
        this.getRoomsData();
    }

    getRoomsData(){
        const url = "/server_classrooms/";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({rooms:res})
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
        const currentClasses = this.state.rooms.map(x=><RoomRow roomDetails={x}/>)
        return(
                <div >

                    <h1 className={mainStyles.title}>Classrooms</h1>
                    <button className={mainStyles.btn} style={{margin:"0 auto"}}>Save Changes</button>
                    <div className={mainStyles.subContainer}>
                        {currentClasses}

                    </div>

                </div>

            )
    }


}

export default Rooms;