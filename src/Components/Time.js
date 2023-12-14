import React, {useEffect, useState} from 'react';
import {Typography} from '@mui/material';

export const Time = ({lastUpdated}) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [timeSinceUpdate, setTimeSinceUpdate] = useState('');

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      if (lastUpdated) {
        const secondsAgo = Math.round((new Date() - lastUpdated) / 1000);
        setTimeSinceUpdate(`${secondsAgo} s ago`);
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [lastUpdated]);

  return (
    <>
      <Typography variant='subtitle1' align='center' fontSize='20pt'>
        {currentTime}
      </Typography>
      {timeSinceUpdate && (
        <Typography variant='subtitle2' align='center' color='gray'>
          Last Updated: {timeSinceUpdate}
        </Typography>
      )}
    </>
  );
};
