import React from 'react';
import {useMQTT} from './useMQTT';
import {Container, Grid, Card, Typography, ToggleButtonGroup, ToggleButton} from '@mui/material';
import TimeComponent from './TimeComponent';
import ChartComponent from './ChartComponent';
import ValueCard from './ValueCard';
import SugCard from './SugCard';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AirIcon from '@mui/icons-material/Air';
import { useState } from 'react';

const MQTTComponent = () => {
  const {indoorData, outdoorData} = useMQTT(); 
  const [selectedEnvironment, setSelectedEnvironment] = useState('indoor'); 

  const handleEnvironmentChange = (event, newEnvironment) => {
    if (newEnvironment !== null) {
      setSelectedEnvironment(newEnvironment);
    }
  };

  const dataToShow = selectedEnvironment === 'indoor' ? indoorData : outdoorData;

  return (
    <Container maxWidth='lg' sx={{backgroundColor: '#FFFFFF', padding: 3}}>
      <Card sx={{padding: 2, marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', '@media (max-width: 765px)': {flexDirection: 'column'}}}>
        <ToggleButtonGroup color='primary' value={selectedEnvironment} exclusive onChange={handleEnvironmentChange} aria-label='Environment' sx={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
          <ToggleButton value='indoor'>Innen</ToggleButton>
          <ToggleButton value='outdoor'>Außen</ToggleButton>
        </ToggleButtonGroup>

        <Typography variant='h4' color='black'>
          Sensor Dashboard
        </Typography>
        <TimeComponent lastUpdated={dataToShow.lastUpdated} />
      </Card>

      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        
        <Grid item xs={12} sm={6}>
          <ValueCard title='Temperature' avgValue={dataToShow.avgTemperature} value={dataToShow.temperature} unit={'°C'} color='#F04438' icon={<DeviceThermostatIcon />} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ValueCard title={'Humidity'} avgValue={dataToShow.avgHumidity} value={dataToShow.humidity} unit={'%'} color='#10A7B9' icon={<WaterDropIcon />} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ValueCard title={'Pressure'} avgValue={dataToShow.avgPressure} value={dataToShow.pressure} unit={'hPa'} color='#6366F1' icon={<AirIcon />} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ValueCard title={'Feels Like'} avgValue={dataToShow.avgFeelsLike} value={dataToShow.feelsLike} unit={'°C'} color='#F79009' icon={<EmojiEmotionsIcon />} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <SugCard sug={dataToShow.suggestion}></SugCard>
        </Grid>

        <Grid item xs={12}>
          <ChartComponent dataPoints={dataToShow.dataPoints}></ChartComponent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MQTTComponent;
