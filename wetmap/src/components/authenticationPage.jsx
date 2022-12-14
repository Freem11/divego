import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SignInRoute from "./signIn";
import SignUpRoute from "./signUp";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AuthenticationPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh"}}>
      <Box sx={{ borderBottom: 1, borderColor: "lightgrey", width: "100%"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="gray"
          TabIndicatorProps={{sx:{backgroundColor: 'gray', height: 2}}}
          sx={{
            "& button.Mui-selected": { color: "darkgray" },
            backgroundColor: "#33586A",
            fontFamily: "Permanent Marker",
          }}
        >
          <Tab label="Sign In" {...a11yProps(0)} sx={{fontFamily: "Permanent Marker", color: "gray", width: "30%"}}/>
          <Tab label="Sign Up" {...a11yProps(1)} sx={{fontFamily: "Permanent Marker", color: "gray", width: "30%"}}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} style={{backgroundColor: '#33586A', height: "100%"}}>
       <SignInRoute/>
      </TabPanel>
      <TabPanel value={value} index={1} style={{backgroundColor: '#33586A', height: "100%"}}>
      <SignUpRoute/>
      </TabPanel>
    </Box>
  );
}
