import React from 'react';
import * as Config from '../config.js';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			name: '',
			email: '',
			image: '',
			login_count: ''
		}
	}
	componentWillMount() {
		if(!localStorage.getItem('email')) {
			this.context.router.push('/login');
		}
	}
	componentDidMount() {
		var email = localStorage.getItem('email');
		const options = {
     		method: 'GET',
     		headers: {
		       	'Accept': 'application/json',
		       	'Content-Type': 'application/json'
     		}
   		};
		fetch('https://'+Config.default.host+'/users/'+email, options)
		.then(response => {
      		if(response.status == 200) {
      			response.json().then(json => {
      				this.setState({
      					name: json.data.name,
      					email: json.data.email,
      					image: json.data.image,
      					login_count: json.data.login_count
      				})
      			});
      		} else {
      			response.json().then(json => {
      				this.setState({error: json.message});
      			});
      		}
      	}).catch(err => {
      		this.setState({error: 'Sorry! user record is not updated.'});
      	});
	}
	logout(e) {
		e.preventDefault();
		let that = this;
		FB.getLoginStatus(function(response) {
	        if (response && response.status === 'connected') {
	            FB.logout(function(response) {
					console.log(response);
	            });
	        }
	    });
		localStorage.setItem('email', '');
		that.context.router.push('/login');
	}
	render() {
		return <div className='col-xs-12' style={{padding: '50px'}}>
			<div className="col-xs-4 col-xs-offset-4 text-center" style={{padding:'30px'}}>
				{this.state.error ? <div className='col-xs-12 alert alert-danger'>{this.state.error}</div> : ''}
				<div className='col-xs-12'><img src={this.state.image} /></div>
				<div className='col-xs-12'><b>Name:</b> {this.state.name}</div>
				<div className='col-xs-12'><b>Email:</b> {this.state.email}</div><br />
				<div className='col-xs-12'>No. of attempts you have successfully logged in using facebook: {this.state.login_count}</div>
				<div className='col-xs-12'><button className='btn btn-info' onClick={this.logout.bind(this)}>Logout</button></div>
			</div>
		</div>
	}
}

Profile.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Profile;