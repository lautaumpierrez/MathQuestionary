<template>
	<div id="medals">
		<div class="box has-text-black">
			<p class="title has-text-black is-3 has-text-weight-light">
				Your Achievements
			</p>
			<hr>
			<div class="achievements">
				<span class="icon fas is-large fa-3x" v-for="ratingItem in user.medallas">
					<i class="fas is-large fa-trophy won"></i>
				</span>
				<span class="icon fas is-large fa-3x" v-for="ratingItem in restoRatingItem">
					<i class="fas is-large fa-trophy disabled"></i>
				</span>
			</div>
			<hr>
			<strong>{{ valor+'%' }}</strong>
			<progress class="progress is-success" :value="valor" max="100">{{ valor+'%' }}</progress>
		</div>
	</div>
</template>
<script>
	export default{
		mounted()
		{
			this.getMedallsAchievements();
		},
		data:()=>({
			
			valor: 0,
			questions:10,
		}),
		methods:{
			getMedallsAchievements()
			{
				var valor = this.user.medallas * 100;
				valor /= this.questions;
				this.valor = valor;
			},
			
		},
		computed:{
			user()
			{
				return this.$store.getters.getUserInfo;
			},
			restoRatingItem()
			{
				return  this.questions - this.user.medallas;
			}
		}
	}
</script>
<style>
.achievements span{
	margin-left: 20px;
	margin-top: 10px;
}
.achievements i.disabled,span.disabled{
	color: rgb(160,160,160) !important;
}
.achievements i.won,span.won
{
	transition: all 0.3s !important;
	color: #f1c40f !important;
	cursor: pointer !important;
}
.achievements i.won:hover,span.won:hover{
	transition: all 0.3s !important;
	transform: scale(1.1) rotate(10deg);
}
</style>