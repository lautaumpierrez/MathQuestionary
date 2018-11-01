import Vue from 'vue';
import Router from 'vue-router';

// GUEST PAGES
import HomePage from '@/pages/Home';

// MEMBER PAGES 
import MemberPage from '@/pages/Member';
import ChatPage from '@/pages/Chat';
import ChartPage from '@/pages/Chart';
// QuestCreator
import QuestCreator from '@/pages/QuestCreator';
import QuestCreatorPageCreate from '@/pages/QuestCreator.create';
import QuestCreatorPageHome from '@/pages/QuestCreator.home';
import QuestCreatorPageManager from '@/pages/QuestCreator.manager';
import {store} from '../store';

Vue.use(Router);

const beforeEnterGuest  = (to,from,next)=>{
	if(store.getters.logged){
		next({path:'/member'});
	}else{
		next();
	}
}

const beforeEnterMember  = (to,from,next)=>{
	if(!store.getters.logged){
		next({path:'/'});
	}else{
		next();
	}
}
const beforeEnterQuestCreator = (to,from,next)=>{
	if(store.getters.logged && store.getters.getUserInfo.admin)
	{
		next();
	}else{
		next({path:'/'});
	}
}

export default new Router({
	
  routes: [
    {
    	beforeEnter:(to,from,next)=>beforeEnterGuest(to,from,next),
		path: '/',
		name: 'Home',
		component: HomePage,
		meta:{Auth:false,title:'Home | MathQuestionary'}
    },
    {
    	beforeEnter:(to,from,next)=>beforeEnterMember(to,from,next),
		path: '/member',
		name: 'Member',
		component: MemberPage,
		meta:{Auth:false,title:'Member | MathQuestionary'}
    },
    {
    	beforeEnter:(to,from,next)=>beforeEnterMember(to,from,next),
    	path:'/member/chat',
    	name:'ChatPage',
    	component: ChatPage,
    	meta:{title: 'Chat | MathQuestionary'}
    },
    {
        beforeEnter:(to,from,next)=>beforeEnterMember(to,from,next),
        path:'/member/chart',
        name:'ChartPage',
        component: ChartPage,
        meta:{title: 'Chart | MathQuestionary'}
    },
    {
    	beforeEnter:(to,from,next)=>beforeEnterQuestCreator(to,from,next),
    	path:'/member/questcreator',
    	component: QuestCreator,
    	children:[
    		{
    			path: '',
    			name:'QuestCreatorPage',
    			component: QuestCreatorPageHome,
                meta:{title:'QuestCreator | MathQuestionary'}
    		},
            {
                path: 'create',
                name:'QuestCreatorPageCreate',
                component: QuestCreatorPageCreate,
                meta:{title:'QuestCreator | MathQuestionary'}
            },
            {
                path: 'manager',
                name:'QuestCreatorPageManager',
                component: QuestCreatorPageManager,
                meta:{title:'QuestCreator | MathQuestionary'}
            },

    	]
    }
  ]
})
