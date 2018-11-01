<template>
	<div>
		<div class="hero is-fullheight hero-mathquestionary-polka-points is-danger is-bold">
			<navbar></navbar>
			<div class="hero-body">
				<div class="container has-text-centered">
					<h2 class="title is-3 has-text-white">
						Acepta el reto !
					</h2>
					<a class="button is-white is-hidden-touch is-medium is-outlined" :class="playButton.clases" :disabled="!playButton.active" @click="play()">PLAY NOW</a>
					<a :class="playButton.clases" @click="play()" class="button is-danger is-medium is-hidden-desktop" :disabled="!playButton.active">
						PLAY NOW
					</a>
				</div>
			</div>
		</div>
		<div class="gameModal animated fadeInDown faster"  v-bind:class="[gameModal.active ? 'is-active' : '']">
		  <div>
		    <section class="hero" v-bind:class="[screen <= 1000 ? 'is-fullheight' : 'is-large']">
		    	<div class="hero-body">
			    	<div class="container">
				     <div class="box" v-bind:class="userSide['box-styling']">
				     	<form>
				     		<p v-bind:class="[userSide['box-styling'] == 'has-background-warning' ? 'has-text-grey-dark' : 'has-text-white', userSide['box-styling'] == 'has-background-white' ? 'has-text-grey-dark' : '']" class="title is-3 has-text-centered">
				     			¿{{ gameModal.information.question.text }}?
				     		</p>
				     		<div class="buttoncounter" v-if="userSide.counter > 0">
				     			<a class="button is-medium is-fullwidth has-text-centered is-static">You have {{ userSide.counter }}s</a>
				     			<br><br>
				     		</div>
					     	<article style="cursor: pointer;"  class="media manager-questions-question has-background-white" v-for="(answer,index) in gameModal.information.question.answers" @click="setCorrect(index)" v-bind:class="[userSide.correct == index ? userSide.classToSelected : '',realCorrect == index ? 'has-background-success':'']" :key="index">
							    <div class="media-content">
							      <div class="content">
							        <p>
										<input v-if="!userSide.finished" type="radio"  v-model="userSide.correct" :value="index" name="correct">
							        	<strong v-bind:class="[userSide.correct == index ? 'has-text-white' : '',realCorrect == index ? 'has-text-white' : '']">{{ answer.text }}</strong>
							        </p>
							      </div>
							    </div>
							</article>
						</form>
						<br>
						<p class="subtitle has-text-centered">
							<span class="has-text-grey-dark" v-if="userSide['box-styling'] == 'has-background-warning'">
								You lost...
							</span>
							<span class="has-text-white" v-if="userSide['box-styling'] == 'has-background-primary'">
								You win
							</span>
						</p>
						<center>
							<a class="button is-success is-medium" v-if="userSide.finished" @click="closeGameModal()">
								Play again...
							</a>
						</center>
				     </div>
				 </div>
				</div>
		    </section>
		  </div>
		</div>
	</div>
</template>
<script>
	import navbar from '@/components/member-side/navbar';
	import '@/assets/css/MathQuestionary.member.css';
	import wrongSound from '@/assets/audio/wrong-sound.wav';
	import winSound from '@/assets/audio/win-sound.wav';
	import {db} from '@/main';
	export default{
		components:{navbar},
		mounted(){
			var thisObj =this;
			db.collection('questions').get().then(function(querySnapshot) {
			    querySnapshot.forEach(function(doc) {
			    	thisObj.questions.push(doc.data());
			    });
			    thisObj.playButton.active = true;
			});
			this.wrongAudio=new Audio();
			this.wrongAudio.src = wrongSound;
			this.winAudio=new Audio();
			this.winAudio.src = winSound;
			this.screen = window.innerWidth;
		},
		data:()=>({
			screen: 1366,		
			playButton:{
				clases: '',
				active: false,
			},
			userSide:{
				correct: 6,
				finished:false,
				classToSelected: 'has-background-info',
				counter:10,
				intervaler: null,
				'box-styling':'has-background-white',
			},
			wrongAudio: null,
			winAudio: null,
			realCorrect:6,
			// ARRAY OF OBJECTS ( QUESTIONS IN FIREBASE )
			questions:[]
		}),
		methods:{
			closeGameModal()
			{
				this.$store.commit('setGameModalInformation',{
					text:'',
					answers:[]
				});
				this.resetAll();
				this.$store.commit('setGameModalState',false);
			},
			resetAll(){
				this.userSide = {
					correct: 6,
					finished:false,
					classToSelected: 'has-background-info',
					counter:10,
					intervaler: null,
					'box-styling':'has-background-white',
				};
				this.realCorrect = 6;
			},
			play()
			{
				if(this.playButton.active){
					this.playButton.clases = 'is-loading';
					var thisObj = this;
					setTimeout(()=> {
						if(thisObj.questions.length > 0){
							thisObj.$store.commit('setGameModalState', true);
							var index = Math.floor((Math.random() * thisObj.questions.length));
							var question = thisObj.questions[index];
							thisObj.$store.commit('setGameModalInformation',{
								text: question.text,
								answers: question.answers
							});
							thisObj.startTheGame();
							console.log(JSON.stringify(thisObj.gameModal));
						}else{
							thisObj.$toasted.info('Lo sentimos, no hay preguntas disponibles.', { 
								theme: "primary", 
								position: "bottom-right", 
								duration : 2500
							});
						}
						thisObj.playButton.clases =''
					},1000)
				}

			},
			verifyResponse()
			{
				this.userSide.finished = true;
				clearInterval(this.userSide.intervaler);
				if(this.userSide.correct != 6){
					if(!this.gameModal.information.question.answers[this.userSide.correct].correct){
						this.wrongAudio.play();
						var correctIndex = 6;
						this.gameModal.information.question.answers.forEach((item,i)=>{
							if(item.correct)
								correctIndex = i;
						});
						this.realCorrect = correctIndex;
						this.userSide.classToSelected = 'has-background-danger';
						this.userSide['box-styling'] = 'has-background-warning';
					}else if(this.gameModal.information.question.answers[this.userSide.correct].correct){
						this.winAudio.play();
						this.realCorrect = this.userSide.correct;
						this.userSide['box-styling'] = 'has-background-primary';
					}
				}else{
					var correctIndex = 6;
					this.wrongAudio.play();	
					this.userSide['box-styling'] = 'has-background-warning';
					this.gameModal.information.question.answers.forEach((item,i)=>{
						if(item.correct)
							correctIndex = i;
					});
					this.realCorrect = correctIndex;
				}

			},
			startTheGame()
			{
				this.userSide.intervaler = setInterval(()=>{
					if(this.userSide.counter == 1)
					{
						this.userSide.counter -= 1;
						this.verifyResponse()
					}
					this.userSide.counter -= 1;
				},1000);
			},
			youLost()
			{
			},
			setCorrect(index){
				if(!this.userSide.finished){
					this.userSide.correct =index;
					console.log(index);
				}

			}
		},
		computed:{
			gameModal()
			{
				return this.$store.getters.getModalState;
			}
		}
	}
</script>
<style>
	.hero-mathquestionary-polka-points{
		background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E") !important;
	}

</style>