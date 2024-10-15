import secureStorage from "../../../utility/secureStorage";
import {
  ApiPostServiceWithoutAuthenticationWrapper,
  ApiPostServiceWrapper,
  ApiPatchServiceWrapper,
} from "../wrapperService";
import { API_ENDPOINT } from "./ApiEndPoint";

export const ApiRequestPost = {
  authenticate: (username, password) => {
    return new Promise((resolve, reject) => {
      return ApiPostServiceWithoutAuthenticationWrapper({
        url: API_ENDPOINT.basePath + "authenticate",
        headers: {},
        body: {
          username,
          password,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  login: (email, password) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.basePath + "auth/login",
        headers: {},
        body: {
          email,
          password,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  logout: () => {
    return new Promise((resolve, reject) => {
      const refHashId = secureStorage.getItem("userId");
      ApiPostServiceWithoutAuthenticationWrapper({
        url: API_ENDPOINT.basePath + "auth/logout",
        headers: {},
        body: {
          userId: refHashId,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  changePassword: (oldPass, newPass) => {
    const userId = secureStorage.getItem("userId");
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.basePath + "auth/change-password",
        headers: {
          "client-hash-id": "",
        },
        body: {
          oldPass,
          newPass,
          userId,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //
  sendOtpForForgotPassword: (email) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWithoutAuthenticationWrapper({
        url: API_ENDPOINT.basePath + "auth/forgot-password/send-link",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  resetPassword: (email, forgotPassCode, newPass) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWithoutAuthenticationWrapper({
        url: API_ENDPOINT.basePath + "auth/forgot-password/reset-password",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email,
          forgotPassCode,
          newPass,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //

  addUser: (name, email, role) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.basePath + "user/create-internal",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name,
          email,
          role,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addClient: (name, companyName, email, mobileNumber, address, gst, pan, websiteUrl) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "client/create",
        headers: {
          "client-hash-id": "",
          "Content-Type": "application/json",
        },
        body: {
          name,
          address,
          pan,
          companyName,
          email,
          mobileNumber,
          gst,
          websiteUrl,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateIserveUClientWallet: (clientId, amount, txnType, remarks) => {
    return new Promise((resolve, reject) => {
      let body = {
        clientId: clientId,
        remarks : remarks
      };
      txnType === "CREDIT" ? (body.creditAmount = amount) : (body.debitAmount = amount);
      ApiPostServiceWrapper({
        url:
          txnType === "CREDIT"
            ? API_ENDPOINT.payoutPath + "wallet/balance/credit"
            : API_ENDPOINT.payoutPath + "wallet/balance/debit",
        headers: {
          "client-id": clientId,
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addServiceProviderToClient: (clientId, serviceType, config) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "client/create",
        headers: {
          "client-hash-id": "",
          "Content-Type": "application/json",
        },
        body: {
          clientId: clientId,
          type: serviceType,
          serviceProviderList: [config],
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createServiceProvider: (serviceProviderName, serviceType) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "service-provider/create",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          serviceProviderName: serviceProviderName,
          serviceType: serviceType,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addBalDebit: (clientId, amt, utr) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: "https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/wallet/debit",
        headers: {
          "client-hash-id": "",
          "Content-Type": "application/json",
        },
        body: {
          clientId: clientId,
          amount: amt,
          utr: utr,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addBalCredit: (clientId, amt, utr) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: "https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/wallet/credit",
        headers: {
          "client-hash-id": "",
          "Content-Type": "application/json",
        },
        body: {
          clientId: clientId,
          amount: amt,
          utr: utr,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateClientStatus: (clientId, status) => {
    // console.log("ca",clientId,status)
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "client/update-status",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          clientId,
          status,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateSpStatus: (serviceProviderId, status) => {
    // console.log("ca",clientId,status)
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "service-provider/update-status",
        headers: {},
        body: {
          serviceProviderId,
          status,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  addServiceProviderToClient: (clientId, type, serviceProviderList) => {
    // console.log("ca",clientId,status)
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "client/add-service-provider-to-client",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          clientId,
          type,
          serviceProviderList: [serviceProviderList],
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateClientSpStatus : (statusUpdatePayload)=>{
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.corePath + "client/update-sp-status",
        body: statusUpdatePayload
      })
       .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateServiceProviderForClient: (clientId, type, serviceProviderList) => {
    // console.log("ca",clientId,status)
    return new Promise((resolve, reject) => {
      ApiPatchServiceWrapper({
        url: API_ENDPOINT.corePath + "client/update-service-provider",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          clientId,
          type,
          serviceProviderList,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateSP: (clientId, serviceProviderId, status) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.payInPath + "client/update-payin-service-provider-status",
        headers: {},
        body: {
          clientId,
          serviceProviderId,
          status,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateSPPayout: (clientId, serviceProviderId, status) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.payOutPath + "client/update-payout-service-provider-status",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          clientId,
          serviceProviderId,
          status,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  payinServiceProvider: (clientId, serviceProviderList = []) => {
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.payInPath + "client/add-new-payin-service",
        headers: {
          // Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: {
          clientId,
          serviceProviderList: serviceProviderList,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  payOutServiceProvider: (clientId = "", serviceProviderList = []) => {
    console.log("pout", clientId);
    let token = secureStorage.getItem("token");
    console.log("token ---->", token);
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.payOutPath + "client/add-new-payout-service",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: {
          clientId,
          serviceProviderList: serviceProviderList,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  //

  updateUserStatus: (userId, enable) => {
    return new Promise((resolve, reject) => {
      ApiPatchServiceWrapper({
        url: API_ENDPOINT.basePath + "user/update-status",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          userId,
          enable,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateClientBasicDetails: (
    clientId,
    companyName,
    mobileNumber,
    address,
    pan,
    gst,
    email,
    websiteUrl
  ) => {
    return new Promise((resolve, reject) => {
      ApiPatchServiceWrapper({
        url: API_ENDPOINT.corePath + "client/update-basic-details",
        headers: {
          // "client-hash-id": userId,
        },
        body: {
          clientId,
          companyName,
          mobileNumber,
          address,
          pan,
          gst,
          email,
          websiteUrl,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateClientDetails: (clientId, name, mobileNumber, address, pan, email) => {
    return new Promise((resolve, reject) => {
      ApiPatchServiceWrapper({
        url: API_ENDPOINT.corePath + "client/update-client",
        headers: {
          // "client-hash-id": userId,
        },
        body: {
          clientId,
          name,
          mobileNumber,
          address,
          pan,
          email,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updatePayinCallback: (clientId, payinCallbackUrl) => {
    return new Promise((resolve, reject) => {
      ApiPatchServiceWrapper({
        url: API_ENDPOINT.payInPath + "client/update-payin-callback-url",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          clientId,
          payinCallbackUrl,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updatePayOutCallback: (clientId, payoutCallbackUrl) => {
    return new Promise((resolve, reject) => {
      ApiPatchServiceWrapper({
        url: API_ENDPOINT.sevenUnique + "client/update-payout-callback-url",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          clientId,
          payoutCallbackUrl,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updatePayOutCallbackIsmart: (clientId, payoutCallbackUrl) => {
    return new Promise((resolve, reject) => {
      ApiPatchServiceWrapper({
        url: API_ENDPOINT.IsmartpayOutPath + "client/update-payout-callback-url",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          clientId,
          payoutCallbackUrl,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updatePayOutCallbackNeo: (clientId, payoutCallbackUrl) => {
    return new Promise((resolve, reject) => {
      ApiPatchServiceWrapper({
        url: API_ENDPOINT.IsmartpayOutPath + "client/update-payout-callback-url",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          clientId,
          payoutCallbackUrl,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updatePayOutCallbackPaycoon: (clientId, payoutCallbackUrl) => {
    return new Promise((resolve, reject) => {
      ApiPatchServiceWrapper({
        // url: API_ENDPOINT.IsmartpayOutPath + "client/update-payout-callback-url",

        url: "https://gcds.genniepay.com/gcds-payout-paycoon-svc/api/v1/client/update-payout-callback-url",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          clientId,
          payoutCallbackUrl,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createManualSettlementRecord: (settlementRecord) => {
    return new Promise((resolve, reject) => {
      ApiPatchServiceWrapper({
        url: API_ENDPOINT.payinpath + "settlement/create",
        headers: {
          // "client-hash-id": clientId,
        },
        body: {
          ...settlementRecord,
        },
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  createPrefundRequest: (prefundRequestObject) => {
    const clientId = secureStorage.getItem("clientId")
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.payoutPath + "prefund/create",
        headers: {},
        body: {clientId : clientId,...prefundRequestObject},
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  approveRejectPrefundRequest: (prefundRequestObject) => {
    const clientId = secureStorage.getItem("clientId")
    return new Promise((resolve, reject) => {
      ApiPostServiceWrapper({
        url: API_ENDPOINT.payoutPath + "prefund/update-status",
        headers: {},
        body: prefundRequestObject,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
