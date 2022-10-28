import navbar from "./js/navbar.js"


let index =  async () => {
	let html = await fetch("html/index.html")
	html = await html.text()

	let { ref } = Vue;

	return ({
		template: html,
		components: {
			"navbar" : await navbar(),
			
		},
		setup() {

			let test = ref("test value")
			

			return {
				test
			}
		}
	})
}
export default index
