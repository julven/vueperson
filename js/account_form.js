let accountForm = async () => {

	let html = await fetch("html/account_form.html")
	html = await html.text();

	let { onMounted, onBeforeUnmount } = Vue
	let { Datepicker, updateTextFields } = M

	return({
		template: html,
		component: {

		},
		props: [],
		setup() {

			
			let instance = null

			onMounted( () => {
				console.log()
				let elem = document.getElementsByClassName("datepicker")[0]
				instance = Datepicker.init( elem, {
					onSelect: date => {
						console.log(date)
						instance.close()
					}
				})
				updateTextFields()
			})

			onBeforeUnmount( () => {
				instance.destroy();
			})

			return {

				
			}
		}
	})
}

export default accountForm