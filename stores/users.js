import StoreBase from './base';

class Users extends StoreBase () {
	setDefaultState() {
		return {
			id: null,
			loading: false,
			error: false
		};
	}

	async loadUser(id) {
		this.update({
			...this.state,
			loading: true
		});

		try {
			let response = fetch('/get-user/' + id, {
				method: 'GET',
				new Headers({
					'Content-Type': 'application/json'
				})
			});

			this.update({
				id: response.id,
				loading: false
			});
		} catch (e) {
			console.error(e);
			this.update({
				id: false,
				loading: false,
				error: true
			});			
		}
	}
}

let users = new Users();
export default users;
