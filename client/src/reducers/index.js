import { combineReducers } from "redux";
import bookReducer from "./bookReducer.js";
import authReducer from "./authReducer.js";
import errorReducer from "./errorReducer.js";

export default combineReducers({
  book: bookReducer,
  auth: authReducer,
  error: errorReducer
});
