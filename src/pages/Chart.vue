<template>
	<div>
		<nav class="navbar is-info">
			<div class="navbar-brand">
				<a class="navbar-item" @click="goBack()">
					<i class="fas fa-arrow-left"></i>&nbsp;
					GO BACK
				</a>
			</div>
		</nav>
		<br>
		<chart :data="{}" :options="{}"></chart>	
	</div>
</template>
<script>
	import chartComp from '@/components/member-side/chart';	
	export default{
		mounted(){
			/*this.datacollection = {
	          labels: [this.getRandomInt(), this.getRandomInt()],
	          datasets: [
	            {
	              label: 'Data One',
	              backgroundColor: '#f87979',
	              data: [this.getRandomInt(), this.getRandomInt()]
	            }, {
	              label: 'Data One',
	              backgroundColor: '#f87979',
	              data: [this.getRandomInt(), this.getRandomInt()]
	            }
	          ]
	        }*/
		},
		components:{'chart':chartComp},
		data:()=>({
			chartData:null,
			chartOptions:null,
		}),
		methods:{
			goBack(){
				this.$router.go(-1);
			}
		}
	}
</script>