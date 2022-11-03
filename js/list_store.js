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
		pagesRefs: [null],
		search: "",
		gender: "",
		status: "",
		id: "",
		ref: null,
		more: true,
		router: null,
		summary: {
			total: 0,
		}
	}),
	getters: {
		getDataList: state => {
			return state.list.map( x => {

				return {
					...x.data(),
					id: x.id
				}
			})
		},
		
		
		
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
		async newSearch() { 
			this.list = []
			this.page = 1
			this.pages = [1]
			this.pagesRefs = [null]
			this.ref = null
			this.more = true
			await this.getList();
		
		},
		changeURL(replace) {
			let path = `/list/search/
				${this.search == "" ? "_" : this.search}/gender/
				${this.gender == "" ? "_" : this.gender}/status/
				${this.status == "" ? "_" : this.status}/page/
				${this.page}`;
				
			if(replace) this.router.replace(path)
			else  this.router.push(path)

		},
		async getList(addPageRef) {
			
			if(addPageRef == undefined) addPageRef = true;
			// console.log({addPageRef})
			let rawData = await DB.read_batch("persons", this.ref)
			let list = []
			// console.log(rawData.length)
			
			if(rawData == false) {
				this.more = false
				return;
			} 
			
			for( let x in rawData) {
				let data = rawData[x].data(), valid = [false, false, false]
				
				this.ref = rawData[x]

				let fname = data.fname.toLowerCase()
				let lname = data.lname.toLowerCase()

				if(data.deleted) continue;
			
					
				if(this.search != "" && 
					(fname.includes(this.search) || lname.includes(this.search) )
						) valid[0] = true
				else if (this.search == "") valid[0] = true

				if(this.gender != "" && this.gender == data.gender) valid[1] = true
				else if (this.gender == "")  valid[1] = true

				if(this.status != "" && this.status == data.status) valid[2] = true
				else if (this.status == "") valid[2] = true

				// console.log(`${data.fname} ${data.lname}`, valid[0] && valid[1] && valid[2])

				if(valid[0] && valid[1] && valid[2]){
					this.list.push(rawData[x])
					// console.log(data.fname+" "+data.lname, rawData[x].id)
				} 

				if(this.list.length >= 10) {
					if(addPageRef ) this.pagesRefs.push(rawData[x]);
					
					break; 
				} 
									
			}

			// console.log(this.list.length, this.ref.id)
			if(this.list.length < 10) this.getList();

		
		},
		async getMore() {
			let newPage = this.pages[this.pages.length - 1] + 1
			this.pages.push(newPage)
			this.page = newPage
			this.list = []
			this.ref = this.pagesRefs[this.pagesRefs.length - 1]

			this.changeURL()

			this.getList();

			// console.log(this.pagesRefs.length, this.pages.length)
		},
		async goToPage(page) {
			
			let index = this.pages.indexOf(page)
			this.page = page
			this.list = []
			if(page == 1) this.ref = null;
			else this.ref = this.pagesRefs[index]
			this.getList(false)
		

			this.changeURL()
			// console.log(this.pagesRefs.length, this.pages.length)
		},
		async getPerson(id) {

			let person = await DB.read_id("persons", id)

			// console.log(person.exists)
			if(!person.exists) return false;

			this.person = {...person.data(), id: person.id}
			console.log(this.person)
			return true
			
		},
		async updatePerson(id) {
			await DB.update('persons', id, this.person)
			return;
		},
		async deletePerson(id) {
			// console.log( {...this.person, deleted: true})
			await DB.update('persons', id,{ deleted: true})
			this.list = []
			this.getList()
			return

		},
		async getSummary(value) {
			let field = null
			if(['male', 'female'].includes(value)) field = "gender"			
			else field = "status"
				
			// console.log(field, value)
			let result = await DB.read_specific("persons", field, value)

			

			let count = 0

			for( let i in result) {
				if(!result[i].data().deleted) count++
			}

			// console.log(count)
			this.summary[ value ] = count
		},
		async getTotal () {
			let total = await DB.count_all()
			let summaryTotal = 0
		
			for( let x in total) {
				// console.log(total[x].data().deleted)
				if(!total[x].data().deleted) summaryTotal++
			}
			// console.log(total.length, summaryTotal)
			this.summary.total = summaryTotal
		}

	}
})

export default listStore