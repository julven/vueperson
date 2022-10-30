import home from "./home.js"
import list from "./list.js"
import account from "./account.js"
import listAdd from "./list_add.js"
import listEdit from "./list_edit.js"
import listView from "./list_view.js"
import listMain from "./list_main.js"
import accountLogin from "./account_login.js"
import accountForm from "./account_form.js"
import accountPassword from "./account_password.js"
import accountStore from "./account_store.js"



let { createRouter, createWebHashHistory, useRouter } = VueRouter
let initRoute = "/account"

let routeGuard = (to, from) => {

	let store = accountStore()

	// console.log({init: to.path})
	initRoute = to.path

	if(store.account.logged) return true;
	return "/account/login"
}


const routings = createRouter({
	history: createWebHashHistory(),
	routes: [
		{path: "/", component: await home()},
		{path: "/list", component: await list(), children: [
			{path: "", component: await listMain() },
			{path: "add", component: await listAdd() },
			{path: "edit/:id", component: await listEdit() },
			{path: "view/:id", component: await listView() },
			{path: "search/:search/gender/:gender/status/:status/page/:page", component: await listMain()}
		]},
		{path: "/account", component: await account(), children: [
			{path: "", component: await accountForm(), beforeEnter: [routeGuard]},
			{path: "login", component: await accountLogin(), beforeEnter: async (to, from) => {
				let store = accountStore()
				
				let logged  = await store.currentUser()

				// console.log(initRoute)

				if(logged) return initRoute == "/account/login" ? "/account" : initRoute;
				return true

			} },
			{path: "password", component: await accountPassword(), beforeEnter: [routeGuard] },
		]},


		{path: "/:pathMatch(.*)*", component: {template: `<p>Page not found</p>`}},
	]
})



export default routings