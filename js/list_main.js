import listSearch from "./list_search.js"
import listTable from "./list_table.js"
import listPage from "./list_page.js"


const listMain = async () => {

	let html = await fetch("html/list_main.html")
	html = await html.text()


	return({
		template: html,
		components: {
			"list_search" : await listSearch(),
			"list_table" : await listTable(),
			"list_page" : await listPage(),
		},
		props: [],
		setup() {

			

			return {
				
			}
		}
	})
}

export default listMain