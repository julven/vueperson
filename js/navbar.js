const navbar = async () => {
	let html = await fetch("html/navbar.html")
	html = await html.text()

	let { ref, onMounted, onBeforeUnmount } = Vue;
	let { Dropdown } = M

	return({
		template: html,
		components: {

		},
		props: [],
		setup() {

			let navbarDropdown = ref(null)
			let instance = null

			onMounted( () => {
				// console.log(window.M)
				instance = Dropdown.init(navbarDropdown.value, {
					
				})
			})
			onBeforeUnmount( () => {
				instance.destroy();
			})

			return {
				navbarDropdown
			}
		}
	})
}

export default navbar