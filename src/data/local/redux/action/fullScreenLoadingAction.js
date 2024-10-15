import { LOADING_END, LOADING_START } from "../constants/reduxConstants";

export const startFullScreenLoadingAction = () => {
  return {
    type: LOADING_START,
  };
};

export const stopFullScreenLoadingAction = () => {
  console.log("stop called");
  return {
    type: LOADING_END,
  };
};
