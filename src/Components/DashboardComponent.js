// import React, {useEffect, useState} from 'react';
// import {useMQTT} from './useMQTT';
// import {Container, Grid} from '@mui/material';
// import TemperatureChart from './Charts/TemperatureChart';
// import HumidityChart from './Charts/HumidityChart';
// import TemperatureCard from './Cards/TemperatureCard';
// import HumidityCard from './Cards/HumidityCard';
// import {Time} from './Time';

// export const DashboardComponent = () => {
//   const {temperature, humidity, lastUpdated} = useMQTT();
//   const [dataPoints, setDataPoints] = useState([]);

//   useEffect(() => {
//     if (temperature !== null && humidity !== null) {
//       const newPoint = {
//         time: new Date(), // Aktuelle Zeit
//         temperature: temperature,
//         humidity: humidity,
//       };
//       setDataPoints((prevPoints) => [...prevPoints, newPoint]);
//     }
//     console.log(dataPoints)
//   }, []);

//   return (
//     <Container maxWidth='sm'>
//       <Time lastUpdated={lastUpdated} />
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TemperatureCard temperature={temperature} />
//         </Grid>
//         {/* <Grid item xs={12} sm={6}>
//           <HumidityCard humidity={humidity} />
//         </Grid>
//         <Grid item xs={12}>
//           <TemperatureChart dataPoints={dataPoints} />
//         </Grid>
//         <Grid item xs={12}>
//           <HumidityChart dataPoints={dataPoints} />
//         </Grid> */}
//       </Grid>
//     </Container>
//   );
// };

// export default DashboardComponent;