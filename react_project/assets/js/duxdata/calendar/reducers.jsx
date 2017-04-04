export default function calendar(state = {}, action){
	switch(action.type) {
		case 'TOGGLE':             
			return Object.assign(
					{}, 
					state, 
					{
						isOn: action.isTrue
					}
				);  		          
		default:
			return state;
	}
}
