let listView = async () => {
	let html = await fetch("html/list_view.html")
	html = await html.text()

	return({
		template: html,
		props: [],
		setup() {

			let {useRouter} = VueRouter
			let router = useRouter()

			return {
				router
			}
		}
	})
}
export default listView