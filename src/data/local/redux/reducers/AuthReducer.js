import { ISAUTHENTICATED, ROLE } from "../constants/reduxConstants";

const initialState = {
  isAuthenticated: false,
  role: "Admin",
};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ISAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case ROLE:
      return {
        ...state,
        role: payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
