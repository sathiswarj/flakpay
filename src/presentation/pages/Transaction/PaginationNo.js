import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationNo({ totalPages, getPage, pg }) {
  // const [page, setPages] = React.useState(1);
  const handleChange = (event, value) => {
    getPage(value);

    console.log("value from pagination:", value);
  };
  return (
    <Stack
      spacing={2}
      style={{ display: "flex", width: "500px", padding: "10px" }}
    >
      <Pagination
        color="primary"
        count={totalPages}
        page={pg}
        onChange={handleChange}
      />
    </Stack>
  );
}
export default PaginationNo;
