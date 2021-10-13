import Actions from "./actions";

const intialState = {
    selectedDoctor : ""
}

const doctorReducer = (state = intialState,action) => {
    switch(action.type){
        case Actions.SET_SELECTED_DOCTOR:
            return{
                ...state,
                selectedDoctor : action.doctor
            }
        default:
            return{
                ...state
            }
    }
}
export default doctorReducer;