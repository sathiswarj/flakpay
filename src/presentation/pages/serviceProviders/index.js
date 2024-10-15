import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { enqueueSnackbar } from "notistack";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";
import { ServiceProviderListHeader } from "../../../data/local/constants/TableHeaders";
import TableComponent from "../../components/Table";
import AddServiceProviderPopup from "./addSpPopup";
import DialogComponent from "../../components/dialog";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";
import Loader from "../../components/loader/loader"

const ServiceProviders = () => {
  const [loading, setLoading] = useState(false);
  const [serviceProviderList, setServiceProviderList] = useState([]);
  const [showAddSPPopup, setShowAddSPPopup] = useState(false);

  const updateSpStatus = async (serviceProviderId, status) => {
    ApiRequestPost.updateSpStatus(serviceProviderId, status)
      .then((res) => {
        if (res.status) {
          enqueueSnackbar(res.message, {
            variant: "success",
          });
          getAllServiceProviderList();
        } else {
          enqueueSnackbar(res.message, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      })
      .finally(() => {
       
      });
  };

  const getAllServiceProviderList = () => {
    setLoading(true);
    ApiRequestGet.getAllSp()
      .then((res) => {
        if (res.success) {
          setServiceProviderList(res?.data);
        }
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const createServiceProvider = (spName, sPType) => {
    setLoading(true);
    ApiRequestPost.createServiceProvider(spName, sPType)
      .then((res) => {
        if (res.success) {
          enqueueSnackbar("Client Added Successfully", {
            variant: "success",
          });
          getAllServiceProviderList();
          setShowAddSPPopup(false);
        } else {
            enqueueSnackbar(res.message, {
                variant: "error",
              });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
        
      });
  };

  useEffect(() => {
    getAllServiceProviderList();
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rose",
      }}
    >
      <DialogComponent
        showPopup={showAddSPPopup}
        onClickCloseDialog={() => {
          setShowAddSPPopup(false);
        }}
        heading={"Add Service Provider"}
      >
        <AddServiceProviderPopup onClickAddSp={createServiceProvider} loading={loading} />
      </DialogComponent>

      <Header
        heading={"Service Providers"}
        showAddButton={true}
        addButtonText={"Add SP"}
        onClickAddButton={() => {
          setShowAddSPPopup(true);
        }}
      >
        {/* <FilterPopup
          searchFiledPlaceHolder={"Service Type"}
          onClickClear={() => {
            getAllServiceProviderList();
          }}
          onClickSearch={(searchServiceTypeValue) => {
            // getAllServiceProviderList(searchServiceTypeValue);
          }}
        /> */}
      </Header>

    {loading ? (<Loader />) :(
           <TableComponent
           tableHeaders={ServiceProviderListHeader}
           tableData={serviceProviderList}
           onClickSwitchButton={(serviceProvider) => {
            console.log("Check -> ", serviceProvider.serviceProviderId);
            updateSpStatus(serviceProvider.serviceProviderId,!serviceProvider.status)
           }}
           showPagination={false}
         />
    ) }
     
    </div>
  );
};

export default ServiceProviders;
