import { AUTH, DB } from "../firebase.js"

let { defineStore } = Pinia

let accountStore = defineStore( "account", {
	state: () => ({
		
		account: {
			email: "",
			id: "",
			fname: "",
			lname: "",
			bday: "",
			gender: "",
			logged: false,
		}
			
		
		
	}),
	getters: {
		getState: state => () => state,
	},
	actions: {
		async login(data) {
			// console.log(data)
			let user = await AUTH.login(data)
			if("user" in user) {
				// console.log(user.user)
				let account = await DB.read_id('admins', user.user.uid)
				// console.log(account.data())

				let newState = {
					...this.account, 
					...account.data(), 
					id: user.user.uid, 
					logged: true,
					email: user.user.bc.email
				}
				// console.log(newState)
				this.account = newState
				// console.log(this.data)
			}
			else return false
			
		},
		async currentUser() {
			let user = await AUTH.currentUser()
			// console.log(user )
			// return
			if(user) {
				let account = await DB.read_id("admins", user.uid)

				console.log(user.uid)
				let newState = {
					...this.account, 
					...account.data(), 
					id: user.uid, 
					logged: true,
					email: user.bc.email
				}

				this.account = newState

				return true
			}
			return false

		},
		async verifyUser(password) {

			let auths = await AUTH.reAuthenticate(this.account.email, password.old)

			// console.log(auths)
			if(auths == false) {
				alert("provided old password is wrong!")
				return;
			}

			let pass = await AUTH.changePass(password.new)

			return pass


		},
		async update(data, id) {
			await DB.update('admins', id, data)
			this.account = {... this.account, data }
		},
		async logout() {
			await AUTH.logout()

		}
	}
})

export default accountStore