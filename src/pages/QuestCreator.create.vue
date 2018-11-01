<template>
	<div>
		<div class="box">
			<div class="tabs is-toggle is-fullwidth">
			  <ul>
			    <li>
			      <a @click="finish()">
			        <span class="icon is-small"><i class="fas fa-share-square" aria-hidden="true"></i></span>
			        <span>Create Question</span>
			      </a>
			    </li>
			    <li>
			      <a>
			        <span class="icon is-small"><i class="fas fa-ban" aria-hidden="true"></i></span>
			        <span>Cancel creation</span>
			      </a>
			    </li>
			    <li>
			      <a @click="openModal()">
			        <span class="icon is-small"><i class="fas fa-plus-square" aria-hidden="true"></i></span>
			        <span>Add answer</span>
			      </a>
			    </li>
			  </ul>
			</div>
			<div class="field has-addons">
			  <p class="control">
			    <a class="button is-static is-medium">
			      ¿
			    </a>
			  </p>
			  <p class="control is-expanded">
			    <input class="input is-medium" v-model="question.text" type="text" placeholder="Question">
			  </p>
			  <p class="control">
			    <a class="button is-static is-medium">
			      ?
			    </a>
			  </p>
			</div>
			<div class="possible-answers">
				<div class="response" v-for="(answer,index) in question.answers" :key="index">
					<article class="media possiblesanswers has-backrgound-light has-shadow"	@click="setCorrect(index)" v-bind:class="[answer.correct ? 'has-background-info':'']">
					    <div class="media-content">
					      <div class="content">
					        <p>
					         	<strong v-bind:class="[answer.correct ? 'has-text-white' : '']">{{ answer.text }}</strong>
					        </p>
					      </div>
					      <nav class="level is-mobile">
					        <div class="level-left">
					          <a class="level-item is-right" @click="removeAnswer(index)" aria-label="reply">
					            <span v-bind:class="[answer.correct ? 'has-text-white' : 'has-text-danger']" class="icon is-small">
					              <i class="fas fa-trash-alt" aria-hidden="true"></i>
					            </span>
					          </a>
					        </div>
					      </nav>
					    </div>
					</article>
				</div>
			</div>
		</div>
		<!-- MODAL TO CREATE ANSWER -->
		<div class="modal" v-bind:class="[modalAnswer.active ? 'is-active' : '']">
		  <div class="modal-background" @click="modalAnswer.active = false"></div>
		  <div class="modal-card">
		    <header class="modal-card-head">
		      <p class="modal-card-title">
		      	Añadir una respuesta.
		      </p>
		      <button class="delete" aria-label="close" @click="modalAnswer.active = false"></button>
		    </header>
		    <section class="modal-card-body">
		    	<textarea class="textarea" v-model="answer.text" placeholder="Your answer"></textarea>
		    </section>
		    <footer class="modal-card-foot">

		      <button class="button is-fullwidth is-success" @click="addAnswer()">
		      	Save answer
		      </button>
		    </footer>
		  </div>
		</div>
	</div>
</template>
<script>
	import {db} from '@/main';
	import wrongAudio from '@/assets/audio/wrong-sound.wav';
	export default{
		mounted(){
			this.audios.wrong = new Audio();
			this.audios.wrong.src= wrongAudio;
		},
		data:()=>({
			audios:{
				wrong: null,
			},
			answer:{
				text:'',
				correct: false,
			},
			question:{
				text:'',
				answers:[]
			},
			modalAnswer:{
				active: false,
			}
		}),
		methods:{
			addAnswer()
			{
				if(this.question.answers.length < 5){
					this.question.answers.push(this.answer);
					this.modalAnswer.active = false;
					this.answer ={
						text:'',
						correct: false,
					};
				}else{
					this.modalAnswer.active = false;
					this.answer ={
						text:'',
						correct: false,
					};
				}
			},
			openModal()
			{
				if(this.question.answers.length < 5){
					this.modalAnswer.active = true;
				}else{
					this.$toasted.error('Has creado el máximo permitido de respuestas.', { 
						theme: "primary", 
						position: "bottom-right", 
						duration : 5000
					});
				}
			},
			removeAnswer(i)
			{
				this.question.answers.splice(i,1);
			},
			finish()
			{
				var correctSelected  = false;
				this.question.answers.forEach((item)=>{
					if(item.correct)
					{
						correctSelected = true;
					}
				});
				if(correctSelected)
				{
					db.collection('questions').add(this.question).then(()=>{
						this.question ={ text:'', answers:[]};
					});	
				}else{
					
					this.audios.wrong.play();
					alert("Debes seleccionar una respuesta correcta dandole click a una de las que has escrito.");
				}
				
			},
			setCorrect(index){
				this.question.answers.forEach((item)=>{
					item.correct = false;
				});
				this.question.answers[index].correct = true;

			}
		}
	}
</script>