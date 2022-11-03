import listForm from "./list_form.js"
import listStore from "./list_store.js"

const listEdit = async () => {

	let html = await fetch("html/list_edit.html")
	html = await html.text()

	let { useRoute, useRouter } = VueRouter
	let { onMounted } = Vue

	return({
		template: html,
		components: {
			"list_form" : await listForm()
		},
		props: [],
		setup() {
			
			let router = useRouter()
			let { params } = useRoute()
			let list = listStore()

			let getPerson = async () => {
				console.log(params.id)
				let person = await list.getPerson(params.id)

				console.log(person)
				if(!person) router.push("/list")
			}

			let updatePerson = async () => {
				let valid = true
				Object.keys(list.person).forEach( x => {
					if(list.person[ x ] == "") valid = false
				})

				// console.log(valid)

				if(!valid) {
					alert("all fields must not be empty!")
					return
				}

				await list.updatePerson(params.id)
				alert("update succussfull!")
				return
			}

			onMounted( () => {
			
				if("id" in params) {
					getPerson()

				}else router.push("/list")
			})

			return {
				router,
				updatePerson
			}
		}
	})
}

export default listEdit