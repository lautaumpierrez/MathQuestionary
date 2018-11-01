import firebase from 'firebase';

export default {
	state:{
		user:{
			name: '',
			email:'', 
			photoURL:'',
			uid:'',
			medallas:0
		},
		role: 'guest',
		logged: false,
	},
	actions:{
		firebaseSignInGoogle({commit})
		{
			var provider = new firebase.auth.GoogleAuthProvider();
			return firebase.auth().signInWithPopup(provider);
		},
		firebaseLogOut({commit})
		{
			commit('setUser',null);
			return firebase.auth().signOut();
			
		}
	},
	mutations:{
		setUser(state,user)
		{
			if(user != null)
			{
				state.user = user;
				console.log('saved:',JSON.stringify(user));
				state.logged = true;
			}else{
				console.log('saved:',JSON.stringify(user));
				state.user = { name: '',email:'', photoURL:'',uid:'',medallas:0};
				state.logged = false;
			}
		}
	},
	getters:{
		logged(state)
		{
			return state.logged;
		},
		getUserInfo(state)
		{
			return state.user;
		}
	}
}