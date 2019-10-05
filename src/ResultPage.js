import React, { Component } from 'react';
import './App.css';
import {PostData} from './PostData';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {Redirect} from 'react-router-dom';

class ResultPage extends Component{
  constructor(){
	super();
	var userData = JSON.parse(sessionStorage.getItem('userData'));
	this.state = {
	   isloggedOut: false,
	   loggedInUserId: userData.userData.user_id,
	   loggedInUserName: userData.userData.full_name,
	   userImageDetails: []
	};
  } 
  
  componentWillMount() {
  		let postData = '';
	  	PostData('getUserImages', postData).then((result) => {
	  		let responseJson = result;
	  		if(responseJson.userImages){
	  			this.setState({
	  				userImageDetails: responseJson.userImages
	  			})
	  		}	  		
	  	});
	}

  render(){
  	   if(this.state.isloggedOut){
  	   		return (<Redirect to={'/login'} />);
  	   }
  	   if(this.state.loggedInUserName !== 'admin') {
            confirmAlert({
              customUI: ({ onClose }) => {
                return (
                  <div className='custom-ui'>
                    <h1>Sorry! Only Admin have rights to view this form.</h1>
                    <button onClick={onClose}>Okay</button>
                  </div>
                );
              }
            });
            return (<Redirect to={'/login'} />);
        }
  	  return (  	   
		<div className="App">				
			<h1>Top 3 Best Pic's!</h1>
			<div className="row">
				{this.state.userImageDetails.map(userImageDetail => (
					  <div className="column">
					    <img className="resultImage" alt={userImageDetail.image_name} key={userImageDetail.image_name} src={userImageDetail.image_name}></img>
					    <h3 key={userImageDetail.total_votes}>Total Likes: {userImageDetail.total_votes}</h3>
						<hr key={userImageDetail.cat} className="hrLineWidth"></hr>
					  </div>
				))}
			</div>
		</div>
	  );
  }
}
export default ResultPage;