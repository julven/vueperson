import listSearch from "./list_search.js"
import listTable from "./list_table.js"
import listPage from "./list_page.js"
import listStore from "./list_store.js"

const listMain = async () => {

	let html = await fetch("html/list_main.html")
	html = await html.text()

	let { onMounted } = Vue
	let { useRoute } = VueRouter
	let { updateTextFields } = M

	return({
		template: html,
		components: {
			"list_search" : await listSearch(),
			"list_table" : await listTable(),
			"list_page" : await listPage(),
		},
		props: [],
		setup() {

			let { params : { search, gender, status, page } } = useRoute()
			let store = listStore()

			onMounted( () => {

				console.log({search, gender})
				
				if(search && !search.includes("_")) {
					store.search = search;
					document.getElementById("search").value=search
					updateTextFields()

				} 
				if(gender && gender[0] != "_" && ["male", "female"].includes(gender)) store.gender = gender;
				if(status && status[0] != "_" && [
					"single", "married", "divorced", "widowed", "deceased"
					].includes(status)) store.status = status;
				store.changeURL(true)
				
			})

			return {
				
			}
		}
	})
}

export default listMain