import React from 'react';
import {Card, CardContent, Typography, Box} from '@mui/material';
import {Opacity} from '@mui/icons-material';

const HumidityCard = ({humidity}) => (
  <Card variant='outlined' sx={{backgroundColor: '#e0f2f1'}}>
    <CardContent>
      <Box display='flex' alignItems='center'>
        <Opacity color='primary' sx={{fontSize: 40, marginRight: 2}} />
        <Typography variant='h6'>Humidity</Typography>
        <Typography variant='body1'>{humidity ? `${humidity}%` : 'Loading...'}</Typography>
      </Box>
    </CardContent>
  </Card>
);

export default HumidityCard;
