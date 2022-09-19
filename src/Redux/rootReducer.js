//create the root reducers which is the colletion of the child reducers
//here we have to import the module combineReducers

import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
  cartReducer: cartReducer,
});

export default rootReducer;
