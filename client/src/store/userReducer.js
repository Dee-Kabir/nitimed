import Actions from "./actions";

const intialState = {
    user : {},
    mobileRegister : ""
}

const userReducer = (state = intialState,action) => {
    switch(action.type){
        case Actions.SET_USER_LOGGED_IN:
            return{
                ...state,
                user : action.user
            }
        case Actions.SET_USER_MOBILE_NUMBER:
            return{
                ...state,
                mobileRegister: action.mobileNumber
            }
        default:
            return{
                ...state
            }
    }
}
export default userReducer;