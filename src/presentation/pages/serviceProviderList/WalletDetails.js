import * as React from "react";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { enqueueSnackbar } from "notistack";
import "./Style.css";
import "../../pages/Transaction/transaction.css";
import Header from "../../../presentation/components/Header";
import FilterPopup from "../../../presentation/components/Popup";
import TableComponent from "../../../presentation/components/Table";
import { WalletTableHeader } from "../../../data/local/constants/TableHeaders";
import { ApiRequestGet } from "../../../data/network/services/ApiRequestGet";

function WalletDetails() {
  const [tableData, setTableData] = useState([]);
  const [tableDataTotalNoOfPages, setTableDataTotalNoOfPages] = useState(0);
  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableCurrentPageSize, setTableCurrentPageSize] = useState(10);

  const [utr, setUtr] = useState("");

  const getWalletTransactions = (page, size, utr) => {
    ApiRequestGet.walletTransactionUnique(page, size, utr)
      .then((res) => {
        console.log("Transaciton data in-> kkl", res);
        if (res.status) {
          setTableData(res?.data?.transactions);

          setTableDataTotalNoOfPages(res?.data?.totalPages);
        } else {
          setTableData([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setTableData([]);
      });
  };

  const onClickDownload = () => {
    ApiRequestGet.downloadTransactionsWallet(tableCurrentPage, tableCurrentPageSize)

      .then((res) => {
        saveAs(res, "transaction.csv");
        enqueueSnackbar("Download Successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      })
      .finally(() => {});
  };

  useEffect(() => {
    getWalletTransactions();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rose",
      }}
    >
      <Header
        heading={"Wallet Transactions"}
        showDownloadButton={true}
        onClickDownloadButton={onClickDownload}
      >
        <FilterPopup
          searchFiledPlaceHolder={"UTR"}
          onClickClear={() => {
            getWalletTransactions();
          }}
          onClickSearch={(utr) => {
            getWalletTransactions(tableCurrentPage, tableCurrentPageSize, utr);
          }}
        />
      </Header>

      <TableComponent
        tableHeaders={WalletTableHeader}
        tableData={tableData}
        tableTotalPages={tableDataTotalNoOfPages}
        tableCurrentPage={tableCurrentPage}
        tableCurrentPageSize={tableCurrentPageSize}
        onChangeCurrentPage={(page) => {
          setTableCurrentPage(page);
          getWalletTransactions(page, tableCurrentPageSize, utr);
        }}
        onChangeCurrentPageSize={(size) => {
          setTableCurrentPageSize(size);
          console.log("size --> ", size)
          getWalletTransactions(tableCurrentPage, size, utr);
        }}
      />
    </div>
  );
}
export default WalletDetails;
