import accountStore from "./account_store.js"
import listStore from "./list_store.js"

let listSearch = async () => {
	let html = await fetch("html/list_search.html")
	html = await html.text()

	let { onMounted, onBeforeUnmount, computed, watch } = Vue
	let { Dropdown } = M

	return({
		template: html,
		props: [],
		setup() {

			let {account} = accountStore()
			let storeList = listStore()
			let instance = [null, null]

			let find = () => {
				
				storeList.newSearch()
				storeList.changeURL()
			}

			let filter = (field, value) => {
				storeList[field] = value
				storeList.newSearch()
				storeList.changeURL()
			}



			onMounted(() => {
				let elem1 = document.getElementById("genderTrigger")
				let elem2 = document.getElementById("statusTrigger")

				instance[0] = Dropdown.init(elem1, {})
				instance[1] = Dropdown.init(elem2, {})
			})

			onBeforeUnmount(() => {
				instance[0].destroy()
				instance[1].destroy()
			})

			watch( storeList, (now, old) => {
				// console.log(now.gender)
			}, { deep: true})

			return {
				account,
				storeList,
				find,
				filter
			}
		}
	})
}

export default listSearch