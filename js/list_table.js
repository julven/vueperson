import accountStore from "./account_store.js"

let listTable = async () => {
	let html = await fetch("html/list_table.html")
	html = await html.text()

	// console.log(html)
	let { onMounted } = Vue

	return({
		template: html,
		props: [],
		setup() {

			let { account } = accountStore()
			// onMounted(() => console.log("list table"))

			return {
				account
			}
		}
	})
}

export default listTable