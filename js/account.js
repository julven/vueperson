import accountLogin from "./account_login.js"
import accountForm from "./account_form.js"
import accountPassword from "./account_password.js"


let account = async () => {

	let html = await fetch("html/account.html")
	html = await html.text();


	return({
		template: html,
		component: {
			"account_login" : await accountLogin(),
			"account_form" : await accountForm(),
			"account_password" : await accountPassword(),
		},
		props: [],
		setup() {


			return {

				
			}
		}
	})
}

export default account