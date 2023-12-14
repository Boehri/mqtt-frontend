import React, {useEffect, useState} from 'react';
import mqtt from 'mqtt';
import {Container, Typography, Card, CardContent, Grid, Box} from '@mui/material';
import {Thermostat, Opacity} from '@mui/icons-material';
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';

const ChartComponent = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const mqttClient = mqtt.connect('wss://5d4607be694c4b98bdfdab8fd5f11847.s2.eu.hivemq.cloud:8884/mqtt', {
      connectTimeout: 4000,
      username: 'raspi',
      password: '1raspberryPi',
    });

    mqttClient.on('connect', () => {
      console.log('Connected to HiveMQ');
      mqttClient.subscribe(['raspi/temp', 'raspi/humi']);
    });

    mqttClient.on('message', (topic, message) => {
      const data = JSON.parse(message.toString());
      const now = new Date();
      if (topic === 'raspi/temp') {
        setTemperature(data.temperature);
        setDataPoints((points) => [...points, {time: now, temperature: data.temperature, humidity: points.length > 0 ? points[points.length - 1].humidity : null}]);
      } else if (topic === 'raspi/humi') {
        setHumidity(data.humidity);
        setDataPoints((points) => [...points, {time: now, temperature: points.length > 0 ? points[points.length - 1].temperature : null, humidity: data.humidity}]);
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  const chartData = {
    labels: dataPoints.map((point) => point.time.toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: dataPoints.map((point) => point.temperature),
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Humidity (%)',
        data: dataPoints.map((point) => point.humidity),
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  return (
    <Container maxWidth='sm' sx={{marginTop: 4, backgroundColor: '#f5f5f5', padding: 3, borderRadius: 2}}>
      {/* Existing code for displaying temperature and humidity cards */}

      {/* Chart to display data */}
      <Card variant='outlined' sx={{marginY: 4}}>
        <CardContent>
          <Line data={chartData} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default ChartComponent;
