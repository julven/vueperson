import navbar from "./js/navbar.js"
import accountStore from "./js/account_store.js"
import listStore from "./js/list_store.js"

let index =  async () => {
	let html = await fetch("html/index.html")
	html = await html.text()

	let { ref, onMounted, watch } = Vue;
	let { useRouter } = VueRouter

	return ({
		template: html,
		components: {
			"navbar" : await navbar(),
			
		},
		setup() {

			let test = ref("test value")
			let store = accountStore()
			let list = listStore()
			let loading = ref(false)
	
			let getCurrentUser = async () => {
				loading.value = true
				await store.currentUser()
				loading.value = false
			}

			onMounted(() => {
				// console.log("index")
				getCurrentUser()
				list.router = useRouter()
				// store.logout();
			})

			watch( store, (now, old) => {
				console.log(now.account)
				// 
			}, { deep: true})



			return {
				test,
				loading
			}
		}
	})
}
export default index
