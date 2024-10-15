export const WalletTableHeader = [
  { label: "SI.No", key: "Si.No", type: "sino" },
  { label: "Created At", key: "createdAt", type: "date" },
  { label: "Txn Id", key: "txnId", type: "transactionId" },
  { label: "UTR", key: "utr", type: "transactionId" },
  { label: "Amount", key: "amount", type: "amount" },
  { label: "Status", key: "status", type: "payment-status" },
];

export const UserTableHeader = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 180 },
  { label: "Role", key: "role", width: 100 },
  { label: "Email", key: "email", width: 100 },
  { label: "Status", key: "status", type: "status", width: 100 },
  { label: "Action", key: "action", type: "toggle", width: 70 },
];

export const ClientTableHeader = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 180 },
  { label: "Company Name", key: "companyName", width: 100 },
  { label: "Email", key: "email", width: 100 },
  { label: "Status", key: "status", type: "status", width: 100 },
  { label: "Action", key: "action", type: "toggle", width: 70 },
  { label: "More", key: "more", type: "more", width: 150 },
];

export const ServiceProviderListHeader = [
  { label: "SI.No", key: "Si.No", type: "sino" },
  { label: "Service Provider Name", key: "serviceProviderName", type: "text" },
  { label: "Service Type", key: "serviceType", type: "text" },
  { label: "Status", key: "status", type: "status" },
  { label: "Action", key: "action", type: "toggle", width: 70 },
];

export const ClientDetailsPopupHeader = [
  { label: "Company Name", key: "companyName" },
  { label: "Email", key: "email" },
  { label: "Mobile", key: "mobileNumber" },
  { label: "GST Details", key: "gst" },
  { label: "PAN Details", key: "pan" },
  { label: "Address", key: "address" },
  { label: "Website Url", key: "websiteUrl" },
];

export const ProfileDetailsHeader = [
  { label: "Company Name", key: "companyName" },
  { label: "Email", key: "email" },
  { label: "Mobile", key: "mobileNumber" },
  { label: "GST Details", key: "gst" },
  { label: "PAN Details", key: "pan" },
  { label: "Address", key: "address" },
];

export const PayinTransactionsHeaderAdmin = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Merchant Name", key: "clientName", type: "text", width: 150 },
  { label: "Txn type", key: "transactionType", type: "text", width: 80 },
  { label: "UTR", key: "utr", type: "text", width: 80 },
  { label: "Amount", key: "amount", type: "amount", width: 50 },
  { label: "Commission Amount", key: "totalCommissionAmount", type: "amount", width: 50 },
  { label: "Net Amount", key: "netAmount", type: "amount", width: 50 },
  { label: "Order Id", key: "orderId", type: "string", width: 150 },
  { label: "Status", key: "txnStatus", type: "txnStatus", width: 100 },
  { label: "Txn Id", key: "txnId", type: "string", width: 80 },
  { label: "View Details", key: "more", type: "more", width: 100 },
];

export const PayinTransactionsHeaderClient = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 30 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Txn type", key: "transactionType", type: "text", width: 30 },
  { label: "Amount", key: "amount", type: "amount", width: 50 },
  { label: "Commission Amount", key: "totalCommissionAmount", type: "amount", width: 50 },
  { label: "Net Amount", key: "netAmount", type: "amount", width: 50 },
  { label: "Order Id", key: "orderId", type: "string", width: 100 },
  { label: "Status", key: "txnStatus", type: "txnStatus", width: 100 },
  { label: "Txn Id", key: "txnId", type: "string", width: 80 },
  { label: "View Details", key: "more", type: "more", width: 80 },
];

export const PayinTransactionsViewMoreHeader = [
  { label: "Amount", key: "amount", type: "amount" },
  { label: "Order Id", key: "orderId", type: "string" },
  { label: "Status", key: "txnStatus", type: "string" },
  { label: "Txn Id", key: "txnId", type: "string" },
  { label: "SP Txn Id", key: "spTxnId", type: "string" },
  { label: "Client Name", key: "clientName", type: "string" },
  { label: "Client Id", key: "clientId", type: "string" },
  { label: "Tampered Amount", key: "tamperedAmount", type: "string" },
  { label: "Closing Balance", key: "closingBalance", type: "amount" },
  { label: "Service Provider Id", key: "serviceProviderId", type: "string" },
  { label: "Service Provider Name", key: "serviceProviderName", type: "string" },
  { label: "Commission Type", key: "commissionType", type: "string" },
  { label: "Commission Value", key: "commissionValue", type: "string" },
  { label: "Commission Unit", key: "commissionUnit", type: "string" },
  {
    label: "Callback Response",
    key: "clientCallbackResponseString",
    type: "callback",
    width: 500,
    scrollable: true,
  },
];

export const SettlementTransactionsHeaderAdmin = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Client Name", key: "clientName", type: "string", width: 150 },
  { label: "Amount", key: "totalSettlementVolume", type: "amount", width: 50 },
  { label: "Settlement Txn Id", key: "settlementTxnId", type: "string", width: 100 },
  { label: "Settlement From DateTime", key: "settlementFromDateTime", type: "date", width: 100 },
  { label: "Settlement To DateTime", key: "settlementToDateTime", type: "date", width: 100 },
  { label: "Status", key: "status", type: "string", width: 100 },
  { label: "Total Commission", key: "totalCommissionVolume", type: "string", width: 100 },
];

export const SettlementTransactionsHeaderClient = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Client Name", key: "clientName", type: "string", width: 150 },
  { label: "Amount", key: "totalSettlementVolume", type: "amount", width: 50 },
  { label: "Settlement Txn Id", key: "settlementTxnId", type: "string", width: 100 },
  { label: "Settlement From DateTime", key: "settlementFromDateTime", type: "date", width: 100 },
  { label: "Settlement To DateTime", key: "settlementToDateTime", type: "date", width: 100 },
  { label: "Status", key: "status", type: "string", width: 100 },
  { label: "Total Commission", key: "totalCommissionVolume", type: "string", width: 100 },
];

export const SettlementTransactionsViewMoreAdminHeader = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Modified At", key: "modifiedAt", type: "date", width: 150 },
  { label: "Client Id", key: "clientId", type: "string", width: 150 },
  { label: "Service Provider Id", key: "serviceProviderId", type: "string", width: 50 },
  { label: "Service Provider Name", key: "serviceProviderName", type: "string", width: 100 },
  { label: "Transfer Mode", key: "transferMode", type: "string", width: 100 },
  { label: "Total Txn Count", key: "totalTxnCount", type: "string", width: 100 },
  { label: "Settlement A/C No", key: "settlementAccountNo", type: "string", width: 100 },
  { label: "Settlement A/C Name", key: "settlementAccountName", type: "string", width: 100 },
  { label: "Settlement A/C IFSC", key: "settlementAccountIfsc", type: "string", width: 100 },
  { label: "Total Success Volume", key: "totalSuccessVolume", type: "amount", width: 100 },
  { label: "Total Commission Volume", key: "totalCommissionVolume", type: "amount", width: 100 },
  { label: "Total Settlement Volume", key: "totalSettlementVolume", type: "amount", width: 100 },
  { label: "UTR", key: "utr", type: "string", width: 100 },
  {
    label: "Success Status Modified Date Time",
    key: "successStatusModifiedDateTime",
    type: "date",
    width: 100,
  },
];

export const SettlementTransactionsViewMoreClientHeader = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Modified At", key: "modifiedAt", type: "date", width: 150 },
  { label: "Transfer Mode", key: "transferMode", type: "string", width: 100 },
  { label: "Total Txn Count", key: "totalTxnCount", type: "string", width: 100 },
  { label: "Settlement A/C No", key: "settlementAccountNo", type: "string", width: 100 },
  { label: "Settlement A/C Name", key: "settlementAccountName", type: "string", width: 100 },
  { label: "Settlement A/C IFSC", key: "settlementAccountIfsc", type: "string", width: 100 },
  { label: "Total Success Volume", key: "totalSuccessVolume", type: "amount", width: 100 },
  { label: "Total Commission Volume", key: "totalCommissionVolume", type: "amount", width: 100 },
  { label: "Total Settlement Volume", key: "totalSettlementVolume", type: "amount", width: 100 },
  { label: "UTR", key: "utr", type: "string", width: 100 },
  {
    label: "Success Status Modified Date Time",
    key: "successStatusModifiedDateTime",
    type: "date",
    width: 100,
  },
];

export const WalletTransactionsHeaderAdmin = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Merchant Name", key: "clientName", type: "text", width: 150 },
  { label: "Opening Balance", key: "openingBalance", type: "amount", width: 100 },
  { label: "Amount", key: "amount", type: "amount", width: 100 },
  { label: "Total Commission Amount", key: "totalCommissionAmount", type: "amount", width: 100 },
  { label: "Net Amount", key: "netAmount", type: "amount", width: 100 },
  { label: "Closing Balance", key: "closingBalance", type: "amount", width: 100 },
  { label: "Order Id", key: "orderId", type: "string", width: 150 },
  { label: "Status", key: "status", type: "string", width: 100 },
  { label: "Remarks", key: "remarks", type: "text", width: 200 },
  { label: "View Details", key: "more", type: "more", width: 100 },
];

export const WalletTransactionsHeaderClient = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Opening Balance", key: "openingBalance", type: "amount", width: 100 },
  { label: "Amount", key: "amount", type: "amount", width: 100 },
  { label: "Total Commission Amount", key: "totalCommissionAmount", type: "amount", width: 100 },
  { label: "Net Amount", key: "netAmount", type: "amount", width: 100 },
  { label: "Closing Balance", key: "closingBalance", type: "amount", width: 100 },
  { label: "Order Id", key: "orderId", type: "string", width: 150 },
  { label: "Status", key: "status", type: "string", width: 100 },
  { label: "Remarks", key: "remarks", type: "text", width: 200 },
  { label: "View Details", key: "more", type: "more", width: 100 },
];

export const PrefundTransactionsHeaderAdmin = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Merchant Name", key: "clientName", type: "text", width: 150 },
  { label: "Amount", key: "amount", type: "amount", width: 100 },
  { label: "Net Amount", key: "netAmount", type: "amount", width: 100 },
  { label: "Closing Balance", key: "closingBalance", type: "amount", width: 100 },
  { label: "Remarks", key: "remarks", type: "text", width: 200 },
  { label: "Order Id", key: "orderId", type: "string", width: 150 },
  { label: "Status", key: "status", type: "string", width: 100 },
  { label: "View Details", key: "more", type: "more", width: 100 },
];

export const PrefundTransactionsHeaderClient = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Amount", key: "amount", type: "amount", width: 100 },
  { label: "Net Amount", key: "netAmount", type: "amount", width: 100 },
  { label: "Closing Balance", key: "closingBalance", type: "amount", width: 100 },
  { label: "Order Id", key: "orderId", type: "string", width: 150 },
  { label: "Status", key: "status", type: "string", width: 100 },
  { label: "Remarks", key: "remarks", type: "text", width: 200 },
  { label: "View Details", key: "more", type: "more", width: 100 },
];

export const PayoutTransactionsHeaderAdmin = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Merchant Name", key: "clientName", type: "text", width: 150 },
  { label: "Order Id", key: "orderId", type: "string", width: 150 },
  { label: "Opening Balance", key: "openingBalance", type: "amount", width: 100 },
  { label: "Amount", key: "amount", type: "amount", width: 100 },
  { label: "Closing Balance", key: "closingBalance", type: "amount", width: 100 },
  { label: "Status", key: "status", type: "string", width: 100 },
  { label: "Txn Id", key: "txnId", type: "string", width: 80 },
  { label: "SP Txn Id", key: "spTxnId", type: "string", width: 80 },
  { label: "View Details", key: "more", type: "more", width: 100 },
];

export const PayoutTransactionsHeaderClient = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 50 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Order Id", key: "orderId", type: "string", width: 150 },
  { label: "Opening Balance", key: "openingBalance", type: "amount", width: 100 },
  { label: "Amount", key: "amount", type: "amount", width: 100 },
  { label: "Closing Balance", key: "closingBalance", type: "amount", width: 100 },
  { label: "Status", key: "status", type: "string", width: 100 },
  { label: "Txn Id", key: "txnId", type: "string", width: 80 },
  { label: "SP Txn Id", key: "spTxnId", type: "string", width: 80 },
  { label: "View Details", key: "more", type: "more", width: 100 },
];

export const PayoutTransactionsViewMoreHeader = [
  { label: "Bene Account No", key: "beneAccountNo", type: "string" },
  { label: "Bene Bank Name", key: "beneBankName", type: "string" },
  { label: "Bene Ifsc", key: "beneIfsc", type: "string" },
  { label: "Bene Name", key: "beneName", type: "string" },
  { label: "Bene Email", key: "beneEmail", type: "string" },
];

export const PrefundRequestTransactionsheadersClient = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 30 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Txn mode", key: "txnMode", type: "text", width: 30 },
  { label: "Amount", key: "amount", type: "amount", width: 50 },
  { label: "Account No", key: "remitterAccNumber", type: "text", width: 50 },
  { label: "UTR", key: "utr", type: "text", width: 50 },
  { label: "IFSC", key: "remitterBankIfscCode", type: "text", width: 50 },
  { label: "Bank Name", key: "remitterBankName", type: "string", width: 100 },
  { label: "Status", key: "status", type: "string", width: 100 },
];

export const PrefundRequestTransactionsheadersAdmin = [
  { label: "SI.No", key: "Si.No", type: "sino", width: 30 },
  { label: "Created At", key: "createdAt", type: "date", width: 150 },
  { label: "Client Name", key: "clientName", type: "text", width: 30 },
  { label: "Txn mode", key: "txnMode", type: "text", width: 30 },
  { label: "Amount", key: "amount", type: "amount", width: 50 },
  { label: "Account No", key: "remitterAccNumber", type: "text", width: 50 },
  { label: "UTR", key: "utr", type: "text", width: 50 },
  { label: "IFSC", key: "remitterBankIfscCode", type: "text", width: 50 },
  { label: "Bank Name", key: "remitterBankName", type: "string", width: 100 },
  { label: "Status", key: "status", type: "string", width: 100 },
  { label: "Action", key: "prefundAction", type: "prefundAction", width: 100 },
];
