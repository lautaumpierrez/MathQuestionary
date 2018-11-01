export default{
	state:{
		gameModal:{
			active: false,
			information:{
				question:{
					text:'',
					answers:[]
				}
			}
		}
	},
	getters:{
		getModalState(state)
		{
			return state.gameModal;
		}
	},
	mutations:{
		setGameModalInformation(state, value)
		{
			state.gameModal.information.question = value;
		},
		setGameModalState(state,value)
		{
			state.gameModal.active = value;
		}

	}
}