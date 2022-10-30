import listStore from "./list_store.js"

let listPage = async () => {
	let html = await fetch("html/list_page.html")
	html = await html.text()

	let { watch } = Vue


	return({
		template: html,
		props: [],
		setup() {

			let store = listStore()

			let more = () => {
				
			}

			let goTo = (page) => {

			}

			watch( store, (now, old) => {
				console.log(now)
			}, { deep: true})

			return {
				store,
				find,
				goTo


			}
		}
	})
}
export default listPage