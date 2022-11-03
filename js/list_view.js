import accountStore from "./account_store.js"
import listStore from "./list_store.js"
import spinner from "./spinner.js"

let listView = async () => {
	let html = await fetch("html/list_view.html")
	html = await html.text()

	let {useRouter, useRoute} = VueRouter
	let { onMounted, computed, ref } = Vue

	return({
		template: html,
		components: {
			"spinner" : await spinner()
		},
		setup() {

			let { account } = accountStore()		
			let router = useRouter()
			let {params }= useRoute()
			let list = listStore()
			let loading = ref(false)

			let getPerson = async () => {
				loading.value = true
				let exists = await list.getPerson(params.id)
				// console.log(exists)
				loading.value = false
				if(!exists) router.push("/list")
			}

			onMounted( () => {
				if("id" in params) {
					console.log(params.id)
					getPerson()
				}
				else router.go(-1)
				// console.log(params)
			})

			return {
				router,
				account,
				person: computed( () => list.person ),
				loading
			}
		}
	})
}
export default listView