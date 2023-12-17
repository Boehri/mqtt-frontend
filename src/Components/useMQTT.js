import {useEffect, useState} from 'react';
import mqtt from 'mqtt';

export const useMQTT = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [dataPoints, setDataPoints] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const mqttClient = mqtt.connect('wss://5d4607be694c4b98bdfdab8fd5f11847.s2.eu.hivemq.cloud:8884/mqtt', {
      connectTimeout: 4000,
      username: 'raspi',
      password: '1raspberryPi',
    });

    mqttClient.on('connect', () => {
      mqttClient.subscribe(['raspi/temp', 'raspi/humi', 'raspi/press', 'raspi/temp/feelsLike']);
    });

    mqttClient.on('message', (topic, message) => {
      const now = new Date();
      const value = JSON.parse(message.toString());
      if (topic === 'raspi/temp') {
        setTemperature(value.temperature);
        setDataPoints((points) => [...points, {time: now, temperature: value.temperature, humidity: humidity}]);
      } else if (topic === 'raspi/humi') {
        setHumidity(value.humidity);
        setDataPoints((points) => [...points, {time: now, temperature: temperature, humidity: value.humidity}]);
      } else if (topic === 'raspi/press') {
        setPressure(value.pressure);
      } else if (topic === 'raspi/temp/feelsLike') {
        setFeelsLike(value.feelsLike);
      }
      setLastUpdated(new Date());
    });

    return () => {
      mqttClient.end();
    };
  }, [temperature, humidity, pressure, feelsLike]);

  return {temperature, humidity, dataPoints, lastUpdated, pressure, feelsLike};
};
