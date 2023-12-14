import React from 'react';
import {Card, CardContent, Typography, Box} from '@mui/material';
import {Thermostat} from '@mui/icons-material';

const TemperatureCard = ({temperature}) => (
  <Card variant='outlined' sx={{backgroundColor: '#e3f2fd'}}>
    <CardContent>
      <Box display='flex' alignItems='center'>
        <Thermostat color='secondary' sx={{fontSize: 40, marginRight: 2}} />
        <Typography variant='h6'>Temperature</Typography>
        <Typography variant='body1'>{temperature ? `${temperature}°C` : 'Loading...'}</Typography>
      </Box>
    </CardContent>
  </Card>
);

export default TemperatureCard;
