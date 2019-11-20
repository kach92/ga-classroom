import React from 'react';
import { hot } from 'react-hot-loader';
import socketIOClient from "socket.io-client";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Classroom from './components/classroom';
import Admin from './components/admin';



class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name:null,
            endpoint:"/localhost:3000/"
        }
    }

    // send = () => {
    //     const socket = socketIOClient(this.state.endpoint);
    //     socket.emit('details update', this.state.color) // change 'red' to this.state.color
    // }

    // componentDidMount(){
    //     let fetchUrl = '/classrooms/1';
    //     fetch(fetchUrl, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(res => {
    //         this.setState({name:res.name})
    //     })
    //     .catch(error => console.error('Error:', error));
    // }

    render() {
        // const socket = socketIOClient(this.state.endpoint);
        // socket.on('details update', (data) => {
        //   document.body.style.backgroundColor = col
        // })
        return (
            <Router>
                <Route path="/classrooms/:id" render={props =>(
                    <Classroom {...props}/>
                    )}/>
                <Route path="/admin" render={props =>(
                    <Admin {...props}/>
                    )}/>


            </Router>

        );
    }
}

export default hot(module)(App);
