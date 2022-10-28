import listForm from "./list_form.js"

const listAdd = async () => {

	let html = await fetch("html/list_add.html")
	html = await html.text()



	return({
		template: html,
		components: {
			"list_form" : await listForm()
		},
		props: [],
		setup() {

			let {useRouter} = VueRouter
			let router = useRouter()

			return {
				router
			}
		}
	})
}

export default listAdd