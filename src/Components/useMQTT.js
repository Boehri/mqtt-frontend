import {useEffect, useState, useRef} from 'react';
import mqtt from 'mqtt';

export const useMQTT = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [dataPoints, setDataPoints] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // useRef, um den aktuellen Wert von Temperatur und Luftfeuchtigkeit zu speichern
  const currentTemperature = useRef(null);
  const currentHumidity = useRef(null);

  useEffect(() => {
    const mqttClient = mqtt.connect('wss://5d4607be694c4b98bdfdab8fd5f11847.s2.eu.hivemq.cloud:8884/mqtt', {
      connectTimeout: 4000,
      username: process.env.REACT_APP_HIVEMQ_USERNAME,
      password: process.env.REACT_APP_HIVEMQ_PASSWORD,
    });

    mqttClient.on('connect', () => {
      mqttClient.subscribe(['raspi/in/temp', 'raspi/in/humi', 'raspi/in/press', 'raspi/in/temp/feelsLike']);
      console.log('Connected to HiveMQ');
    });

    mqttClient.on('message', (topic, message) => {
      const value = JSON.parse(message.toString());
      const now = new Date();
      setLastUpdated(now);
      switch (topic) {
        case 'raspi/in/temp':
          currentTemperature.current = value.temperature;
          setTemperature(value.temperature.toFixed(1));
          setDataPoints((points) => [...points, {time: now, temperature: currentTemperature.current, humidity: currentHumidity.current}]);
          break;
        case 'raspi/in/humi':
          currentHumidity.current = value.humidity;
          setHumidity(value.humidity.toFixed(1));
          break;
        case 'raspi/in/press':
          setPressure(Math.round(value.pressure));
          break;
        case 'raspi/in/temp/feelsLike':
          setFeelsLike(value.feelsLike.toFixed(1));
          break;
        default:
          break;
      }

      // Aktualisieren von dataPoints, wenn sowohl Temperatur als auch Feuchtigkeit verfügbar sind
    });

    return () => {
      mqttClient.end();
    };
  }, []); // Leeres Array als Abhängigkeiten, um den Hook nur beim Mounten auszuführen

  return {temperature, humidity, pressure, feelsLike, dataPoints, lastUpdated};
};
