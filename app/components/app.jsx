import React from 'react';

class App extends React.Component {
	componentWillMount() {
		let email = localStorage.getItem('email');
		if(email) {
			this.context.router.push('/profile');
		} else {
			this.context.router.push('/login');
		}
	}
	render() {
		return <div>
			{this.props.children}
		</div>
	}
}

App.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default App;