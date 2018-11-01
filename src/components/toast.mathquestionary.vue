<template>
	<div>
		<div  class="notification animated" v-show="active" :class="[out ? apply.outclass : apply.inclass, color]">
		  <button v-if="buttonclose" class="delete" @click="closeToast()"></button>
		  <slot name="content"></slot>
		</div>
	</div>
</template>
<script>
	export default{
		props:['color','timeout','buttonclose','outclass','inclass','waittoshow'],
		mounted()
		{
			if(this.color== null)
			{
				this.color = 'is-primary'
			}
			if(this.inclass == null || this.outclass == null)
			{
				this.apply.outclass = 'animated fadeOut faster';
				this.apply.inclass = 'animated fadeIn faster';
			}else{
				this.apply.outclass = this.outclass;
				this.apply.inclass = this.inclass;
			}
			// variable to show the first time
			var waitSeconds = 0;
			if(this.waittoshow == null) {
				 waitSeconds = 3000;
			}else{
				waitSeconds = this.waittoshow;
			}
			setTimeout(()=>this.openNotification(),waitSeconds);
			setTimeout(()=>this.closeToast(),this.timeout);
		},

		data:()=>({
			out: false,
			active: false,
			apply:{
				outclass: '',
				inclass:'',
			}
		}),
		methods:{
			openNotification()
			{
				if(!this.out)
				{
					this.active = true;
				}
			},
			closeToast()
			{
				this.out = true;
				var thisObj = this;
				setTimeout(()=> {
					thisObj.active = false;
				},750);
			}
		}
	}
</script>
<style>
	
</style>
