import { ISAUTHENTICATED, ROLE } from "../constants/reduxConstants";

export const authAction = (payload) => {
  return {
    type: ISAUTHENTICATED,
    payload: payload,
  };
};

export const roleAction = (payload) => {
  return {
    type: ROLE,
    payload: payload,
  };
};
