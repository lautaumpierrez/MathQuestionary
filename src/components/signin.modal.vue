<template>
	<div>
		<div class="modal" :class="[modals.signIn ? 'is-active' : '']">
		  <div class="modal-background" :class="clases.modalbg" @click="closeModal()"></div>
		  <div class="modal-card" :class="clases.modalcard">
		    <header class="modal-card-head">
		      <p class="modal-card-title has-thin-text">{{ title }}</p>
		      <button class="delete" aria-label="close" v-if="closebutton" @click="closeModal()"></button>
		    </header>
		    <section class="modal-card-body has-background-light">
			    <div class="btn white darken-4 col s10 m4">
					<slot name="content">
						
					</slot>
				</div>
		    </section>
		    <footer class="modal-card-foot" style="border: 0px!important;">
		    	<slot name="footer"></slot>
		    </footer>
		  </div>
		</div>
	</div>
</template>
<script>
	export default{
		props:['title','closebutton'],
		data:()=>({
			clases:{
				modalcard:'animated fadeInDown',
				modalbg: 'animated fadeIn'
			}
		}),
		computed:{
			modals()
			{
				return this.$store.getters.getModalsState;
			}
		},
		methods:{
			closeModal()
			{
				var thisObj = this;
				this.clases.modalcard = 'animated fadeOutUp faster';
				setTimeout(()=>{
					thisObj.$store.commit('setModalState',{signIn: false,register:false});
					thisObj.clases.modalcard = 'animated fadeInDown'; 
				},500)

			}
		}
	}
</script>
<style>
	
</style>