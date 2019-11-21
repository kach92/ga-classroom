import React from 'react';
import { hot } from 'react-hot-loader';
import socketIOClient from "socket.io-client";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import mainStyles from './style.scss';

import Classroom from './components/classroom/classroom';
import AdminHome from './components/admin/admin';
import Rooms from './components/admin/rooms';
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
                <Route path="/admin" render={props => (
                    <Navigation {...props}/>
                    )}/>
                <div className={mainStyles.mainContainer}>
                    <Route exact path="/" render={props => (
                        <Redirect to="/admin"/>
                        )}/>
                    <Route path="/classrooms/:id" render={props =>(
                        <Classroom {...props}/>
                    )}/>
                    <Route exact path="/admin" render={props =>(
                        <AdminHome {...props}/>
                    )}/>
                    <Route path="/admin/rooms" render={props => (
                        <Rooms />
                        )} />
                </div>

            </Router>

        );
    }
}

export default hot(module)(App);
