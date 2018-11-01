import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import authModule from './modules/auth';
import gameModalModule from './modules/gameModal';
export const store = new Vuex.Store({
	state:{
		modals:{
			signIn:false,
		}
	},
	getters:{
		getModalsState(state)
		{
			return state.modals
		}
	},
	mutations:{
		setModalState(state,obj)
		{
			state.modals = obj;
		}
	},
	modules:{
		authModule,
		gameModalModule,
	}
});
