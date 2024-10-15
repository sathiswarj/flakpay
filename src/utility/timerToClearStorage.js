import secureStorage from "./secureStorage";

export const clearLocalStorageTimer = (navigate) => (dispatch) => {
  var hours = 2;
  var now = new Date().getTime();
  var setupTime = secureStorage.getItem("setupTime");
  if (setupTime == null) {
    secureStorage.setItem("setupTime", now);
  } else {
    if (now - setupTime > hours * 60 * 60 * 1000) {
      // dispatch(ApiRequestPost.logout(navigate));
    }
  }
};
