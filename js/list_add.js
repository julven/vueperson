import listForm from "./list_form.js"
import listStore from "./list_store.js"

const listAdd = async () => {

	let html = await fetch("html/list_add.html")
	html = await html.text()

	let { onMounted, ref } = Vue

	return({
		template: html,
		components: {
			"list_form" : await listForm()
		},
		props: [],
		setup() {

			let {useRouter} = VueRouter
			let router = useRouter()
			let store = listStore()
			let loading = ref(false)

			let randomPerson = async () => {
				loading.value = true
				await store.randomPerson()
				loading.value = false
			}

			let submit = async () => {
				// console.log(store.person)
				let valid = true
				Object.keys(store.person).forEach( x => {
					if(store.person[ x ] == "") valid = false
				})

				if(!valid) {
					alert("all fields must not be empty!")
					return
				}
				loading.value = true
				let resp = await store.newPerson()
				loading.value = false

				if(!resp) {
					alert("something went wrong!")
					return
				}

				alert("person successfully added")
			}

			return {
				router,
				randomPerson,
				loading,
				submit
			}
		}
	})
}

export default listAdd