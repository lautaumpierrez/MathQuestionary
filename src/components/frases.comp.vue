<template>
	<div>
		<br>
		<div class="box has-text-centered frases-comp">
			<h2 class="title is-3 has-text-weight-light has-text-dark">
				Motivate aprendiendo...
				<button class="button icon-only reload-frase" @click="reload()">
					<i class="fas fa-sync-alt" v-bind:class="[reloading ? 'fa-pulse' : '']"></i>
				</button>
			</h2>
			<div class="content">
				<blockquote>
					<p>
						<cite>“ {{ frase.text }} ”</cite> 
					</p>
					<footer>
						<span class="has-text-weight-bold">{{ frase.author }}</span>
					</footer>
				</blockquote>
			</div>
		</div>
		<br>
	</div>
</template>
<script>
	
	import {motivacionales} from '@/data/frases.data.js';
	export default{
		mounted()
		{
			this.loadSentence();
		},
		data:()=>({
			frase:{},
			reloading:false,
			frases: motivacionales
		}),
		methods:{
			reload(){
				this.frase= {text:'',author: ''};
				this.reloading = true;
				setTimeout(()=>this.loadSentence(),1500);
			},
			loadSentence()
			{
				var index = Math.floor((Math.random() * this.frases.length));
				this.frase = this.frases[index];
				this.reloading = false;

			}
		}
	}
</script>
<style>
	.button.reload-frase
	{
		float: right !important;
	}
</style>