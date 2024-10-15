import secureStorage from "../../../utility/secureStorage";
import { ApiGetServiceWrapper, ApiGetServiceWrapperBlob } from "../wrapperService";
import { API_ENDPOINT } from "./ApiEndPoint";

export const ApiRequestGet = {
  // sampleGetApi: () => {
  //   return new Promise(async (resolve, reject) => {
  //     let refHashId = secureStorage.getItem();
  //     await ApiGetServiceWrapper({
  //       url: API_ENDPOINT.basePath + "client",
  //       headers: {
  //         "client-hash-id": refHashId,
  //       },
  //     })
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // },
  getPayinMeta: (clientId = "",startDate,endDate, sp = "") => {
    let role = secureStorage.getItem("role");
    let clientIdFromSS = secureStorage.getItem("clientId");

    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payinpath + "dashboard/meta",
        headers: {
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          startdate: startDate,
          enddate: endDate,
          "sp-id": sp,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getPayoutMeta: (clientId = "", sp = "") => {
    let role = secureStorage.getItem("role");
    let clientIdFromSS = secureStorage.getItem("clientId");

    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payoutPath + "client/meta",
        headers: {
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          "sp-id": sp,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getMetaGraph: (clientId = "", sp = "") => {
    console.log("cleint jjj -> ", clientId);
    let role = secureStorage.getItem("role");
    let clientIdFromSS = secureStorage.getItem("clientId");

    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payInPath + "dashboard/graph",
        headers: {
          // "date-range": dateRange,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          "sp-id": sp,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getMetaCustom: (clientId = "", startDate = "", endDate = "", sp = "") => {
    console.log("cleint jjj -> ", clientId);
    let role = secureStorage.getItem("role");
    let clientIdFromSS = secureStorage.getItem("clientId");

    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payInPath + "dashboard/meta-time-range",
        headers: {
          startdate: startDate,
          enddate: endDate,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          "sp-id": sp,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  downloadTransactions: (
    page = "",
    size = "",
    startDate = "",
    endDate = "",
    status = "",
    clientId = "",
    clientName = "",
    orderId = "",
    sStatus = "",
    serviceProviderId = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapperBlob({
        url: API_ENDPOINT.payInPath + "payin/transaction/download",
        headers: {
          "Content-type": "application/json",
          page: parseInt(page),
          size: parseInt(size),
          startdate: startDate,
          enddate: endDate,
          "txn-status": status,
          "sp-id": serviceProviderId,
          "sp-txn-status": sStatus,
          "client-name": clientName,
          "order-id": orderId,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          Authorization: "Bearer " + token,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  //

  downloadTransactionsWallet: (
    page = "",
    size = "",
    startDate = "",
    endDate = "",
    status = "",
    clientId = "",

    clientName = "",
    orderId = "",
    sStatus = "",
    serviceProviderId = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");

    //gcds-payout-7unique-svc/api/v1/wallet/download-txns
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapperBlob({
        url: "https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/wallet/download-txns",
        headers: {
          "Content-type": "application/json",
          page: parseInt(page),
          size: parseInt(size),
          startdate: startDate,
          enddate: endDate,
          "txn-status": status,
          "sp-id": serviceProviderId,
          "sp-txn-status": sStatus,
          "client-name": clientName,
          "order-id": orderId,

          "client-id": role === "Client" ? clientIdFromSS : clientId,
          Authorization: "Bearer " + token,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  //
  downloadTransactionsPayout: (
    page = "",
    size = "",
    startDate = "",
    endDate = "",

    status = "",
    clientId = "",

    clientName = "",
    orderId = "",
    spId = ""
  ) => {
    console.log("009", spId);
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapperBlob({
        url: API_ENDPOINT.payoutPath + "client/download-txn",
        headers: {
          "Content-type": "application/json",
          page: parseInt(page),
          size: parseInt(size),
          startdate: startDate,
          enddate: endDate,
          "txn-status": status,
          "sp-id": spId,

          "client-name": clientName,
          "order-id": orderId,

          "client-id": role === "Client" ? clientIdFromSS : clientId,

          Authorization: "Bearer " + token,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  //

  downloadTransactionsPreFund: (
    page = "",
    size = "",
    startDate = "",
    endDate = "",

    status = "",
    clientId = "",

    clientName = "",
    orderId = "",
    spId = ""
  ) => {
    console.log("009", spId);
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapperBlob({
        url: API_ENDPOINT.payoutPath + "client/prefund/download-txn",
        headers: {
          "Content-type": "application/json",
          page: parseInt(page),
          size: parseInt(size),
          startdate: startDate,
          enddate: endDate,
          "txn-status": status,
          "sp-id": spId,

          "client-name": clientName,
          "order-id": orderId,

          "client-id": role === "Client" ? clientIdFromSS : "",

          Authorization: "Bearer " + token,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  //
  getAllSp: (page = "", size = "", spName = "") => {
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.corePath + "service-provider/fetch-all-sp",
        headers: {
          "service-provider-name": spName,
          "Content-type": "application/json",
          page: parseInt(page),
          size: parseInt(size),
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

  getAllPayoutSp: (page = "", size = "", spName = "") => {
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.corePath + "service-provider/fetch-all-payout-sp",
        headers: {
          "service-provider-name": spName,
          "Content-type": "application/json",
          page: parseInt(page),
          size: parseInt(size),
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

  getPayinTransactionHistory: (
    page = "",
    size = "10",
    startDate = "",
    endDate = "",
    clientId ="",
    status ="",
    utr="",
    orderId = "",
    txnId = "",
    upiId = "",
    serviceProviderId = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
   

    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payinpath + "payin/transaction/fetch",
        headers: {
          page: parseInt(page),
          size: parseInt(size),
          startdate: startDate,
          enddate: endDate,
          "txn-status": status,
          utr: utr,
          "upi-id": upiId,
          "order-id": orderId,
          "txn-id": txnId,
          "sp-id": serviceProviderId,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  getPayinTransactionHistoryForDownload: (
    startDate = "",
    endDate = "",
    orderId = "",
    txnId = "",
    status = "",
    utr = "",
    upiId = "",
    clientId = "",
    serviceProviderId = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapperBlob({
        url: API_ENDPOINT.payinpath + "payin/transaction/download",
        headers: {
          startdate: startDate,
          enddate: endDate,
          "txn-status": status,
          utr: utr,
          "upi-id": upiId,
          "order-id": orderId,
          "txn-id": txnId,
          "sp-id": serviceProviderId,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getPayoutTransactionHistory: (
    page = "",
    size = "10",
    startDate = "",
    endDate = "",
    orderId = "",
    txnId = "",
    status = "",
    txnType = "",
    clientId = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payoutPath + "wallet/transactions",
        headers: {
          page: parseInt(page),
          size: parseInt(size),
          startdate: startDate,
          enddate: endDate,
          "txn-status": status,
          "order-id": orderId,
          "txn-id": txnId,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          "txn-type": txnType,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  getIserveuPayoutTransactionHistoryForDownload: (
    startDate = "",
    endDate = "",
    orderId = "",
    txnId = "",
    status = "",
    utr = "",
    upiId = "",
    clientId = "",
    serviceProviderId = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapperBlob({
        url: API_ENDPOINT.payinpath + "payin/transaction/download",
        headers: {
          startdate: startDate,
          enddate: endDate,
          "txn-status": status,
          utr: utr,
          "upi-id": upiId,
          "order-id": orderId,
          "txn-id": txnId,
          "sp-id": serviceProviderId,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getClientPayinBalance: (clientId = "") => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ({
        url: API_ENDPOINT.payinpath + "client/fetch-balance",
        headers: {
          "client-id": role === "Client" ? clientIdFromSS : clientId,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getClientPayoutBalance: (clientId = "") => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payoutPath + "wallet/balance",
        headers: {
          "client-id": role === "Client" ? clientIdFromSS : clientId,
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

  payOutTransactionHistoryApi: (
    page = "",
    size = "",
    startDate = "",
    endDate = "",
    status = "",
    upiId = "",
    clientName = "",
    orderId = "",
    txnId = "",
    sStatus = "",
    beneName = "",
    spId = "",
    walletId = "",
    beneIfsc = "",
    debitterAcc = "",
    txnMode = "",
    clientId = "",
    utr = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    console.log("mode from get", txnMode);
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payoutPath + "client/fetch-txn",
        headers: {
          page: parseInt(page),
          size: parseInt(size),
          startdate: startDate,
          enddate: endDate,
          "txn-status": status,
          "sp-txn-status": sStatus,
          "upi-id": upiId,
          "client-name": clientName,
          "order-id": orderId,
          "txn-id": txnId,
          "sp-id": spId,
          "bene-name": beneName,
          "wallet-id": walletId,
          "bene-ifsc": beneIfsc,
          "debitter-acc": debitterAcc,
          "txn-mode": txnMode,
          utr: utr,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          Authorization: "Bearer " + token,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  //
  preFundTransactionHistoryApi: (
    page = "",
    size = "",
    startDate = "",
    endDate = "",
    status = "",
    upiId = "",
    clientName = "",
    orderId = "",
    txnId = "",
    sStatus = "",
    beneName = "",
    spId = "",
    walletId = "",
    beneIfsc = "",
    debitterAcc = "",
    txnMode = "",
    utr = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    console.log("rje", txnMode);
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payoutPath + "client/prefund/fetch-txn",
        headers: {
          page: parseInt(page),
          size: parseInt(size),
          startdate: startDate,
          enddate: endDate,
          "txn-status": status,
          "sp-txn-status": sStatus,
          "upi-id": upiId,
          "client-name": clientName,
          "order-id": orderId,
          "txn-id": txnId,
          "sp-id": spId,
          "bene-name": beneName,
          "wallet-id": walletId,
          "bene-ifsc": beneIfsc,
          "debitter-acc": debitterAcc,
          "txn-mode": txnMode,
          "transfer-unique-no": utr,
          "client-id": role === "Client" ? clientIdFromSS : "",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getIserveUClientList: (clientId = "") => {
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payoutPath + "client/list",
        headers: {
          "client-id": clientId,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getUserList: () => {
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.basePath + "user/fetch-all-internal-user",
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  getClientList: (
    page = "",
    size = "",
    sId = "",
    cId = "",
    startDate = "",
    endDate = "",
    companyName = "",
    email = "",
    status = ""
  ) => {
    return new Promise((resolve, reject) => {
      let role = secureStorage.getItem("role");

      ApiGetServiceWrapper({
        url: API_ENDPOINT.corePath + "client/fetch-all-client",
        headers: {
          page: parseInt(page),
          size: parseInt(size),
          "sp-id": sId,
          "client-id": cId,
          startdate: startDate,
          enddate: endDate,
          "company-name": companyName,
          status: status,
          email: email,
          "Content-type": "application/json",
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

  getClientListPayIn: (page = "", size = "") => {
    return new Promise((resolve, reject) => {
      // let clientId = secureStorage.getItem("clientId");
      let role = secureStorage.getItem("role");

      ApiGetServiceWrapper({
        url: API_ENDPOINT.payInPath + "client/fetch-all-client",
        headers: {
          page: parseInt(page),
          size: parseInt(size),

          "Content-type": "application/json",
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

  getClientListPayout: (page = "", size = "") => {
    return new Promise((resolve, reject) => {
      // let clientId = secureStorage.getItem("clientId");
      let role = secureStorage.getItem("role");

      ApiGetServiceWrapper({
        url: API_ENDPOINT.payoutPath + "client/fetch-all-client",
        headers: {
          page: parseInt(page),
          size: parseInt(size),

          "Content-type": "application/json",
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

  getClientListUnique: (page = "", size = "") => {
    return new Promise((resolve, reject) => {
      // let clientId = secureStorage.getItem("clientId");
      // let role = secureStorage.getItem("role");

      ApiGetServiceWrapper({
        url: API_ENDPOINT.corePath + "client/fetch-all-client-dd",
        headers: {
          // page: parseInt(page),
          // size: parseInt(size),
          // "Content-type": "application/json",
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

  getClientListUpdate: (page = "", size = "", clientId = "") => {
    // console.log(" reach",clientId)
    return new Promise((resolve, reject) => {
      // let clientId = secureStorage.getItem("clientId");
      let role = secureStorage.getItem("role");

      ApiGetServiceWrapper({
        url: API_ENDPOINT.corePath + "client/fetch-all-client",
        headers: {
          page: parseInt(page),
          size: parseInt(size),
          // "companyname":companyName,
          "client-Id": clientId,
          "Content-type": "application/json",
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
  getAllClientListDropdown: () => {
    // console.log("rapper",clientName)
    let token = secureStorage.getItem("token");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.corePath + "client/fetch-all-client",
        headers: {
          Authorization: "Bearer " + token,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getClientByClientId: (clientId = "") => {
    // console.log("rapper",clientName)
    let token = secureStorage.getItem("token");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.corePath + "client/fetch-by-client-id",
        headers: {
          Authorization: "Bearer " + token,
          "client-id": clientId,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getClientByUserId: (clientId = "") => {
    // console.log("rapper",clientName)
    let token = secureStorage.getItem("token");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.basePath + "user/fetch-by-user-id",
        headers: {
          Authorization: "Bearer " + token,
          "user-id": clientId,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getUserByClientId: (clientId = "") => {
    // console.log("rapper",clientName)
    let token = secureStorage.getItem("token");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.basePath + "user/fetch-by-client-id",
        headers: {
          Authorization: "Bearer " + token,
          "client-id": clientId,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  balanceCheck: (clientId = "", subpath) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let secretKey = secureStorage.getItem("secretKey");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");

    console.log("bearertoken --->", token);
    console.log("client id", clientIdFromSS);
    console.log("baje", subpath);

    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        //https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/transaction/balance-check
        url: subpath,
        headers: {
          "secret-key": secretKey,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  balanceCheckUn: (clientId = "", subpath) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let secretKey = secureStorage.getItem("secretKey");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");

    console.log("bearertoken --->", token);
    console.log("client id", clientIdFromSS);
    console.log("baje", subpath);

    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        //https://gcds.genniepay.com/gcds-payout-7unique-svc/api/v1/transaction/balance-check
        url: subpath,
        headers: {
          "secret-key": secretKey,
          "client-id": clientId,
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getAllClientListDropdownPayOut: (clientName = "") => {
    // console.log("rapper",clientName)
    let token = secureStorage.getItem("token");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payoutPath + "client/fetch-all-client-dd",
        headers: {
          Authorization: "Bearer " + token,
          "client-name": clientName,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  getSettlementTransactionHistory: (
    page = "",
    size = "10",
    startDate = "",
    endDate = "",
    clientId = "",
    serviceProviderId = "",
    settlementFromDateTime = "",
    settlementToDateTime = "",
    status = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payinpath + "settlement/fetch",
        headers: {
          page: parseInt(page),
          size: parseInt(size),
          startdate: startDate,
          enddate: endDate,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          "sp-id": serviceProviderId,
          "settlement-from-date-time": settlementFromDateTime,
          "settlement-to-date-time": settlementToDateTime,
          status: status,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  getSettlemnentsTransactionHistoryForDownload: (
    startDate = "",
    endDate = "",
    clientId = "",
    serviceProviderId = "",
    settlementFromDateTime = "",
    settlementToDateTime = "",
    status = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapperBlob({
        url: API_ENDPOINT.payinpath + "settlement/download",
        headers: {
          startdate: startDate,
          enddate: endDate,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          status: status,
          "sp-id": serviceProviderId,
          "settlement-from-date-time": settlementFromDateTime,
          "settlement-to-date-time": settlementToDateTime,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  getPrefundRequestTransactionHistory: (
    page = "",
    size = "10",
    startDate = "",
    endDate = "",
    txnType = "",
    clientId = ""
  ) => {
    let clientIdFromSS = secureStorage.getItem("clientId");
    let token = secureStorage.getItem("token");
    let role = secureStorage.getItem("role");
    return new Promise((resolve, reject) => {
      ApiGetServiceWrapper({
        url: API_ENDPOINT.payoutPath + "wallet/prefund/list",
        headers: {
          page: parseInt(page),
          size: parseInt(size),
          startdate: startDate,
          enddate: endDate,
          "client-id": role === "Client" ? clientIdFromSS : clientId,
          "txn-type": txnType,
        },
        blob: true,
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
