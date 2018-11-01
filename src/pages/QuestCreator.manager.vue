<template>
	<div>
		<div class="box">
			<div class="field">
			  <div class="control">
			    <input class="input is-medium" v-model="searcher" type="text" placeholder="Search questions">
			  </div>
			</div>
			<div class="create-quest-creator-scroller">
				<article class="media manager-questions-question has-backrgound-light" v-for="(question,index) in questionsSearched" :key="index">
				    <div class="media-content">
				      <div class="content">
				        <p>
				          <strong>{{ '¿ ' + question.text + ' ?' }}</strong>
				        </p>
				      </div>
				      <nav class="level is-mobile">
				        <div class="level-left">
				          <a class="level-item has-text-danger" @click="deleteQuestion(index,question.id)" aria-label="reply">
				            <span class="icon is-small">
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
</template>
<script>
	import {db} from '@/main';
	import firebase from 'firebase';	
	export default{
		mounted()
		{
			var thisObj = this;
			db.collection('questions').get().then((questions)=>{
				questions.forEach((doc)=>{
					thisObj.questions.push({
						posiblesanswers: doc.data().posiblesanswers,
						text: doc.data().text,
						id:doc.id
					});
				})
			})
		},
		data:()=>({
			questions:[],
			searcher:''
		}),
		methods:{
			deleteQuestion(index,id)
			{
				db.collection('questions').doc(id).delete().then(()=>{
					this.$toasted.success('Eliminado correctamente', { 
						theme: "primary", 
						position: "bottom-right", 
						duration : 5000
					});
				})
				this.questions.splice(index,1);
			}
		},
		computed:{
			questionsSearched()
			{
				if(this.questions.length > 0)
					return this.questions.filter((question) => question.text.toLowerCase().includes(this.searcher.toLowerCase()));
				else
					return [];
			}
		}
	}
</script>