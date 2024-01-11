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
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.5)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{height: '500px'}}>
      {' '}
      {/* Höhe nach Bedarf einstellen */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HumidityTemperatureChart;
