<template>
	<div>
		<nav class="navbar is-transparnet navbar-member-mathquestionary">
			<div class="navbar-brand">
			    <a class="navbar-item" href="">
			      <span class="title is-4 has-text-weight-normal">MathQuestionary</span>
			    </a>

			    <a role="button"  @click="toggleMenu()" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
			      <span aria-hidden="true"></span>
			      <span aria-hidden="true"></span>
			      <span aria-hidden="true"></span>
			    </a>
			</div>
			<div class="navbar-menu is-hidden-touch">
				<div class="navbar-end">
					<a class="navbar-item open-menu-desktop" @click="toggleMenu()">
						<i class="fas fa-bars icon is-large"></i>
					</a>
				</div>
			</div>
		</nav>
		<div class="menu-mathquestionary" :class="clases" v-show="active">
			<div class="close-button" @click="toggleMenu()">
				<i class="fas fa-times-circle"></i>
			</div>
			<section class="hero is-fullheight is-light">
				<div class="hero-body ">
					<div class="container has-text-centered ">
						<center>
							<div class="box is-hidden-touch">
								<figure class="image user-image-mathquestionary">
								  <img class="is-rounded" :src="user.photoURL">
								</figure>
								<hr>
								<h2 class="title has-text-black is-4 has-text-weight-light"> {{ user.name }}</h2>
								<h2 class="title has-text-black is-5 has-text-weight-light"> {{ user.email }}</h2>
								<div class="tabs is-centered is-boxed">
								  <ul>
								  	<li>
								      <a @click="goTo({path:'/member'})">
								        <span class="icon is-small">
								        	<i class="fas fa-gamepad"></i>
								    	</span>
								        <span>Play</span>
								      </a>
								    </li>
								    <li>
								      <a @click="scrollMeTo('medals')">
								        <span class="icon is-small"><i class="fas fa-medal"></i></span>
								        <span>Medallas</span>
								      </a>
								    </li>
								    <li>
								      <a @click="goTo({name:'ChatPage'})">
								        <span class="icon is-small">
								        	<i class="fas fa-comments"></i>
								    	</span>
								        <span>Chat</span>
								      </a>
								    </li>
								    
								    <li>
								      <a>
								        <span class="icon is-small">
								        	<i class="fas fa-angle-double-up"></i>
								    	</span>
								        <span>Ranking</span>
								      </a>
								    </li>
								    <li>
								      <a @click="goTo({name:'ChartPage'})">
								        <span class="icon is-small">
								        	<i class="fas fa-chart-pie"></i>
								    	</span>
								        <span>Gráfica</span>
								      </a>
								    </li>
								    <li v-if="user.admin" @click="goTo({path:'/member/questcreator'})">
								      <a>
								        <span class="icon is-small">
								        	<i class="fas fa-question"></i>
								    	</span>
								        <span>QuestCreator</span>
								      </a>
								    </li>
								    <li>
								      <a @click="signOut()">
								        <span class="icon is-small">
								        	<i class="fas fa-sign-out-alt" aria-hidden="true"></i>
								    	</span>
								        <span>SignOut</span>
								      </a>
								    </li>
								  </ul>
								</div>
							</div>
							<!-- MOBILE -->
							<div class="profile-card-mathquestionary card is-hidden-desktop">
							  <div class="card-image">
							    <figure class="image is-4by3">
							      <img :src="user.photoURL" :alt="user.name+' PHOTO '">
							    </figure>
							  </div>
							  <div class="card-content">
							    <div class="media">
							      <div class="media-content">
							        <p class="title is-4 has-text-black">{{ user.name }}</p>
							        <p class="subtitle is-6 has-text-black">{{ user.email }}</p>
							      </div>
							    </div>

							    <div class="content">
									<div class="tabs is-centered is-boxed">
									  <ul class="columns is-multiline">
									  	<li class="column is-6">
									      <a @click="[goTo({path:'/member'}),toggleMenu()]">
									        <span class="icon is-small">
									        	<i class="fas fa-gamepad"></i>
									    	</span>
									        <span>Play</span>
									      </a>
									    </li>
									    <li class="is-active column is-6">
									      <a href="#medals">
									        <span class="icon is-small"><i class="fas fa-medal"></i></span>
									        <span>Medallas</span>
									      </a>
									    </li>
									    <li class="column is-6">
									      <a @click="goTo({name:'ChatPage'})">
									        <span class="icon is-small">
									        	<i class="fas fa-comments"></i>
									    	</span>
									        <span>Chat</span>
									      </a>
									    </li>
									    <br>
									    <li class="column is-6">
									      <a>
									        <span class="icon is-small">
									        	<i class="fas fa-angle-double-up"></i>
									    	</span>
									        <span>Ranking</span>
									      </a>
									    </li>
									    <li class="column is-6">
									      <a @click="goTo({name:'ChartPage'})">
									        <span class="icon is-small">
									        	<i class="fas fa-chart-pie"></i>
									    	</span>
									        <span>Gráfica</span>
									      </a>
									    </li>
									    <li v-if="user.admin" @click="goTo({path:'/member/questcreator'})" class="column is-6">
									      <a>
									        <span class="icon is-small">
									        	<i class="fas fa-question"></i>
									    	</span>
									        <span>QuestCreator</span>
									      </a>
									    </li>
									    <li class="column is-6">
									      <a @click="signOut()">
									        <span class="icon is-small">
									        	<i class="fas fa-sign-out-alt" aria-hidden="true"></i>
									    	</span>
									        <span>SignOut</span>
									      </a>
									    </li>
									  </ul>
									</div>
							    </div>
							  </div>
							</div>
							<!-- medals component -->
							<medals></medals>
							<!-- sentences component -->
							<sentences></sentences>
						</center>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
<script>
	import medals from './medals';
	import sentences from '../frases.comp';
	export default{
		components:{medals,sentences},
		mounted()
		{
			console.log(this.$store.getters.getUserInfo);
			document.querySelector('html').style['overflow-y'] = 'hidden';
		},
		data:()=>({
			active:false,
			clases: 'animated fadeInUp faster'
		}),
		methods:{
			scrollMeTo(name) {
				var element = document.getElementById(name);
				var top = element.offsetTop;
				document.querySelector('.menu-mathquestionary').scrollTo(0, top);
			},
			toggleMenu()
			{
				if(this.active){
					this.clases = 'animated fadeOutDown faster';
					var thisObj = this;
					setTimeout(()=>{
						thisObj.active = false;
						thisObj.clases ='animated fadeInUp faster';
					},500);
				}else{
					this.active = true;
				}
			},
			signOut()
			{
				var thisObj = this;
				this.$store.dispatch('firebaseLogOut').then(()=>{
					thisObj.$router.push({path:'/'});
				});
			},
			goTo(param)
			{
				this.toggleMenu();
				this.$router.push(param);
			}
		},
		computed:{
			user()
			{
				return this.$store.getters.getUserInfo;
			}
		}
	}
</script>
<style>

	/* Background pattern from Toptal Subtle Patterns */
	.menu-mathquestionary .hero{
		background-repeat: repeat !important;
		background-image: url('../../assets/images/tic-tac-toe.png') !important;
	}
	.menu-mathquestionary{
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		overflow-y: scroll !important;
		z-index: 200;
		width: 100%;

		scroll-behavior: smooth !important;

	}
	.menu-mathquestionary .close-button{
		position: fixed !important;
		z-index: 201;
		top: 12px;	
		right: 20px;
		cursor: pointer !important;
	}
	.menu-mathquestionary .close-button i{
		color: rgb(160,160,160) !important;
		font-size: 30px;
	}
	.open-menu-desktop{
		font-size: 25px;
	}
	.navbar-member-mathquestionary{

	}
	.user-image-mathquestionary{
		width: 250px;
		height: 250px;
	}
	.profile-card-mathquestionary{
		border-radius: 10px;
	}
	.profile-card-mathquestionary .card-image img{
		border-radius: 10px;
	}
	@media screen and (max-width: 768px){
		.user-image-mathquestionary{
			width: 140px;
			height: 140px;
		}
		.box{
			width: 100% !important;
		}
	}
</style>