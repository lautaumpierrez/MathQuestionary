<template>
	<div>
		<nav class="navbar is-white">
			<div class="navbar-brand">
			    <a class="navbar-item" href="">
			      MathQuestionary
			    </a>

			    <a role="button" :class="[active ? 'is-active' : '']" @click="toggleMenu()" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
			      <span aria-hidden="true"></span>
			      <span aria-hidden="true"></span>
			      <span aria-hidden="true"></span>
			    </a>
			</div>
			<div class="navbar-menu" :class="[active ? 'is-active' : '']">
				<div class="navbar-end">
					<a class="navbar-item">Home</a>
					<a class="navbar-item" @click="openSignIn()">Sign In</a>
				</div>
			</div>
		</nav>
	</div>
</template>
<script>
	export default{
		mounted()
		{

		},
		data:()=>({
			active:false,
			scrollPosition: 0
		}),
		methods:{
			toggleMenu()
			{
				this.active = !this.active
			},
			openSignIn(){
				this.$store.commit('setModalState',{signIn: true,register:false});
			}
		}
	}
</script>
<style>
	
</style>