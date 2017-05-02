import React from 'react';
import Component from 'storeact';
import Users$ from 'stores/users';

export default class MyComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.bindStores([Users$]);
	}

	componentDidMount () {
		Users$.loadUser(1);
	}

	UpdateStore(store, state) {
		if (store === Users$) {
			this.setState(state);
		}
	}

	render () {
		return <Page {...this.state} />;
	}
} 

const Page = (props) => {
	if (props.loading) {
		return (
			<div>Loading...</div>
		);
	}

	if (props.error) {
		return (
			<div>Error</div>
		);
	}

	return (
		<div>
			User ID: {props.id}
		</div>
	);
}
