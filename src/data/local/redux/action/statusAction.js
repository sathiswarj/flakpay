import { STATUSTRUE } from "../constants/reduxConstants";

export const statusAction = (payload) => {
  return {
    type: STATUSTRUE,
    payload: payload,
  };
};
