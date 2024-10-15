import { CLIENT_LIST, SERVICE_PROVIDER_LIST } from "../constants/reduxConstants";

export const addClientListAction = (payload) => {
  return {
    type: CLIENT_LIST,
    payload: payload,
  };
};
export const addServiceProviderListAction = (payload) => {
  return {
    type: SERVICE_PROVIDER_LIST,
    payload: payload,
  };
};
