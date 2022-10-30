import accountStore from "./account_store.js"

let accountLogin = async () => {

	let html = await fetch("html/account_login.html")
	html = await html.text();

	let { onMounted, ref, watch } = Vue
	let { updateTextFields } = M
	let { useRouter} = VueRouter

	return({
		template: html,
		component: {

		},
		props: [],
		setup() {

			let store = accountStore()
			let account = ref({
				email: "julvenici@gmail.com",
				password: "",
			})
			let router = useRouter()
			let loading = ref(false)
			let invalid = ref(false);

			let login = async () => {
				
				loading.value = true
				invalid.value = false
				let user = await store.login(account.value)
				loading.value = false


				if(user == false) {
					alert("invalid username or password")
					invalid.value = true
					return
				}

				router.push("/account")



			}

			onMounted(() => {
				updateTextFields()
				// console.log(store.getState().account)
			})

			watch(store, (now, old) => {
				// console.log(now.account)
			}, {deep: true})

			return {
				account,
				login,
				loading,
				invalid
				
			}
		}
	})
}

export default accountLogin