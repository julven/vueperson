import { DB } from "../firebase.js"


let { defineStore } = Pinia

let listStore = defineStore('list', {
	state: () => ({
		list: [],
		person: {
			fname: "",
			lname: "",
			bday: "",
			gender: "",
			status: "",
		},
		page: 1,
		pages: [1],
		search: "",
		gender: "",
		status: "",
		id: "",
	}),
	getters: {

	},
	actions: {
		async randomPerson() {
			let person = await fetch('https://randomuser.me/api/?nat=us,au,gb')

			person = await person.json();

			// console.log(person.results[0])
			let status = ['single', 'married', 'divorced', 'widowed', 'deceased']

			let newPerson = {
				fname: person.results[0].name.first,
				lname: person.results[0].name.last,
				gender: person.results[0].gender,
				status: status[Math.floor(Math.random()*status.length)],
				bday: person.results[0].dob.date.split("T")[0],
			}

			console.log(newPerson)
			this.person = newPerson
		},
		async newPerson() {
			let resp = await DB.create('persons', this.person)
			// console.log(resp)
			if(resp) Object.keys(this.person).forEach( x => this.person[ x ] = "")
			return resp
		},
		listFind() { 

			window.history.pushState({}, "", `#/list/search/
				${this.search == "" ? "_" : this.search}/gender/
				${this.gender == "" ? "_" : this.gender}/status/
				${this.status == "" ? "_" : this.status}/page/
				${this.page}`
			)
		}
	}
})

export default listStore