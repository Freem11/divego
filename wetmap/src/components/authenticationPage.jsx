import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SignUpRoute from './signUp';
import AuthticationPage from './authentication';

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
        <Box sx={{ p: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index:    PropTypes.number.isRequired,
  value:    PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    'id':              `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AuthenticationPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AuthticationPage />

      <Box sx={{ width: '100vw', height: '100vh' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'lightgrey', width: '100vw' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              sx: { backgroundColor: 'lightgray', height: 2 },
            }}
            sx={{
              '& button.Mui-selected': { color: 'lightgray', width: '50%' },
              'backgroundColor':         '#538dbd',
              'fontFamily':              'Patrick Hand',
            }}
          >
            <Tab
              label="Sign In"
              {...a11yProps(0)}
              sx={{
                fontFamily: 'Patrick Hand',
                color:      'darkgray',
                width:      '50%',
                fontSize:   '2.5vw',
              }}
            />
            <Tab
              label="Sign Up"
              {...a11yProps(1)}
              sx={{
                fontFamily: 'Patrick Hand',
                color:      'darkgray',
                width:      '50%',
                fontSize:   '2.5vw',
              }}
            />
          </Tabs>
        </Box>
        <TabPanel
          value={value}
          index={0}
          style={{ backgroundColor: '#538dbd', height: '100%' }}
        >
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          style={{ backgroundColor: '#538dbd', height: '100%' }}
        >
          <SignUpRoute />
        </TabPanel>
      </Box>
    </>
  );
}
