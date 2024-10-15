import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";

import statusReducer from "./statusReducer";
import clientReducer from "./ClientReducer";

const rootReducer = combineReducers({
  AuthReducer,
  statusReducer,
  clientReducer,
});

export default rootReducer;
