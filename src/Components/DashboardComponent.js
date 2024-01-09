import React from 'react';
import {useMQTT} from './useMQTT';
import {Container, Grid, Card, CardContent, Typography} from '@mui/material';
import TimeComponent from './TimeComponent';
import ChartComponent from './ChartComponent';
import CardComponent from './Card';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AirIcon from '@mui/icons-material/Air';

const MQTTComponent = () => {
  const {temperature, humidity, pressure, feelsLike, dataPoints, lastUpdated} = useMQTT();

  return (
    <Container maxWidth='lg' sx={{backgroundColor: '#FFFFFF', padding: 3}}>
      <Typography variant='h4' gutterBottom align='center' color='black'>
        Sensor Dashboard
      </Typography>
      <TimeComponent lastUpdated={lastUpdated} />
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        <Grid item xs={12} sm={6}>
          <CardComponent title='Temperature' value={temperature} unit={'°C'} color='#F04438' icon={<DeviceThermostatIcon />} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardComponent title={'Humidity'} value={humidity} unit={'%'} color='#10A7B9' icon={<WaterDropIcon />} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardComponent title={'Feels Like'} value={feelsLike} unit={'°C'} color='#F79009' icon={<EmojiEmotionsIcon />} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardComponent title={'Pressure'} value={pressure} unit={'hPa'} color='#6366F1' icon={<AirIcon />} />
        </Grid>

        <Grid item xs={12}>
          <ChartComponent dataPoints={dataPoints}></ChartComponent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MQTTComponent;
