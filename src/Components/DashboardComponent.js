import React from 'react';
import {useMQTT} from './useMQTT';
import {Container, Grid, Card, CardContent, Typography} from '@mui/material';
import TimeComponent from './TimeComponent';
import ChartComponent from './ChartComponent';
import CardComponent from './Card';

const MQTTComponent = () => {
  const {temperature, humidity, pressure, feelsLike, dataPoints, lastUpdated} = useMQTT();

  return (
    <Container maxWidth='lg' sx={{backgroundColor: '#f0f8ff', padding: 3}}>
      <Typography variant='h4' gutterBottom align='center' color='black'>
        Sensor Dashboard
      </Typography>
      <TimeComponent lastUpdated={lastUpdated} />
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid item xs={12} sm={6}>
          <CardComponent title={'Temperature'} value={temperature} unit={'°C'} color='#C1E7E3' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardComponent title={'Humidity'} value={humidity} unit={'%'} color='#AEC6CF' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardComponent title={'Feels Like'} value={feelsLike} unit={'°C'} color='#DABFDE' />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardComponent title={'Pressure'} value={pressure} unit={'hPa'} color='#CFCFC4' />
        </Grid>

        <Grid item xs={12}>
          <ChartComponent dataPoints={dataPoints}></ChartComponent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MQTTComponent;
