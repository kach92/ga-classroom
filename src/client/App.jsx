import React from 'react';
import { hot } from 'react-hot-loader';
import socketIOClient from "socket.io-client";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import mainStyles from './style.scss';

import Classroom from './components/classroom/classroom';
import Login from './components/admin/login';
import Rooms from './components/admin/rooms';
import Navigation from './components/navigation/navigation';
import ClassIndex from './components/classes/index';

import { sha256 } from 'js-sha256';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            authed :false
        }
        this.checkUser = this.checkUser.bind(this);
    }

    componentDidMount(){
        this.checkUser();
    }

    checkUser(){
        let cookies = {};
        document.cookie.split("; ").forEach( value => {
            let val = value.split("=");
            cookies[val[0]] = val[1];
        });
        console.log(cookies.session);
        console.log(process.env.SALT);
        console.log(cookies.session === sha256(process.env.SALT))
        if(cookies.session === sha256(process.env.SALT)){
            this.setState({
                authed: true,
            });
        }else {
            this.setState({
                authed: false
            });
        }
    }


    render() {

        return (
            <Router>
                <Route path="/admin" render={props => (
                    <Navigation checkUser={this.checkUser}{...props}/>
                    )}/>


                    <Switch>
                        <Route path="/login" render={props => (
                            this.state.authed ? <Redirect to="/admin/rooms"/> : <Login checkUser={this.checkUser}{...props}/>
                            )} />
                        <Route path="/admin/rooms" render={props => (
                            this.state.authed ? <Rooms {...props}/> : <Redirect to="/login"/>

                            )} />
                        <Route path="/admin/classes" render={props => (
                            this.state.authed ? <ClassIndex {...props}/> : <Redirect to="/login"/>

                            )} />
                        <Route path="/classrooms/:id" render={props =>(
                            <Classroom {...props}/>
                        )}/>
                        <Route render={props =>(

                            this.state.authed ? <Redirect to="/admin/rooms"/> : <Redirect to="/login"/>
                        )}/>
                    </Switch>
            </Router>

        );
    }
}

export default hot(module)(App);
