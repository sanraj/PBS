import React, {Component} from 'react';
import './style.css';
import {Redirect} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Select from 'react-select';

const options = [
  { value: 'BestMale', label: 'Best Male' },
  { value: 'BestFemale', label: 'Best Female' },
  { value: 'BestFamily', label: 'Best Family' },
];

class VotingForm extends Component {
	constructor(){
		super();
		this.state = {
			redirectToReferrer: false,
			message: '',
			selectedOption: 'BestMale',
		};
	}
	handleChange = selectedOption => {
	    this.setState(
	      { selectedOption },
	      () => {
	      	sessionStorage.setItem('selectedCategory',this.state.selectedOption.value);
	      	this.setState({redirectToReferrer: true});
	      	return (<Redirect to={'/dashboard'} />);
	      }
	    );
	};
	render() {
		if(!sessionStorage.getItem('userData')){
			confirmAlert({
              customUI: ({ onClose }) => {
                return (
                  <div className='custom-ui'>
                    <h1>Sorry! Please login to view this form.</h1>
                    <button onClick={onClose}>Okay</button>
                  </div>
                );
              }
            });
            return (<Redirect to={'/login'} />);
		}
		if(this.state.redirectToReferrer){
			return (<Redirect to={'/dashboard'} />);			
		}
		return (
			<div className="sign-up">
			    <h1 className="sign-up-title">Choose category to VOTE!</h1>
			    <div>
				    <Select
				        value={this.state.selectedOption}
				        onChange={this.handleChange}
				        options={options}
				      />
			     </div>
			</div>
		);
	}
}
export default VotingForm;