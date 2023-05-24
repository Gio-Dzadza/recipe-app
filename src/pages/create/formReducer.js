export const INITIAL_STATE = {
    title:'',
    method:'',
    cookingTime:''
    // ingredients:[]
};

export const formReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_INPUT':
            return{ 
                ...state,
                [action.payload.name]:action.payload.value
            };
        default:
            return state;
    }
}

