import React from "react";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { UserTableHeader } from "../../../data/local/constants/TableHeaders";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";
import TableComponent from "../../components/Table";
import { ApiRequestPost } from "../../../data/network/services/ApiRequestPost";
import { enqueueSnackbar } from "notistack";
import DialogComponent from "../../components/dialog";
import AddUserDetails from "./addUserDetails";
import Loader from "../../components/loader/loader";

function User () {

    const [tableData, setTableData] = useState([]);
    const [showAddUser, setShowAddUser] = useState(false);
    const [loading, setLoading] = useState(false);

    const updateUserStatus = async (userId, status) => {
        ApiRequestPost.updateUserStatus(userId, status)
          .then((res) => {
            if (res.status) {
              enqueueSnackbar(res.message, {
                variant: "success",
              });
              getAllUsersList();
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
      };

    const getAllUsersList = () => {
      setLoading(true);
        ApiRequestGet.getUserList()
          .then((res) => {
            if (res.status) {
              setTableData(res.data);
            //   setTableCurrentPage(res.data.totalPages);
            } else {
              setTableData([]);
            }
          })
          .catch((err) => {
            console.error(err);
            setTableData([]);
          })
          .finally(() => {
            setLoading(false);
          });
      };

      useEffect(() => {
        getAllUsersList();
      }, []);

    return (
        <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rose",
          }}>
            <Header
        heading={"User"}
        showAddButton={true}
        addButtonText={"Add User"}
        onClickAddButton={() => {
          setShowAddUser(true);
        }}
      >
        </Header>

        <DialogComponent
        showPopup={showAddUser}
        onClickCloseDialog={() => {
          setShowAddUser(false);
        }}
        heading={"Add User"}
      >
        <AddUserDetails  onUserAdded={() => {
                setShowAddUser(false); 
                getAllUsersList(); 
            }} />
        </DialogComponent>

        {loading ? (<Loader />) :(
        <TableComponent
        tableHeaders={UserTableHeader}
        tableData={tableData}
        showPagination = {false}
        onClickSwitchButton={(user) => {
          
          updateUserStatus(user.userId, !user.status);
        }}
      />
    ) }
        </div>
    )
}

export default User;