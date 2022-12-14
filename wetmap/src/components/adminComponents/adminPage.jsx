import * as React from 'react';
import { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DiveSiteVetting from "./diveSiteVetting"
import PhotoVettingTable from "./photoVettingTable"
import { AdminContext } from "../contexts/adminContext";
import { useNavigate } from "react-router-dom";

const AdminPage = React.memo(() => {

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  let navigate = useNavigate();
  const { adminStat } = useContext(AdminContext);

  useEffect(() => {
    if (!adminStat) {
      navigate("/")
    }
  }, [])

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

 function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Animal Photo Validation" {...a11yProps(0)} />
          <Tab label="Dive Site Validation" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PhotoVettingTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DiveSiteVetting />
      </TabPanel>
    </Box>
  );
}

return (<BasicTabs />)
})

export default AdminPage;