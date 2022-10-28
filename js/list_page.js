let listPage = async () => {
	let html = await fetch("html/list_page.html")
	html = await html.text()

	return({
		template: html,
		props: [],
		setup() {

			return {



			}
		}
	})
}
export default listPage