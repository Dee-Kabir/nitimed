import { combineReducers, createStore } from 'redux';
import doctorReducer from "./doctorReducer";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from './userReducer';
const rootReducer = combineReducers({
  reducer : reducer,
  user: userReducer,
  doctor: doctorReducer
})
export const store = createStore(rootReducer,composeWithDevTools())
