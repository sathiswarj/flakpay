import React, { useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import TableViewMoreButton from "../Table/tableViewMoreButton";
import ButtonComponent from "../button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // marginTop: theme.spacing(2),
    },
  },
}));

const PaginationComponent = ({
  totalPages,
  currentPage,
  onChangeCurrentPage,
  currentPageSize,
  onChangeCurrentPageSize,
}) => {
  const [goToPageNo, setGoToPageNo] = useState(0);
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid #E3E3E3",
        width: "97.3%",
        height: "60px",
        marginLeft: "18px",
        marginTop: "5px",
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
      }}
    >
      <span
        style={{
          display: "flex",
          gap: 4,
          marginLeft: 3,
          alignItems: "center",
        }}
      >
        <input
          onChange={(e) => {
            if (
              e.target.value === "0" ||
              e.target.value === "-1" ||
              Number(e.target.value) !== Number(e.target.value)
            ) {
              alert("You typed wrong page no!");
              e.target.value = "";
              setGoToPageNo(1);
            } else {
              setGoToPageNo(Number(e.target.value));
            }
          }}
          value={goToPageNo}
          style={{
            width: 45,
            border: "1px solid grey",
            borderRadius: 3,
            paddingLeft: 10,
            height: 30,
          }}
          type="search "
          placeholder="Page.."
        />
        <ButtonComponent
          label={"Go"}
          onClick={() => {
            goToPageNo !== "" && totalPages !== 1 && onChangeCurrentPage(goToPageNo);
          }}
        />
      </span>

      <div className={classes.root}>
        <Pagination
          count={totalPages}
          page={currentPage}
          defaultPage={currentPage}
          boundaryCount={2}
          variant="outlined"
          onChange={(event, value) => {
            onChangeCurrentPage(value);
            setGoToPageNo("");
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", height: 30 }}>
        <select
          value={currentPageSize}
          onChange={(event) => {
            onChangeCurrentPageSize(event.target.value);
          }}
          style={{
            borderRadius: 3,
            border: "1px solid grey",
            marginRight: 50,
            padding: "3px 8px",
            height: 30,
          }}
        >
          {[10, 15, 20, 25, 30, 35, 40, 45, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaginationComponent;
