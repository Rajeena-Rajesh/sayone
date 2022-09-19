//to get compose enhancers in store

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const composeEnhancers = composeWithDevTools({});

const initialStore = {
  cartReducer: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? [],
  },
};
export const store = createStore(rootReducer, initialStore, composeEnhancers());
//now we have to attach the store to our application to access the reducer across the apllication
