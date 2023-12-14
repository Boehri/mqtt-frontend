import React, {useEffect, useState} from 'react';
import mqtt from 'mqtt';
import {Container, Typography, Card, CardContent, Grid, Box} from '@mui/material';
import {Thermostat, Opacity} from '@mui/icons-material';

const MQTTComponent = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [lastUpdated, setLastUpdated] = useState(null);
  const [timeSinceUpdate, setTimeSinceUpdate] = useState('');

  useEffect(() => {
    const mqttClient = mqtt.connect('wss://5d4607be694c4b98bdfdab8fd5f11847.s2.eu.hivemq.cloud:8884/mqtt', {
      connectTimeout: 4000,
      username: 'raspi',
      password: '1raspberryPi',
    });

    mqttClient.on('connect', () => {
      console.log('Connected to HiveMQ');
      mqttClient.subscribe(['raspi/temp', 'raspi/humi']);
    });

    mqttClient.on('message', (topic, message) => {
      const data = JSON.parse(message.toString());
      if (topic === 'raspi/temp') {
        setTemperature(data.temperature);
      } else if (topic === 'raspi/humi') {
        setHumidity(data.humidity);
      }
      setLastUpdated(new Date());
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  useEffect(() => {
    const updateTimer = setInterval(() => {
      if (lastUpdated) {
        const now = new Date();
        const secondsAgo = Math.round((now - lastUpdated) / 1000);
        setTimeSinceUpdate(`${secondsAgo} s ago`);
      }
    }, 1000);

    return () => {
      clearInterval(updateTimer);
    };
  }, [lastUpdated]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <Container maxWidth='sm' sx={{marginTop: 4, backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2}}>
      <Typography variant='h4' gutterBottom align='center' color='primary'>
        Sensor Dashboard
      </Typography>
      <Typography variant='subtitle1' align='center' fontSize='20pt'>
        {currentTime}
      </Typography>
      {timeSinceUpdate && (
        <Typography variant='subtitle2' align='center' color='gray'>
          Last Updated: {timeSinceUpdate}
        </Typography>
      )}
      <Grid container spacing={2} justifyContent='left' alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Card variant='outlined' sx={{backgroundColor: '#e3f2fd'}}>
            <CardContent>
              <Box display='flex' alignItems='center'>
                <Thermostat color='secondary' sx={{fontSize: 40, marginRight: 2}} />
                <div style={{textAlign: 'left'}}>
                  <Typography variant='h6'>Temperature</Typography>
                  <Typography variant='body1'>{temperature ? `${temperature}°C` : 'Loading...'}</Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant='outlined' sx={{backgroundColor: '#e0f2f1'}}>
            <CardContent>
              <Box display='flex' alignItems='center'>
                <Opacity color='primary' sx={{fontSize: 40, marginRight: 2}} />
                <div style={{textAlign: 'left'}}>
                  <Typography variant='h6'>Humidity</Typography>
                  <Typography variant='body1'>{humidity ? `${humidity}%` : 'Loading...'}</Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MQTTComponent;
