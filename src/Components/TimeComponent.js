import React, {useEffect, useState} from 'react';
import {Typography} from '@mui/material';

const TimeComponent = ({lastUpdated}) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [timeSinceUpdate, setTimeSinceUpdate] = useState('');

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      if (lastUpdated !== undefined) {
        const secondsAgo = Math.round((new Date() - new Date(lastUpdated)) / 1000);
        setTimeSinceUpdate(`${secondsAgo} seconds ago`);
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [lastUpdated]);

  return (
    <>
      <Typography variant='subtitle1' align='center' fontSize='20pt' color="black">
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

export default TimeComponent;
