import React from 'react';
import PropTypes from 'prop-types';
import mainStyles from '../../style.scss';
import {Form} from 'react-bootstrap';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            email:"",
            password:"",
            errorMsg:""
        }

    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    async handleLogin(e){
        if(this.state.email === "" || this.state.password === ""){
            this.setState({errorMsg:"Please fill in both email and password!"})
        }else{
            const answer = await this.checkCredentials();
            if(answer){
                this.props.checkUser();
                this.props.history.push('/admin/rooms')
            }else{
                this.setState({errorMsg:"Invalid user or password!"})
            }
        }
    }
    async checkCredentials(){
        const {email,password} = this.state
        return fetch('/login', {
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(error => console.error('Error:', error));
    }

    render(){
        return(
                <div className={mainStyles.loginContainer}>
                    <img src="https://ga-core.s3.amazonaws.com/production/uploads/program/default_image/9142/thumb_CMYK-Red_Small_GeneralAssembly-Cog.png" />
                    <p className={mainStyles.errorMsg} style={{fontSize:"14px"}}>{this.state.errorMsg}</p>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e)=>{this.handleChange(e)}}/>

                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=>{this.handleChange(e)}}/>
                    </Form.Group>
                    <button className={mainStyles.btn} style={{margin:"0 auto"}} onClick={(e)=>{this.handleLogin(e)}}>Login</button>
                </div>
            )
    }


}

export default Login;