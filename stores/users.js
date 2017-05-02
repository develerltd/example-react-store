import StoreBase from './base';

class Users extends StoreBase () {
	setDefaultState() {
		return {
			id: null,
			loading: false,
			error: false
		};
	}

	loadUser(id) {
		this.update({
			...this.state,
			loading: true
		});


		fetch('/get-user/' + id, {
			new Header({
				'Content-Type': 'application/json'
			})
		}).then((response) => {
			this.update({
				id: response.id,
				loading: false
			});
		}, (error) => {
			this.update({
				id: false,
				loading: false,
				error: true
			});
		});
	}
}

let users = new Users();
export default users;
