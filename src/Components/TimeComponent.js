import React, {useEffect, useState} from 'react';
import { Skeleton, Typography } from '@mui/material';

/**
 * Komponente zur Anzeige der aktuellen Zeit und der Zeit seit dem letzten Update.
 * 
 * @param {string} props.lastUpdated - Das Datum und die Uhrzeit des letzten Updates.
 * @returns {JSX.Element} Die gerenderte TimeComponent.
 */

const TimeComponent = ({ lastUpdated }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [timeSinceUpdate, setTimeSinceUpdate] = useState(null);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      if (lastUpdated !== null) {
        const secondsAgo = Math.round((new Date() - new Date(lastUpdated)) / 1000);
        setTimeSinceUpdate(`${secondsAgo} seconds ago`);
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [lastUpdated]);

  return (
    <div style={{ margin: '10px' }}>
      <Typography variant='subtitle1' align='center' fontSize='20pt' color="black">
        {currentTime}
      </Typography>
      {timeSinceUpdate ? (
        <Typography variant='subtitle2' align='center' color='gray'>
          Last Updated: {timeSinceUpdate}
        </Typography>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Skeleton variant="text" width={100} height={20} animation="wave" />
        </div>
      )}
    </div>
  );
};

export default TimeComponent;
