import {CardContent, Card, Stack, Typography} from '@mui/material';

const MQTTInfo = ({showInfo}) => {
  return showInfo === true ? (
    <Card>
      <CardContent>
        <Stack>
          <Typography color='text.secondary' variant='overline'>
            Information about the Project
          </Typography>
          <Typography fontSize='15pt' color='text.secondary' sx={{textAlign: 'left'}}>
            This project is an IoT system leveraging MQTT for real-time data transfer. It comprises two Raspberry Pi devices with SenseHAT sensors — one located indoors and the other outdoors. These devices publish environmental data such as temperature to a HiveMQ broker, which is a highly scalable and reliable MQTT platform.
            <br />
            <br />
            The HiveMQ broker facilitates the communication between the Raspberry Pis and various services. The "FeelsLike" service computes a 'feels like' temperature based on the raw data, while the "Vorschlags-Dienst" suggests actions based on the environmental conditions.
            <br />
            <br />
            A Frontend WebApp displays the data in an user-friendly interface, allowing for real-time updates and historical data analysis. Data is archived via the "Archivierungsdienst", which stores it in a MongoDB database, ensuring that historical data is kept for analysis. The "Durchschnittsdienst" calculates average values, which are then displayed on an LCD screen connected to an additional
            Raspberry Pi.
            <br />
            <br />
            This setup exemplifies a practical application of MQTT in IoT, enabling efficient and real-time data processing and visualization.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  ) : null;
};

export default MQTTInfo;
