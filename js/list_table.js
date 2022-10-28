let listTable = async () => {
	let html = await fetch("html/list_table.html")
	html = await html.text()

	// console.log(html)
	let { onMounted } = Vue

	return({
		template: html,
		props: [],
		setup() {

			// onMounted(() => console.log("list table"))

			return {

			}
		}
	})
}

export default listTable