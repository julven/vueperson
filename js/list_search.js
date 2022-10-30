let listSearch = async () => {
	let html = await fetch("html/list_search.html")
	html = await html.text()

	let { onMounted, onBeforeUnmount } = Vue
	let { Dropdown } = M

	return({
		template: html,
		props: [],
		setup() {

			let instance = [null, null]

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

			return {

			}
		}
	})
}

export default listSearch