// Add Servic Provider to client - PAYIN
const payin = {
  clientId: "0ebc848d-e7b5-443b-81b4-bdd7d37bb1db",
  type: "PAYIN",
  serviceProviderList: [
    {
      serviceProviderId: "e0545b59-5def-4334-8756-84dd71db2a66-2",
      serviceProviderName: "COSMOS-PAYIN",
      credentials: {},
      webhookDetails: {
        notifyUrl: "",
      },
      accountDetails: {
        settlementAcc: [
          {
            settlementAccName: "",
            settlementAccNumber: "",
            settlementAccIfsc: "",
          },
        ],
      },
      commissionDetails: {
        serviceProviderCommission: {
          serviceType: "flat",
          slabs: [],
          flatCommission: {
            commissionUnit: "rs", // "'rs' or 'percentage'",
            commissionValue: 2,
          },
        },
        clientCommission: {
          serviceType: "slab",
          slabs: [
            {
              commissionUnit: "rs", // "'rs' or 'percentage'",
              commissionValue: 2,
              slabFloorValue: "",
              slabCeilValue: "",
            },
          ],
          flatCommission: {},
        },
      },
    },
  ],
};

// Add Servic Provider to client - PAYIN
const payout = {
  clientId: "0ebc848d-e7b5-443b-81b4-bdd7d37bb1db",
  type: "PAYOUT",
  serviceProviderList: [
    {
      serviceProviderId: "e0545b59-5def-4334-8756-84dd71db2a66-2",
      serviceProviderName: "COSMOS-PAYIN",
      credentials: {},
      webhookDetails: {
        validateUrl: "",
        notifyUrl: "",
      },
      accountDetails: {
        debitorAcc: [
          {
            debitorAccName: "",
            debitorAccNumber: "",
            debitorAccIfsc: "",
          },
        ],
        remitterAcc: [
          {
            remitterAccName: "",
            remitterAccNumber: "",
            remitterAccIfsc: "",
          },
        ],
      },
      commissionDetails: {
        serviceProviderCommission: [
          {
            commissionType: "flat", // "'flat' or 'slab'",
            commissionUnit: "rs", // "'rs' or 'percentage'",
            commissionValue: 2,
            slabFloorValue: "",
            slabCeilValue: "",
            commissionOnTransactionMode: {
              IMPS: [
                {
                  commissionType: "flat", // "'flat' or 'slab'",
                  commissionUnit: "rs", // "'rs' or 'percentage'",
                  commissionValue: 2,
                  slabFloorValue: "",
                  slabCeilValue: "",
                },
              ],
              RTGS: [
                {
                  commissionType: "flat", // "'flat' or 'slab'",
                  commissionUnit: "rs", // "'rs' or 'percentage'",
                  commissionValue: 2,
                  slabFloorValue: "",
                  slabCeilValue: "",
                },
              ],
              NEFT: [
                {
                  commissionType: "flat", // "'flat' or 'slab'",
                  commissionUnit: "rs", // "'rs' or 'percentage'",
                  commissionValue: 2,
                  slabFloorValue: "",
                  slabCeilValue: "",
                },
              ],
              IFT: [
                {
                  commissionType: "flat", // "'flat' or 'slab'",
                  commissionUnit: "rs", // "'rs' or 'percentage'",
                  commissionValue: 2,
                  slabFloorValue: "",
                  slabCeilValue: "",
                },
              ],
            },
          },
        ],
        clientCommission: [
          {
            commissionType: "flat", // "'flat' or 'slab'",
            commissionUnit: "rs", // "'rs' or 'percentage'",
            commissionValue: 3,
            slabFloorValue: "",
            slabCeilValue: "",
            commissionOnTransactionMode: {
              IMPS: [
                {
                  commissionType: "flat", // "'flat' or 'slab'",
                  commissionUnit: "rs", // "'rs' or 'percentage'",
                  commissionValue: 2,
                  slabFloorValue: "",
                  slabCeilValue: "",
                },
              ],
              RTGS: [
                {
                  commissionType: "flat", // "'flat' or 'slab'",
                  commissionUnit: "rs", // "'rs' or 'percentage'",
                  commissionValue: 2,
                  slabFloorValue: "",
                  slabCeilValue: "",
                },
              ],
              NEFT: [
                {
                  commissionType: "flat", // "'flat' or 'slab'",
                  commissionUnit: "rs", // "'rs' or 'percentage'",
                  commissionValue: 2,
                  slabFloorValue: "",
                  slabCeilValue: "",
                },
              ],
              IFT: [
                {
                  commissionType: "flat", // "'flat' or 'slab'",
                  commissionUnit: "rs", // "'rs' or 'percentage'",
                  commissionValue: 2,
                  slabFloorValue: "",
                  slabCeilValue: "",
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
