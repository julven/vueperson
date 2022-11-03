import accountStore from "./account_store.js"
import listStore from "./list_store.js"

let listTable = async () => {
	let html = await fetch("html/list_table.html")
	html = await html.text()

	// console.log(html)
	let { onMounted, watch, computed } = Vue

	return({
		template: html,
		props: [],
		setup() {

			let { account } = accountStore()
			let list = listStore()

			let getList = async () => {
				await list.getList()
				// console.log(list.getDataList)
			}

			let deletePerson = async (id) => {
				console.log(id)
				let conf = confirm("delete this person?")
				if(conf) {
					list.deletePerson(id)
				}
			}

			onMounted(() => {
				list.search = "";
				list.gender = "";
				list.status = "";
				getList()
			})

			let computedList = computed( () => list )

			watch( computedList, (now, old) => {
				// console.log(now.pagesRefs, now.pages)
			}, {deep: true})

			return {
				account,
				list: computed( () => list.getDataList),
				page: computed( () => list.page),
				deletePerson
					
			}
		}
	})
}

export default listTable