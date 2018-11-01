<template>
	<div class="QuestCreator">
		<div class="columns">
			<lateral-menu class="animated faster slideInLeft column is-3"></lateral-menu>
			<transition name="fade" mode="out-in" appear>
				<router-view class="page column is-9"></router-view>
			</transition>
		</div>
	</div>
</template>
<script>
	import menu from '@/components/member-side/QuestCreator.menu.vue';
	import '@/assets/css/QuestCreator.css';
	export default{
		components:{'lateral-menu': menu},
		mounted()
		{
			if(window.innerWidth < 768)
				document.querySelector('html').style['overflow-y'] = 'visible';
			else
				document.querySelector('html').style['overflow-y'] = 'hidden';
			window.onresize = function()
			{
				if(window.innerWidth < 768)
					document.querySelector('html').style['overflow-y'] = 'visible';
				else
					document.querySelector('html').style['overflow-y'] = 'hidden';
			}
		}
	}
</script>
<style>
	.fade-enter-active, .fade-leave-active {
	  transition: opacity 0.3s
	}

	.fade-enter, .fade-leave-active {
	  opacity: 0
	}
</style>