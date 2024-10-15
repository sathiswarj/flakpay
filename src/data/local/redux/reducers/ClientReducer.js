import {  CLIENT_LIST, SERVICE_PROVIDER_LIST } from "../constants/reduxConstants";

const initialState = {
  clientList: [],
  serviceProviderList : []
};

const ClientReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CLIENT_LIST:
      return {
        ...state,
        clientList: payload,
      };
    case SERVICE_PROVIDER_LIST:
      return {
        ...state,
        serviceProviderList: payload,
      };
    default:
      return state;
  }
};

export default ClientReducer;
