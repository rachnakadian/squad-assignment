import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ''
		}
	}
	fb_login(e) {
		e.preventDefault();
		let that = this;
		this.setState({error: ''});
		FB.login(function(response) {
            if (response.authResponse) {
                FB.api('/me?fields=id,name,picture,email', function(response) {
               		localStorage.setItem('email', response.email);
               		let userData = {
               			email: response.email,
               			name: response.name,
               			image: response.picture.data.url
               		}
               		const options = {
			     		method: 'POST',
			     		headers: {
					       	'Accept': 'application/json',
					       	'Content-Type': 'application/json'
			     		},
			     		body: JSON.stringify(userData)
			   		};
               		fetch('http://localhost:3000/users/addOrUpdate', options)
               		.then(response => {
			      		if(response.status == 200) {
			      			response.json().then(json => {
			      				that.context.router.push('/profile');
			      			});
			      		} else {
			      			response.json().then(json => {
			      				that.setState({error: json.message});
			      			});
			      		}
			      	}).catch(err => {
			      		that.setState({error: 'Sorry! user record is not updated.'});
			      	});
          		});
            } else {
                that.setState({error: 'Login Failed!'});
            }
        }, {
            scope: 'email'
        });
	}
  	render() {
  		let email = localStorage.getItem('email');
    	return <div className="col-xs-4 col-xs-offset-4" style={{padding:'30px'}}>
    		{this.state.error ? <div className="col-xs-12 alert alert-danger">{this.state.error}</div> : ''}
		    {email ? <div>
		    	You are already logged-in. Go to <Link to='/profile'>Profile</Link>
		    </div> : <div className='col-xs-12 text-center'>
		    	<button className='btn btn-info' onClick={this.fb_login.bind(this)}>Login with Facebook</button>
		    </div>}
		</div>
  	}
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Login;