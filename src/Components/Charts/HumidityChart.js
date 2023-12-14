import React from 'react';
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';

const HumidityChart = ({dataPoints}) => {
  const chartData = {
    labels: dataPoints.map((point) => point.time.toLocaleTimeString()),
    datasets: [
      {
        label: 'Humidity (%)',
        data: dataPoints.map((point) => point.humidity),
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default HumidityChart;
