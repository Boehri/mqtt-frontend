// import { useEffect, useState } from 'react';
// import mqtt from 'mqtt';

// export const useMQTT = () => {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     const mqttClient = mqtt.connect('wss://5d4607be694c4b98bdfdab8fd5f11847.s2.eu.hivemq.cloud:8884/mqtt', {
//       connectTimeout: 4000,
//       username: 'raspi',
//       password: '1raspberryPi',
//     });

//     mqttClient.on('connect', () => {
//       console.log('Connected to HiveMQ');
//       mqttClient.subscribe(['raspi/temp', 'raspi/humi']);
//     });

//     mqttClient.on('message', (topic, message) => {
//       const payload = JSON.parse(message.toString());
//       const key = topic.split('/')[1];
//       setData(prevData => ({ ...prevData, [key]: payload[key] }));
//     });

//     return () => {
//       mqttClient.end();
//     };
//   }, []);

//   return data;
// };
