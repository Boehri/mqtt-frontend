import React from 'react';
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';

const TemperatureChart = ({dataPoints}) => {
  const chartData = {
    labels: dataPoints.map((point) => point.time.toLocaleTimeString()),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: dataPoints.map((point) => point.temperature),
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default TemperatureChart;
