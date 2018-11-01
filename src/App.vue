<template>
  <div id="app">
    <loader v-show="!loaded"></loader>
    <router-view v-show="loaded"/>
  </div>
</template>

<script>
import loader from './components/loader';
export default {
	name: 'App',
  components:{loader},
  mounted()
  {
    window.onload = this.pageLoaded();
    if(this.$route.name == 'Member'){
        document.querySelector('html').style['overflow-y'] = 'scroll';
    }
  },
  data:()=>({
    loaded : false,
  }),
  methods:{
    pageLoaded()
    {
      var thisObj = this;
      setTimeout(()=>{
        thisObj.loaded = true;
      },2000);
    }
  },
	watch:{
		'$route'(to,from)
		{
      if(to.name == 'Member'){
          document.querySelector('html, body').style['overflow-y'] = 'scroll';
      }
      console.log(to.name);

		}
	}
}
</script>

<style>
  body{
  }
  .button{
    transition: all 0.3s !important;
  }
  .button:hover{
    transition: all 0.3s !important;
  }

  .button.is-text
  {
  	text-decoration: none !important;
  }
</style>
