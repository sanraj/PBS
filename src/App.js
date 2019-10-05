import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';

class App extends Component{
  constructor(){
	super();
	this.state={
		appName: "Vote for Best Pic!",
		home: false
    };
  }
  render(){
	  return (
		<div>
			<Routes name={this.state.appName}/>
		</div>
	  );
  }
}

export default App;