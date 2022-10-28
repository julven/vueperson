const listForm = async () => {

	let html = await fetch("html/list_form.html")
	html = await html.text()

	let { onMounted, onBeforeUnmount } = Vue
	let { FormSelect } = M

	return({
		template: html,
		props: [],
		setup() {

			let {useRouter} = VueRouter
			let router = useRouter()
			let instance = null

			onMounted( () => {
				let elem = document.getElementById("status_select")
				instance = FormSelect.init(elem, {})
			})

			onBeforeUnmount( () => {
				instance.destroy()
			})

			return {
				router
			}
		}
	})
}

export default listForm