import accountStore from "./account_store.js"
import listStore from "./list_store.js"

let listView = async () => {
	let html = await fetch("html/list_view.html")
	html = await html.text()

	let {useRouter, useRoute} = VueRouter
	let { onMounted, computed } = Vue

	return({
		template: html,
		props: [],
		setup() {

			let { account } = accountStore()		
			let router = useRouter()
			let {params }= useRoute()
			let list = listStore()

			let getPerson = async () => {
				let exists = await list.getPerson(params.id)
				// console.log(exists)
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
				person: computed( () => list.person )
			}
		}
	})
}
export default listView