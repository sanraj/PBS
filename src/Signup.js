import React, {Component} from 'react';
import {PostData} from './PostData';
import {Redirect} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './style.css';

class Signup extends Component {
    constructor(){
        super();
        this.state = {
            full_name: '',
            email: '',
            phone_number: '',
            redirectToReferrer: false,
            message: ''
        };
        this.signup = this.signup.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    signup() {	
        if(this.state.full_name && this.state.phone_number) {
            PostData('signup',this.state).then((result) => {
                let responseJson = result;
                if(responseJson.message) {
                    this.setState({
                        redirectToReferrer: true,
                        message: responseJson.message
                    });
                } else {
                    confirmAlert({
                      customUI: ({ onClose }) => {
                        return (
                          <div className='custom-ui'>
                            <h1>{responseJson.error}</h1>
                            <button onClick={onClose}>Okay</button>
                          </div>
                        );
                      }
                    });
                }
            });
        } else {
            confirmAlert({
                  customUI: ({ onClose }) => {
                    return (
                      <div className='custom-ui'>
                        <h1>Please enter valid full name or phone or email.</h1>
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
        if(this.state.redirectToReferrer) {
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
            return (<Redirect to={'/login'} />);
        }
        return (
            <div className="sign-up">
                <h1 className="sign-up-title">Sign up for this event!</h1>
                <input type="text" name="full_name" className="sign-up-input" placeholder="Full Name" onChange={this.onChange} />
                <input type="text" name="phone_number" className="sign-up-input" placeholder="Phone Number" onChange={this.onChange}/>
                <input type="text" name="email" className="sign-up-input" placeholder="Email" onChange={this.onChange}/>
                <input type="submit" value="Sign me up!" className="btn login-btn-spacing" onClick={this.signup}/>
                <a href="/"><input type="button" value="Login" className="btn btn-spacing"/></a>
            </div>
        );
    }
}
export default Signup;