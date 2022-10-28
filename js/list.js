

let list = async () => {

	let html = await fetch("html/list.html")
	html = await html.text();

	let { onMounted } = Vue
	let { updateTextFields } = M

	return({
		template: html,
		
		props: [],
		setup() {

			onMounted( () => {
				console.log()
				// updateTextFields()
			})

			return {


			}
		}
	})
}

export default list