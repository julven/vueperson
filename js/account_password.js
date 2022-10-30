import accountStore from "./account_store.js"

let accountPassword = async () => {

	let html = await fetch("html/account_password.html")
	html = await html.text();

	let { ref } = Vue

	return({
		template: html,
		component: {

		},
		props: [],
		setup() {	

			let store = accountStore()
			let pass = ref({
				old: "",
				new: "",
				conf: "",
			})
			let loading = ref(false)

			let update = async () => {
				
				// console.log(pass.value)
				let valid = true
				Object.keys(pass.value).forEach( x => {
					if(pass.value[x] == "") valid = false
				})
				if(!valid) {
					alert("all fields must not be empty")
					return
				}

				if(pass.value.conf.length < 4 || pass.value.new.length < 4) {
					alert("password must be atleast 4 characters long")
					return
				}
				if(pass.value.conf !== pass.value.new) {
					alert("new and confirm password did not match")
					return;
				}
				loading.value = true
				let changed = await store.verifyUser(pass.value)
				loading.value = false
				if(!changed) {
					alert("password change failed...")
					return;
				}

				alert("password changed successfully!")
				Object.keys(pass.value).forEach(x => pass.value[x] = "")
			}

			return {
				pass,
				update,
				loading
				
			}
		}
	})
}

export default accountPassword