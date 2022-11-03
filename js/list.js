

let list = async () => {

	let html = await fetch("html/list.html")
	html = await html.text();

	let { onMounted } = Vue



	return({
		template: html,
		
		props: [],
		setup() {

			

			onMounted( () => {
				
			
				// updateTextFields()
			})

			return {


			}
		}
	})
}

export default list