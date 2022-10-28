import listForm from "./list_form.js"

const listEdit = async () => {

	let html = await fetch("html/list_edit.html")
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

export default listEdit