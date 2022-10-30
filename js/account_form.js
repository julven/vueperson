import accountStore from "./account_store.js"


let accountForm = async () => {

	let html = await fetch("html/account_form.html")
	html = await html.text();

	let { onMounted, onBeforeUnmount, ref, watch } = Vue
	let { Datepicker, updateTextFields } = M
	let { useRouter} = VueRouter
	let loading = ref(false)

	return({
		template: html,
		component: {

		},
		props: [],
		setup() {

			let store = accountStore()
			let router = useRouter()
			let instance = null
			let form = ref({
				fname: "",
				lname: "",
				bday: "",
				gender: ""
			})

			let logout = async () => {
				
				await store.logout()
				store.$reset()
				router.replace({path: "/account/login"})
			}


			let update = async () => {
				// console.log(instance.toString())
				loading.value = true
				
				let valid = true

				Object.keys(form.value).forEach( x => {
					if(form.value[ x ] == "" ) valid = false
				})

				if(!valid) {
					alert("all fields must not be empty!")
					loading.value = false
					return
				}
				// console.log(form.value)
				await store.update(form.value, store.account.id)
				alert("account info updated successfully")
				loading.value = false


			}

			let valid = e => {
				// console.log()
				if(e.target.value == "") e.target.classList.add('invalid')
				else e.target.classList.remove('invalid')
			}


			

			onMounted( () => {
				console.log()
				let elem = document.getElementsByClassName("datepicker")[0]
				instance = Datepicker.init( elem, {
					onClose: date => {
						elem.value = instance.toString();
						form.value.bday = instance.toString()
						// console.log(instance.toString())
						elem.classList.remove("invalid")
					},
					autoClose: true,
					format: "yyyy-mm-dd",
					yearRange: ['1920', (new Date()).getFullYear()]
				})
				
				

				Object.keys(form.value).forEach( x => {
					form.value[ x ] = store.account[ x ]
					try{
						document.getElementById(x).value = store.account[ x ]
					}
					catch( err) {
						console.log(err)
					}
					
				})

				updateTextFields()
				// console.log(form.value)
			})

			onBeforeUnmount( () => {
				instance.destroy();
			})

			watch(form.value, (now, old) => {
				// updateTextFields()
				// console.log(now, old)
			}, {deep: true})

			return {
				logout,
				account: store.account,
				form,
				update,
				valid,
				loading
		
				
			}
		}
	})
}

export default accountForm