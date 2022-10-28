

const home = async () => {
	let html = await fetch("html/home.html")
	html = await html.text()

	return ({
		template: html,
		props: [],
		
		setup() {


			return {


			}
		}
	})
}

export default home