import accountStore from "./account_store.js"
import listStore from "./list_store.js"
import spinner from "./spinner.js"

const home = async () => {
	let html = await fetch("html/home.html")
	html = await html.text()

	let { onMounted, computed, ref } = Vue

	return ({
		template: html,
		props: [],
		components: {
			"spinner" : await spinner()
		},
		setup() {

			let { account } = accountStore();
			let { getSummary, getTotal, summary } = listStore()
			let loading = ref(true)

			let init = async () => {
				loading.value = true;
				await getTotal()
				loading.value = false;
			}
			let showInfo = async (value) => {
				// console.log(value)
				getSummary(value)
			}

			onMounted( () => {
				// console.log(account)
				init()
			})

			return {
				account,
				summary: computed( () => summary),
				loading,
				showInfo,
			}
		}
	})
}

export default home