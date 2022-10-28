let listSearch = async () => {
	let html = await fetch("html/list_search.html")
	html = await html.text()

	let { onMounted } = Vue

	return({
		template: html,
		props: [],
		setup() {

			// onMounted(() => console.log("list search"))

			return {

			}
		}
	})
}

export default listSearch