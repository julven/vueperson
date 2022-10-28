let accountPassword = async () => {

	let html = await fetch("html/account_password.html")
	html = await html.text();


	return({
		template: html,
		component: {

		},
		props: [],
		setup() {


			return {

				
			}
		}
	})
}

export default accountPassword