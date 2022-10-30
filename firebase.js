

const firebaseConfig = {
    apiKey: "AIzaSyBdJY98uYYQ3p6-_MOGmBertTpWArSm5iU",
    authDomain: "vueperson-36d48.firebaseapp.com",
    projectId: "vueperson-36d48",
    storageBucket: "vueperson-36d48.appspot.com",
    messagingSenderId: "629835315666",
    appId: "1:629835315666:web:a82676e21f24499bcd700b"
  };

const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();


	let  AUTH = {
		authInfo: auth,
		login: (data) => {
			return new Promise(( resolve) => {
				auth.signInWithEmailAndPassword(data.email, data.password)
	            .then( credentials => { 
	            	resolve(credentials);
	            })
	            .catch( err => { 
	            	// console.log(err)
	            	resolve(err);
	            })
			})
		},
		currentUser: () => {
			return new Promise((resolve, reject) => {
				auth.onAuthStateChanged( resp => {
					// console.log(resp)
					resolve(resp)
				})
			})
		},
		logout: () => {
			return new Promise(resolve => {
				auth.signOut().then( () => resolve())
			})
		},
		 changePass: (password) => {
	        return new Promise(resolve => {
	        	let user = auth.currentUser;
	            user.updatePassword( password )
	            .then( () => { resolve(true) })
	            .catch(err => { resolve(false) })
	        })
	    },
		reAuthenticate: (email, password) => {
			return new Promise( resolve => {
				let user = auth.currentUser;
				let creds = firebase.auth.EmailAuthProvider.credential(
					email, password
				)

				user.reauthenticateWithCredential(creds)
				.then( resp => {
					resolve(resp)
				}).catch(err => {
					console.log(err)
					resolve(false)
				}) 
			})
		}
	}
	
	let DB = {
		read_id: (table, id) => {
        	return new Promise( resolve => {
	            firestore
	            .collection(table)
	            .doc(id)
	            .get()
	            .then( resp => resolve(resp))
	            .catch( err => resolve({error: err}));
        	});
    	},
    	update: async (table, id, data) => {
	        return await 
	            firestore
	            .collection(table)
	            .doc(id).update(data);
	    },
	}
	


export  { AUTH, DB }