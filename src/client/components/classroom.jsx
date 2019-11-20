import React from 'react';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";

class Classroom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:null
        }
    }

    getData(){
        let fetchUrl = '/server_classroom/'+this.props.match.params.id;
        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({name:res.name})
        })
        .catch(error => console.error('Error:', error));
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        const socket = socketIOClient(this.state.endpoint);
        socket.on('details updated', (value) => {
            console.log(value)
            console.log("///////////////////////")
            if(value){
                this.getData()
            }

        })
        console.log("IN CLASSROOM")
        return(
                <div>
                    <h1>Hello</h1>
                    <h2>{this.state.name}</h2>
                </div>
            )
    }


}

export default Classroom;