import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './App.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {PostData} from './PostData';
import {Redirect} from 'react-router-dom';
//require('require-context/register');

class Dashboard extends Component{
  constructor(){
	super();

	var userData = JSON.parse(sessionStorage.getItem('userData'));

	this.state = {
	   data: [],
	   selectedImage: '',
	   selectedCategory: sessionStorage.getItem('selectedCategory'),
	   isloggedOut: false,
	   loggedInUserId: userData.userData.user_id,
	   loggedInUserName: userData.userData.full_name,
	};
	this.handleVote = this.handleVote.bind(this);
  }
  
  handleVote(){
	 if( this.state.selectedImage ) {
		 confirmAlert({
		  customUI: ({ onClose }) => {
		    return (
		      <div className='custom-ui'>
		        <img alt="you liked this" className="popupImage" src={this.state.selectedImage} />
		        <h1>You already liked above pic!</h1>
		        <p>Still you want to change your selection?</p>
		        <button onClick={onClose}>No</button>
		        <button
		          onClick={() => {
		          	let selectedImg = document.getElementsByClassName("thumb selected");
					let selectedImgName = selectedImg[0].children[0].src;
		            this.setState({selectedImage: selectedImgName},
					 	() => PostData('userVote',this.state).then((result) => {
						        let responseJson = result;
						        if(responseJson.message) {
						            confirmAlert({
						              customUI: ({ onClose }) => {
						                return (
						                  <div className='custom-ui'>
						                    <h1>{responseJson.message}</h1>
						                    <button onClick={onClose}>Okay</button>
						                  </div>
						                );
						              }
						            })
						        }
					    	})
					 );

		            onClose();
		          }}
		        >
		          Yes, Change it!
		        </button>
		      </div>
		    );
		  }
		});
		return false;
	 } else {
	 	 let selectedImg = document.getElementsByClassName("thumb selected");
		 let selectedImgName = selectedImg[0].children[0].src;
		 this.setState({selectedImage: selectedImgName},
		 	() => PostData('userVote',this.state).then((result) => {
			        let responseJson = result;
			        if(responseJson.message) {
			            confirmAlert({
			              customUI: ({ onClose }) => {
			                return (
			                  <div className='custom-ui'>
			                    <h1>{responseJson.message}</h1>
			                    <button onClick={onClose}>Okay</button>
			                  </div>
			                )
			              }
			            })
			        }
		    	})
		 );
	 }
  }

  componentWillMount() {  	
	PostData('loadImages',this.state.selectedCategory).then((result) => {
        this.setState({
			data: result.userImages
		})
	});

	/*PostData('loadUserDetails',this.state.loggedInUserId).then((result) => {
        var userData = result.userData;
		if(sessionStorage.getItem('selectedCategory') === 'BestMale'){
			this.setState({selectedImage: userData.userData.voted_for_male});
		}else if(sessionStorage.getItem('selectedCategory') === 'BestFemale'){
			this.setState({selectedImage: userData.userData.voted_for_female});
		}else if(sessionStorage.getItem('selectedCategory') === 'BestFamily'){
			this.setState({selectedImage: userData.userData.voted_for_female});
		}    
	});*/

  }
  render(){
  	   if(this.state.isloggedOut){
  	   		return (<Redirect to={'/login'} />);
  	   }
  	   if(!this.state.loggedInUserId) {
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
        if(this.state.loggedInUserName === 'admin'){
        	return (<Redirect to={'/resultPage'} />);
        }
  	  return (
		<div className="App">		    				
			<h1>
				<a href="/votingForm">
			    	<img src="/back-btn.png" className="back-btn" alt="Back"></img>
			    </a>
				Vote for Best Pic!
			</h1>
			<div>
				<Carousel showIndicators={false}>
					{this.state.data.map(dataItem => (
						<img alt={dataItem} key={dataItem} src={dataItem}></img>
		          	))}
	          	</Carousel>
				<a onClick={this.handleVote}>
					<img className="likeButton" src="/like-button.jpg" alt="I like this!"></img>
				</a>
			</div>			
		</div>
	  );
  }
}

export default Dashboard;