import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ClientBasicDetails from "./basicDetails";
import {
  ClientDetailsPopupHeader,
  ClientTableHeader,
} from "../../../../data/local/constants/TableHeaders";
import ClientPayinServiceDetails from "./payinDetails";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ClientDetailsPopupHome = ({ data,refreshData }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    setValue(0);
  }, [data]);
  
  return (
    <Box sx={{ paddingTop: 1, paddingLeft: 2, paddingRight: 2, height: "100%",overflow:"auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab
            label="Basic Details"
            {...a11yProps(0)}
            style={{ marginRight: 15, textTransform: "none" }}
          />
          <Tab
            label="Service Providers"
            {...a11yProps(1)}
            style={{ marginRight: 15, textTransform: "none" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ClientBasicDetails data={data} headers={ClientDetailsPopupHeader} refreshData={refreshData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ClientPayinServiceDetails data={data} refreshData={refreshData} />
      </CustomTabPanel>
    </Box>
  );
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default ClientDetailsPopupHome;
