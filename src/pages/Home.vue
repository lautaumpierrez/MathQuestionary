<template>
	<div>
		<navbar/>
		<signin-modal title="Select the method to authenticate" closebutton="true">
			<div slot="content">
				<center>
					<signin-google-button></signin-google-button>
				</center>
			</div>
		</signin-modal>
		<div class="hero is-fullheight is-link">
			<div class="hero-body">
				<div class="container has-text-centered has-text-white">
					<p class="title is-3">
						El mejor juego 
					</p>
					<toast color="is-danger" v-show="false" :timeout="10000" outclass="slower zoomOut" inclass="faster slideInDown" :buttonclose="true">
						<div slot="content">
							<h2>Hello world</h2>
						</div>
					</toast>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import signInGoogleButton from '@/components/signIn.google.vue';
	import signInModal from '@/components/signIn.modal.vue';
	import navbar from '@/components/navbar.vue';
	import toast from '@/components/toast.mathquestionary.vue';
	import firebase from 'firebase';
	import {db} from '@/main';
	export default{
		components:{toast,navbar,'signin-modal':signInModal,'signin-google-button' : signInGoogleButton},
		mounted()
		{
			var thisObj = this;
			firebase.auth().onAuthStateChanged(function(user) {
			  if (user) {
			    // User is signed in.
			    var displayName = user.displayName;
			    var email = user.email;
			    var emailVerified = user.emailVerified;
			    var photoURL = user.photoURL;
			    var isAnonymous = user.isAnonymous;
			    var uid = user.uid;
			    var providerData = user.providerData;
			    var userRef = db.collection('users').doc(uid);
			    var data = {};
			    userRef.get().then((user)=>{
			    	data = user.data();
					thisObj.$store.commit('setUser', data);
				    thisObj.$router.push('/member')
			    });
			  } else {
			    // User is signed out.
			    // ...
			  }
			});

		},
		methods:{
			openSignIn(){
				this.$store.commit('setModalState',{signIn: true,register:false});
			}
		}
	}
</script>
<style>
	
</style>