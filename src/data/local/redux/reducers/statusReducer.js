import { STATUSTRUE } from "../constants/reduxConstants";

const initialState = {
  status: false,
};

const statusReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STATUSTRUE:
      return {
        ...state,
        status: payload,
      };
    default:
      return state;
  }
};

export default statusReducer;
