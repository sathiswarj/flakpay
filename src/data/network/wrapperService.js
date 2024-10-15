import secureStorage from "../../utility/secureStorage";
import { ApiRequestPost } from "./services/ApiRequestPost";

export const ApiGetServiceWrapper = ({ url = "", headers = {} }) => {
  let token = secureStorage.getItem("token");
  return new Promise(async (resolve, reject) => {
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "X-Frame-Options": "DENY",
        ...headers,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          const email = secureStorage.getItem("email");
          const password = secureStorage.getItem("password");
          if (email && password){
            ApiRequestPost.login(email,password)
            .then((data)=>{
              if(data.success){
                secureStorage.setItem("token", data?.data?.token);
                secureStorage.setItem("refreshToken", data?.data?.refreshToken);
                return fetch(url, {
                  method: "GET",
                  headers: {
                    Authorization: "Bearer " + data?.data?.token,
                    "Content-Type": "application/json",
                    "X-Frame-Options": "DENY",
                    ...headers,
                  },
                })
                  .then((res) => res.json())
                  .then((res) => resolve(res))
                  .catch((err) => reject(err));
              }else {
                reject("Failed to refresh token");
              }
            })
            .catch((err) => {
              reject("Error during token refresh: " + err.message);
            });
          }else{
            reject("Missing email or password for token refresh");
          }
        }else {
          return response.json()
          .then((res)=> resolve(res));
        }
      })
      .catch((error) => reject(error));
  });
};

export const ApiGetServiceWrapperBlob = ({ url = "", headers = {} }) => {
  let token = secureStorage.getItem("token");
  return new Promise(async (resolve, reject) => {
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "X-Frame-Options": "DENY",
        ...headers,
      },
    })
    .then((response) => {
      if (response.status === 401) {
        const email = secureStorage.getItem("email");
        const password = secureStorage.getItem("password");
        if (email && password){
          ApiRequestPost.login(email,password)
          .then((data)=>{
            if(data.success){
              secureStorage.setItem("token", data?.data?.token);
              secureStorage.setItem("refreshToken", data?.data?.refreshToken);
              return fetch(url, {
                method: "GET",
                headers: {
                  Authorization: "Bearer " + data?.data?.token,
                  "Content-Type": "application/json",
                  "X-Frame-Options": "DENY",
                  ...headers,
                },
              })
                .then((res) => res.json())
                .then((res) => resolve(res))
                .catch((err) => reject(err));
            }else {
              reject("Failed to refresh token");
            }
          })
          .catch((err) => {
            reject("Error during token refresh: " + err.message);
          });
        }else{
          reject("Missing email or password for token refresh");
        }
      }else {
        return response.json()
        .then((res)=> resolve(res));
      }
    })
    .catch((error) => reject(error));
});
};

export const ApiPostServiceWrapper = ({ url = "", headers = {}, body = {} }) => {
  console.log("login detals2=3");
  let token = secureStorage.getItem("token");
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "X-Frame-Options": "DENY",
        ...headers,
      },
      body: JSON.stringify({
        ...body,
      }),
    })
    .then((response) => {
      if (response.status === 401) {
        const email = secureStorage.getItem("email");
        const password = secureStorage.getItem("password");
        if (email && password){
          ApiRequestPost.login(email,password)
          .then((data)=>{
            if(data.success){
              secureStorage.setItem("token", data?.data?.token);
              secureStorage.setItem("refreshToken", data?.data?.refreshToken);
              return   fetch(url, {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json",
                  "X-Frame-Options": "DENY",
                  ...headers,
                },
                body: JSON.stringify({
                  ...body,
                }),
              })
                .then((res) => res.json())
                .then((res) => resolve(res))
                .catch((err) => reject(err));
            }else {
              reject("Failed to refresh token");
            }
          })
          .catch((err) => {
            reject("Error during token refresh: " + err.message);
          });
        }else{
          reject("Missing email or password for token refresh");
        }
      }else {
        return response.json()
        .then((res)=> resolve(res));
      }
    })
    .catch((error) => reject(error));
});
};

export const ApiPutServiceWrapper = ({ url = "", headers = {}, body = {} }) => {
  let token = secureStorage.getItem("token");
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "X-Frame-Options": "DENY",
        ...headers,
      },
      body: JSON.stringify({
        ...body,
      }),
    })
      .then((res) => res.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const ApiGetServiceWithoutAuthenticationWrapper = ({
  url = "",
  headers = {},
  blob = false,
}) => {
  let token = secureStorage.getItem("token");
  return new Promise(async (resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,

        "Content-Type": "application/json",
        "X-Frame-Options": "DENY",
        ...headers,
      },
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const ApiPatchServiceWrapper = ({ url = "", headers = {}, body = {} }) => {
  let token = secureStorage.getItem("token");
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "X-Frame-Options": "DENY",
        ...headers,
      },
      body: JSON.stringify({
        ...body,
      }),
    })
      .then((res) => res.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const ApiPostServiceWithoutAuthenticationWrapper = ({
  url = "",
  headers = {},
  body = {},
}) => {
  let token = secureStorage.getItem("token");
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,

        "Content-Type": "application/json",
        "X-Frame-Options": "DENY",
        ...headers,
      },
      body: JSON.stringify({
        ...body,
      }),
    })
      .then((res) => res.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const ApiDeleteServiceWrapper = ({ url = "", headers = {}, body = {} }) => {
  let token = secureStorage.getItem("token");
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "X-Frame-Options": "DENY",
        ...headers,
      },
      body: JSON.stringify({
        ...body,
      }),
    })
      .then((res) => res.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};
