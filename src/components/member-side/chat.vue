<template>
	<div class="chat-box">
		<div class="chat-header"  @mouseleave="setShowMoreScroll('mouseleave-head')" @mouseover="setShowMoreScroll(true)">
			<div class="title-box">
				<p class="subtitle has-text-black is-4">
					<span class="has-text-weight-light">Global chat</span>
					<span class="tag is-info">beta</span>
				</p>
			</div>
		</div>
		<div class="show-scroll-box" @mouseover="showMoreScroll.hoveredBox = true" @mouseleave="setShowMoreScroll(false)" v-show="showMoreScroll.active">
			<center>
				<div class="button-container" v-bind:class="showMoreScroll.clases">
					<a class="button has-shadow is-rounded is-white" @click="reedOlderMessagesToggle()">
						<span v-if="!olderMessages">Show scroll...</span>
						<span v-else>Close scroll...</span>
					</a>
				</div>
			</center>
		</div>
		<div class="chat-messages">
			<ul>
				<div v-for="(message, index) in messages" :key="index">
					<li class="message-item animated fadeIn has-text-white" :class="[message.user.uid == user.uid ? 'me' : 'you']">
						<strong v-if="message.user.uid != user.uid">
							{{ message.user.name }}
						</strong>
						<strong v-else>Yo</strong>
						: {{ message.text }}
					</li>
				</div>
				
			</ul>
		</div>
		<div class="chat-send-box">
			<div class="field has-addons has-addons-centered">
			  <p class="control is-expanded">
			    <input @keyup.enter="sendMessage()" v-model="message.text" class="input" type="text" placeholder="YOUR MESSAGE">
			  </p>
			  <p class="control">
			    <a class="button is-link" @click="sendMessage()">
			      Send &nbsp;<i class="fas fa-paper-plane"></i>
			    </a>
			  </p>
			</div>
		</div>
	</div>
</template>
<script>
	import '../../assets/css/chat.css';
	import {db,realtimeDb} from '@/main';
	// LOGIC
	export default{
		mounted()
		{
			this.reedOlderMessagesToggle(false);
			realtimeDb.ref('messages').on('child_added',(message)=>{
				this.messages.push(message.val());
				if(!this.olderMessages){
					setTimeout(()=>{
						document.querySelector('.chat-messages').scrollTop += document.querySelector('.chat-messages').scrollHeight;
					},100);
				}
				if(this.messages.length >= 2000)
				{
					realtimeDb.ref('messages').remove();
					this.messages=[];
				}
			});
			
		},
		data:()=>({
			messages:[],
			message:{
				text: '',
				user:{
					name:'',
					email: '',
					photoURL:'',
					uid:'',
				}
			},
			showMoreScroll:{
				active:false,
				clases:'animated fadeIn faster',
				hoveredBox: false,

			},
			olderMessages:false,

		}),
		methods:{
			setShowMoreScroll(value)
			{
				var thisObj = this;
				if(!value)
				{
					this.showMoreScroll.clases = 'animated fadeOut faster';
					setTimeout(()=>{
						thisObj.showMoreScroll.active = false;
						thisObj.showMoreScroll.hoveredBox = false;
					},200);
				}else if(value){
					this.showMoreScroll.clases = 'animated fadeIn faster';
					this.showMoreScroll.active = true;
				}
				if(value == 'mouseleave-head'){
					setTimeout(function(){
						if(!thisObj.showMoreScroll.hoveredBox)
						{
							thisObj.showMoreScroll.clases = 'animated fadeOut faster';
							setTimeout(()=>{
								thisObj.showMoreScroll.active = false;
								thisObj.showMoreScroll.hoveredBox = false;
							},200);
						}
					},100);
				}
			},
			reedOlderMessagesToggle(context = null){
				if(context == null){
					if(this.olderMessages){
						document.querySelector('.chat-messages').style['overflow-y']='hidden';
						document.querySelector('.chat-messages').scrollTop += document.querySelector('.chat-messages').scrollHeight;
						setTimeout(()=>this.olderMessages = false,700);
					}else{
						document.querySelector('.chat-messages').style['overflow-y']='scroll';
						this.olderMessages = true;
						
					}
				}else{
					if(context){
						document.querySelector('.chat-messages').style['overflow-y']='scroll';
					}else{
						document.querySelector('.chat-messages').style['overflow-y']='hidden';
					}
				}
			},
			sendMessage()
			{
				this.message.user = {
					name: this.user.name,
					email: this.user.email,
					uid:this.user.uid,
					photoURL: this.user.photoURL
				};
				realtimeDb.ref('messages').push().set(this.message);
				this.message = {
					text: '',
					user:{
						name:'',
						email: '',
						uid:'',
					}
				};

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


</style>