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
            authed :false,
            salt:null
        }
        this.checkUser = this.checkUser.bind(this);
    }

    async componentDidMount(){
        const test = await this.getSalt();
        this.checkUser();

    }

    async getSalt(){
        let fetchUrl = '/admins/salt';
        return fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            this.setState({salt:res.salt})
        })
        .catch(error => console.error('Error:', error));
    }

    checkUser(){
        let cookies = {};
        document.cookie.split("; ").forEach( value => {
            let val = value.split("=");
            cookies[val[0]] = val[1];
        });
        if(cookies.session === sha256(this.state.salt)){
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
