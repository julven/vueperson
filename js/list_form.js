import listStore from "./list_store.js"

const listForm = async () => {

	let html = await fetch("html/list_form.html")
	html = await html.text()

	let { onMounted, onBeforeUnmount, watch, computed } = Vue
	let { FormSelect, Datepicker, updateTextFields } = M

	return({
		template: html,
		setup() {

			let {useRouter} = VueRouter
			let router = useRouter()
			let instance = [null, null]
			let store = listStore()


			onMounted( () => {
				let select = document.getElementById("status")
				let picker = document.getElementsByClassName("datepicker")[0]
				instance[0] = FormSelect.init(select, {})
				instance[1] = Datepicker.init(picker, {
					onClose: date => {
						console.log(instance[1].toString())
					},
					autoClose: true,
					format: "yyyy-mm-dd",
					yearRange: ['1920', (new Date()).getFullYear()]
				})


				
			})

			onBeforeUnmount( () => {
				instance[0].destroy()
				instance[1].destroy()
			})

			watch(store, (now, old) => {
				// console.log(now.person)
				Object.keys(now.person).forEach( x => {
					try {
						// console.log( x )
						document.getElementById(x).value = now.person[ x ]
						
						// document.getElementById("status").click()
						// console.log()

					} catch(e) {
						// console.log({error: x})
					}
				})
				
				instance[1].setDate(new Date(store.person.bday))
				let select = document.querySelector(".select-wrapper > input")
				select.value = store.person.status == "" ? "-select-" : store.person.status
				
				updateTextFields();
				
			}, {deep: true})

			return {
				router,
				form: computed( () => store.person ),
				test: e => console.log("status")
			}
		}
	})
}

export default listForm