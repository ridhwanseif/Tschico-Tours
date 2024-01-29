// import React, { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
import ZanzibarNorth from './zanzibarNorth';
import ZanzibarSouth from './zanzibarSouth';
import ZanzibarUrban from './zanzibarUrban';
import ZanzibarDtoD from './zanzibarDtoD';
// // import './YourStyles.css'; // Import your CSS file

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 5 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function ResponsiveTabs() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div>
//       <div className="selectContainer">
//         <div className='row'>
//           <div className='col-md-6'>
//             <h3>Zanzibar Destination Area:</h3>
//           </div>
//           <div className='col-md-4'>
//             <select value={value} onChange={e => handleChange(null, parseInt(e.target.value))}>
//               <option value={0}>North</option>
//               <option value={1}>South</option>
//               <option value={2}>Central/Urban</option>
//               <option value={3}>Destination</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <div className="tabContainer">
//           <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//             <Tab label="North" {...a11yProps(0)} />
//             <Tab label="South" {...a11yProps(1)} />
//             <Tab label="Central/Urban" {...a11yProps(2)} />
//             <Tab label="Destination" {...a11yProps(3)} />
//           </Tabs>
//         </div>
//       </Box>
//       <TabPanel value={value} index={0}>
//         <ZanzibarNorth />
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <ZanzibarSouth />
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         <ZanzibarUrban />
//       </TabPanel>
//       <TabPanel value={value} index={3}>
//         <ZanzibarDtoD />
//       </TabPanel>
//     </div>
//   );
// }

import React from 'react';
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 5 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DestionationTab = () => {
  const { tab } = useParams(); // Get the tab parameter from the URL
  const initialTab = parseInt(tab) || 0; // Convert the tab parameter to a number, default to 0

  const [value, setValue] = React.useState(initialTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="selectContainer">
        <div className="row">
          <div className="col-md-6">
            <h3>Zanzibar Destination Area:</h3>
          </div>
          <div className="col-md-4">
            {/* Update the link to use the new tab value */}
            <select
              value={value}
              onChange={(e) => handleChange(null, parseInt(e.target.value))}
            >
              <option value={0}>North</option>
              <option value={1}>South</option>
              <option value={2}>Central/Urban</option>
              <option value={3}>Destination</option>
            </select>
          </div>
        </div>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <div className="tabContainer">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="North" {...a11yProps(0)} />
            <Tab label="South" {...a11yProps(1)} />
            <Tab label="Central/Urban" {...a11yProps(2)} />
            <Tab label="Destination" {...a11yProps(3)} />
          </Tabs>
        </div>
      </Box>
      <TabPanel value={value} index={0}>
        <ZanzibarNorth />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ZanzibarSouth />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ZanzibarUrban />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ZanzibarDtoD />
      </TabPanel>
    </div>
  );
};

export default DestionationTab;
