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



let { createRouter, createWebHashHistory } = VueRouter

const routings = createRouter({
	history: createWebHashHistory(),
	routes: [
		{path: "/", component: await home()},
		{path: "/list", component: await list(), children: [
			{path: "", component: await listMain() },
			{path: "add", component: await listAdd() },
			{path: "edit/:id", component: await listEdit() },
			{path: "view/:id", component: await listView() },
		]},
		{path: "/account", component: await account(), children: [
			{path: "", component: await accountForm() },
			{path: "login", component: await accountLogin() },
			{path: "password", component: await accountPassword() },
		]},


		{path: "/:pathMatch(.*)*", component: {template: `<p>Page not found</p>`}},
	]
})


export default routings