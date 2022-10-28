let accountLogin = async () => {

	let html = await fetch("html/account_login.html")
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

export default accountLogin