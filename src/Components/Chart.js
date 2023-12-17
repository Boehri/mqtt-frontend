import React from 'react';
import {Line} from 'react-chartjs-2';

const ChartComp = ({dataPoints, label, color}) => {
  const chartData = {
    labels: dataPoints.map((point) => point.time.toLocaleTimeString()),
    datasets: [
      {
        label: label,
        data: dataPoints.map((point) => point.value),
        fill: false,
        borderColor: color,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartComp;
