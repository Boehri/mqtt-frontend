import React from 'react';
import {Card, CardContent, Typography, Box, Skeleton} from '@mui/material';
import {Opacity} from '@mui/icons-material';

const CardComponent = ({title, value, unit, color}) => (
    <Card variant='outlined' sx={{backgroundColor: color, border: 'none'}}>
        <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
                {title}
      </Typography>
      {value ? (
        <Typography fontSize='45pt' color='text.secondary' sx={{ textAlign: 'center' }}>
            {value.toFixed(1)}
            {unit}
        </Typography>
      ) : (
        <Skeleton variant='text' width={100} height={80} animation='wave' />
      )}
    </CardContent>
  </Card>
);

export default CardComponent;
