import React, {Component} from 'react';
import {PostData} from './PostData';
import './style.css';
import {Redirect} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Login extends Component {
	constructor(){
		super();
		this.state = {
			full_name: '',
			password: '',
			redirectToReferrer: false,
			message: ''
		};
		this.login = this.login.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	login() {
		if(this.state.full_name && this.state.password){
			PostData('login',this.state).then((result) => {
				let responseJson = result;
				if(responseJson.userData) {
					sessionStorage.setItem('userData',JSON.stringify(responseJson));
					this.setState({redirectToReferrer: true});
				}else {
					this.setState({
						message: responseJson.message
					});
				}
			});
		} else {
			confirmAlert({
		      customUI: ({ onClose }) => {
		        return (
		          <div className='custom-ui'>
		            <h1>Please enter valid username or password.</h1>
		            <button onClick={onClose}>Okay</button>
		          </div>
		        );
		      }
		    });
		}
	}
	onChange(e){
		this.setState({[e.target.name]:e.target.value});
	}
	render() {
		if(this.state.message) {
		    confirmAlert({
		      customUI: ({ onClose }) => {
		        return (
		          <div className='custom-ui'>
		            <h1>{this.state.message}</h1>
		            <button onClick={onClose}>Okay</button>
		          </div>
		        );
		      }
		    });
		} else if(this.state.redirectToReferrer) {
			var userData = JSON.parse(sessionStorage.getItem('userData'));
	   		var loggedInUserName = userData.userData.full_name;
			if(loggedInUserName ==='admin'){
	        	return (<Redirect to={'/resultPage'} />);
	        } else {
	        	return (<Redirect to={'/votingForm'} />);
	        }			
		}
		return (
			<div className="sign-up">
			    <h1 className="sign-up-title">Login to VOTE!</h1>
			    <input type="text" name="full_name" className="sign-up-input" placeholder="Full Name" onChange={this.onChange}/>
			    <input type="password" name="password" className="sign-up-input" placeholder="Password" onChange={this.onChange}/>
			    <input type="submit" value="Login" className="btn login-btn-spacing" onClick={this.login}/>
			    <a href="/signup"><input type="button" value="Signup" className="btn btn-spacing"/></a>
			</div>
		);
	}
}
export default Login;