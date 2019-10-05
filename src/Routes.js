import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import VotingForm from './VotingForm';
import ResultPage from './ResultPage';
import NotFound from './NotFound';

const Routes = () => (
<BrowserRouter>
	<Switch>
		<Route exact path="/" component={Login}/>
		<Route path="/login" component={Login}/>
		<Route path="/signup" component={Signup}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/votingForm" component={VotingForm}/>
		<Route path="/resultPage" component={ResultPage}/>
		<Route path="*" component={NotFound}/>
	</Switch>
</BrowserRouter>
);
export default Routes;
