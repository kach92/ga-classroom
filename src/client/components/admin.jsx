import React from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";

class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            endpoint : "http://localhost:3000/"
        }
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
        return(
                <div>
                    <h1>Admin</h1>
                    <input id="input" ref="input"/>
                    <button onClick={(e)=>{this.send()}}>test</button>
                </div>

            )
    }


}

export default Admin;