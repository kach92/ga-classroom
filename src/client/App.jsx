import React from 'react';
import { hot } from 'react-hot-loader';
import socketIOClient from "socket.io-client";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Classroom from './components/classroom/classroom';
import Admin from './components/admin/admin';
import Navigation from './components/navigation/navigation';



class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name:null,
            endpoint:"/localhost:3000/"
        }
    }


    render() {

        return (
            <Router>
                <Route path="/" render={props => (
                    <Navigation {...props}/>
                    )}/>
                <div className="main-container">
                    <Route path="/classrooms/:id" render={props =>(
                        <Classroom {...props}/>
                    )}/>
                    <Route path="/admin" render={props =>(
                        <Admin {...props}/>
                    )}/>
                </div>

            </Router>

        );
    }
}

export default hot(module)(App);
