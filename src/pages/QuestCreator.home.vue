<template>
	<div>
		<section class="hero actions">
			<div class="hero-body has-text-centered">
				<div class="box">
					<div class="columns is-multiline">
						<div class="item-action-questcreator column is-4  tile">
							<div class="container has-text-centered">
								<a @click="goTo({path:'/member/questcreator/create'})" class="button-mathquestionary has-text-grey-dark only-text-or-icon">
									<span class="icon is-large">
										<i class="fas fa-plus fa-3x"></i>
									</span>
								</a>
							</div>
						</div>
						<div class="item-action-questcreator has- column is-4 has-text-centered tile">
							<div class="container has-text-centered">
								<a @click="goTo({path:'/member/questcreator/manager'})" class="button-mathquestionary has-text-grey-dark only-text-or-icon">
									<span class="icon is-large">
										<i class="fas fa-list-alt fa-3x"></i>
									</span>
								</a>
							</div>
						</div>
						<div class="item-action-questcreator has- column is-4 has-text-centered tile">
							<div class="container has-text-centered">
								<a class="button-mathquestionary has-text-grey-dark only-text-or-icon">
									<span class="icon is-large">
										<i class="fas fa-users fa-3x"></i>
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
				<frases-component></frases-component>
			</div>
		</section>
	</div>
</template>
<script>
	import frasesComp from '@/components/frases.comp';
	export default{
		components:{'frases-component':frasesComp},
		data:()=>({
			
		}),
		methods:{
			goTo(param)
			{
				this.$router.push(param);
			}
		}
	}
</script>