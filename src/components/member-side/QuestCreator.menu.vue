<template>
	<div>
		<aside class="menu has-background-danger menu-lateral-mathquestionary-questcreator">
			<ul class="menu-list">
				<li><a @click="goTo({path:'/member/questcreator'})">Dashboard</a></li>
			    <li><a @click="goTo({path:'/member/questcreator/create'})">New question</a></li>
			    <li><a @click="goTo({path:'/member/questcreator/manager'})">Questions manager</a></li>
			    <li><a @click="goTo({path:'/member'})">Go back!</a></li>
			</ul>
		</aside>
	</div>
</template>
<script>
	export default{
		methods:{
			goTo(param)
			{
				this.$router.push(param);
			}
		}
	}
</script>
