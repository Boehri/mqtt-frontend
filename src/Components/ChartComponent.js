import React from 'react';
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HumidityTemperatureChart = ({dataPoints}) => {
  const chartData = {
    labels: dataPoints.map((point) => point.time.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})),
    datasets: [
      {
        label: 'Humidity (%)',
        data: dataPoints.map((point) => point.humidity),
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4,
      },
      {
        label: 'Temperature (°C)',
        data: dataPoints.map((point) => point.temperature),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      point: {
        radius: 0, // Reduces point size for a cleaner look
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    
      <Line data={chartData} options={options} />

  );
};

export default HumidityTemperatureChart;
