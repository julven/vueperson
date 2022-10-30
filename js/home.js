import accountStore from "./account_store.js"

const home = async () => {
	let html = await fetch("html/home.html")
	html = await html.text()

	let { onMounted } = Vue

	return ({
		template: html,
		props: [],
		
		setup() {

			let { account } = accountStore();

			onMounted( () => {
				// console.log(account)
			})

			return {
				account
			}
		}
	})
}

export default home