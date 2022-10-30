import accountStore from "./account_store.js"

let listView = async () => {
	let html = await fetch("html/list_view.html")
	html = await html.text()

	return({
		template: html,
		props: [],
		setup() {

			let { account } = accountStore()
			let {useRouter} = VueRouter
			let router = useRouter()

			return {
				router,
				account
			}
		}
	})
}
export default listView