import React, {Component} from 'react';
class Welcome extends Component {
render() {
return (
	<div className="sign-up">
	    <h1 className="sign-up-title">Vote for Best Pic!</h1>
	    <img src="/vote_for_the_best_pic.jpg" className="voteImage" alt="Vote for the best pic"></img>
		<a href="/login"><input type="button" value="Login" className="btn login-btn-spacing"/></a>
		<a href="/signup"><input type="button" value="Signup" className="btn btn-spacing"/></a>
	</div>
);
}
}
export default Welcome;